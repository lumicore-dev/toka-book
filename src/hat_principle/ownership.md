# Ownership & Hats

Ownership in Toka is governed by the Hat Principle. Each hat sigil communicates a different ownership model directly through syntax.

## Three Ownership Models

Toka defines three pointer types, each with distinct ownership semantics:

### `*` — Raw Pointer (Unsafe)

Raw pointers require explicit `unsafe` or `alloc` to create and manage:

```toka
{{#include ../../examples/ownership.tk:raw_ptr}}
```

Raw pointers are used when interfacing with C code or implementing low-level data structures.

### `^` — Unique Pointer (Move Semantics)

Unique pointers provide exclusive ownership. Only one `^` can point to a given resource at any time. Ownership is transferred via **move**:

```toka
{{#include ../../examples/ownership.tk:unique_ptr}}
```

The `^` token operates like Rust's `Box` or C++'s `std::unique_ptr`. When a unique pointer goes out of scope, its resource is automatically freed.

### `~` — Shared Pointer (Reference-Counted)

Shared pointers enable multiple owners via reference counting. Support is planned for an upcoming release.

```toka
// Not yet implemented in v0.9.6 — coming soon
```

The resource is freed when the last `~` reference goes out of scope.

## Moving vs Copying

**Simple types** (like `i32`, `f64`, `bool`) are **copied** by default:

```toka
{{#include ../../examples/ownership.tk:move_copy}}
```

**Complex types** (like `string`, `Vec`, custom `shape` types) are **moved** by default. In Toka, assignment of a complex type transfers ownership from the source to the destination:

```toka
// Complex types use move semantics:
//   auto moved = original  — ownership transfers to `moved`
//   `original` is no longer valid after the move
```

## Borrowing (In-Place Capture)

Toka uses **implicit borrow** for function parameters by default. You don't need special sigils for standard borrowing:

```toka
{{#include ../../examples/ownership.tk:borrow_func}}
```

For **mutable access**, use `#` on the variable declaration. Note that `#` is restricted to declarations and cannot be used at call sites:

```toka
{{#include ../../examples/ownership.tk:mutable_local}}
```

## Explicit Local Borrow with `&`

The `&` sigil is used when **explicitly declaring a local borrow pointer** or returning a reference:

```toka
fn borrow_example(data: &i32) -> &i32 {
    // & denotes a reference type
    return data
}
```

> **Note:** The `&` reference syntax is part of Toka's type system. Support for borrow-checked references is under active development.

## The PAL Checker in Action

The PAL Checker verifies at compile time that:

1. **No use after move** — A `^` value cannot be accessed after ownership transfer
2. **No dangling references** — Borrowed references cannot outlive the borrowed value
3. **No double-free** — Each value is freed exactly once
4. **No data races** — Mutable access is exclusive; shared access is read-only

All of this happens **without any lifetime annotations**. The Hat Principle makes ownership visible in the syntax itself.
