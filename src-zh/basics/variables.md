# 变量与类型

Toka 是一门具有丰富类型系统的静态类型语言。让我们来探索变量和类型是如何工作的。

## 变量声明

使用 `auto` 关键字声明变量：

```toka
auto x = 10          // i32（默认整数类型）
auto y = 3.14        // f64（默认浮点类型）
auto name = "Toka"   // str（字符串切片）
```

## 命名规则与连字符（-）消歧

Toka 对连字符（`-`）字符有一套严格而优雅的规则，在实现模块化命名便利性的同时，确保数学语法没有歧义。

### 包名与命名空间

包名和导入的命名空间**可以**自由使用连字符。这在导入嵌套文件夹或遵循 kebab-case 目录结构的外部库时很常见。你可以导入它们并使用连字符命名空间调用函数：

```tokalang
import std/io::println

// 包名和命名空间可以包含连字符（但在模块标识符中建议使用下划线对齐真实标准）
import ./nested/toka_ink as toka_ink

fn main() -> i32 {
    toka_ink::render()
    return 0
}
```

### 变量与函数

普通变量名、常量名、shape/结构体名和函数定义**不能**包含连字符。它们必须遵循标准的字母数字/下划线命名规则（如 `camelCase` 或 `snake_case`）：

```tokalang
fn main() -> i32 {
    auto max_size = 1024       // OK（snake_case）
    auto maxSize = 1024        // OK（camelCase）
    // auto max-size = 1024    // 错误：变量名中不允许使用连字符
    return 0
}
```

### 无歧义的减法运算

由于连字符在变量名和函数名中是严格禁止的，减法运算符（`-`）完全没有歧义。不带空格的普通减法表达式**始终**能被 100% 正确解析：

```toka
import std/io::println

fn main() -> i32 {
    auto sub1 = 10
    auto sub2 = 3
    
    // 不需要空格！始终被解析为减法
    auto result = sub1-sub2    // OK：解析为 sub1 - sub2
    auto value = 10-3          // OK：解析为 10 - 3
    println("Result: {}, Value: {}", result, value)
    return 0
}
```

## 显式类型标注

你可以使用冒号显式指定类型：

```toka
auto x: u64 = 10
auto y: f32 = 3.14:f32
auto flag: bool = true
```

## 基本类型

Toka 的类型系统在 `lib/core/types.tk` 中定义，包含：

| 类型 | 描述 | 大小 |
|------|------|------|
| `i8`, `i16`, `i32`, `i64` | 有符号整数 | 1-8 字节 |
| `u8`, `u16`, `u32`, `u64` | 无符号整数 | 1-8 字节 |
| `f32`, `f64` | 浮点数（IEEE 754） | 4-8 字节 |
| `bool` | 布尔值（`true` / `false`） | 1 字节 |
| `char` | C 风格字符（`i8`） | 1 字节 |
| `byte` | 原始字节（`u8`） | 1 字节 |

## 平台相关类型

```toka
pub alias usize = u64   // 指针大小的无符号整数
pub alias isize = i64   // 指针大小的有符号整数
```

在 64 位系统上，`usize` 是 `u64`；在 32 位系统上，它会是 `u32`。

## 类型别名

Toka 支持两种类型别名：

**弱别名（Weak alias）** — 语义上完全相同，对编译器透明：

```toka
pub alias usize = u64
```

**强类型（Strong type）** — 内存布局相同，但需要显式转换：

```toka
pub type Addr = u64
pub type OAddr = u64
```

## 常量

使用 `const` 声明编译时常量值：

```toka
pub const MAX_SIZE = 1024:u64
pub const NAME = "Toka"
```

常量在编译时内联展开——不分配内存，不能获取其地址。

## 可变性

变量**默认不可变**。使用 `#` 后缀使其可变。`#` 标记仅在两个地方需要：

1. **声明时** — 标记变量为可变
2. **调用可变方法前** — 在变量上出示守卫

```toka
import std/io::println

pub shape List(data: i32)
impl List {
    pub fn sort(self#) {}
    pub fn push(self#, val: i32) {}
}

fn main() -> i32 {
    auto y = List(data = 10)  // 不可变
    auto x# = List(data = 10) // 可变 — 声明时加 #

    // 读取和赋值不需要 #
    x = List(data = 20)       // OK — 普通赋值
    println("{}", x.data)     // OK — 普通读取

    // 调用可变方法需要在变量上加 #
    x#.sort()                 // OK — 调用 .method() 之前在变量上加 #
    x#.push(5)                // OK
    return 0
}
```

这是 Toka **属性标记系统（Attribute Token System）** 的一个例子——`#` 后缀表示灵魂的可变性，在声明变量或调用其可变方法时放在变量上。
