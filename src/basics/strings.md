# Strings

Toka 1.0 implements a highly rigorous, high-performance **Three-Track Text & Byte-Stream System**. It orthogonally decouples "textual observation" from "physical binary manipulation" in the type system. Simultaneously, it eliminates ambiguous implicit context inference, providing developers with maximum memory safety and speed.

---

## 🏛️ 1. String and View Types

Strings in Toka are split into owned heap-allocated containers and zero-copy borrowed views. Built into the Prelude's zero-import scope, you can **directly use these types without any `import`**:

| Type | Physical Geometry / LLVM Representation | Memory Ownership | Description |
| :--- | :--- | :--- | :--- |
| `str` | Fat pointer `{ i8* head, i64 len }` | **No Ownership (Borrowed)** | UTF-8 read-only text view. No `\0` termination guarantee. |
| `string` | Heap container `{ *#buf, usize, usize }` | **Exclusive Ownership (Owned)** | Heap-allocated mutable UTF-8 string, strictly terminated with `\0`. |
| `bytes` | Fat pointer `{ i8* head, i64 len }` | **No Ownership (Borrowed)** | Read-only binary byte-stream view. |
| `cstr` | Single pointer `i8*` (Zero-cost Shape) | **FFI Borrowed** | C-style read-only single pointer, 100% statically guaranteed to be `\0`-terminated. |

---

## ⚖️ 2. The Orthogonal Conversion Matrix

Toka strictly adheres to the **"Honest Overhead Naming Code"**:
*   **`as_xxx` family**: Represents **zero-overhead, zero-allocation** view borrowing. The borrowed view's lifetime is strictly guarded at compile time, bound tightly to its host.
*   **`to_xxx` family**: Represents **conversions involving physical copies or heap allocations**, explicitly declaring the separation of ownership and physical memory operations.

| Source $\rightarrow$ Target | `str` (Safe Fat Slice) | `string` (Heap Owned) | `cstr` (\0 Borrowed) | `*char` (FFI Raw Ptr) |
| :--- | :--- | :--- | :--- | :--- |
| **`"..."` Literal** | Default ResolvedType (0-cost) | **`.to_string()`**<br>($O(N)$ heap alloc) | **`.as_cstr()`**<br>($O(1)$ zero-alloc) | FFI boundary decay<br>(0 friction) |
| **`str`** | —— | **`.to_string()`**<br>($O(N)$ heap alloc) | **`.to_string().as_cstr()`**<br>($O(N)$ heap copy) | Implicit banned!<br>Use `.to_string().c_str()` |
| **`string`** | **`.as_str()`**<br>($O(1)$ zero-alloc) | —— | **`.as_cstr()`**<br>($O(1)$ zero-alloc) | **`.c_str()`**<br>($O(1)$ address borrow) |
| **`cstr`** | **`.as_str()`**<br>($O(1)$ zero-alloc) | **`.to_string()`**<br>($O(N)$ heap alloc) | —— | FFI boundary decay<br>(0 friction) |

---

## 🚀 3. Core Operations & Examples

### 1. Default Zero-Copy Literals
In Toka, regular double-quoted `"..."` string literals are resolved as static, read-only `str` views by default:

```toka
import std/io::println

fn main() -> i32 {
    // Resolved as str by default, resident in .rodata, 100% statically safe
    auto greeting: str = "Hello, Toka!"
    println("Greeting: {}", greeting)
    return 0
}
```

### 2. Dynamic string & Concatenation
`string` is an exclusive heap container. You can mutate it dynamically using `push_str`.

```toka
import std/io::println

fn main() -> i32 {
    // zero-import prelude allows direct call to string::from
    auto full# = string::from("Hello, ")
    full#.push_str("World!")
    
    println("{}", full.as_str()) // Zero-overhead str view borrow
    return 0
}
```

### 3. Dual-Track Conversion between str and bytes
Use `str` for high-level text operations, and `bytes` for low-level binary data and byte-based indexing:

```toka
import std/io::println
import core/option::Option
import core/result::Result

fn main() -> i32 {
    auto s: str = "Toka 1.0"
    
    // 1. O(1) zero-cost downgrade to bytes view
    auto b = s.bytes()
    
    // 2. Bound-checked O(1) byte indexing
    auto b0 = b.at(0:usize)
    if b0.is_some() {
        println("Byte 0: {}", b0.unwrap() as i64) // 84 ('T')
    }
    
    // 3. Validate and upgrade back to str
    auto res = b.try_to_str()
    if res.is_ok() {
        auto s_back = res.unwrap()
        println("Recovered: {}", s_back)
    }
    return 0
}
```

---

## 🛡️ 4. FFI Physical Copy Isolation

Because dynamic `str` slices do not guarantee a `\0` terminator, **`str` is strictly prohibited from implicitly decaying to a `cstr` or raw pointer**.
If a dynamic `str` must cross the FFI boundary, you must explicitly call `to_string()` to create a `\0`-terminated copy on the heap:

```toka
// Declare FFI interface
pub fn puts(s: cstr)

fn main() -> i32 {
    auto my_str: str = "Hello C-FFI"
    
    // Explicitly declare physical copy and \0 sealing for absolute safety
    auto temp_c = my_str.to_string()
    unsafe {
        puts(temp_c.as_cstr())
    }
    return 0
}
```
