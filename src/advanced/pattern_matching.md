# Pattern Matching

Pattern matching is one of Toka's most expressive features, allowing you to destructure and match values concisely.

## Basic Match

```toka
fn describe(n: i32) -> cstring {
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

Use `..` for exclusive ranges and `..=` for inclusive ranges.

## Matching on Options

```toka
import std/io::println
import core/option::Option

fn main() {
    auto id = 1
    auto opt: Option<view_str> = Option<view_str>::None()
    match opt {
        auto Option::Some(&name) => { println("Found: {}", name) }
        auto Option::None() => { println("User not found") }
    }
}
```

## Matching on Results

```toka
import std/io::println
import core/result::Result

fn main() {
    auto res: Result<f32, view_str> = Result<f32, view_str>::Ok(5.0)
    match res {
        auto Result::Ok(value) => { println("Result: {}", value) }
        auto Result::Err(&msg) => { println("Error: {}", msg) }
    }
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

## Type Matching

Match on the type of a value:

```toka
import std/io::println

fn inspect<T>(value: T) -> cstring {
    return match value {
        i32 => pass "It's an integer"
        view_str => pass "It's a string"
        bool => pass "It's a boolean"
        _ => pass "Unknown type"
    }
}
```
