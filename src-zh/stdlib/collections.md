# 集合（Collections）

Toka 提供丰富的数据结构，用于高效存储和组织数据。

## Vec（动态数组）

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
    while i < numbers.len() {
        println("{}", numbers.at(i))
        i = i + 1:usize
    }
}
```

## Map（哈希映射）

```toka
import std/io::println
import std/hash_map::HashMap
import core/option::Option
import core/primitives

fn example() {
    auto scores# = HashMap<i32, i32>::new()
    
    scores#.insert(1, 95)
    scores#.insert(2, 87)
    
    match scores.get(1) {
        auto Option::Some(score) => { println("ID 1: {}", score) }
        auto Option::None() => { println("未找到") }
    }
}
```

## BTreeMap（有序映射）

```toka
import std/io::println
import std/btree_map::BTreeMap
import core/primitives

fn example() {
    auto items# = BTreeMap<view_str, i32>::new()
    
    items#.insert("apple", 5)
    items#.insert("banana", 3)
    items#.insert("cherry", 8)
    
    println("迭代完成")
}
```

## BTreeSet（有序集合）

```toka
import std/io::println
import std/btree_set::BTreeSet
import core/primitives

fn example() {
    auto unique# = BTreeSet<i32>::new()
    
    unique#.insert(3)
    unique#.insert(1)
    unique#.insert(2)
    unique#.insert(1)  // 重复值，被忽略
    
    println("{}", unique.len())
}
```

## Deque（双端队列）

```toka
import std/io::println
import std/deque::VecDeque

fn example() {
    auto queue# = VecDeque<view_str>::new()
    
    queue#.push_back("first")
    queue#.push_back("second")
    queue#.push_front("priority")
    
    queue#.pop_front()
    println("{}", queue.len())
}
```

## List（链表）

```toka
import std/list::LinkedList

fn example() {
    // std/list::LinkedList 在当前编译器中存在已知 bug
    // auto items# = LinkedList<i32>::new()
    // items#.push_front(10)
    // items#.push_back(20)
}
```

## Heap（优先队列）

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

## Set（哈希集合）

```toka
import std/io::println
import std/hash_set::HashSet
import core/primitives

fn example() {
    auto tags# = HashSet<i32>::new()
    tags#.insert(1)
    tags#.insert(2)
    tags#.insert(3)
    
    if tags.contains(2) {
        println("找到 2！")
    }
}
```
