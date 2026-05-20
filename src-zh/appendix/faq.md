# 常见问题

## 通用问题

**问：Toka 可以用于生产环境吗？**

Toka 目前处于 beta 阶段（v0.9.7）。适用于个人项目、原型开发和实验。1.0 版本的发布计划将以生产稳定性为核心目标。

**问：Toka 支持哪些平台？**

支持 Linux、macOS 和 Windows。LLVM 后端提供交叉编译能力。

**问：有包管理器吗？**

Toka 通过 `toka add` 内置了包管理器。官方库注册中心在 pkg.tokalang.dev。

## 语言设计

**问：Toka 与 Rust 有何不同？**

Toka 通过 Hat Principle 实现内存安全，而不是 Borrow Checker。这意味着没有生命周期标注——只需简单的帽子（`^`）标记，使所有权在语法中可见。

**问：Toka 有垃圾回收器吗？**

没有。内存通过 PAL Checker 在编译时管理，没有运行时 GC 开销。

**问：Toka 与 C 库兼容吗？**

是的。Toka 有原生的 C 互操作能力，没有 FFI 开销。你可以直接调用 C 函数。

## 学习

**问：我需要先学 C 或 Rust 才能学 Toka 吗？**

完全不需要。Toka 的语法简洁，类似 Go。如果你会任何编程语言，一个周末就能学会 Toka。

**问：哪里可以找到更多示例？**

可以查看 Toka 仓库中的 `examples/` 目录，以及社区库集合 `tokalibs`。

**问：有社区或论坛吗？**

欢迎加入 GitHub Discussions 上的 Toka 社区：github.com/tokalang/toka。

## 技术问题

**问：Toka 有多快？**

Toka 的编译速度约为每秒 80,000 行代码（Clang 后端），并通过 LLVM 20 生成优化的原生二进制文件。性能与等效的 C 代码相当。

**问：Toka 的二进制文件有多大？**

一个最小的 HTTP 服务器二进制文件约为 250 KB——无运行时、无虚拟机，只有原生代码。

**问：Toka 支持多线程吗？**

是的。Toka 为并发编程提供了 tasks、MPSC 通道、原子操作和互斥锁（mutex）。
