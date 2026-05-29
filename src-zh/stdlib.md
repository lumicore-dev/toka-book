# 标准库概览

Toka 的标准库提供了全面的模块集，满足日常编程任务的需求。

## 模块结构

标准库分为四个层级：

### `lib/core/` — 核心语言原语

这些模块提供了语言本身所依赖的基础类型和 trait：

| 模块 | 描述 |
|------|------|
| `prelude` | 每个 Toka 程序自动导入的基础内容 |
| `types` | 类型定义和极限值 |
| `traits` | 核心 traits（`@Hash`、`@PartialEq`、`@PartialOrd`） |
| `str` | 字符串切片操作 |
| `memory` | 内存管理原语 |
| `option` | 用于可空值的 `Option<T>` 类型 |
| `result` | 用于错误处理的 `Result<T, E>` 类型 |

### `lib/sys/` — 底层系统原语

这些模块提供了与操作系统和底层运行时的直接绑定与原语：

| 模块 | 描述 |
|------|------|
| `libc` | 平台相关的 C 标准库 API 声明与绑定 |
| `termios` | 底层 Tty 终端模式与控制属性配置 |
| `thread` | 操作系统原生线程底层接口 |
| `sync` | 操作系统级同步原语及锁实现 |
| `linux` / `macos` / `windows` | 针对特定操作系统的底层系统调用与绑定 |

### `lib/std/` — 标准库

面向应用程序开发的即用型标准模块：

| 模块 | 描述 |
|------|------|
| `prelude` | 自动导入的标准库预导入模块，包含最常用类型 |
| `char` | Unicode 字符处理与分类 |
| `string` | UTF-8 编码的动态字符串类型与视图（`string` / `str`） |
| `vec` | 动态增长的顺序数组容器（`Vec`） |
| `deque` | 基于循环缓冲区的双端队列（`VecDeque`） |
| `slab` | 零拷贝分代插槽分配器（`Slab` / `SlabID`） |
| `hashmap` | 基于哈希表的高性能映射（`HashMap`） |
| `hashset` | 基于哈希表的唯一元素集合（`HashSet`） |
| `btreemap` | 基于 B-Tree 的有序键值映射（`BTreeMap`） |
| `btreeset` | 基于 B-Tree 的有序唯一集合（`BTreeSet`） |
| `heap` | 最大堆/最小堆实现的优先队列（`BinaryHeap`） |
| `io` | 带缓冲的标准控制台 I/O（`stdin` / `stdout` / `println`） |
| `fs` | 文件系统读写及目录元数据操作 |
| `path` | 跨平台文件路径解析与操作（`Path` / `PathBuf`） |
| `env` | 环境变量获取、进程参数与系统上下文交互 |
| `process` | 子进程的创建、状态控制与管道交互 |
| `thread` | 操作系统原生线程管理与生命周期控制（`Thread`） |
| `sync` | 线程级同步锁原语（`Mutex` / `Condvar` / `WaitGroup`） |
| `atomic` | 硬件级原子操作与无锁同步原语 |
| `mpsc` | 多生产者单消费者（MPSC）线程并发通道 |
| `task` | 协程异步任务的调度、上下文管理与运行时 |
| `net` | TCP 与 UDP 套接字网络通信接口 |
| `math` | 常用数学计算函数与极限常量 |
| `rand` | 伪随机数生成器与随机实用工具 |
| `time` | 系统时间与单调递增持续时间（`Duration` / `Instant`） |
| `fmt` | 文本格式化与调试输出工具（`Format`） |
| `memory` | 底层内存分配、区域拷贝与裸指针辅助方法 |
| `error` | 通用错误特征（`Error`）与故障基类定义 |
| `panic` | 运行时致命错误触发、拦截与堆栈挂钩处理 |

### `lib/stdx/` — 实验性 / 扩展库 (stdx)

仍在演进中的新模块或可选扩展：

| 模块 | 描述 |
|------|------|
| `log` | 基础日志打印与级别过滤机制 |
| `net/http` | HTTP 客户端和服务器 |
| `net/url` | URL 解析 |
| `serde/json` | JSON 序列化 |
| `crypto/md5` | MD5 哈希 |
| `crypto/sha1` | SHA-1 哈希 |
| `crypto/sha256` | SHA-256 哈希 |
| `websocket` | WebSocket 客户端和服务器 |
| `cli/flag` | CLI 参数解析 |

## 设计理念

Toka 的标准库遵循以下原则：

1. **零依赖** — 所有内容都使用纯 Toka 和 LLVM 后端构建
2. **一致的 API** — 不同模块之间采用相似的模式
3. **错误感知** — 每个可能失败的操作都返回 `Result` 或 `Option`
4. **高性能** — 编译为原生代码，无隐藏开销
