# 标准库概览

Toka 的标准库提供了全面的模块集，满足日常编程任务的需求。

## 模块结构

标准库分为三个层级：

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

### `lib/std/` — 标准库

面向应用程序开发的即用型模块：

| 模块 | 描述 |
|------|------|
| `io` | 控制台 I/O |
| `fs` | 文件系统操作 |
| `path` | 路径操作 |
| `net` | TCP/UDP 网络编程 |
| `time` | 时间和持续时间 |
| `math` | 数学函数 |
| `rand` | 随机数生成 |
| `vec` | 动态数组 |
| `hash_map` | 哈希映射 |
| `btree_map` | 有序映射 |
| `string` | UTF-8 字符串类型 |

### `lib/stdx/` — 实验性 / 扩展库 (stdx)

仍在演进中的新模块或可选扩展：

| 模块 | 描述 |
|------|------|
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
