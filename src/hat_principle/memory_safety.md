# Memory Safety & PAL

Toka achieves rigorous, compile-time memory safety without the heavy runtime overhead of a Garbage Collector, and **without requiring complex, verbose lifetime annotations**. 

This is accomplished by the compiler's **Pointer Analysis Layer (PAL) Checker**, which acts as a static verification engine inspecting the usage of Hat pointer typologies and access permission modifiers.

---

## How the PAL Checker Works

The PAL Checker performs static compile-time flow analysis to track the **Permission View** and **Active Scope (Region)** of every resource in your codebase.

By requiring explicit pointer specifiers (Hats like `^`, `~`, `&`) and mutation intent markers (like `#` on declarations and receiver method call sites), the compiler gains enough semantic information to perform rigorous safety checking automatically.

It guarantees four core pillars of memory safety at compile time:

### 1. No Use After Move (Unique Pointers `^`)
A unique pointer `^` represents exclusive heap ownership. When it is assigned to another handle, the original handle is marked as "moved-from." The PAL Checker statically blocks any subsequent read or write to the original variable:
```toka
{{#include ../../examples/memory_safety.tk:no_use_after_move}}
```

### 2. No Dangling References (Borrow Pointers `&`)
A borrow pointer `&` must never outlive its referent. The PAL Checker tracks the lifetime bounds of the underlying Soul and rejects compilation if a borrow is returned or held beyond the soul's deallocation scope.

### 3. No Double Free
For owned resources (`^` unique pointers or the last `~` shared pointer), the compiler injects a single, deterministic destruction call when the handle exits its scope. Handlers that have been moved or ceded are bypassed, preventing double frees statically.

### 4. No Data Races / Aliasing Violations
To prevent data races and modification conflicts, Toka enforces the fundamental aliasing rule: **you may have either one active mutable borrow OR multiple read-only borrows, but never both simultaneously**. 

Because Toka requires mutating method calls to explicitly tag their receiver (e.g. `obj#.mutate()`), the PAL Checker can trivially and securely verify exclusive mutable access at every method call boundary.

---

## Zero-Copy Argument Safety

Toka's function argument passing utilizes the **zero-copy implicit reference capture mechanism**. When passing arguments to a function, the PAL Checker automatically captures variables by reference under the hood with zero copying. 

Because parameters are immutable inside the function by default, the caller's argument remains perfectly safe from modification:
```toka
{{#include ../../examples/memory_safety.tk:borrowing_safe}}
```
To allow a function to modify a parameter, the parameter must be declared mutable (`#`) in the function signature, and the PAL Checker will then enforce exclusive borrowing at the call site.

---

## PAL Static Assurances at a Glance

The PAL Checker acts as a silent guardian, providing absolute safety guarantees before your binary is even built:

| Scenario / Action | PAL Checker Static Response | Safety Context |
|:---|:---:|---|
| Accessing a unique pointer `^` after move | ❌ **Compile Error** | Prevents use-after-move and double-frees |
| Holding a borrow `&` after its Soul is dropped | ❌ **Compile Error** | Eliminates dangling pointers & use-after-free |
| Triggering double `unsafe free` on `*` | ❌ **Compile Error** | Restricts manual deallocation errors |
| Overlapping mutable borrow `obj#.mutate()` with shared borrows | ❌ **Compile Error** | Guarantees thread safety and no data races |
| Normal borrow parameter passing | ✅ **Passed** | High-performance, zero-copy read-only access |
| Handle exiting its declared scope | ✅ **Passed** | Generates zero-overhead automatic resource cleanup |

By shifting the burden of memory safety from the runtime (GC) or the programmer's brain (manual lifetimes) to the **Pointer Analysis Layer (PAL)**, Toka provides the performance of C++ with the safety of Rust, wrapped in a clean and visual syntax.
