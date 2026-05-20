# 灵魂与身份（Soul & Identity）

Toka 的 Hat Principle 引入了指针的**手柄（handle）**（容器）与其**灵魂（soul）**（底层数据）之间的清晰区分。理解这一分离是掌握 Toka 内存模型的关键。

## 手柄 vs. 灵魂

Toka 中的每个指针都有两个方面：

- **手柄（帽子）**：*带有*标记符号的标识符（`^p`, `*p`, `~p`）。表示指针容器本身——保存地址的内存位置。
- **灵魂（数据）**：*不带*标记符号的标识符（`p`）。表示被指向的底层值。

## 隐式解引用

Toka 的杀手级特性是**隐式解引用**：你永远不需要 `*` 或 `->` 运算符来访问指针背后的数据。直接使用灵魂即可：

```toka
{{#include ../../examples/soul_identity.tk:handle_soul}}
```

相比于 C 语言的（`p->x = 30`）或 Rust 的（`(*p).x = 30`），这是一个巨大的人体工程学改进。

## 三种帽子

每种帽子标记符号携带不同的所有权语义：

### `*` — 原始指针
底层的不安全指针。需要 `unsafe` 关键字或显式 `alloc`：

```toka
{{#include ../../examples/soul_identity.tk:raw_pointer}}
```

### `^` — 独占指针
对堆分配资源的独占所有权。使用 `new` 创建：

```toka
{{#include ../../examples/soul_identity.tk:unique_pointer}}
```

### `~` — 共享指针
通过指针帽子形态实现的基于引用计数的共享所有权。

```toka
auto ~s1# = new Point(x = 1000, y = 2000, z = 0)
auto ~s2# = ~s1 // 共享拷贝（引用计数增加）
s2.x = 3000     // 直接修改底层数据（灵魂）
```

## 身份与地址

要获取局部变量的原始内存地址，使用 `*(expr)` 语法：

```toka
{{#include ../../examples/soul_identity.tk:address_of}}
```

帽子（`^`）并**不**表示"地址"。它特指独占指针容器。
