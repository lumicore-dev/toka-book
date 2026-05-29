# Cryptography

Toka provides a standard cryptography module with support for common hash algorithms.

## MD5 Hashing

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

## File Hashing

Hash the contents of a file:

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

## Secure Random

For cryptographic applications:

```toka
import stdx/rand/rand::Random

fn generate_key() -> u64 {
    // Pseudorandom bytes (Not secure, for demonstration)
    auto rng# = Random::new(12345:u64, 1:u64)
    return rng#.next_u64()
}
```

The crypto module is useful for:
- Password hashing and verification
- File integrity checking
- Data signing and verification
- Secure random number generation
