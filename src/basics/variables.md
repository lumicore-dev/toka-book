# Variables & Types

Toka is a statically-typed language with a rich type system. Let's explore how variables and types work.

## Variable Declaration

Use the `auto` keyword to declare variables:

```toka
auto x = 10          // i32 (default integer type)
auto y = 3.14        // f64 (default float type)
auto name = "Toka"   // str (string slice)
```

## Explicit Type Annotations

You can specify the type explicitly with a colon:

```toka
auto x: u64 = 10
auto y: f32 = 3.14
auto flag: bool = true
```

## Primitive Types

Toka's type system is defined in `lib/core/types.tk` and includes:

| Type | Description | Size |
|------|-------------|------|
| `i8`, `i16`, `i32`, `i64` | Signed integers | 1-8 bytes |
| `u8`, `u16`, `u32`, `u64` | Unsigned integers | 1-8 bytes |
| `f32`, `f64` | Floating point (IEEE 754) | 4-8 bytes |
| `bool` | Boolean (`true` / `false`) | 1 byte |
| `char` | C-style character (`i8`) | 1 byte |
| `byte` | Raw byte (`u8`) | 1 byte |

## Platform-Dependent Types

```toka
pub alias usize = u64   // Pointer-sized unsigned integer
pub alias isize = i64   // Pointer-sized signed integer
```

On 64-bit systems, `usize` is `u64`; on 32-bit systems, it would be `u32`.

## Type Aliases

Toka supports two kinds of type aliases:

**Weak alias** — Semantically identical, transparent to the compiler:

```toka
pub alias usize = u64
```

**Strong type** — Same memory layout, but requires explicit conversion:

```toka
pub type Addr = u64
pub type OAddr = u64
```

## Constants

Use `const` for compile-time constant values:

```toka
pub const MAX_SIZE = 1024:u64
pub const NAME = "Toka"
```

Constants are inlined at compile time — no memory is allocated and their address cannot be taken.

## Mutability

Variables are **immutable by default**. Use the `#` suffix to make them mutable. The `#` token is only needed in two places:

1. **At declaration** — to mark the variable as mutable
2. **Before a mutable method call** — to present the guard on the variable

```toka
auto x = 10        // immutable
auto x# = 10       // mutable — # at declaration

// Reading and assignment don't need #
x = 20             // OK — plain assignment
println(str(x))    // OK — plain read

// Calling a mutable method requires # on the variable
x#.sort()          // OK — # on variable before .method()
x#.push(5)         // OK
```

This is an example of Toka's **Attribute Token System** — the `#` suffix denotes soul mutability and is placed on the variable itself when declaring it or calling its mutable methods.
