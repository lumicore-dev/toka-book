# CLI Tool with toka-cli

In this project, we'll build a command-line tool using Toka and the `toka-cli` argument parser library.

## Setting Up

Create a new project:

```bash
toka init my-cli
cd my-cli
```

Add the `toka-cli` dependency to your `Project.tk`:

```toka
build::Executable

deps = [
    "toka-cli"
]
```

## Defining Arguments

```toka
import cli::{App, Arg, Command}

fn main() -> i32 {
    let app = App::new("my-cli")
        .version("1.0.0")
        .about("A sample CLI tool built with Toka")
        
    let name = app.option("-n", "--name")
        .help("Your name")
        .required(true)
        
    let verbose = app.flag("-v", "--verbose")
        .help("Enable verbose output")
        
    app.parse_args()
    
    let who = name.value() or "World"
    println("Hello, " + who + "!")
    
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

```toka
let cmd = app.subcommand("serve")
    .about("Start the server")
    .option("-p", "--port")
    .help("Port number")

match cmd.executed() {
    true => start_server(cmd),
    false => app.print_help()
}
```
