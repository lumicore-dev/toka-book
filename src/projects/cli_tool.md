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
import std/string::String
import std/io

fn main() -> i32 {
    // Parser::new takes the program name and a brief description
    auto parser# = Parser::new(String::from("my-cli"), String::from("A sample CLI tool built with Toka"))
    
    // Add options to the parser
    parser#.add_string(String::from("name"), 110:char, String::from("World"), String::from("Your name"))
    parser#.add_bool(String::from("verbose"), 118:char, false, String::from("Enable verbose output"))

    auto args = env::args()
    auto res = parser.parse(args)
    match res {
        auto Result<ParsedArgs, String>::Ok(parsed) => {
            auto who = parsed.get_string(String::from("name"))
            io::println("Hello, %s!", who.c_str())
            
            if parsed.get_bool(String::from("verbose")) {
                io::println("[Verbose] Running with debug output")
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

## Running

```bash
toka run src/main.tk -- -n Toka
# Output: Hello, Toka!

toka run src/main.tk -- -n Toka -v
# Output: Hello, Toka!
# [Verbose] Running with debug output
```

## Advanced Argument Handling

Toka's current `stdx/cli/flag` library provides basic options and flags parsing with types like `bool`, `i64`, `f64`, and `String`. 

Positional arguments are captured automatically and can be fetched from the parsed arguments using `positionals()`:

```tokalang
auto pos_args = parsed.positionals()
// pos_args is a Vec<String> containing any arguments not matching flags or options
```

For complex command-line interfaces requiring nested subcommands (like `git status` or `docker run`), you can manually match on `pos_args` to delegate execution to different parser configurations.
