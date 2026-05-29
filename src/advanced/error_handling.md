# Error Handling

Toka provides type-safe error handling through the `Result` and `Option` types. This model, rooted in Algebraic Data Types (ADTs), traces its origins back to the ML language family (such as Standard ML and OCaml) and Haskell. Rust later popularized this approach within modern systems programming. Toka adopts this model, combining it with language-level syntax—such as the `!` operator for error propagation—to deliver a concise developer experience.

## The Option Type

Use `Option` for values that may or may not exist:

```toka
import core/option::{Option}
import std/io::println

fn find_user(id: i32) -> Option<string> {
    if id == 1 {
        return Option<string>::Some(string::from("Alice"))
    }
    return Option<string>::None
}

fn main() -> i32 {
    auto result = find_user(1)
    match result {
        auto Option<string>::Some(&name) => println("Found: {}", name)
        auto Option<string>::None => println("User not found")
    }
    return 0
}
```

## The Result Type

Use `Result` for operations that can succeed or fail:

```toka
import core/result::{Result}

fn divide(a: f64, b: f64) -> Result<f64, string> {
    if b == 0.0 {
        return Result<f64, string>::Err(string::from("Division by zero"))
    }
    return Result<f64, string>::Ok(a / b)
}
```

The Result type is generic over two parameters:
- `T` — The successful value type
- `E` — The error type

## Pattern Matching on Results

```toka
import core/result::{Result}
import std/io::println

fn divide(a: f64, b: f64) -> Result<f64, string> {
    if b == 0.0 {
        return Result<f64, string>::Err(string::from("Division by zero"))
    }
    return Result<f64, string>::Ok(a / b)
}

fn main() -> i32 {
    match divide(10.0, 2.0) {
        auto Result<f64, string>::Ok(value) => println("Result: {}", value)
        auto Result<f64, string>::Err(&msg) => println("Error: {}", msg)
    }
    return 0
}
```

## Short-Circuiting with `!`

Use the `!` operator to propagate errors automatically:

```toka
import core/result::{Result}

fn read_file(path: string) -> Result<string, string> {
    return Result<string, string>::Ok(path)
}

fn parse(content: string) -> Result<string, string> {
    return Result<string, string>::Ok(content)
}

fn format_result(parsed: string) -> string {
    return parsed
}

fn process_file(path: string) -> Result<string, string> {
    auto content = read_file(path)!  // Returns early on error
    auto parsed = parse(content)!    // Same here
    return Result<string, string>::Ok(format_result(parsed))
}
```

This is much cleaner than nested `match` statements.

## The Default Case with `or`

Provide a default value in case of error:

```tokalang
auto value = parse_int("42").unwrap_or(0)  // Uses 0 if parsing fails
```

## Custom Error Types

You can define structured errors:

```toka
import core/result::{Result}

pub shape Config()

pub shape ParseError(
    line: i32,
    col: i32,
    message: string
)

fn parse_config(text: string) -> Result<Config, ParseError> {
    if text.len() == 0 {
        return Result<Config, ParseError>::Err(ParseError(line = 0, col = 0, message = string::from("Empty input")))
    }
    return Result<Config, ParseError>::Ok(Config())
}
```
