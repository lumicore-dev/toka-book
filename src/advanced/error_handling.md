# Error Handling

Toka provides robust, type-safe error handling through the `Result` and `Option` types. This model, rooted in Algebraic Data Types (ADTs), traces its origins back to the ML language family (such as Standard ML and OCaml) and was later formalized in Haskell as the Monadic `Maybe` and `Either` types. More recently, Rust popularized this elegant approach within modern systems programming. Toka inherits this rich academic and engineering heritage, further refining it with highly expressive language-level syntax—such as the `!` operator for error propagation—to deliver a cleaner, more concise developer experience.

## The Option Type

Use `Option` for values that may or may not exist:

```toka
import core/option::{Option}
import std/string::String
import std/io::println

fn find_user(id: i32) -> Option<String> {
    if id == 1 {
        return Option<String>::Some(String::from("Alice"))
    }
    return Option<String>::None
}

fn main() -> i32 {
    auto result = find_user(1)
    match result {
        auto Option<String>::Some(&name) => println("Found: {}", name)
        auto Option<String>::None => println("User not found")
    }
    return 0
}
```

## The Result Type

Use `Result` for operations that can succeed or fail:

```toka
import core/result::{Result}
import std/string::String

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Result<f64, String>::Err(String::from("Division by zero"))
    }
    return Result<f64, String>::Ok(a / b)
}
```

The Result type is generic over two parameters:
- `T` — The successful value type
- `E` — The error type

## Pattern Matching on Results

```toka
import core/result::{Result}
import std/string::String
import std/io::println

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Result<f64, String>::Err(String::from("Division by zero"))
    }
    return Result<f64, String>::Ok(a / b)
}

fn main() -> i32 {
    match divide(10.0, 2.0) {
        auto Result<f64, String>::Ok(value) => println("Result: {}", value)
        auto Result<f64, String>::Err(&msg) => println("Error: {}", msg)
    }
    return 0
}
```

## Short-Circuiting with `!`

Use the `!` operator to propagate errors automatically:

```toka
import core/result::{Result}
import std/string::String

fn read_file(path: String) -> Result<String, String> {
    return Result<String, String>::Ok(path)
}

fn parse(content: String) -> Result<String, String> {
    return Result<String, String>::Ok(content)
}

fn format_result(parsed: String) -> String {
    return parsed
}

fn process_file(path: String) -> Result<String, String> {
    auto content = read_file(path)!  // Returns early on error
    auto parsed = parse(content)!    // Same here
    return Result<String, String>::Ok(format_result(parsed))
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
import std/string::String

pub shape Config()

pub shape ParseError(
    line: i32,
    col: i32,
    message: String
)

fn parse_config(text: String) -> Result<Config, ParseError> {
    if text.len() == 0 {
        return Result<Config, ParseError>::Err(ParseError(line = 0, col = 0, message = String::from("Empty input")))
    }
    return Result<Config, ParseError>::Ok(Config())
}
```
