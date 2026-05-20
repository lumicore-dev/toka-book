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
import std/io::println

auto count# = 0
while count < 5 {
    println("Count: {}", count)
    count = count + 1
}
```

## Iterating Over Arrays

Toka supports array-based iteration:

```toka
import std/io::println

for auto i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] {
    println("{}", i)
}
```

Currently, Toka does not support a native range operator (like `..`). You can iterate over an array of elements or implement custom loops using `while`.

## Iterating Collections

```toka
import std/io::println

auto items = ["apple", "banana", "cherry"]
for auto item in items {
    println("{}", item)
}
```

With index:

```toka
import std/io::println

auto items2 = ["apple", "banana", "cherry"]
auto i# = 0
for auto item in items2 {
    println("{}: {}", i, item)
    i = i + 1
}
```

## Break and Continue

Control loop flow with standard keywords:

```toka
import std/io::println

auto iter# = 0
while iter < 100 {
    if iter == 50 {
        break        // Exit the loop completely
    }
    if iter % 2 == 0 {
        iter = iter + 1
        continue     // Skip to next iteration
    }
    println("{}", iter)  // Prints odd numbers: 1, 3, 5, ..., 49
    iter = iter + 1
}
```

## Match (Pattern Matching)

Toka provides powerful pattern matching with the `match` expression:

```toka
fn describe(value: i32) -> cstring {
    return match value {
        0 => pass "zero"
        1 => pass "one"
        auto v if v >= 2 && v <= 10 => pass "small"
        auto v if v >= 11 && v <= 100 => pass "medium"
        _ => pass "large"
    }
}
```

The `_` wildcard matches any value, serving as the default case.
