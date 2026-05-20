# 项目结构

理解 Toka 的项目结构有助于你有效地组织代码。

## 单文件程序

对于简单的程序，一个 `.tk` 文件就足够了：

```toka
// hello.tk
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

运行方式：`toka run hello.tk`

## 多文件项目

对于大型项目，使用 `toka init` 初始化一个项目。这会创建一个 `package.tk` 文件：

```tokalang
// package.tk
pub const PACKAGE = (
    name = "my_project",
    version = "0.1.0",
    dependencies = ()
)
```

目录结构：

```
my-project/
├── package.tk      # 项目配置和依赖管理
├── src/
│   ├── main.tk     # 入口文件
│   ├── utils.tk    # 工具函数
│   └── models.tk   # 数据模型
└── lib/
    ├── config.tk   # 库配置
    └── helpers.tk  # 辅助函数
```

## 添加依赖

你可以通过 `toka add` 命令轻松添加第三方包到项目中：

```bash
toka add toka_ink
```

该命令会自动查询 Toka Registry，将包解析为其对应的 GitHub 仓库和版本标签，并更新你的 `package.tk`：

```tokalang
// package.tk
pub const PACKAGE = (
    name = "my_project",
    version = "0.1.0",
    dependencies = (
        toka_ink = "github.com/lumicore-dev/toka_ink:v0.2.1",
    )
)
```

在执行 `toka build` 时，编译器会自动将这些依赖拉取到 `.toka/packages` 目录中。

## 库项目

对于可复用的库项目，`toka new my-lib --lib` 会生成一个不含 `main.tk` 可执行入口点的库结构。`package.tk` 的配置格式保持一致。

## 导入系统

```tokalang
// 从标准库导入
import std/io::println

// 从项目源码导入
import src/utils::{helper_fn}

// 从本地库导入
import lib/config::{Config}

// 使用别名导入
import std/time as time_lib
```

## 构建输出

运行 `toka run` 或 `tokac build` 会生成：

```
my-project/
└── target/
    ├── debug/
    │   └── my-project    # 调试版二进制
    └── release/
        └── my-project    # 发布版二进制（添加 --release 参数）
```
