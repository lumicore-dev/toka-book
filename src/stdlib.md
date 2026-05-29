# Standard Library Overview

Toka's standard library provides a comprehensive set of modules for everyday programming tasks.

## Module Structure

The standard library is organized into four tiers:

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

### `lib/sys/` — Low-level System Primitives

These modules provide direct bindings and primitives interacting with the operating system and low-level runtime:

| Module | Description |
|--------|-------------|
| `libc` | Platform-dependent C standard library API declarations and bindings |
| `termios` | Low-level Tty terminal mode and control attributes configuration |
| `thread` | Lower-level OS native thread interfaces |
| `sync` | OS-level synchronization primitives and lock implementations |
| `linux` / `macos` / `windows` | Platform-specific system calls and bindings |

### `lib/std/` — Standard Library

Ready-to-use standard modules for application development:

| Module | Description |
|--------|-------------|
| `prelude` | Auto-imported standard prelude containing the most common types |
| `char` | Unicode character handling and classification |
| `string` | UTF-8 dynamic string type and views (`string` / `str`) |
| `vec` | Dynamically growing sequential array container (`Vec`) |
| `deque` | Double-ended queue based on ring buffers (`VecDeque`) |
| `slab` | Zero-copy generational slab allocator (`Slab` / `SlabID`) |
| `hashmap` | High-performance hash table based map (`HashMap`) |
| `hashset` | Hash table based unique element collection (`HashSet`) |
| `btreemap` | B-Tree based ordered key-value map (`BTreeMap`) |
| `btreeset` | B-Tree based ordered unique set (`BTreeSet`) |
| `heap` | Priority queue implemented with max/min binary heap (`BinaryHeap`) |
| `io` | Buffered standard console I/O (`stdin` / `stdout` / `println`) |
| `fs` | File system read/write and directory metadata operations |
| `path` | Cross-platform file path parsing and manipulation (`Path` / `PathBuf`) |
| `env` | Environment variables, process arguments, and system context interaction |
| `process` | Subprocess spawning, state control, and pipe communication |
| `thread` | OS native thread management and lifecycle control (`Thread`) |
| `sync` | Thread synchronization primitives (`Mutex` / `Condvar` / `WaitGroup`) |
| `atomic` | Hardware-level atomic operations and lock-free sync primitives |
| `mpsc` | Multi-producer single-consumer (MPSC) thread concurrency channel |
| `task` | Coroutine task scheduling, context management, and async runtime |
| `net` | TCP & UDP socket network communication interfaces |
| `math` | Common mathematical functions and limit constants |
| `rand` | Pseudo-random number generator and random utilities |
| `time` | System time and monotonic durations (`Duration` / `Instant`) |
| `fmt` | Text formatting and debug printing utilities (`Format`) |
| `memory` | Low-level memory allocation, region copying, and raw pointer helpers |
| `error` | Common error traits (`Error`) and failure base definitions |
| `panic` | Runtime fatal error triggering, intercepting, and stack hooks |

### `lib/stdx/` — Experimental / Extended (stdx)

New modules that are still evolving or optional extensions:

| Module | Description |
|--------|-------------|
| `log` | Basic logging utilities and severity filtering |
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
