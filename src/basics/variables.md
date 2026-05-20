# Variables & Types

Toka is a statically-typed language with a rich type system. Let's explore how variables and types work.

## Variable Declaration

Use the `auto` keyword to declare variables:

```toka
auto x = 10          // i32 (default integer type)
auto y = 3.14        // f64 (default float type)
auto name = "Toka"   // str (string slice)
```

## Naming Rules & Hyphen (-) Resolution

Toka has a strict and elegant rule regarding the hyphen (`-`) character to achieve both modular naming convenience and unambiguous mathematical syntax:

### Package Names & Namespaces

Package names and imported namespaces **can** use hyphens freely. This is common when importing nested folders or external libraries that follow a kebab-case directory structure. You can import them and call their functions using their hyphenated namespaces:

```tokalang
import std/io::println

// Package and namespace names can contain hyphens
import ./nested/toka-ink as toka-ink

fn main() {
    toka-ink::render()
}
```

### Variables & Functions

Ordinary variable names, constant names, shape/struct names, and function definitions **cannot** contain hyphens. They must follow standard alphanumeric/underscore naming rules (such as `camelCase` or `snake_case`):

```tokalang
fn main() {
    auto max_size = 1024       // OK (snake_case)
    auto maxSize = 1024        // OK (camelCase)
    // auto max-size = 1024    // Error: Hyphens are not allowed in variable names
}
```

### Unambiguous Subtraction

Because hyphens are strictly forbidden in variable and function names, the subtraction operator (`-`) is completely unambiguous. Ordinary subtraction expressions without spaces are **always** 100% parsed correctly:

```toka
import std/io::println

fn main() -> i32 {
    auto sub1 = 10
    auto sub2 = 3
    
    // No spaces are needed! Always parsed as subtraction
    auto result = sub1-sub2    // OK: parsed as sub1 - sub2
    auto value = 10-3          // OK: parsed as 10 - 3
    println("Result: {}, Value: {}", result, value)
    return 0
}
```

## Explicit Type Annotations

You can specify the type explicitly with a colon:

```toka
auto x: u64 = 10
auto y: f32 = 3.14:f32
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
import std/io::println

pub shape List(data: i32)
impl List {
    pub fn sort(self#) {}
    pub fn push(self#, val: i32) {}
}

fn main() {
    auto y = List(data = 10)  // immutable
    auto x# = List(data = 10) // mutable — # at declaration

    // Reading and assignment don't need #
    x = List(data = 20)       // OK — plain assignment
    println("{}", x.data)     // OK — plain read

    // Calling a mutable method requires # on the variable
    x#.sort()                 // OK — # on variable before .method()
    x#.push(5)                // OK
}
```

This is an example of Toka's **Attribute Token System** — the `#` suffix denotes soul mutability and is placed on the variable itself when declaring it or calling its mutable methods.
