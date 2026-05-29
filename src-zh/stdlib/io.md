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
import core/result::Result
import std/io::IoStringResult

fn read_config(path: string) -> IoStringResult {
    return fs::read_to_string(path)
}
```

## 写入文件

```toka
import std/fs
import core/result::Result

fn save_data(path: string, data: string) -> Result<bool, string> {
    return fs::write_string(path, data.as_str())
}
```

## 文件系统操作

`fs` 模块提供标准的文件操作：

```toka
import std/fs
import std/io::println
import core/option::Option

fn manage_files() {
    auto path = string::from("output")
    if fs::exists(path.clone()) {
        fs::remove_dir(path)
    }
    
    fs::create_dir(string::from("output"))
    
    auto dir# = fs::read_dir(string::from("."))
    loop {
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

fn example() {
    auto full = path::join(string::from("dir"), string::from("file.txt"))
    println("{}", full.c_str())
    
    auto ext = path::extension(string::from("data.json"))
    println("{}", ext.c_str())
    
    auto stem = path::file_stem(string::from("data.json"))
    println("{}", stem.c_str())
}
```

## 环境变量

```toka
import std/io::println
import std/env
import core/option::Option

fn example() {
    auto home_opt = env::var(string::from("HOME"))
    auto home = home_opt.unwrap_or(string::from("/tmp"))
    println("Home directory: {}", home)
    
    env::set_var(string::from("MY_APP_DEBUG"), string::from("true"))
}
```
