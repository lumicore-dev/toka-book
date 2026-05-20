# 并发编程

Toka 通过任务（task）和消息传递提供轻量级的并发能力，实现高效的并行执行。

## 任务

使用 `task` 模块创建并发任务：

```toka
import std/io::println
import std/thread::thread_spawn

fn worker(id: i32) -> i32 {
    println("Worker {} 开始工作", id)
    // 执行任务...
    println("Worker {} 完成", id)
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

## MPSC 通道

使用 MPSC（多生产者，单消费者）通道在任务间通信：

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
        println("收到一条消息！")
        return cede 0
    })
    
    return 0
}
```

## 原子操作

使用原子类型实现无锁并发访问：

```toka
import std/atomic::*

fn main() -> i32 {
    auto counter = AtomicI32::new(0)
    counter.fetch_add(1, Ordering::SeqCst)
    return 0
}
```

## Mutex / 同步

用于共享可变状态：

```toka
import std/sync::Mutex

fn main() -> i32 {
    auto lock# = Mutex<i32>::new(0:i32)
    
    auto g = lock#.lock().unwrap()
    // 安全访问共享数据
    // g 在离开作用域时自动释放
    return 0
}
```

## 安全保障

Toka 的并发模型防止：

- **数据竞争**：两个任务不能同时写入同一内存
- **死锁**：编译器分析锁的顺序
- **Send/Sync 违规**：非线程安全的类型不能在任务间共享
