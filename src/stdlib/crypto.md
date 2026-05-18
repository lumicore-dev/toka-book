# Cryptography

Toka provides a standard cryptography module with support for common hash algorithms.

## MD5 Hashing

```toka
import std/crypto/md5

fn example() {
    let hash = md5::hash("Hello, Toka!")
    println("MD5: " + hash)
}
```

## SHA-1

```toka
import std/crypto/sha1

fn example() {
    let hash = sha1::hash("Hello, Toka!")
    println("SHA1: " + hash)
}
```

## SHA-256

```toka
import std/crypto/sha256

fn example() {
    let hash = sha256::hash("Hello, Toka!")
    println("SHA256: " + hash)
}
```

## File Hashing

Hash the contents of a file:

```toka
fn verify_file(path: str) -> Result<bool, string> {
    let content = fs::read_to_string(path)?
    let computed = sha256::hash(content)
    let expected = "expected_hash_here"
    return Ok(computed == expected)
}
```

## Secure Random

For cryptographic applications:

```toka
import std/rand

fn generate_key() -> Vec<u8> {
    // Cryptographically secure random bytes
    return rand::secure_bytes(32)
}
```

The crypto module is useful for:
- Password hashing and verification
- File integrity checking
- Data signing and verification
- Secure random number generation
