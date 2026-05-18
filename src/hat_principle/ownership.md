# Ownership & Hats

Ownership in Toka is governed by the Hat Principle. Let's explore how hats track ownership and how the PAL Checker enforces safety.

## The Basic Rule

Every value in Toka has exactly **one owner** at any time. The hat (`^`) token indicates who holds the ownership address:

```toka
auto data = create_buffer(1024)
// `data` owns the buffer

^x.process(data)    
// The hat `^x` passes ownership of `data` to the function
```

## Moving vs Copying

**Simple types** (like `i32`, `f64`, `bool`) are **copied** by default:

```toka
auto a = 42
auto b = a   // b gets a copy
^a = 99      // a is now 99
println(str(b)) // still 42
```

**Complex types** (like `string`, `Vec`, custom `shape` types) are **moved** by default:

```toka
auto original = create_string("Hello")
auto moved = original   // ownership transfers to `moved`
// `original` is no longer valid here
```

## Explicit Borrowing with `&`

If you want to lend a value without transferring ownership, use the **borrow** (`&`) token:

```toka
auto data = create_buffer(1024)

fn process(data&) {
    // Can read data but not keep it
    println("size: " + str(data.len))
}

process(&data)   // Lend it temporarily
// `data` is still valid here — we only borrowed it
```

## Ownership Transfer via Hat

When you pass a value through a hat, ownership transfers:

```toka
fn consume(^data) {
    // `data` is now ours to manage
    println("got: " + data)
    // `data` is freed when this function ends
}

auto item = "precious resource"
consume(^item)
// `item` is no longer valid here — ownership was transferred
```

## The PAL Checker in Action

The PAL Checker verifies at compile time that:

1. **No use after move** — You cannot access a value after its ownership has been transferred
2. **No dangling references** — Borrowed references (`&`) cannot outlive the borrowed value
3. **No double-free** — Each value is freed exactly once
4. **No data races** — Mutable access (`^`) is exclusive; shared access (`&`) is read-only

All of this happens **without any lifetime annotations**. The Hat Principle makes ownership visible in the syntax itself.
