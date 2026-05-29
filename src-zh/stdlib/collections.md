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
    loop i < numbers.len() {
        println("{}", numbers.at(i))
        i = i + 1:usize
    }
}
```

## Map（哈希映射）

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
        auto Option<i32>::None => { println("未找到") }
    }
}
```

## BTreeMap（有序映射）

```toka
import std/io::println
import std/btreemap::BTreeMap
import core/primitives

fn example() {
    auto items# = BTreeMap<str, i32>::new()
    
    items#.insert("apple", 5)
    items#.insert("banana", 3)
    items#.insert("cherry", 8)
    
    println("迭代完成")
}
```

## BTreeSet（有序集合）

```toka
import std/io::println
import std/btreeset::BTreeSet
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
    auto queue# = VecDeque<str>::new()
    
    queue#.push_back("first")
    queue#.push_back("second")
    queue#.push_front("priority")
    
    queue#.pop_front()
    println("{}", queue.len())
}
```

## Slab（分代插槽分配器）

Toka 彻底剔除了链表以拥抱现代 CPU 的 contiguous 物理内存拓扑模型。作为替代，标准库引入了分代插槽分配器 `std/slab::Slab`。它在连续的内存空间（Vec）中以插槽（Slot）形式管理对象，支持 $O(1)$ 快速插入、删除与查询，并使用 `SlabID` 分代（Generation）检查技术，从根本上杜绝了 ABA 悬空指针/失效索引引用的安全隐患。

Slab 的查询方法（`get` 与 `get_mut`）采用了高级的**生命周期依赖声明（`<- self`）**，返回具有零拷贝特性的 `Option<&'T>` 和 `Option<&#'T>` 借用。

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

    // 1. 插入元素，返回含有 index 与 generation 的 SlabID
    auto id1 = slab#.insert(Entity(name = string::from("alpha"), val = 10))
    auto id2 = slab#.insert(Entity(name = string::from("beta"), val = 20))

    // 2. 零拷贝安全读取借用视图
    auto e1_opt = slab.get(id1.clone())
    if e1_opt.is_some() {
        auto &e1 = e1_opt.unwrap()
        println("ID1 val: {}", e1.val as i64) // 10
    }

    // 3. 删除元素并归还插槽
    auto removed = slab#.remove(id1.clone())

    // 4. 再次插入元素：Slab 将自动复用刚刚释放的插槽 (Slot 0)
    // 但分代数（Generation）会自动递增至 2！
    auto id3 = slab#.insert(Entity(name = string::from("gamma"), val = 30))

    // 5. 此时使用旧的已失效 id1 去获取数据将安全地返回 None，完美拦截 ABA 问题！
    auto old_opt = slab.get(id1)
    assert(old_opt.is_none(), "generational ID should prevent ABA stale read")

    return 0
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
import std/hashset::HashSet
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
