# Standard Library Overview

Toka's standard library provides a comprehensive set of modules for everyday programming tasks.

## Module Structure

The standard library is organized into three tiers:

### `lib/core/` — Core Language Primitives

These modules provide the fundamental types and traits that the language itself depends on:

| Module | Description |
|--------|-------------|
| `prelude` | Auto-imported basics for every Toka program |
| `types` | Type definitions and limits |
| `traits` | Core traits (`@Hash`, `@PartialEq`, `@PartialOrd`) |
| `str` | String slice operations |
| `memory` | Memory management primitives |
| `option` | `Option<T>` type for nullable values |
| `result` | `Result<T, E>` type for error handling |

### `lib/std/` — Standard Library

Ready-to-use modules for application development:

| Module | Description |
|--------|-------------|
| `io` | Console I/O |
| `fs` | File system operations |
| `path` | Path manipulation |
| `net` | TCP/UDP networking |
| `time` | Time and duration |
| `math` | Mathematical functions |
| `rand` | Random number generation |
| `vec` | Dynamic array |
| `hash_map` | Hash map |
| `btree_map` | Ordered map |
| `string` | UTF-8 string type |

### `lib/stdx/` — Experimental / Extended (stdx)

New modules that are still evolving or optional extensions:

| Module | Description |
|--------|-------------|
| `net/http` | HTTP client and server |
| `net/url` | URL parsing |
| `serde/json` | JSON serialization |
| `crypto/md5` | MD5 hashing |
| `crypto/sha1` | SHA-1 hashing |
| `crypto/sha256` | SHA-256 hashing |
| `websocket` | WebSocket client and server |
| `cli/flag` | CLI flag parsing |

## Design Philosophy

Toka's standard library follows these principles:

1. **Zero dependencies** — Everything is built with pure Toka and the LLVM backend
2. **Consistent API** — Similar patterns across different modules
3. **Error-aware** — Every fallible operation returns `Result` or `Option`
4. **Performant** — Compiled to native code with no hidden overhead
