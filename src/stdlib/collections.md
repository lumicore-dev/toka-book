# Collections

Toka provides a rich set of data structures for storing and organizing data efficiently.

## Vec (Dynamic Array)

```toka
import std/io::println
import std/vec::Vec

fn example() {
    auto numbers# = Vec<i32>::new()
    
    numbers#.push(1)
    numbers#.push(2)
    numbers#.push(3)
    
    println("{}", numbers.at(0))  // 1
    
    auto i# = 0:usize
    loop i < numbers.len() {
        println("{}", numbers.at(i))
        i = i + 1:usize
    }
}
```

## Map (Hash Map)

```toka
import std/io::println
import std/hashmap::HashMap
import core/option::Option
import core/primitives

fn example() {
    auto scores# = HashMap<i32, i32>::new()
    
    scores#.insert(1, 95)
    scores#.insert(2, 87)
    
    match scores.get(1) {
        auto Option<i32>::Some(score) => { println("ID 1: {}", score) }
        auto Option<i32>::None => { println("Not found") }
    }
}
```

## BTreeMap (Ordered Map)

```toka
import std/io::println
import std/btreemap::BTreeMap
import core/primitives

fn example() {
    auto items# = BTreeMap<str, i32>::new()
    
    items#.insert("apple", 5)
    items#.insert("banana", 3)
    items#.insert("cherry", 8)
    
    println("Iterated")
}
```

## BTreeSet (Ordered Set)

```toka
import std/io::println
import std/btreeset::BTreeSet
import core/primitives

fn example() {
    auto unique# = BTreeSet<i32>::new()
    
    unique#.insert(3)
    unique#.insert(1)
    unique#.insert(2)
    unique#.insert(1)  // Duplicate, ignored
    
    println("{}", unique.len())
}
```

## Deque (Double-Ended Queue)

```toka
import std/io::println
import std/deque::VecDeque

fn example() {
    auto queue# = VecDeque<str>::new()
    
    queue#.push_back("first")
    queue#.push_back("second")
    queue#.push_front("priority")
    
    queue#.pop_front()
    println("{}", queue.len())
}
```

## Slab (Generational Slab Allocator)

Toka completely abolishes linked lists to embrace the contiguous physical memory topology of modern CPUs. Instead, the standard library introduces the generational slab allocator `std/slab::Slab`. It manages objects as slots inside a contiguous memory buffer (`Vec`), supporting rapid $O(1)$ insertion, removal, and retrieval. It employs a `SlabID` generational check technique to fully eliminate the risk of ABA problems or stale index lookups.

The Slab's lookup methods (`get` and `get_mut`) implement advanced **lifetime dependency declarations (`<- self`)**, returning zero-copy `Option<&'T>` and `Option<&#'T>` borrows.

```toka
import std/slab::{Slab, SlabID}
import std/io::{println}
import core/option::{Option}

shape Entity (
    name: string,
    val: i32
)

fn main() -> i32 {
    auto slab# = Slab<Entity>::new()

    // 1. Insert elements, returning a SlabID containing both index and generation
    auto id1 = slab#.insert(Entity(name = string::from("alpha"), val = 10))
    auto id2 = slab#.insert(Entity(name = string::from("beta"), val = 20))

    // 2. Retrieve zero-copy borrowed views safely
    auto e1_opt = slab.get(id1.clone())
    if e1_opt.is_some() {
        auto &e1 = e1_opt.unwrap()
        println("ID1 val: {}", e1.val as i64) // 10
    }

    // 3. Remove an element and reclaim its slot
    auto removed = slab#.remove(id1.clone())

    // 4. Insert another element: Slab automatically reuses Slot 0!
    // However, the generation counter automatically increments to 2!
    auto id3 = slab#.insert(Entity(name = string::from("gamma"), val = 30))

    // 5. Querying with the stale id1 now safely returns None, preventing ABA reads!
    auto old_opt = slab.get(id1)
    assert(old_opt.is_none(), "generational ID should prevent ABA stale read")

    return 0
}
```

## Heap (Priority Queue)

```toka
import std/io::println
import std/heap::BinaryHeap
import core/primitives

fn example() {
    auto max_cmp: fn(i32, i32) -> bool = { a, b => a > b }
    auto heap# = BinaryHeap<i32>::new(max_cmp)
    heap#.push(5)
    heap#.push(10)
    heap#.push(3)
    
    heap#.pop()
    println("10")
}
```

## Set

```toka
import std/io::println
import std/hashset::HashSet
import core/primitives

fn example() {
    auto tags# = HashSet<i32>::new()
    tags#.insert(1)
    tags#.insert(2)
    tags#.insert(3)
    
    if tags.contains(2) {
        println("Found 2!")
    }
}
```
