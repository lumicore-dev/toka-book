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

fn read_config(path: str) -> Result<string, string> {
    auto content = fs::read_to_string(path)?
    return Ok(content)
}
```

## Writing Files

```toka
import std/fs

fn save_data(path: str, data: str) -> Result<void, string> {
    fs::write(path, data)?
    return Ok(())
}
```

## File System Operations

The `fs` module provides standard file operations:

```toka
import std/fs

fn manage_files() {
    // Check if a file exists
    if fs::exists("data.txt") {
        // Delete a file
        fs::remove_file("data.txt")
    }
    
    // Create a directory
    fs::create_dir("output")?
    
    // List directory contents
    for entry in fs::read_dir(".") {
        println(entry.name)
    }
}
```

## Working with Paths

```toka
import std/path

fn example() {
    let full = path::join("dir", "subdir", "file.txt")
    println(full)  // "dir/subdir/file.txt"
    
    let ext = path::extension("data.json")
    println(ext)  // "json"
    
    let stem = path::stem("data.json")
    println(stem) // "data"
}
```

## Environment Variables

```toka
import std/env

fn example() {
    let home = env::var("HOME") or "/tmp"
    println("Home directory: " + home)
    
    env::set_var("MY_APP_DEBUG", "true")
}
```
