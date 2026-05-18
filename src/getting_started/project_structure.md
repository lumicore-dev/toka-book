# Project Structure

Understanding Toka's project structure helps you organize your code effectively.

## Single-File Programs

For simple programs, a single `.tk` file is all you need:

```toka
// hello.tk
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

Run with: `toka run hello.tk`

## Multi-File Projects

For larger projects, use `Project.tk`:

```toka
// Project.tk
build::Executable

deps = []
```

Directory layout:

```
my-project/
├── Project.tk      # Project configuration
├── src/
│   ├── main.tk     # Entry point
│   ├── utils.tk    # Utility functions
│   └── models.tk   # Data models
└── lib/
    ├── config.tk   # Library config
    └── helpers.tk  # Helper functions
```

## Library Projects

For reusable libraries:

```toka
// Project.tk
build::Library

name = "my-lib"
```

## Import System

```toka
// Import from standard library
import std/io::println

// Import from project source
import src/utils::{helper_fn}

// Import from local library
import lib/config::{Config}

// Import with alias
import std/time as time_lib
```

## Build Output

Running `toka run` or `tokac build` produces:

```
my-project/
└── target/
    ├── debug/
    │   └── my-project    # Debug binary
    └── release/
        └── my-project    # Release binary (with --release)
```
