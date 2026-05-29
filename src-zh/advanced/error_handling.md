# 错误处理

Toka 通过 `Result` 和 `Option` 类型提供类型安全错误处理能力。这种基于代数数据类型（ADT）的错误处理模型可追溯到 ML 语言家族（如 Standard ML、OCaml）以及 Haskell，后由 Rust 引入现代系统级编程中。Toka 采用这一模型，并通过用于错误传播的 `!` 操作符，使其更加简洁直观。

## Option 类型

使用 `Option` 表示可能存在或不存在的值：

```toka
import core/option::{Option}
import std/io::println

fn find_user(id: i32) -> Option<string> {
    if id == 1 {
        return Option<string>::Some(string::from("Alice"))
    }
    return Option<string>::None
}

fn main() -> i32 {
    auto result = find_user(1)
    match result {
        auto Option<string>::Some(&name) => println("找到：{}", name)
        auto Option<string>::None => println("未找到用户")
    }
    return 0
}
```

## Result 类型

使用 `Result` 表示可能成功或失败的操作：

```toka
import core/result::{Result}

fn divide(a: f64, b: f64) -> Result<f64, string> {
    if b == 0.0 {
        return Result<f64, string>::Err(string::from("除数不能为零"))
    }
    return Result<f64, string>::Ok(a / b)
}
```

Result 类型有两个泛型参数：
- `T` — 成功值的类型
- `E` — 错误值的类型

## 对 Result 进行模式匹配

```toka
import core/result::{Result}
import std/io::println

fn divide(a: f64, b: f64) -> Result<f64, string> {
    if b == 0.0 {
        return Result<f64, string>::Err(string::from("除数不能为零"))
    }
    return Result<f64, string>::Ok(a / b)
}

fn main() -> i32 {
    match divide(10.0, 2.0) {
        auto Result<f64, string>::Ok(value) => println("结果：{}", value)
        auto Result<f64, string>::Err(&msg) => println("错误：{}", msg)
    }
    return 0
}
```

## 使用 `!` 进行短路传播

使用 `!` 运算符自动传播错误：

```toka
import core/result::{Result}

fn read_file(path: string) -> Result<string, string> {
    return Result<string, string>::Ok(path)
}

fn parse(content: string) -> Result<string, string> {
    return Result<string, string>::Ok(content)
}

fn format_result(parsed: string) -> string {
    return parsed
}

fn process_file(path: string) -> Result<string, string> {
    auto content = read_file(path)!  // 出错时提前返回
    auto parsed = parse(content)!    // 同上
    return Result<string, string>::Ok(format_result(parsed))
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

pub shape Config()

pub shape ParseError(
    line: i32,
    col: i32,
    message: string
)

fn parse_config(text: string) -> Result<Config, ParseError> {
    if text.len() == 0 {
        return Result<Config, ParseError>::Err(ParseError(line = 0, col = 0, message = string::from("空输入")))
    }
    return Result<Config, ParseError>::Ok(Config())
}
```
