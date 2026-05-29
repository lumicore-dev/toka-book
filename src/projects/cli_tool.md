# CLI Tool with stdx/cli/flag

In this project, we'll build a command-line tool using Toka and the standard `stdx/cli/flag` argument parser library.

## Setting Up

Create a new project:

```bash
toka init my-cli
cd my-cli
```

Since `stdx/cli/flag` is a standard library extension in Toka, you do not need to add any external dependencies via the package manager. It is ready to use out-of-the-box!

## Defining Arguments

```tokalang
import stdx/cli/flag::{Parser, ParsedArgs}
import std/env
import std/io

fn main() -> i32 {
    // Parser::new takes the program name and a brief description
    auto parser# = Parser::new(string::from("my-cli"), string::from("A sample CLI tool built with Toka"))
    
    // Add options to the parser
    parser#.add_string(string::from("name"), 110:char, string::from("World"), string::from("Your name"))
    parser#.add_bool(string::from("verbose"), 118:char, false, string::from("Enable verbose output"))

    auto args = env::args()
    auto res = parser.parse(args)
    match res {
        auto Result<ParsedArgs, string>::Ok(parsed) => {
            auto who = parsed.get_string(string::from("name"))
            io::println("Hello, %s!", who.c_str())
            
            if parsed.get_bool(string::from("verbose")) {
                io::println("[Verbose] Running with debug output")
            }
        }
        auto Result<ParsedArgs, string>::Err(&err) => {
            if err == string::from("help requested") {
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

## Running

```bash
toka run src/main.tk -- -n Toka
# Output: Hello, Toka!

toka run src/main.tk -- -n Toka -v
# Output: Hello, Toka!
# [Verbose] Running with debug output
```

## Advanced Argument Handling

Toka's current `stdx/cli/flag` library provides basic options and flags parsing with types like `bool`, `i64`, `f64`, and `string`. 

Positional arguments are captured automatically and can be fetched from the parsed arguments using `positionals()`:

```tokalang
auto pos_args = parsed.positionals()
// pos_args is a Vec<string> containing any arguments not matching flags or options
```

For complex command-line interfaces requiring nested subcommands (like `git status` or `docker run`), you can manually match on `pos_args` to delegate execution to different parser configurations.
