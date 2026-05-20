# 迁移指南

从其他语言迁移到 Toka？以下是你需要了解的内容。

## 从 Rust 迁移

**所有权模型：**
- Rust：Borrow Checker + `'a` 生命周期
- Toka：Hat Principle + `^` 语法——无需生命周期标注

**错误处理：**
- Rust：`Result<T, E>` + `?` 操作符
- Toka：同样的 `Result<T, E>` + `?` 操作符

**模式匹配：**
- Rust：`match` 穷尽性检查
- Toka：同样的 `match` + 通配符 `_`

**Traits：**
- Rust：`trait Foo { fn bar(&self); }`
- Toka：`pub trait Foo { fn bar(self); }` + `@` 语法

## 从 Go 迁移

**错误处理：**
- Go：到处都是 `if err != nil`
- Toka：`Result/Option` + `?` 操作符——更简洁、更安全

**并发模型：**
- Go：Goroutines + 通道
- Toka：Tasks + MPSC 通道

**接口：**
- Go：隐式接口实现
- Toka：显式 trait 实现 + `@` 语法

## 从 C 迁移

**指针：**
- C：不安全的原始指针 `*`
- Toka：PAL Checker 追踪的帽子 `^`

**内存管理：**
- C：手动的 `malloc/free`
- Toka：自动的编译时内存管理

**构建系统：**
- C：Makefile / CMakeLists.txt
- Toka：package.tk（声明式）

## 从 Python 迁移

**动态 vs 静态：**
- Python：动态类型，运行时错误
- Toka：静态类型，编译时安全

**性能：**
- Python：解释执行，慢
- Toka：编译执行，原生速度（通过 LLVM）

## 快速语法参考

| 概念 | Toka |
|------|------|
| 变量 | `auto x = 10` |
| 可变变量 | `auto x# = 10` |
| 函数 | `fn add(a: i32, b: i32) -> i32` |
| If/else | `if cond { } else { }` |
| 循环 | `for i in 0..10 { }` |
| Match | `match val { 1 => "one", _ => "other" }` |
| 注释 | `// 单行注释` |
| 导入 | `import std/io::println` |
| 返回 | `return value` |
