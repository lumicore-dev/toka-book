# 字符串

Toka 1.0 构建了极其严密、高性能的**太极三轨文本与字节流系统**。它将“文本观察视角”与“物理二进制操纵”在类型系统上进行了正交解耦，同时消除了二义性的隐式语境推导，为系统开发提供极致的内存安全与性能。

---

## 🏛️ 一、 字符串与视图类型

Toka 中的字符串分为拥有堆内存所有权的动态容器，以及零拷贝的借用视图。由于内置于 Prelude 零导入作用域，你**无需任何 `import` 即可直接使用**这些类型：

| 类型 | 物理内存几何 / LLVM 表达 | 内存所有权 | 描述 |
| :--- | :--- | :--- | :--- |
| `str` | 胖指针 `{ i8* 首地址, i64 长度 }` | **无所有权（借用轨）** | UTF-8 只读文本视图。不支持 `\0` 保证。 |
| `string` | 堆容器 `{ *#buf, usize, usize }` | **独占所有权（拥有轨）** | 堆上分配的可变 UTF-8 字符串，强制以 `\0` 封口。 |
| `bytes` | 胖指针 `{ i8* 首地址, i64 长度 }` | **无所有权（借用轨）** | 只读二进制字节流视图。 |
| `cstr` | 单指针 `i8*`（零开销 Shape） | **FFI 借用轨** | C 风格只读单指针，100% 静态保证以 `\0` 结尾。 |

---

## ⚖️ 二、 三轨宇宙终极正交转换矩阵

Toka 恪守**【开销诚实命名法典】**：
*   **`as_xxx` 家族**：表示**零开销、零分配**的视图借用转换，其借出视图生命周期受编译期严格镇守，死死绑定于宿主。
*   **`to_xxx` 家族**：表示**涉及物理拷贝或堆分配**的所有权转换，明确昭示所有权与物理分配的分离。

| 源类型 $\rightarrow$ 目标类型 | `str` (安全胖切片) | `string` (堆所有权) | `cstr` (\0 借用) | `*char` (FFI 裸指针) |
| :--- | :--- | :--- | :--- | :--- |
| **`"..."` 字面量** | 默认 ResolvedType (0开销) | **`.to_string()`**<br>($O(N)$ 堆分配) | **`.as_cstr()`**<br>($O(1)$ 零分配借出) | FFI 边界自动退化<br>(0摩擦直入) |
| **`str`** | —— | **`.to_string()`**<br>($O(N)$ 堆分配) | **`.to_string().as_cstr()`**<br>($O(N)$ 堆拷贝封口) | 禁止隐式！<br>显式 `.to_string().c_str()` |
| **`string`** | **`.as_str()`**<br>($O(1)$ 零分配) | —— | **`.as_cstr()`**<br>($O(1)$ 零分配) | **`.c_str()`**<br>($O(1)$ 零分配首地址) |
| **`cstr`** | **`.as_str()`**<br>($O(1)$ 零分配) | **`.to_string()`**<br>($O(N)$ 堆分配) | —— | FFI 边界自动退化<br>(0摩擦直入) |

---

## 🚀 三、 核心流转与实战

### 1. 默认的零拷贝字面量
在 Toka 中，常规双引号 `"..."` 字面量在没有调用碰撞时，默认推导为静态只读的 `str`：

```toka
import std/io::println

fn main() -> i32 {
    // 默认推导为 str 类型，常驻 .rodata 静态段，100% 静态安全
    auto greeting: str = "Hello, Toka!"
    println("Greeting: {}", greeting)
    return 0
}
```

### 2. 动态 string 构建与拼接
`string` 是独占的动态堆容器。你可以通过 `push_str` 修改它。

```toka
import std/io::println

fn main() -> i32 {
    // 零导入 prelude 直接调用 string::from
    auto full# = string::from("你好，")
    full#.push_str("世界！")
    
    println("{}", full.as_str()) // 零开销借出 str 视图打印
    return 0
}
```

### 3. str 与 bytes 的双轨视角转换
`str` 负责高级文本操作，而 `bytes` 负责底层的二进制和字节索引：

```toka
import std/io::println
import core/option::Option
import core/result::Result

fn main() -> i32 {
    auto s: str = "Toka 1.0"
    
    // 1. O(1) 零开销降级为 bytes 视图
    auto b = s.bytes()
    
    // 2. 边界检查的 O(1) 字节索引
    auto b0 = b.at(0:usize)
    if b0.is_some() {
        println("Byte 0: {}", b0.unwrap() as i64) // 84 ('T')
    }
    
    // 3. 校验并升级回 str
    auto res = b.try_to_str()
    if res.is_ok() {
        auto s_back = res.unwrap()
        println("Recovered: {}", s_back)
    }
    return 0
}
```

---

## 🛡️ 四、 FFI 物理拷贝隔离带

由于动态 `str` 切片并不保证以 `\0` 结尾，为绝对防范跨越 C-FFI 边界时发生内存越界，**`str` 被严格禁止隐式退化为 `cstr` 或裸指针**。
如果动态 `str` 确实需要跨越 FFI，必须显式调用 `to_string()` 在堆上创建带有 `\0` 尾符的临时副本：

```toka
// 声明 FFI 接口
pub fn puts(s: cstr)

fn main() -> i32 {
    auto my_str: str = "Hello C-FFI"
    
    // 显式声明物理拷贝和 \0 封口以确保安全
    auto temp_c = my_str.to_string()
    unsafe {
        puts(temp_c.as_cstr())
    }
    return 0
}
```
