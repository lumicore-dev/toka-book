# Pattern Matching

Pattern matching is one of Toka's most expressive features, allowing you to destructure and match values concisely.

## Basic Match

```toka
fn describe(n: i32) -> str {
    match n {
        0 => "zero",
        1 => "one",
        _ => "many"
    }
}
```

The `_` wildcard matches any value — it's the default case.

## Range Patterns

Match against ranges:

```toka
match score {
        0..60 => "F",
        60..70 => "D",
        70..80 => "C",
        80..90 => "B",
        90..=100 => "A",
        _ => "invalid score"
}
```

Use `..` for exclusive ranges and `..=` for inclusive ranges.

## Matching on Options

```toka
match find_user(id) {
    Some(name) => println("Found: " + name),
    None => println("User not found")
}
```

## Matching on Results

```toka
match divide(10.0, 2.0) {
    Ok(value) => println("Result: " + str(value)),
    Err(msg) => println("Error: " + msg)
}
```

## Destructuring Shapes

Pattern match on custom shapes:

```toka
pub shape Point(x: i32, y: i32)

fn origin(p: Point) {
    match p {
        Point(x = 0, y = 0) => println("At origin"),
        Point(x = _, y = 0) => println("On X-axis"),
        Point(x = 0, y = _) => println("On Y-axis"),
        _ => println("Somewhere else")
    }
}
```

## Match as Expression

Match returns a value, so you can use it in assignments:

```toka
auto grade = match score {
    90..=100 => "A",
    80..90 => "B",
    70..80 => "C",
    60..70 => "D",
    _ => "F"
}
```

## Type Matching

Match on the type of a value:

```toka
fn inspect(value: dyn) -> str {
    match value {
        i32 => "It's an integer: " + str(value),
        str => "It's a string: " + value,
        bool => "It's a boolean: " + str(value),
        _ => "Unknown type"
    }
}
```
