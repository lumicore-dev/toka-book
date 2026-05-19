# Error Handling

Toka provides robust error handling through the Result and Option types, inspired by Rust but with a cleaner syntax.

## The Option Type

Use `Option` for values that may or may not exist:

```tokalang
import core/option::{Maybe}

fn find_user(id: i32) -> Maybe<String> {
    if id == 1 {
        return Maybe<String>::Some(String::from("Alice"))
    }
    return Maybe<String>::None
}

auto result = find_user(1)
match result {
    auto Maybe::Some(&name) => println("Found: {}", name),
    auto Maybe::None => println("User not found")
}
```

## The Result Type

Use `Result` for operations that can succeed or fail:

```tokalang
import core/result::{Okay}

fn divide(a: f64, b: f64) -> Okay<f64, String> {
    if b == 0.0 {
        return Okay<f64, String>::Err(String::from("Division by zero"))
    }
    return Okay<f64, String>::Ok(a / b)
}
```

The Result type is generic over two parameters:
- `T` — The successful value type
- `E` — The error type

## Pattern Matching on Results

```tokalang
match divide(10.0, 2.0) {
    auto Okay::Ok(value) => println("Result: {}", value),
    auto Okay::Err(&msg) => println("Error: {}", msg)
}
```

## Short-Circuiting with `?`

Use the `?` operator to propagate errors automatically:

```tokalang
fn process_file(path: String) -> Okay<String, String> {
    auto content = read_file(path)?  // Returns early on error
    auto parsed = parse(content)?    // Same here
    return Okay<String, String>::Ok(format_result(parsed))
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

```tokalang
pub shape ParseError(
    line: i32,
    col: i32,
    message: String
)

fn parse_config(text: String) -> Okay<Config, ParseError> {
    if text.len() == 0 {
        return Okay<Config, ParseError>::Err(ParseError(line = 0, col = 0, message = String::from("Empty input")))
    }
    // ... parsing logic
}
```
