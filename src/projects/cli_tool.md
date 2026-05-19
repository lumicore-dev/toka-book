# CLI Tool with toka-cli

In this project, we'll build a command-line tool using Toka and the `toka-cli` argument parser library.

## Setting Up

Create a new project:

```bash
toka init my-cli
cd my-cli
```

Add the `toka-cli` dependency using the Toka package manager:

```bash
toka add toka-cli
```

This updates your `package.tk` dependencies automatically.

## Defining Arguments

```tokalang
import cli::{App, Arg, Command}

import std/string::String

fn main() -> i32 {
    auto app = App::new("my-cli")
        .version("1.0.0")
        .about("A sample CLI tool built with Toka")
        
    auto name = app.option("-n", "--name")
        .help("Your name")
        .required(true)
        
    auto verbose = app.flag("-v", "--verbose")
        .help("Enable verbose output")
        
    app.parse_args()
    
    auto who = name.value().unwrap_or(String::from("World"))
    println("Hello, {}!", who)
    
    if verbose.present() {
        println("[Verbose] Running with debug output")
    }
    
    return 0
}
```

## Running

```bash
toka run -- -n Toka
# Output: Hello, Toka!

toka run -- -n Toka -v
# Output: Hello, Toka!
# [Verbose] Running with debug output
```

## Subcommands

Build more complex CLIs with subcommands:

```tokalang
auto cmd = app.subcommand("serve")
    .about("Start the server")
    .option("-p", "--port")
    .help("Port number")

match cmd.executed() {
    true => start_server(cmd),
    false => app.print_help()
}
```
