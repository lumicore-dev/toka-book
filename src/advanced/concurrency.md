# Concurrency

Toka provides lightweight concurrency through tasks and message passing, enabling efficient parallel execution.

## Tasks

Spawn concurrent tasks with the `task` module:

```toka
import std/task

fn worker(id: i32) {
    println("Worker " + str(id) + " started")
    // Do work...
    println("Worker " + str(id) + " done")
}

fn main() -> i32 {
    auto t1 = task::spawn(worker, [1])
    auto t2 = task::spawn(worker, [2])
    
    task::join(t1)
    task::join(t2)
    return 0
}
```

## MPSC Channels

Communicate between tasks using MPSC (Multi-Producer, Single-Consumer) channels:

```toka
import std/mpsc

fn main() -> i32 {
    auto (tx, rx) = mpsc::channel<i32>(16)
    
    task::spawn(producer, [tx])
    task::spawn(consumer, [rx])
    
    return 0
}

fn producer(tx: mpsc::Sender<i32>) {
    for i in 0..10 {
        tx.send(i)
    }
}

fn consumer(rx: mpsc::Receiver<i32>) {
    while true {
        auto msg = rx.recv()
        match msg {
            Some(value) => println("Got: " + str(value)),
            None => break
        }
    }
}
```

## Atomic Operations

Use atomic types for lock-free concurrent access:

```toka
import std/atomic

auto counter = atomic::AtomicI32(0)

fn increment() {
    counter.fetch_add(1)
}
```

## Mutex / Sync

For shared mutable state:

```toka
import std/sync

auto lock = sync::Mutex::new()

fn access_shared() {
    let guard = lock.lock()
    // Access shared data safely
    // guard released automatically when it goes out of scope
}
```

## Safety Guarantees

Toka's concurrency model prevents:

- **Data races**: Two tasks cannot simultaneously write to the same memory
- **Deadlocks**: The compiler analyzes lock ordering
- **Send/Sync violations**: Types that are not thread-safe cannot be shared across tasks
