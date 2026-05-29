# 函数

在 Toka 中，函数是一等公民。它们遵循简洁、可读的语法。

## 基本函数语法

```toka
fn add(x: i32, y: i32) -> i32 {
    return x + y
}
```

- `fn` 关键字声明一个函数
- 参数使用 `name: Type` 语法进行类型标注
- 返回类型跟在 `->` 之后
- 函数体用 `{ }` 包裹

## 入口点：`main`

每个 Toka 可执行文件都需要一个返回退出码的 `main` 函数：

```toka
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

返回 `0` 表示成功，非零表示错误。

## 多个参数

函数可以接受多个不同类型的参数：

```toka
fn greet(name: str, age: i32, formal: bool) -> str {
    if formal {
        return "Good day"
    }
    return "Hey"
}
```

## 可变参数

参数默认不可变。在声明时使用 `#` 标记来表示可变参数。在函数体内部，访问参数时不需要 `#`：

```toka
fn increment(x#: i32) {
    x = x + 1       // 函数体内部不需要 #
}
```

## 无返回值的函数

如果函数不返回任何值，省略 `->`：

```toka
import std/io::println

fn log_message(msg: str) {
    println("{}", msg)
}
```

## 方法语法

函数可以通过 `impl` 块附加到类型上：

```toka
pub shape Number(val: i32)

impl Number {
    pub fn double(self) -> i32 {
        return self.val * 2
    }
}

fn main() -> i32 {
    auto result = Number(val = 5).double()  // result = 10
    return 0
}
```
