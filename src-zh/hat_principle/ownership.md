# 所有权与帽子

Toka 中的所有权由 Hat Principle 支配。每种帽子标记符号通过语法直接传达不同的所有权模型。

## 四种所有权模型

Toka 定义了四种指针类型，每种具有不同的所有权语义：

### `*` — 原始指针（不安全）

原始指针需要显式的 `unsafe` 或 `alloc` 来创建和管理：

```toka
{{#include ../../examples/ownership.tk:raw_ptr}}
```

原始指针用于与 C 代码交互或实现底层数据结构。

### `^` — 独占指针（移动语义）

独占指针提供独占所有权。任何时刻只能有一个 `^` 指向给定的资源。所有权通过**移动**来转移：

```toka
{{#include ../../examples/ownership.tk:unique_ptr}}
```

`^` 标记的作用类似于 Rust 的 `Box` 或 C++ 的 `std::unique_ptr`。当独占指针离开作用域时，其资源会自动释放。

### `~` — 共享指针（引用计数）

共享指针允许多个所有者通过引用计数共享所有权：

```toka
auto ~s1# = new Point(x = 1000, y = 2000, z = 0)
auto ~s2# = ~s1  // 共享拷贝（引用计数增加）
s2.x = 3000      // 直接修改底层数据（灵魂）
```

当最后一个 `~` 引用离开作用域时，资源被释放。

### `&` — 借用指针（引用语义）

借用指针表示对其他值的引用，不获取其所有权。它们允许临时、受检地访问数据：

```toka
auto &y = &(x)   // 指向 x 灵魂的局部借用指针
```

## 移动 vs. 拷贝

**简单类型**（如 `i32`、`f64`、`bool`）默认**拷贝**：

```toka
{{#include ../../examples/ownership.tk:move_copy}}
```

**复杂类型**（如 `string`、`Vec`、自定义 `shape` 类型）默认**移动**。在 Toka 中，复杂类型的赋值将所有权从源转移到目标：

```toka
// 复杂类型使用移动语义：
//   auto moved = original  — 所有权转移给 `moved`
//   `original` 在移动后不再有效
```

## 借用（原位捕获）

Toka 默认对函数参数使用**隐式借用**。标准借用不需要特殊的标记符号：

```toka
{{#include ../../examples/ownership.tk:borrow_func}}
```

对于**可变访问**，在变量声明上使用 `#`。注意 `#` 仅限于声明时使用，不能在调用点使用：

```toka
{{#include ../../examples/ownership.tk:mutable_local}}
```

## 使用 `&` 进行显式局部借用

`&` 标记符号用于**显式声明局部借用指针**或返回引用时：

```toka
shape Container(val: i32)
fn borrow_example(c: Container) -> &i32 <- c {
    return &(c.val)
}
fn main() -> i32 {
    auto c = Container(val = 10)
    auto &y = borrow_example(c)
    return 0
}
```

### 生命周期依赖标注

在上面的例子中，语法 `-> &i32 <- c` 引入了 Toka 的**生命周期依赖标注（Lifetime Dependency Annotation）**。

当一个函数返回一个派生自其参数的引用时，PAL Checker 要求你显式声明这种关系。`<- c` 标记告诉编译器：*"返回的引用严格绑定到 `c` 的生命周期"*。

如果你省略此标注，Toka 会主动阻止编译（`error[E0454]`），以防止意外的悬垂指针。这实现了与 Rust 的生命周期参数（`<'a>`）相同的严格内存安全保证，但语法更轻量、更直观。

> **注意：** 此关系也可以使用 Toka 的 **effects** 标注风格来表达。对高级借用检查引用的设计正在持续演进中。

## PAL Checker 的实际运作

PAL Checker 在编译时验证：

1. **移动后不可使用** — `^` 值在所有权转移后不能访问
2. **无悬垂引用** — 借用的引用不能超过被借用的值的生命周期
3. **无双重释放** — 每个值恰好释放一次
4. **无数据竞争** — 可变访问是独占的；共享访问是只读的

所有这些都**无需任何生命周期标注**。Hat Principle 使所有权在语法本身中变得可见。
