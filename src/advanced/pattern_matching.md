# Pattern Matching

Pattern matching is one of Toka's most expressive features, allowing you to destructure and match values concisely.

## Basic Match

```toka
fn describe(n: i32) -> str {
    return match n {
        0 => pass "zero"
        1 => pass "one"
        _ => pass "many"
    }
}
```

The `_` wildcard matches any value — it's the default case.

## Range Patterns

Match against ranges:

```toka
auto score = 85
auto grade = match score {
        auto s if s >= 0 && s < 60 => { pass "F" }
        auto s if s >= 60 && s < 70 => { pass "D" }
        auto s if s >= 70 && s < 80 => { pass "C" }
        auto s if s >= 80 && s < 90 => { pass "B" }
        auto s if s >= 90 && s <= 100 => { pass "A" }
        _ => { pass "invalid score" }
}
```

Note that Toka does not support native range patterns (like `0..10`). Instead, use variables with `if` guard expressions to perform range checking.

## Matching on Options

```toka
import std/io::println
import core/option::Option

fn main() -> i32 {
    auto id = 1
    auto opt: Option<str> = Option<str>::None
    match opt {
        auto Option<str>::Some(&name) => { println("Found: {}", name) }
        auto Option<str>::None => { println("User not found") }
    }
    return 0
}
```

## Matching on Results

```toka
import std/io::println
import core/result::Result

fn main() -> i32 {
    auto res: Result<f32, str> = Result<f32, str>::Ok(5.0)
    match res {
        auto Result<f32, str>::Ok(value) => { println("Result: {}", value) }
        auto Result<f32, str>::Err(&msg) => { println("Error: {}", msg) }
    }
    return 0
}
```

## Destructuring Shapes

Pattern match on custom shapes:

```toka
import std/io::println

pub shape Point(x: i32, y: i32)

fn origin(p: Point) {
    match p {
        auto pt if pt.x == 0 && pt.y == 0 => { println("At origin") }
        auto pt if pt.y == 0 => { println("On X-axis") }
        auto pt if pt.x == 0 => { println("On Y-axis") }
        _ => { println("Somewhere else") }
    }
}
```

## Match as Expression

Match returns a value, so you can use it in assignments:

```toka
auto score = 85
auto grade = match score {
    auto s if s >= 90 && s <= 100 => pass "A"
    auto s if s >= 80 && s < 90 => pass "B"
    auto s if s >= 70 && s < 80 => pass "C"
    auto s if s >= 60 && s < 70 => pass "D"
    _ => pass "F"
}
```

## No Type-Based Matching

Toka does not support matching directly on types (such as writing `i32 => ...` or `str => ...` inside a `match` expression). Any type name used in a branch without standard syntax will be treated as a new variable binding pattern (Variable Pattern), which matches any value and shadows other cases, leading to compilation errors or unreachable branches.
```
