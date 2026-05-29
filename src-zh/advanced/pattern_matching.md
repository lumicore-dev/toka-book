# 模式匹配

模式匹配是 Toka 最富有表现力的特性之一，允许你简洁地解构和匹配值。

## 基本 Match

```toka
fn describe(n: i32) -> str {
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

请注意，Toka 不支持原生范围模式匹配（如 0..10）。相反，应使用带有 if 守卫表达式的变量来进行范围检查。

## 匹配 Option

```toka
import std/io::println
import core/option::Option

fn main() -> i32 {
    auto id = 1
    auto opt: Option<str> = Option<str>::None
    match opt {
        auto Option<str>::Some(&name) => { println("找到：{}", name) }
        auto Option<str>::None => { println("未找到用户") }
    }
    return 0
}
```

## 匹配 Result

```toka
import std/io::println
import core/result::Result

fn main() -> i32 {
    auto res: Result<f32, str> = Result<f32, str>::Ok(5.0)
    match res {
        auto Result<f32, str>::Ok(value) => { println("结果：{}", value) }
        auto Result<f32, str>::Err(&msg) => { println("错误：{}", msg) }
    }
    return 0
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

## 不支持基于类型的匹配

Toka 不支持直接对类型进行模式匹配（例如在 `match` 表达式内部书写 `i32 => ...` 或 `str => ...`）。在分支中若使用不带标准语法的类型名称，将被视为一个新的变量绑定模式（Variable Pattern），这会匹配任意值并遮蔽其他分支，从而导致编译错误或不可达分支。
