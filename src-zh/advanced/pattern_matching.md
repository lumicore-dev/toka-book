# 模式匹配

模式匹配是 Toka 最富有表现力的特性之一，允许你简洁地解构和匹配值。

## 基本 Match

```toka
fn describe(n: i32) -> cstring {
    return match n {
        0 => pass "零"
        1 => pass "一"
        _ => pass "许多"
    }
}
```

`_` 通配符匹配任意值——它是默认情况。

## 范围模式

对范围进行匹配：

```toka
auto score = 85
auto grade = match score {
        auto s if s >= 0 && s < 60 => { pass "不及格" }
        auto s if s >= 60 && s < 70 => { pass "D" }
        auto s if s >= 70 && s < 80 => { pass "C" }
        auto s if s >= 80 && s < 90 => { pass "B" }
        auto s if s >= 90 && s <= 100 => { pass "A" }
        _ => { pass "无效分数" }
}
```

使用 `..` 表示排他范围，`..=` 表示包含范围。

## 匹配 Option

```toka
import std/io::println
import core/option::Option

fn main() {
    auto id = 1
    auto opt: Option<view_str> = Option<view_str>::None()
    match opt {
        auto Option::Some(&name) => { println("找到：{}", name) }
        auto Option::None() => { println("未找到用户") }
    }
}
```

## 匹配 Result

```toka
import std/io::println
import core/result::Result

fn main() {
    auto res: Result<f32, view_str> = Result<f32, view_str>::Ok(5.0)
    match res {
        auto Result::Ok(value) => { println("结果：{}", value) }
        auto Result::Err(&msg) => { println("错误：{}", msg) }
    }
}
```

## 解构 Shape

对自定义 shape 进行模式匹配：

```toka
import std/io::println

pub shape Point(x: i32, y: i32)

fn origin(p: Point) {
    match p {
        auto pt if pt.x == 0 && pt.y == 0 => { println("在原点上") }
        auto pt if pt.y == 0 => { println("在 X 轴上") }
        auto pt if pt.x == 0 => { println("在 Y 轴上") }
        _ => { println("在其他位置") }
    }
}
```

## Match 作为表达式

Match 返回一个值，因此可以在赋值中使用：

```toka
auto score = 85
auto grade = match score {
    auto s if s >= 90 && s <= 100 => pass "A"
    auto s if s >= 80 && s < 90 => pass "B"
    auto s if s >= 70 && s < 80 => pass "C"
    auto s if s >= 60 && s < 70 => pass "D"
    _ => pass "F"
}
```

## 类型匹配

对值的类型进行匹配：

```toka
import std/io::println

fn inspect<T>(value: T) -> cstring {
    return match value {
        i32 => pass "这是一个整数"
        view_str => pass "这是一个字符串"
        bool => pass "这是一个布尔值"
        _ => pass "未知类型"
    }
}
```
