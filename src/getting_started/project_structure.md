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

For larger projects, initialize a project using `toka init`. This creates a `package.tk` file:

```tokalang
// package.tk
pub const PACKAGE = (
    name = "my_project",
    version = "0.1.0",
    dependencies = ()
)
```

Directory layout:

```
my-project/
├── package.tk      # Project configuration and dependencies
├── src/
│   ├── main.tk     # Entry point
│   ├── utils.tk    # Utility functions
│   └── models.tk   # Data models
└── lib/
    ├── config.tk   # Library config
    └── helpers.tk  # Helper functions
```

## Adding Dependencies

You can easily add third-party packages to your project using the `toka add` command:

```bash
toka add toka-ink
```

This will automatically query the Toka Registry, resolve the package to its GitHub repository and version tag, and update your `package.tk`:

```tokalang
// package.tk
pub const PACKAGE = (
    name = "my_project",
    version = "0.1.0",
    dependencies = (
        toka-ink = "github.com/lumicore-dev/toka-ink:v0.2.1",
    )
)
```

During `toka build`, the compiler will automatically fetch these dependencies into your `.toka/packages` directory.


## Library Projects

For reusable libraries, `toka new my-lib --lib` generates a library structure without a `main.tk` executable entry point. The configuration format remains the same in `package.tk`.

## Import System

```tokalang
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
