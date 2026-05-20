# 时间与数学

Toka 提供全面的时间处理和数学函数，适用于科学计算和系统编程。

## 获取当前时间

```toka
import std/time::{SystemTime}
import std/string::String
import std/io::println

fn example() {
    auto now = SystemTime::now()
    // println("Current timestamp: {}", now.unix())
}
```

## 时间格式化

```toka
import std/time::{SystemTime}
import std/io::println

fn format_date() {
    auto now = SystemTime::now()
    // auto formatted = now.format("%Y-%m-%d %H:%M:%S")
    // println("Date: {}", formatted)
}
```

## 持续时间和计时器

```toka
import std/time::{Instant}
import std/string::String
import std/io::println

fn measure() {
    auto start = Instant::now()
    
    // 执行一些工作...
    
    auto elapsed = start.elapsed()
    println("耗时：{} 毫秒", elapsed.as_millis())
}
```

## 数学函数

```toka
import std/math
import std/string::String
import std/io::println

fn calculations() {
    auto x = 3.14159
    
    println("{}", math::sin(x))       // 正弦
    println("{}", math::cos(x))       // 余弦
    println("{}", math::sqrt(16.0))   // 平方根 → 4.0
    // println(str(math::abs(-5)))      // 绝对值 → 5
    // println(str(math::pow(2.0, 8)))  // 幂运算 → 256.0
}
```

## 随机数

```toka
import std/rand::{Random}
import std/string::String
import std/io::println

fn gen_random() {
    auto rng# = Random::new(123:u64, 1:u64)
    auto dice = rng#.next_u32() % 6 + 1
    println("你掷出了：{}", dice)
    
    // 注意：secure_bytes 正在开发中
    // auto secure = rand::secure_bytes(32)
}
```

## 数学常量

```toka
// 数学极限值（来自 lib/core/types.tk）
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
