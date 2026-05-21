# Ownership & Hats

Ownership in Toka is governed entirely by the Hat Principle. Rather than hiding allocations behind a generic type system, Toka uses distinct hat sigils to make a value's ownership model, copy/move semantics, and access permissions immediately clear directly in the syntax.

---

## Four Ownership Models

Toka defines four pointer typologies, each supporting a distinct resource management strategy:

### 1. `*` — Raw Pointer (Manual Lifecycle)
Low-level raw pointers provide zero compile-time safety and must be managed manually within an `unsafe` block:
```toka
{{#include ../../examples/ownership.tk:raw_ptr}}
```

### 2. `^` — Unique Pointer (Exclusive Heap Ownership)
Unique pointers enforce strict exclusive ownership. Only one `^` handle can point to a heap resource at a time. When a unique pointer exits its scope, its bound memory is automatically freed:
```toka
{{#include ../../examples/ownership.tk:unique_ptr}}
```

### 3. `~` — Shared Pointer (Reference-Counted Heap Ownership)
Shared pointers allow multiple handles to share ownership of the same heap-allocated resource via thread-safe reference counting. The resource is automatically freed when the last `~` handle goes out of scope:
```toka
shape Point(x: i32, y: i32, z: i32)
auto ~s1# = new Point(x = 100, y = 200, z = 0)
auto ~s2# = ~s1  // Shared Copy (ref count increments)
s2.x = 300       // Directly mutates the underlying soul
```

### 4. `&` — Borrow Pointer (Reference Semantics)
Borrow pointers represent temporary, compiler-checked references to existing souls without taking ownership, strictly governed by the Pointer Analysis Layer (PAL).

---

## Moving vs. Copying

Toka has clear rules to distinguish between copying data and transferring ownership:

### Default Copy Semantics
By default, standard assignments in Toka perform a **copy** (value copies for simple scalar types like `i32`/`bool`, and shallow copies for standard complex `shape` types):
```toka
{{#include ../../examples/ownership.tk:move_copy}}
```

### Default Move Semantics (Unique Pointers)
Move semantics apply **by default** exclusively to **Unique Pointers (`^`)**. Assigning one unique pointer to another automatically transfers exclusive ownership from the source to the destination, rendering the source handle immediately invalid:
```toka
shape Point(x: i32, y: i32, z: i32)
auto ^p1 = new Point(x = 10, y = 20, z = 0)
auto ^p2 = ^p1  // Ownership transfers (moves) to p2; p1 is no longer valid!
```

### Explicit Move with `cede`
For other types (such as custom shapes or `String`), copy semantics are used by default. To explicitly transfer ownership of such a value (avoiding copies), you must use the **`cede` keyword**. Ceding transfers the resource to the destination and invalidates the source variable:
```toka
import std/string::String
auto s1 = String::from("hello")
auto s2 = cede s1 // Explicit move: s1 is invalidated
```

---

## Function Parameters: Zero-Copy Capture

In Toka, function parameters are immutable by default and passed via an incredibly efficient **zero-copy implicit reference capture mechanism**. 

The compiler automatically passes arguments by reference under the hood with zero runtime overhead and zero copying. Therefore, you do not need special pointer sigils for standard parameter passing unless you explicitly intend to pass or rebind pointer handles:
```toka
{{#include ../../examples/ownership.tk:borrow_func}}
```

---

## The `#` Mutability Marker & Permission Views

Toka introduces the `#` marker to explicitly declare and track mutable access. Its usage is governed by strict compiler lifecycles to eliminate redundant code noise while maximizing visual safety.

### 1. Declaring Mutability
To declare a local variable mutable, you must append `#` to the identifier at its **declaration site**:
```toka
{{#include ../../examples/ownership.tk:mutable_local}}
```

### 2. Forbidden in Everyday Contexts (Assignments)
Once a variable is declared mutable, its mutable state is registered in its **Permission View** (type system). Therefore, you must **NOT** append `#` to the variable in ordinary assignments or expressions:
```toka
auto val# = 42
val = 99 // Everyday assignment: NO '#' allowed! Writing 'val# = 99' is a compiler error.
```
This prevents useless syntactic noise in everyday code.

### 3. Required at Mutating Method Call Sites (Receiver Suffix)
Toka's most elegant safety feature is that **mutating method calls must be explicitly flagged at the call site**. 

When invoking a method that mutates a shape, the compiler requires you to append the `#` suffix to the receiver object (e.g. `obj#.mutate()`). This acts as an extremely visible "mutation alarm," signaling to readers and code auditors exactly where a resource's soul is being modified:
```toka
{{#include ../../examples/ownership.tk:mutable_method}}
```
By enforcing the `#` suffix strictly on *declarations* and *method receiver mutation sites*, Toka achieves a perfect balance between syntactic cleanlines and high-fidelity safety visibility.
