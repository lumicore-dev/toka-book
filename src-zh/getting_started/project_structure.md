# 项目结构

理解 Toka 的项目结构有助于你有效地组织代码。

## 单文件程序

对于快速原型开发或简单的脚本，一个单独的 `.tk` 文件就足够了。正如我们在 [Hello, Toka！](./hello_toka.md) 一节中所见，您可以将所有代码编写在一个文件（如 `hello.tk`）中，并通过以下命令立即执行它：

```bash
toka run hello.tk
```

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

## 🛠️ 增量构建与 Forge 引擎

自 Toka v0.9.8-03 起，官方引入了高吞吐量、并行的增量构建引擎 **`forge`**。它通过解析项目根目录下的 `build.tk` 拓扑依赖声明，实现多模块的并行增量编译，并将构建状态持久化存储于本地。

### 1. 声明构建配置 `build.tk`

在项目的根目录下创建一个 `build.tk` 文件，使用内置的 `build` 工具链来定义你的可执行文件或库：

```toka
import build::{Executable, run_build}

fn main() -> i32 {
    // 实例化一个构建工程，Executable::make(二进制名称, 入口源文件)
    // 由于 Executable::make 底层是对 C-FFI 的高层封装，我们需要显式传递 FFI 裸指针。
    auto proj# = Executable::make("my-project".as_cstr().raw_ptr(), "src/main.tk".as_cstr().raw_ptr())
    return run_build(proj)
}
```

### 2. 使用 Forge 开启增量并发构建

在终端中执行：

```bash
# 开启并行构建，-j 指定并发线程数（默认为 4）
forge -j 8
```

`forge` 引擎将自动：
* 扫描并解析 `src/main.tk` 及其所有 `import` 子模块的静态依赖拓扑 DAG。
* 比对源文件的最新修改时间，将文件状态索引保存于本地 `.forge_cache` 数据库中。
* **智能增量跳过**：对没有发生代码变更的源文件，利用增量缓存技术瞬时绕过，从而将大型多模块项目的自举编译耗时压缩到毫秒级别！

