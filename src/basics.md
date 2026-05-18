# Language Basics

Now that you have Toka installed and have written your first program, let's dive into the core concepts of the language.

## Hello World Revisited

The simplest Toka program needs two things: an `import` for the standard library, and a `main` function:

```toka
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

Run it with:

```bash
toka run hello.tk
```

## Key Principles

Toka is designed around a few core principles:

1. **Safety by default** — Variables are immutable unless explicitly marked.
2. **No hidden runtime** — What you write is what gets executed. No garbage collector, no VM.
3. **C-like performance** — Built on LLVM 20, Toka generates optimized native code.
4. **Modern syntax** — Clean, readable, with powerful pattern matching and error handling.

## Comment Syntax

Comments in Toka use the standard `//` syntax:

```toka
// This is a single-line comment

/* This is a
   multi-line comment */
```

## Next Steps

In the following sections, we'll explore variables, types, functions, and control flow in detail.
