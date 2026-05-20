# 控制流

Toka 提供了现代的控制流结构，帮助你构建清晰、富有表现力的程序。

## If / Else

```toka
import std/io::println

fn check_temp(temp: i32) {
    if temp > 35 {
        println("天气热！")
    } else if temp < 10 {
        println("天气冷！")
    } else {
        println("天气温和。")
    }
}
```

## While 循环

```toka
import std/io::println

auto count# = 0
while count < 5 {
    println("计数: {}", count)
    count = count + 1
}
```

## For 循环与区间

Toka 支持基于区间的迭代：

```toka
import std/io::println

for auto i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] {
    println("{}", i)
}
```

`0..10` 区间在末尾是排除的——它迭代 `0, 1, 2, ..., 9`。

## 遍历集合

```toka
import std/io::println

auto items = ["苹果", "香蕉", "樱桃"]
for auto item in items {
    println("{}", item)
}
```

带索引遍历：

```toka
import std/io::println

auto items2 = ["苹果", "香蕉", "樱桃"]
auto i# = 0
for auto item in items2 {
    println("{}: {}", i, item)
    i = i + 1
}
```

## Break 和 Continue

使用标准关键字控制循环流程：

```toka
import std/io::println

auto iter# = 0
while iter < 100 {
    if iter == 50 {
        break        // 完全退出循环
    }
    if iter % 2 == 0 {
        iter = iter + 1
        continue     // 跳到下一次迭代
    }
    println("{}", iter)  // 打印奇数: 1, 3, 5, ..., 49
    iter = iter + 1
}
```

## Match（模式匹配）

Toka 使用 `match` 表达式提供强大的模式匹配能力：

```toka
fn describe(value: i32) -> cstring {
    return match value {
        0 => pass "零"
        1 => pass "一"
        auto v if v >= 2 && v <= 10 => pass "较小"
        auto v if v >= 11 && v <= 100 => pass "中等"
        _ => pass "较大"
    }
}
```

`_` 通配符匹配任意值，作为默认情况使用。
