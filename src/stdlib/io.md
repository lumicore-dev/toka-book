# IO & File System

Toka's IO module provides file operations, console output, and stream handling — all with a clean, consistent API.

## Console Output

```toka
import std/io::{println, print}

println("Hello with newline")  // Prints with trailing newline
print("No newline here")       // Prints without trailing newline
```

## Reading Files

```toka
import std/fs
import std/string::String
import core/result::Result
import std/io::IoStringResult

fn read_config(path: String) -> IoStringResult {
    return fs::read_to_string(path)
}
```

## Writing Files

```toka
import std/fs
import std/string::String
import core/result::Result

fn save_data(path: String, data: String) -> Result<bool, String> {
    return fs::write_string(path, data)
}
```

## File System Operations

The `fs` module provides standard file operations:

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

## Working with Paths

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

## Environment Variables

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
