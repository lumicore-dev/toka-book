# 泛型（Generics）

泛型允许你编写灵活、可复用的代码，适用于任何类型，同时保持编译时安全性。

## 泛型函数

使用简写 `'T` 语法定义泛型函数：

```toka
fn identity<'T>(value: 'T) -> 'T {
    return value
}

auto x = identity(42)      // 适用于整数
auto y = identity("hello") // 适用于字符串
```

## 泛型约束

使用 trait 约束泛型：

```toka
fn max<'T: @PartialOrd>(a: 'T, b: 'T) -> 'T {
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
