# Generics

Generics allow you to write flexible, reusable code that works with any type while maintaining compile-time safety.

In Toka, when defining custom generics, you typically use the intuitive `T` (without a single quote) form. The single-quoted `'T` (Morphic generic) is only needed in generic container scenarios where compatibility with both soul elements and pointer elements is required.

## Generic Functions

Define a generic function using the standard `T` syntax:

```toka
fn identity<T>(value: T) -> T {
    return value
}

auto x = identity(42)      // Works with integers
auto y = identity("hello") // Works with strings
```

## Generic Constraints

Constrain generics with traits:

```toka
fn max<T: @PartialOrd>(a: T, b: T) -> T {
    if a > b {
        return a
    }
    return b
}
```

This function works with any type that implements `@PartialOrd`.

## Generic Data Structures

```toka
pub shape Pair<'A, 'B>(
    'first: 'A,
    'second: 'B
)

impl<'A, 'B> Pair<'A, 'B> {
    pub fn new(first: 'A, second: 'B) -> Pair<'A, 'B> {
        return Pair('first = first, 'second = second)
    }
    
    pub fn first(self) -> 'A {
        return self.first
    }
    
    pub fn second(self) -> 'B {
        return self.second
    }
}
```

When defining shapes with Morphic generic types (those with a single quote prefix like `'A`), Toka enforces a strict rule: the corresponding fields must also be prefixed with a single quote (e.g., `'first: 'A`). This indicates that these fields can dynamically accept different pointer morphology states, avoiding "soul collapse." However, when calling methods or retrieving fields, you refer to them as normal field names (e.g., `self.first` instead of `self.'first`).

### Choosing Between Morphic and Standard Generics

When defining custom generics or generic parameters, Toka supports both single-quoted (e.g., `'T`) and standard (e.g., `T`) styles. The core differences and use cases are:

- **`T` (Standard Generics, without single quote)**: **Generally, custom generics only need this `T` form**. Whether you are writing high-level business logic, custom standard data structures, or helper functions, standard generics are highly recommended. It completely eliminates single-quote syntax noise, making code cleaner and matching standard developer intuition.
- **`'T` (Morphic Generics, with single quote)**: **This form is only needed in generic container or low-level infrastructure scenes** (such as `Vec`, `HashMap`, `Slab`, or concurrent `Channel`). Because generic containers must be fully compatible with both **soul elements** (plain values/structures) and **pointer elements** (such as unique `^` or shared `~` pointers) to avoid "soul collapse" and perform zero-cost layouts, Morphic generics adapt dynamically to different memory morphologies.

> [!NOTE]
> For the vast majority of daily programming tasks, you only need to use `T` just like in other traditional programming languages, which greatly simplifies readability.

## Type Inference

Toka can infer generic types in most cases, so you rarely need to specify them explicitly:

```tokalang
fn pair<'A, 'B>(a: 'A, b: 'B) -> Pair<'A, 'B> {
    return Pair::new(a, b)
}

auto p = pair(1, "world")  // Pair<i32, str>
```

## Generic Requirements

Use trait bounds to specify what operations a generic type must support:

| Trait | Description |
|-------|-------------|
| `@PartialEq` | Equality comparison (`==`, `!=`) |
| `@PartialOrd` | Ordering comparison (`<`, `>`, `<=`, `>=`) |
| `@Hash` | Hash computation |
| `@encap` | Encapsulation / interior mutability |
