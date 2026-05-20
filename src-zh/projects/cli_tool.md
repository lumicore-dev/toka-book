# 用 toka-cli 构建 CLI 工具

在这个项目中，我们将使用 Toka 和 `toka-cli` 参数解析库构建一个命令行工具。

## 项目设置

创建一个新项目：

```bash
toka init my-cli
cd my-cli
```

使用 Toka 包管理器添加 `toka-cli` 依赖：

```bash
toka add toka-cli
```

这会自动更新你的 `package.tk` 依赖配置。

## 定义参数

```tokalang
import cli::{App, Arg, Command}

import std/string::String

fn main() -> i32 {
    auto app = App::new("my-cli")
        .version("1.0.0")
        .about("一个用 Toka 构建的示例 CLI 工具")
        
    auto name = app.option("-n", "--name")
        .help("你的名字")
        .required(true)
        
    auto verbose = app.flag("-v", "--verbose")
        .help("启用详细输出")
        
    app.parse_args()
    
    auto who = name.value().unwrap_or(String::from("World"))
    println("Hello, {}!", who)
    
    if verbose.present() {
        println("[Verbose] 正在以调试模式运行")
    }
    
    return 0
}
```

## 运行

```bash
toka run -- -n Toka
# 输出：Hello, Toka!

toka run -- -n Toka -v
# 输出：Hello, Toka!
# [Verbose] 正在以调试模式运行
```

## 子命令

使用子命令构建更复杂的 CLI：

```tokalang
auto cmd = app.subcommand("serve")
    .about("启动服务器")
    .option("-p", "--port")
    .help("端口号")

match cmd.executed() {
    true => start_server(cmd),
    false => app.print_help()
}
```
