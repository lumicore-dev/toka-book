# Concurrency

Toka provides lightweight concurrency through tasks and message passing, enabling efficient parallel execution.

## Tasks

Spawn concurrent tasks with the `task` module:

```toka
import std/io::println
import std/thread::thread_spawn

fn worker(id: i32) -> i32 {
    println("Worker {} started", id)
    // Do work...
    println("Worker {} done", id)
    return 0
}

fn main() -> i32 {
    auto t1# = thread_spawn<i32>({ => return cede worker(1) })
    auto t2# = thread_spawn<i32>({ => return cede worker(2) })
    
    t1#.join()
    t2#.join()
    return 0
}
```

## MPSC Channels

Communicate between tasks using MPSC (Multi-Producer, Single-Consumer) channels:

```toka
import std/mpsc::channel
import std/thread::thread_spawn
import std/io::println

fn main() -> i32 {
    auto pair# = channel<i32>()
    
    auto tx# = cede pair.tx
    auto rx# = cede pair.rx
    
    thread_spawn<i32>({ [cede tx] => 
        tx#.send(cede 42)
        return cede 0
    })
    
    thread_spawn<i32>({ [cede rx] =>
        auto res_opt = rx#.recv()
        println("Got a message!")
        return cede 0
    })
    
    return 0
}
```

## Atomic Operations

Use atomic types for lock-free concurrent access:

```toka
import std/atomic::*

fn main() -> i32 {
    auto counter = AtomicI32::new(0)
    counter.fetch_add(1, Ordering::SeqCst)
    return 0
}
```

## Mutex / Sync

For shared mutable state:

```toka
import std/sync::Mutex

fn main() -> i32 {
    auto lock# = Mutex<i32>::new(0:i32)
    
    auto g = lock#.lock().unwrap()
    // Access shared data safely
    // g released automatically when it goes out of scope
    return 0
}
```

## Safety Guarantees

Toka's concurrency model prevents:

- **Data races**: Two tasks cannot simultaneously write to the same memory
- **Deadlocks**: The compiler analyzes lock ordering
- **Send/Sync violations**: Types that are not thread-safe cannot be shared across tasks
