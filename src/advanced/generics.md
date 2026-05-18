# Generics

Generics allow you to write flexible, reusable code that works with any type while maintaining compile-time safety.

## Generic Functions

Define a generic function using the shorthand `'T` syntax:

```toka
fn identity<'T>(value: 'T) -> 'T {
    return value
}

auto x = identity(42)      // Works with integers
auto y = identity("hello") // Works with strings
```

## Generic Constraints

Constrain generics with traits:

```toka
fn max<'T @PartialOrd>(a: 'T, b: 'T) -> 'T {
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
    first: 'A,
    second: 'B
)

impl<'A, 'B> Pair<'A, 'B> {
    pub fn new(first: 'A, second: 'B) -> Pair<'A, 'B> {
        return Pair(first = first, second = second)
    }
    
    pub fn first(self) -> 'A {
        return self.first
    }
    
    pub fn second(self) -> 'B {
        return self.second
    }
}
```

## Type Inference

Toka can infer generic types in most cases, so you rarely need to specify them explicitly:

```toka
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
