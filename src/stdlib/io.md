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
import core/result::Result
import std/io::IoStringResult

fn read_config(path: string) -> IoStringResult {
    return fs::read_to_string(path)
}
```

## Writing Files

```toka
import std/fs
import core/result::Result

fn save_data(path: string, data: string) -> Result<bool, string> {
    return fs::write_string(path, data.as_str())
}
```

## File System Operations

The `fs` module provides standard file operations:

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

## Working with Paths

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

## Environment Variables

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
