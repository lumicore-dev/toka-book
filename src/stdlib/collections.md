# Collections

Toka provides a rich set of data structures for storing and organizing data efficiently.

## Vec (Dynamic Array)

```toka
import std/vec

fn example() {
    // Create a new vector
    auto numbers = vec::Vec<i32>::new()
    
    // Add elements
    numbers.push(1)
    numbers.push(2)
    numbers.push(3)
    
    // Access elements
    println(str(numbers[0]))  // 1
    
    // Iterate
    for n in numbers {
        println(str(n))
    }
}
```

## Map (Hash Map)

```toka
import std/map

fn example() {
    auto scores = map::Map<string, i32>::new()
    
    scores.set("Alice", 95)
    scores.set("Bob", 87)
    
    match scores.get("Alice") {
        Some(score) => println("Alice: " + str(score)),
        None => println("Not found")
    }
}
```

## BTreeMap (Ordered Map)

```toka
import std/btree_map

fn example() {
    auto items = btree_map::BTreeMap<string, i32>::new()
    
    items.set("apple", 5)
    items.set("banana", 3)
    items.set("cherry", 8)
    
    // Iterates in key order: apple, banana, cherry
    for key, value in items {
        println(key + ": " + str(value))
    }
}
```

## BTreeSet (Ordered Set)

```toka
import std/btree_set

fn example() {
    auto unique = btree_set::BTreeSet<i32>::new()
    
    unique.insert(3)
    unique.insert(1)
    unique.insert(2)
    unique.insert(1)  // Duplicate, ignored
    
    // Iterates in order: 1, 2, 3
    for n in unique {
        println(str(n))
    }
}
```

## Deque (Double-Ended Queue)

```toka
import std/deque

fn example() {
    auto queue = deque::Deque<string>::new()
    
    queue.push_back("first")
    queue.push_back("second")
    queue.push_front("priority")
    
    println(queue.pop_front())  // "priority"
}
```

## List (Linked List)

```toka
import std/list

fn example() {
    auto items = list::List<i32>::new()
    items.push_front(10)
    items.push_back(20)
}
```

## Heap (Priority Queue)

```toka
import std/heap

fn example() {
    auto heap = heap::MaxHeap<i32>::new()
    heap.push(5)
    heap.push(10)
    heap.push(3)
    
    println(str(heap.pop()))  // 10 — largest first
}
```

## Set

```toka
import std/set

fn example() {
    auto tags = set::Set<string>::new()
    tags.insert("rust")
    tags.insert("toka")
    tags.insert("language")
    
    if tags.contains("toka") {
        println("Found Toka!")
    }
}
```
