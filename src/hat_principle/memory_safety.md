# Memory Safety

Toka achieves memory safety at compile time through the **PAL Checker** (Pointer Analysis Layer), without needing a garbage collector, runtime overhead, or explicit lifetime annotations.

## How PAL Works

The PAL Checker analyzes the usage of hat sigils (`*`, `^`, `~`) across your code to enforce ownership and borrowing rules. It runs at compile time and guarantees:

1. **No dangling pointers** — You cannot access memory after it has been freed
2. **No double-free** — Each allocation is freed exactly once
3. **No use after move** — A moved-from `^` (unique) pointer cannot be accessed
4. **No data races** — Mutable access is exclusive; shared access is read-only

## Unique Pointers (`^`) — No Use After Move

The `^` hat enforces exclusive ownership. Ownership can be transferred via *move*:

```toka
{{#include ../../examples/memory_safety.tk:no_use_after_move}}
```

The compiler tracks the flow of ownership and rejects any code that accesses a value after its ownership has been transferred.

## Raw Pointers (`*`) — Unsafe Operations

Raw pointers require explicit `unsafe` blocks:

```toka
{{#include ../../examples/memory_safety.tk:unsafe_ops}}
```

The `unsafe` keyword signals to the PAL Checker that you are taking manual responsibility for memory safety.

## Shared Pointers (`~`) — Reference Counting

Shared pointers use runtime reference counting but are still safe. Support is planned for an upcoming release.

```toka
// Not yet implemented in v0.9.6 — coming soon
```

## Borrowing Safety

Toka uses **implicit borrow** (in-place capture) as the default for function parameters. Values of simple types like `i32` are passed by value (copied), while complex types would be borrowed:

```toka
{{#include ../../examples/memory_safety.tk:borrowing_safe}}
```

For **mutable access**, use `#` on local variable declarations:

```toka
{{#include ../../examples/memory_safety.tk:mutable_local}}
```

## The PAL Checker's Guarantees at a Glance

| Situation | PAL Checker Action |
|-----------|-------------------|
| Use after `^` move | ❌ Compile error |
| Dangling `&` reference | ❌ Compile error |
| Double `unsafe free` | ❌ Compile error |
| Race on mutable data | ❌ Compile error |
| Valid borrow usage | ✅ Passes |
| Correct scope cleanup | ✅ Automatic free |

This model achieves the same safety guarantees as Rust's borrow checker, but without any lifetime annotations — the hat sigils make ownership visible directly in the syntax.
