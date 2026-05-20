# Hello, Toka！

让我们编写你的第一个 Toka 程序。创建一个名为 `hello.tk` 的文件：

```toka
import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}
```

### 运行程序

Toka 提供了两种方式来运行你的代码：

**方式一：一步运行**

```bash
toka run hello.tk
```

这会在一个命令中完成编译和执行。

**方式二：先构建再运行**

```bash
tokac build hello.tk -o hello
./hello
```

这会生成一个可以分发的独立二进制文件。

### 预期输出

```
Hello, Toka!
```

## 代码解析

让我们逐一拆解每部分的作用：

- `import std/io::println` — 从标准库的 IO 模块中导入 `println` 函数。
- `fn main() -> i32` — 声明程序的入口点。每个 Toka 可执行文件都需要一个 `main` 函数。`-> i32` 表示它返回一个整数（退出码）。
- `println("Hello, Toka!")` — 将字符串打印到标准输出。
- `return 0` — 返回退出码 0，表示成功。

### 快速一行测试

如果想快速测试而不创建文件，也可以直接使用：

```bash
echo 'import std/io::{println} fn main() { println("Hello, Toka World!") }' > hello.tk
toka run hello.tk
```

## 下一步

在下一节中，我们将探索标准项目结构，以及如何组织更大的 Toka 项目。
