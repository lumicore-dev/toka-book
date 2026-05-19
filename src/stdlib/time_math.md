# Time & Math

Toka provides comprehensive time handling and mathematical functions for scientific and systems programming.

## Getting Current Time

```toka
import std/time::{SystemTime}
import std/string::String
import std/io::println

fn example() {
    auto now = SystemTime::now()
    // println("Current timestamp: {}", now.unix())
}
```

## Time Formatting

```toka
import std/time::{SystemTime}
import std/io::println

fn format_date() {
    auto now = SystemTime::now()
    // auto formatted = now.format("%Y-%m-%d %H:%M:%S")
    // println("Date: {}", formatted)
}
```

## Durations and Timers

```toka
import std/time::{Instant}
import std/string::String
import std/io::println

fn measure() {
    auto start = Instant::now()
    
    // Do some work...
    
    auto elapsed = start.elapsed()
    println("Elapsed: {} ms", elapsed.as_millis())
}
```

## Math Functions

```toka
import std/math
import std/string::String
import std/io::println

fn calculations() {
    auto x = 3.14159
    
    println("{}", math::sin(x))       // Sine
    println("{}", math::cos(x))       // Cosine
    println("{}", math::sqrt(16.0))   // Square root → 4.0
    // println(str(math::abs(-5)))      // Absolute value → 5
    // println(str(math::pow(2.0, 8)))  // Power → 256.0
}
```

## Random Numbers

```toka
import std/rand::{Random}
import std/string::String
import std/io::println

fn gen_random() {
    auto rng# = Random::new(123:u64, 1:u64)
    auto dice = rng#.next_u32() % 6 + 1
    println("You rolled: {}", dice)
    
    // Note: secure_bytes is under development
    // auto secure = rand::secure_bytes(32)
}
```

## Math Constants

```toka
// Mathematical limits (from lib/core/types.tk)
pub const MY_LIMITS = (
    u8 = (min = 0, max = 255, bits = 8),
    i32 = (min = -2147483648, max = 2147483647, bits = 32),
    u64 = (min = 0, max = 18446744073709551615, bits = 64),
    f32 = (
        min_positive = 1.17549435e-38,
        epsilon = 1.19209290e-07,
        bits = (nan = 0x7fc00000, infinity = 0x7f800000, neg_zero = 0x80000000)
    )
)

fn dummy_limits() {}
```
