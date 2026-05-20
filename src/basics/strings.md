# Strings

Toka provides a flexible string system designed for both systems programming and text processing.

## String Types

Toka defines several string types for different encoding needs:

| Type | Description |
|------|-------------|
| `str` | String slice (like Rust `&str` or C++ `string_view`) — immutable, borrowed |
| `String` | Owned mutable string (UTF-8 by default, defined in `std/string::String`) |

## String Literals

Double-quoted strings are the standard:

```toka
auto greeting = "Hello, Toka!"
auto name = "World"
```

## Escape Sequences

Toka supports `\x` escape sequences in string literals, making ANSI color codes clean:

```toka
import std/io::println

auto red = "\x1b[31m"
auto green = "\x1b[32m"
auto reset = "\x1b[0m"

println("{}{}Success!{}", green, "Build complete", reset)
```

## String Interpolation

Use `{}` placeholders with `println` for clean formatting:

```toka
import std/io::println

auto name = "Toka"
auto version = "0.9.6"
println("Welcome to {} version {}!", name, version)
```

## String Concatenation

Strings can be concatenated with `+`:

```toka
import std/string::String

auto full# = String::from("Hello, ")
full#.push_str("World!")
```

## Formatting and Printing

You can print other types easily using placeholders without manual conversion:

```toka
import std/io::println

auto n = 42
println("The answer is {}", n)
```

## Character Types

| Type | Description |
|------|-------------|
| `char` | Single byte character (`i8`), C-style |
| `Char16` | UTF-16 code point (`u16`) |
| `Char32` | UTF-32 code point (`u32`) |
| `Char` | Alias for `Char32`, the default Unicode character |

## Working with Characters

```toka
auto ch: char = 'A'
auto unicode: u32 = 0x4E16:u32
```

The string system is defined in `lib/core/str.tk` and `lib/core/utf8.tk` for UTF-8 handling.
