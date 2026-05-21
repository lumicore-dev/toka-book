# 字符串

Toka 提供了一套灵活的字符串系统，专为系统编程和文本处理而设计。

## 字符串类型

Toka 定义了多种字符串类型，满足不同的编码需求：

| 类型 | 描述 |
|------|------|
| `str` | 字符串切片（类似 Rust 的 `&str` 或 C++ 的 `string_view`）— 不可变，借用 |
| `String` | 拥有所有权的可变字符串（默认 UTF-8 编码） |

## 字符串字面量

双引号字符串是标准用法：

```toka
auto greeting = "Hello, Toka!"
auto name = "World"
```

## 转义序列

Toka 支持字符串字面量中的 `\x` 转义序列，使得 ANSI 颜色代码的使用变得简洁：

```toka
import std/io::println

auto red = "\x1b[31m"
auto green = "\x1b[32m"
auto reset = "\x1b[0m"

println("{}{}成功！{}", green, "构建完成", reset)
```

## 字符串插值

使用 `{}` 占位符配合 `println` 实现简洁的格式化：

```toka
import std/io::println

auto name = "Toka"
auto version = "0.9.7"
println("欢迎使用 {} 版本 {}！", name, version)
```

## 字符串拼接

字符串可以通过 `+` 进行拼接：

```toka
import std/string::String

auto full# = String::from("你好，")
full#.push_str("世界！")
```

## 格式化与打印

你可以直接在占位符中打印其他基础类型，无需进行显式的手动类型转换：

```toka
import std/io::println

auto n = 42
println("答案是 {}", n)
```

## 字符类型

| 类型 | 描述 |
|------|------|
| `char` | 单字节字符（`i8`），C 风格 |
| `Char16` | UTF-16 码点（`u16`） |
| `Char32` | UTF-32 码点（`u32`） |
| `Char` | `Char32` 的别名，默认的 Unicode 字符 |

## 处理字符

```toka
auto ch: char = 'A'
auto unicode: u32 = 0x4E16:u32
```

字符串系统在 `lib/core/str.tk` 和 `lib/core/utf8.tk` 中定义，用于 UTF-8 处理。
