# Soul & Identity

Toka's Hat Principle introduces a clear distinction between a pointer's **handle** (the container) and its **soul** (the underlying data). Understanding this split is key to mastering Toka's memory model.

## Handle vs. Soul

Every pointer in Toka has two aspects:

- **Handle (The Hat)**: The identifier *with* its sigil (`^p`, `*p`, `~p`). This represents the pointer container itself — the memory location that holds the address.
- **Soul (The Data)**: The identifier *without* the sigil (`p`). This represents the underlying value being pointed to.

## Implicit Dereferencing

Toka's killer feature is **implicit dereferencing**: you never need a `*` or `->` operator to access the data behind a pointer. Just use the soul directly:

```toka
{{#include ../../examples/soul_identity.tk:handle_soul}}
```

This is a massive ergonomic improvement over C (`p->x = 30`) or Rust (`(*p).x = 30`).

## The Four Hats

Each hat sigil carries different ownership semantics:

### `*` — Raw Pointer
Low-level, unsafe pointer. Requires `unsafe` keyword or explicit `alloc`:

```toka
{{#include ../../examples/soul_identity.tk:raw_pointer}}
```

### `^` — Unique Pointer
Exclusive ownership of a heap-allocated resource. Created with `new`:

```toka
{{#include ../../examples/soul_identity.tk:unique_pointer}}
```

### `~` — Shared Pointer
Reference-counted, shared ownership via pointer morphology.

```toka
auto ~s1# = new Point(x = 1000, y = 2000, z = 0)
auto ~s2# = ~s1 // Shared Copy (ref count increments)
s2.x = 3000     // Modifies the underlying soul
```

### `&` — Borrow Pointer
A reference or borrow pointer to another value. Created explicitly via `&` to refer to an existing soul:

```toka
auto &y = &(x) // y is a borrow pointer pointing to the soul of x
```

## Identity and Address

To get the raw memory address of a local variable, use the `*(expr)` syntax:

```toka
{{#include ../../examples/soul_identity.tk:address_of}}
```

The hat (`^`) does **not** mean "address of". It specifically denotes the unique pointer container.
