# Migration Guide

Migrating from other languages to Toka? Here's what you need to know.

## From Rust

**Ownership model:**
- Rust: Borrow checker with `'a` lifetimes
- Toka: Hat Principle with `^` syntax — no lifetime annotations needed

**Error handling:**
- Rust: `Result<T, E>` with `?` operator
- Toka: Same `Result<T, E>` with `!` operator

**Pattern matching:**
- Rust: `match` with exhaustive checking
- Toka: Same `match` with wildcard `_`

**Traits:**
- Rust: `trait Foo { fn bar(&self); }`
- Toka: `pub trait Foo { fn bar(self); }` with `@` syntax

## From Go

**Error handling:**
- Go: `if err != nil` everywhere
- Toka: `Result/Option` with `!` operator — cleaner and safer

**Concurrency:**
- Go: Goroutines + channels
- Toka: Tasks + MPSC channels

**Interfaces:**
- Go: Implicit interface satisfaction
- Toka: Explicit trait implementation with `@` syntax

## From C

**Pointers:**
- C: Raw pointers `*` with no safety
- Toka: Tracked hats `^` with PAL Checker

**Memory:**
- C: Manual `malloc/free`
- Toka: Automatic compile-time memory management

**Build:**
- C: Makefile / CMakeLists.txt
- Toka: package.tk (declarative)

## From Python

**Dynamic vs Static:**
- Python: Dynamic typing, runtime errors
- Toka: Static typing, compile-time safety

**Performance:**
- Python: Interpreted, slow
- Toka: Compiled, native speed (via LLVM)

## Quick Syntax Reference

| Concept | Toka |
|---------|------|
| Variable | `auto x = 10` |
| Mutable | `auto x# = 10` |
| Function | `fn add(a: i32, b: i32) -> i32` |
| If/else | `if cond { } else { }` |
| Loop | `for i in 0..10 { }` |
| Match | `match val { 1 => "one", _ => "other" }` |
| Comment | `// Single line` |
| Import | `import std/io::println` |
| Return | `return value` |
