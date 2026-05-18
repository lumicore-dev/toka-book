# Control Flow

Toka provides modern control flow constructs for building clear, expressive programs.

## If / Else

```toka
import std/io::println

fn check_temp(temp: i32) {
    if temp > 35 {
        println("It's hot!")
    } else if temp < 10 {
        println("It's cold!")
    } else {
        println("It's mild.")
    }
}
```

## While Loops

```toka
auto count# = 0
while count# < 5 {
    println("Count: " + str(count#))
    count# = count# + 1
}
```

## For Loops with Ranges

Toka supports range-based iteration:

```toka
for i in 0..10 {
    println(str(i))
}
```

The `0..10` range is exclusive on the end — it iterates `0, 1, 2, ..., 9`.

## Iterating Collections

```toka
auto items = ["apple", "banana", "cherry"]
for item in items {
    println(item)
}
```

With index:

```toka
for i, item in items {
    println(str(i) + ": " + item)
}
```

## Break and Continue

Control loop flow with standard keywords:

```toka
for i in 0..100 {
    if i == 50 {
        break        // Exit the loop completely
    }
    if i % 2 == 0 {
        continue     // Skip to next iteration
    }
    println(str(i))  // Prints odd numbers: 1, 3, 5, ..., 49
}
```

## Match (Pattern Matching)

Toka provides powerful pattern matching with the `match` expression:

```toka
fn describe(value: i32) -> str {
    match value {
        0 => "zero",
        1 => "one",
        2..10 => "small",
        11..100 => "medium",
        _ => "large"
    }
}
```

The `_` wildcard matches any value, serving as the default case.
