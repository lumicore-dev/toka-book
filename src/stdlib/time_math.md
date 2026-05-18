# Time & Math

Toka provides comprehensive time handling and mathematical functions for scientific and systems programming.

## Getting Current Time

```toka
import std/time

fn example() {
    let now = time::now()
    println("Current timestamp: " + str(now.unix()))
}
```

## Time Formatting

```toka
import std/time

fn format_date() {
    let now = time::now()
    let formatted = now.format("%Y-%m-%d %H:%M:%S")
    println("Date: " + formatted)
}
```

## Durations and Timers

```toka
import std/time

fn measure() {
    let start = time::now()
    
    // Do some work...
    
    let elapsed = time::now() - start
    println("Elapsed: " + str(elapsed.ms()) + "ms")
}
```

## Math Functions

```toka
import std/math

fn calculations() {
    let x = 3.14159
    
    println(str(math::sin(x)))       // Sine
    println(str(math::cos(x)))       // Cosine
    println(str(math::sqrt(16.0)))   // Square root → 4.0
    println(str(math::abs(-5)))      // Absolute value → 5
    println(str(math::pow(2.0, 8)))  // Power → 256.0
}
```

## Random Numbers

```toka
import std/rand

fn gen_random() {
    let dice = rand::range(1, 7)   // Random between 1 and 6
    println("You rolled: " + str(dice))
    
    // Cryptographically secure random
    let secure = rand::secure_bytes(32)
}
```

## Math Constants

```toka
// Mathematical limits (from lib/core/types.tk)
pub const LIMITS = (
    u8 = (min = 0, max = 255, bits = 8),
    i32 = (min = -2147483648, max = 2147483647, bits = 32),
    u64 = (min = 0, max = 18446744073709551615, bits = 64),
    f32 = (
        min_positive = 1.17549435e-38,
        epsilon = 1.19209290e-07,
        bits = (nan = 0x7fc00000, infinity = 0x7f800000, neg_zero = 0x80000000)
    )
)
```
