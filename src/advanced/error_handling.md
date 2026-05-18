# Error Handling

Toka provides robust error handling through the Result and Option types, inspired by Rust but with a cleaner syntax.

## The Option Type

Use `Option` for values that may or may not exist:

```toka
import core/option::{Option, Some, None}

fn find_user(id: i32) -> Option<string> {
    if id == 1 {
        return Some("Alice")
    }
    return None
}

auto result = find_user(1)
match result {
    Some(name) => println("Found: " + name),
    None => println("User not found")
}
```

## The Result Type

Use `Result` for operations that can succeed or fail:

```toka
import core/result::{Result, Ok, Err}

fn divide(a: f64, b: f64) -> Result<f64, string> {
    if b == 0.0 {
        return Err("Division by zero")
    }
    return Ok(a / b)
}
```

The Result type is generic over two parameters:
- `T` — The successful value type
- `E` — The error type

## Pattern Matching on Results

```toka
match divide(10.0, 2.0) {
    Ok(value) => println("Result: " + str(value)),
    Err(msg) => println("Error: " + msg)
}
```

## Short-Circuiting with `?`

Use the `?` operator to propagate errors automatically:

```toka
fn process_file(path: str) -> Result<string, string> {
    auto content = read_file(path)?  // Returns early on error
    auto parsed = parse(content)?    // Same here
    return Ok(format_result(parsed))
}
```

This is much cleaner than nested `match` statements.

## The Default Case with `or`

Provide a default value in case of error:

```toka
auto value = parse_int("42") or 0  // Uses 0 if parsing fails
```

## Custom Error Types

You can define structured errors:

```toka
pub shape ParseError(
    line: i32,
    col: i32,
    message: str
)

fn parse_config(text: str) -> Result<Config, ParseError> {
    if text.len == 0 {
        return Err(ParseError(line = 0, col = 0, message = "Empty input"))
    }
    // ... parsing logic
}
```
