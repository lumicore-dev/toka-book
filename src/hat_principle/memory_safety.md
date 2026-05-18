# Memory Safety

Toka achieves memory safety through a combination of the Hat Principle and the PAL Checker — without needing a garbage collector or complex lifetime annotations.

## No Garbage Collector

Toka has **no runtime garbage collector**. Memory is managed at compile time through ownership tracking:

```toka
fn create_data() -> string {
    auto data = string("hello")
    return data  // Ownership transfers to the caller
}  // No GC needed — the compiler knows who owns what
```

## No Borrow Checker Battles

Rust's borrow checker is powerful but can be frustrating. Toka's PAL Checker is designed to be more intuitive:

| Aspect | Rust | Toka |
|--------|------|------|
| Annotations | Lifetime parameters (`'a`, `'b`) | None — hats are syntax-level |
| Learning curve | Steep | Gentle — hat tokens are intuitive |
| Error messages | Complex lifetime graphs | Simple hat violation messages |
| Expressiveness | Constrained by borrow checker | Flexible — hats adapt to your code |

## Common Safety Patterns

### Pattern 1: Reading Without Mutating

Use `&` to borrow an immutable reference:

```toka
fn display(data&) {
    println("Data: " + str(data.len))
}
```

### Pattern 2: Mutating In Place

Use `^` to get mutable access through a hat:

```toka
fn reset(^data) {
    ^data.clear()
    ^data.push(0)
}
```

### Pattern 3: Transferring Ownership

Pass ownership through a hat parameter:

```toka
fn consume(^buffer) {
    // We own it now — free to do anything
    process(^buffer)
    // Freed when function exits
}
```

## What the PAL Checker Catches

The Pointer Address Lifetime Checker catches these bugs at compile time:

1. **Use-after-free** — Accessing a value after its lifetime ends
2. **Double-free** — Attempting to free the same memory twice
3. **Dangling pointers** — Holding a hat to freed memory
4. **Data races** — Concurrent mutable access to the same value

All of this happens **automatically**. You don't write any annotations — just use hats (`^`) and borrows (`&`) where appropriate, and the checker does the rest.
