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

Ready-to-use standard modules for application development (Complete List):

| Module | Description |
|--------|-------------|
| `prelude` | Auto-imported standard prelude containing the most common types |
| `char` | Unicode character handling and classification |
| `string` | UTF-8 dynamic dynamic string types (`String` / `view_str`) |
| `vec` | Dynamically growing sequential array container (`Vec`) |
| `deque` | Double-ended queue based on ring buffers (`VecDeque`) |
| `list` | Doubly-linked list implementation (`LinkedList`) |
| `hash_map` | High-performance hash table based map (`HashMap`) |
| `hash_set` | Hash table based unique element collection (`HashSet`) |
| `btree_map` | B-Tree based ordered key-value map (`BTreeMap`) |
| `btree_set` | B-Tree based ordered unique set (`BTreeSet`) |
| `heap` | Priority queue implemented with max/min binary heap (`BinaryHeap`) |
| `io` | Buffered standard console I/O (`stdin` / `stdout` / `println`) |
| `fs` | File system read/write and directory metadata operations |
| `path` | Cross-platform file path parsing and manipulation (`Path` / `PathBuf`) |
| `env` | Environment variables, process arguments, and system context interaction |
| `process` | Subprocess spawning, state control, and pipe communication |
| `thread` | Native system-level thread management and lifecycle control (`Thread`) |
| `sync` | Thread synchronization primitives (`Mutex` / `Condvar` / `WaitGroup`) |
| `atomic` | Hardware-level atomic operations and lock-free sync primitives |
| `mpsc` | Multi-producer single-consumer (MPSC) thread concurrency channel |
| `task` | Coroutine task scheduling, context management, and async runtime |
| `net` | TCP & UDP socket network communication interfaces |
| `math` | Common mathematical functions and limit constants |
| `rand` | Pseudo-random number generator and random utilities |
| `time` | System time and monotonic durations (`Duration` / `Instant`) |
| `log` | Basic logging utilities and severity filtering |
| `fmt` | Text formatting and debug printing utilities (`Format`) |
| `memory` | Low-level memory allocation, region copying, and raw pointer helpers |
| `error` | Common error traits (`Error`) and failure base definitions |
| `panic` | Runtime fatal error triggering, intercepting, and stack hooks |
| `termios` | Low-level Tty terminal mode and control attributes configuration |

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
