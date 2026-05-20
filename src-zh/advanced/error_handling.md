# 错误处理

Toka 通过 Result 和 Option 类型提供强大的错误处理能力，灵感来自 Rust，但语法更简洁。

## Option 类型

使用 `Option` 表示可能存在或不存在的值：

```toka
import core/option::{Option}
import std/string::String
import std/io::println

fn find_user(id: i32) -> Option<String> {
    if id == 1 {
        return Option<String>::Some(String::from("Alice"))
    }
    return Option<String>::None
}

fn main() -> i32 {
    auto result = find_user(1)
    match result {
        auto Option::Some(&name) => println("找到：{}", name)
        auto Option::None => println("未找到用户")
    }
    return 0
}
```

## Result 类型

使用 `Result` 表示可能成功或失败的操作：

```toka
import core/result::{Result}
import std/string::String

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Result<f64, String>::Err(String::from("除数不能为零"))
    }
    return Result<f64, String>::Ok(a / b)
}
```

Result 类型有两个泛型参数：
- `T` — 成功值的类型
- `E` — 错误值的类型

## 对 Result 进行模式匹配

```toka
import core/result::{Result}
import std/string::String
import std/io::println

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Result<f64, String>::Err(String::from("除数不能为零"))
    }
    return Result<f64, String>::Ok(a / b)
}

fn main() -> i32 {
    match divide(10.0, 2.0) {
        auto Result::Ok(value) => println("结果：{}", value)
        auto Result::Err(&msg) => println("错误：{}", msg)
    }
    return 0
}
```

## 使用 `!` 进行短路传播

使用 `!` 运算符自动传播错误：

```toka
import core/result::{Result}
import std/string::String

fn read_file(path: String) -> Result<String, String> {
    return Result<String, String>::Ok(path)
}

fn parse(content: String) -> Result<String, String> {
    return Result<String, String>::Ok(content)
}

fn format_result(parsed: String) -> String {
    return parsed
}

fn process_file(path: String) -> Result<String, String> {
    auto content = read_file(path)!  // 出错时提前返回
    auto parsed = parse(content)!    // 同上
    return Result<String, String>::Ok(format_result(parsed))
}
```

这比嵌套的 `match` 语句要干净得多。

## 使用 `or` 设置默认值

在出错时提供默认值：

```tokalang
auto value = parse_int("42").unwrap_or(0)  // 如果解析失败则使用 0
```

## 自定义错误类型

你可以定义结构化的错误类型：

```toka
import core/result::{Result}
import std/string::String

pub shape Config()

pub shape ParseError(
    line: i32,
    col: i32,
    message: String
)

fn parse_config(text: String) -> Result<Config, ParseError> {
    if text.len() == 0 {
        return Result<Config, ParseError>::Err(ParseError(line = 0, col = 0, message = String::from("空输入")))
    }
    return Result<Config, ParseError>::Ok(Config())
}
```
