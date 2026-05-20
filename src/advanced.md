# Advanced Features

Having mastered the language basics and gained a deep understanding of the **Hat Principle** regarding the management of Soul and Handle, you have already conquered Toka's steepest learning curve. Now, we enter the world of Toka's **Advanced Features**.

Toka's advanced features are not complex syntax designed for show. Instead, they provide high-level abstract expressiveness while strictly adhering to the **Zero-Copy Capture Mechanism** and **ultimate runtime efficiency**. Here, you will witness the elegant fusion of strong type systems and algebraic data types.

---

## Chapter Map

This chapter will guide you through the following four pillars of system development:

```mermaid
graph TD
    A[Toka Advanced Abstractions] --> B(Generics)
    A --> C(Error Handling)
    A --> D(Pattern Matching)
    A --> E(Concurrency)

    B --> B1["Zero-overhead Polymorphism & Avoiding 'Soul Collapse'"]
    C --> C1["Option / Result & Short-circuit Operator !"]
    D --> D1["Deep Shape Deconstruction & if Guards"]
    E --> E1["Safe Lightweight Coroutines & Multicore Parallelism"]
```

### 1. [Generics](advanced/generics.md)
Achieve zero-overhead polymorphism while maintaining strong type safety. You will learn about Toka's unique **Morphic Generic Types** (like `'A`) and the strict rule of prefixing corresponding Shape fields with a single quote (e.g., `'first: 'A`) to avoid **"Soul Collapse"**.

### 2. [Error Handling](advanced/error_handling.md)
Toka discards heavy runtime exception-throwing mechanisms. Instead, it leverages algebraic data types, specifically `Option<T>` and `Result<T, E>`, to elegantly represent and propagate errors. Together with the concise `!` short-circuit operator, your error paths will be cleaner and more robust than nested pattern matches.

### 3. [Pattern Matching](advanced/pattern_matching.md)
As one of Toka's most expressive features, pattern matching allows you to deconstruct Shapes and dispatch logic intuitively. Here, you will understand how variable patterns binding and shadowing work under the hood, and learn to combine patterns with `if` guards for precise range and boundary checks.

### 4. [Concurrency](advanced/concurrency.md)
How do you make your code run safely across multiple CPU cores? Toka provides extremely lightweight and safe coroutines and threading primitives, helping you build high-throughput concurrent systems without deadlocks or data races.

---

> [!TIP]
> **Mental Model Shift**
> When reading this chapter, forget the heavy inheritance hierarchies and runtime polymorphism overhead of traditional object-oriented languages (like Java/C++). Toka achieves polymorphism at compile time through **Shape deconstruction, Trait constraints, and Pattern Matching**. Combined with the Hat Principle, your advanced code will be both safe and blazing fast.
