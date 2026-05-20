# 正则引擎

使用 `toka-regex` 库构建一个正则表达式引擎，它实现了 Thompson NFA（非确定性有限自动机）。

## 什么是 Thompson NFA？

Thompson NFA 将正则表达式模式编译成一个状态机，可以高效地匹配字符串。它的工作方式如下：

1. **编译** — 将模式转换成一个状态图
2. **模拟** — 同时模拟所有可能的路径
3. **接受** — 如果任意路径到达接受状态，则匹配成功

## 基本用法

```tokalang
import regex::{Regex}

import std/io::println
import std/string::String

fn example() {
    auto re = Regex::new("hello|world")
    
    if re.test(String::from("hello world")) {
        println("找到匹配！")
    }
}
```

## 模式语法

该引擎支持标准的正则表达式模式：

| 模式 | 匹配内容 |
|------|---------|
| `abc` | 文字字符串 "abc" |
| `a|b` | "a" 或 "b" |
| `a*` | 零个或多个 "a" |
| `a+` | 一个或多个 "a" |
| `a?` | 可选的 "a"（零个或一个） |
| `[abc]` | 字符类：a、b 或 c |
| `[^abc]` | 否定字符类 |
| `.` | 任意单个字符 |

## 匹配

```tokalang
import std/io::println
import std/string::String
import core/option::Option

fn example() {
    auto re = Regex::new("\\d+")  // 一个或多个数字
    
    match re.find(String::from("订单 #42")) {
        auto Option::Some(m) => println("找到：{}", m.text),
        auto Option::None => println("未匹配")
    }
}
```

## 替换

```tokalang
import std/io::println
import std/string::String

fn example() {
    auto re = Regex::new("\\s+")
    auto result = re.replace(String::from("hello    world"), String::from(" "))
    println("{}", result)  // "hello world"
}
```

## 引擎架构

正则引擎完全用纯 Toka 构建：

- **模式编译器** — 将正则字符串解析为 NFA 状态
- **状态模拟器** — 对输入文本运行 NFA
- **匹配器** — 处理捕获组和位置追踪

这使得它成为展示 Toka 如何使用清晰、安全的代码实现非平凡算法的一个很好的例子。
