# IO 与文件系统

Toka 的 IO 模块提供文件操作、控制台输出和流处理——全部通过简洁一致的 API 实现。

## 控制台输出

```toka
import std/io::{println, print}

println("Hello with newline")  // 打印并换行
print("No newline here")       // 打印不换行
```

## 读取文件

```toka
import std/fs
import std/string::String
import core/result::Result
import std/io::IoStringResult

fn read_config(path: String) -> IoStringResult {
    return fs::read_to_string(path)
}
```

## 写入文件

```toka
import std/fs
import std/string::String
import core/result::Result

fn save_data(path: String, data: String) -> Result<bool, String> {
    return fs::write_string(path, data)
}
```

## 文件系统操作

`fs` 模块提供标准的文件操作：

```toka
import std/fs
import std/string::String
import std/io::println
import core/option::Option

fn manage_files() {
    auto path = String::from("output")
    if fs::exists(path.clone()) {
        fs::remove_dir(path)
    }
    
    fs::create_dir(String::from("output"))
    
    auto dir# = fs::read_dir(String::from("."))
    while true {
        auto entry = dir#.next()
        if entry.is_none() { break }
        println("{}", entry.unwrap())
    }
}
```

## 路径操作

```toka
import std/io::println
import std/path
import std/string::String

fn example() {
    auto full = path::join(String::from("dir"), String::from("file.txt"))
    println("{}", full.c_str())
    
    auto ext = path::extension(String::from("data.json"))
    println("{}", ext.c_str())
    
    auto stem = path::file_stem(String::from("data.json"))
    println("{}", stem.c_str())
}
```

## 环境变量

```toka
import std/io::println
import std/env
import std/string::String
import core/option::Option

fn example() {
    auto home_opt = env::var(String::from("HOME"))
    auto home = home_opt.unwrap_or(String::from("/tmp"))
    println("Home directory: {}", home)
    
    env::set_var(String::from("MY_APP_DEBUG"), String::from("true"))
}
```
