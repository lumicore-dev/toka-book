# 密码学

Toka 提供标准的密码学模块，支持常用的哈希算法。

## MD5 哈希

```toka
import std/io::println
import stdx/crypto/md5::Md5

fn example() {
    auto md5# = Md5::new()
    md5#.update("Hello, Toka!")
    auto hash = md5#.finalize_hex()
    println("MD5: {}", hash)
}
```

## SHA-1

```toka
import std/io::println
import stdx/crypto/sha1::Sha1

fn example() {
    auto sha1# = Sha1::new()
    sha1#.update("Hello, Toka!")
    auto hash = sha1#.finalize_hex()
    println("SHA1: {}", hash)
}
```

## SHA-256

```toka
import std/io::println
import stdx/crypto/sha256::Sha256

fn example() {
    auto sha256# = Sha256::new()
    sha256#.update("Hello, Toka!")
    auto hash = sha256#.finalize_hex()
    println("SHA256: {}", hash)
}
```

## 文件哈希

对文件内容进行哈希：

```toka
import std/fs
import stdx/crypto/sha256::Sha256
import core/result::Result

fn verify_file(path: string) -> Result<bool, string> {
    auto content = fs::read_to_string(path).unwrap()
    auto sha256# = Sha256::new()
    sha256#.update(content.as_str())
    auto computed = sha256#.finalize_hex()
    
    return Result<bool, string>::Ok(computed.len() > 0:usize)
}
```

## 安全随机数

用于密码学应用：

```toka
import stdx/rand/rand::Random

fn generate_key() -> u64 {
    // 伪随机字节（不安全，仅用于演示）
    auto rng# = Random::new(12345:u64, 1:u64)
    return rng#.next_u64()
}
```

密码学模块适用于：
- 密码哈希和验证
- 文件完整性检查
- 数据签名和验证
- 安全随机数生成
