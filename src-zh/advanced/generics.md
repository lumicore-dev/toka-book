# 泛型（Generics）

泛型允许你编写灵活、可复用的代码，适用于任何类型，同时保持编译时安全性。

在 Toka 中，定义自定义泛型时通常使用直观的 `T`（不带单引号）形式。带单引号的 `'T`（Morphic 泛型）仅在编写通用容器场景下需要，用以动态兼容灵魂元素与指针元素。

## 泛型函数

使用标准的 `T` 语法定义泛型函数：

```toka
fn identity<T>(value: T) -> T {
    return value
}

auto x = identity(42)      // 适用于整数
auto y = identity("hello") // 适用于字符串
```

## 泛型约束

使用 trait 约束泛型：

```toka
fn max<T: @PartialOrd>(a: T, b: T) -> T {
    if a > b {
        return a
    }
    return b
}
```

该函数适用于任何实现了 `@PartialOrd` 的类型。

## 泛型数据结构

```toka
pub shape Pair<'A, 'B>(
    'first: 'A,
    'second: 'B
)

impl<'A, 'B> Pair<'A, 'B> {
    pub fn new(first: 'A, second: 'B) -> Pair<'A, 'B> {
        return Pair('first = first, 'second = second)
    }
    
    pub fn first(self) -> 'A {
        return self.first
    }
    
    pub fn second(self) -> 'B {
        return self.second
    }
}
```

当定义具有 Morphic 泛型类型（那些带有单引号前缀的类型，如 `'A`）的 Shape 时，Toka 强制执行一条严格规则：对应的字段名称也必须带有单引号前缀（例如 `'first: 'A`）。这表明这些字段能够动态接受不同的指针形态状态，从而规避“灵魂塌陷”。但是，在调用方法或获取字段值时，应像往常一样使用常规字段名称进行引用（例如使用 `self.first`，而不是 `self.'first`）。

### Morphic 泛型与普通泛型的选择

在定义自定义泛型或泛型参数时，Toka 支持带单引号（如 `'T`）和不带单引号（如 `T`）两种写法。它们的核心区别和应用场景如下：

- **`T`（普通泛型，不带单引号）**：**一般自定义泛型时仅需要 `T` 这种形式**。无论你是编写高层业务逻辑、自定义普通数据结构，还是编写普通的辅助函数，均直接推荐使用标准泛型 `T`。它完全消除了单引号的语法噪点，最符合日常开发直觉。
- **`'T`（Morphic 泛型，带单引号）**：**仅在开发底层通用容器或极少数基础库组件**（如 `Vec`、`HashMap`、`Slab` 或并发通道 `Channel`）时，才需要使用 `'T` 参数写法。因为通用容器必须同时兼容**灵魂元素**（裸结构体值类型）与**指针元素**（如 `^` 独占指针或 `~` 共享指针等），Morphic 泛型能够通过多态形态自适应避免“灵魂塌陷”，确保极高效率。

> [!NOTE]
> 在大多数日常编程中，你只需要像传统编程语言那样使用 `T` 即可，这极大地简化了代码的可读性。

## 类型推断

在大多数情况下，Toka 可以推断泛型类型，因此你很少需要显式指定：

```tokalang
fn pair<'A, 'B>(a: 'A, b: 'B) -> Pair<'A, 'B> {
    return Pair::new(a, b)
}

auto p = pair(1, "world")  // Pair<i32, str>
```

## 泛型要求

使用 trait 约束来指定泛型类型必须支持的操作：

| Trait | 描述 |
|-------|------|
| `@PartialEq` | 相等比较（`==`、`!=`） |
| `@PartialOrd` | 排序比较（`<`、`>`、`<=`、`>=`） |
| `@Hash` | 哈希计算 |
| `@encap` | 封装 / 内部可变性 |
