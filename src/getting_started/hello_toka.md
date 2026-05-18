# Hello, Toka!

Let's write your first Toka program. Create a file called `hello.tk`:

```toka
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

### Running the Program

Toka provides two ways to run your code:

**Option 1: One-step run**

```bash
toka run hello.tk
```

This compiles and executes your program in a single command.

**Option 2: Build then run**

```bash
tokac build hello.tk -o hello
./hello
```

This gives you a standalone binary that you can distribute.

### Expected Output

```
Hello, Toka!
```

## Understanding the Code

Let's break down what each part does:

- `import std/io::println` — Brings the `println` function from the standard library's IO module into scope.
- `fn main() -> i32` — Declares the entry point of your program. Every Toka executable needs a `main` function. The `-> i32` means it returns an integer (the exit code).
- `println("Hello, Toka!")` — Prints the string to standard output.
- `return 0` — Returns exit code 0, indicating success.

### Quick One-Liner

For a quick test without creating a file, you can also use:

```bash
echo 'import std/io::{println} fn main() { println("Hello, Toka World!") }' > hello.tk
toka run hello.tk
```

## What's Next?

In the next section, we'll explore the standard project structure and how to organize larger Toka projects.
