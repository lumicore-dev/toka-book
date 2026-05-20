# 用 stdx/cli/flag 构建 CLI 工具

在这个项目中，我们将使用 Toka 以及标准的 `stdx/cli/flag` 参数解析库来构建一个命令行工具。

## 项目设置

创建一个新项目：

```bash
toka init my-cli
cd my-cli
```

由于 `stdx/cli/flag` 是 Toka 中的标准库扩展，你不需要通过包管理器添加任何外部依赖。它开箱即用！

## 定义参数

```tokalang
import stdx/cli/flag::{Parser, ParsedArgs}
import std/env
import std/string::String
import std/io

fn main() -> i32 {
    // Parser::new 接收程序名称和简短的描述
    auto parser# = Parser::new(String::from("my-cli"), String::from("一个用 Toka 构建的示例 CLI 工具"))
    
    // 向解析器中添加选项
    parser#.add_string(String::from("name"), 110:char, String::from("World"), String::from("你的名字"))
    parser#.add_bool(String::from("verbose"), 118:char, false, String::from("启用详细输出"))

    auto args = env::args()
    auto res = parser.parse(args)
    match res {
        auto Result<ParsedArgs, String>::Ok(parsed) => {
            auto who = parsed.get_string(String::from("name"))
            io::println("Hello, %s!", who.c_str())
            
            if parsed.get_bool(String::from("verbose")) {
                io::println("[Verbose] 正在以调试模式运行")
            }
        }
        auto Result<ParsedArgs, String>::Err(&err) => {
            if err == String::from("help requested") {
                parser.print_help()
                return 0
            }
            io::println("Error: %s", err.c_str())
            return 1
        }
    }
    return 0
}
```

## 运行

```bash
toka run src/main.tk -- -n Toka
# 输出：Hello, Toka!

toka run src/main.tk -- -n Toka -v
# 输出：Hello, Toka!
# [Verbose] 正在以调试模式运行
```

## 高级参数处理

Toka 目前的 `stdx/cli/flag` 库提供了基本的选项和标志解析，支持 `bool`、`i64`、`f64` 和 `String` 等类型。

定位参数（Positional arguments）会被自动捕获，并可以通过已解析参数的 `positionals()` 方法来获取：

```tokalang
auto pos_args = parsed.positionals()
// pos_args 是一个 Vec<String>，包含所有不匹配任何标志或选项的参数
```

对于需要嵌套子命令（如 `git status` 或 `docker run`）的复杂命令行界面，你可以手动对 `pos_args` 进行模式匹配，以将执行分发给不同的解析器配置。
