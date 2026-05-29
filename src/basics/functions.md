# Functions

Functions in Toka are first-class citizens. They follow a clean, readable syntax.

## Basic Function Syntax

```toka
fn add(x: i32, y: i32) -> i32 {
    return x + y
}
```

- `fn` keyword declares a function
- Parameters are typed with `name: Type` syntax
- Return type follows `->`
- The function body is wrapped in `{ }`

## Entry Point: `main`

Every Toka executable needs a `main` function that returns an exit code:

```toka
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

Return `0` for success, non-zero for errors.

## Multiple Parameters

Functions can take multiple parameters of different types:

```toka
fn greet(name: str, age: i32, formal: bool) -> str {
    if formal {
        return "Good day"
    }
    return "Hey"
}
```

## Mutable Parameters

Parameters are immutable by default. Use the `#` token at declaration for mutable parameters. Inside the function body, you access the parameter without `#`:

```toka
fn increment(x#: i32) {
    x = x + 1       // Inside the body, no # needed
}
```

## Functions with No Return

If a function doesn't return anything, omit `->`:

```toka
import std/io::println

fn log_message(msg: str) {
    println("{}", msg)
}
```

## Method Syntax

Functions can be attached to types using `impl` blocks:

```toka
pub shape Number(val: i32)

impl Number {
    pub fn double(self) -> i32 {
        return self.val * 2
    }
}

fn main() -> i32 {
    auto result = Number(val = 5).double()  // result = 10
    return 0
}
```
