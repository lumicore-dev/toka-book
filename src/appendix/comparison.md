# Toka vs Other Languages

How does Toka compare to other languages in the systems programming space?

## Toka vs Rust

| Aspect | Rust | Toka |
|--------|------|------|
| Memory safety | Borrow checker with lifetimes | Hat Principle + PAL Checker |
| Learning curve | Steep (lifetimes, ownership) | Gentle (hat tokens are intuitive) |
| Compile speed | Slow (monomorphization) | Fast (LLVM backend, ~80k loc/s) |
| Syntax | Complex (macros, attributes) | Clean, Go-like readability |
| GC | No | No (compile-time managed) |
| C interop | Via `extern "C"` | Native C interop without FFI overhead |

## Toka vs Go

| Aspect | Go | Toka |
|--------|----|------|
| Memory model | GC with runtime | Compile-time ownership |
| Performance | Good (but GC pauses) | Native speed, zero overhead |
| Safety | GC handles memory | PAL Checker at compile time |
| Concurrency | Goroutines + channels | Tasks + MPSC channels |
| Binary size | ~5-20 MB (includes runtime) | ~250 KB (no runtime) |

## Toka vs C

| Aspect | C | Toka |
|--------|---|------|
| Safety | Manual memory, buffer overflows | Hat Principle prevents UB |
| Modern features | None (pre-1989 design) | Generics, pattern matching, traits |
| Compile speed | Fast | Fast (compiles itself in <1s) |
| Portability | Universal | LLVM backend, portable |

## Toka vs Zig

| Aspect | Zig | Toka |
|--------|-----|------|
| Philosophy | Better C | Memory safety without annotations |
| Memory | Manual (allocator passed) | Automatic (compile-time tracking) |
| Metaprogramming | `comptime` | Compile-time features |
| Error handling | Error union types | Result/Option with `!` operator |
| Build system | Built-in | package.tk (declarative) |
