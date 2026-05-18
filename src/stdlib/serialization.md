# Serialization

Toka provides built-in support for serializing and deserializing data, with JSON support out of the box.

## JSON Encoding

Serialize data to JSON:

```toka
import std/serde/json

pub shape Person(
    name: str,
    age: i32,
    active: bool
)

fn encode() {
    let person = Person(name = "Alice", age = 30, active = true)
    let json_str = json::encode(person)
    println(json_str)  // {"name":"Alice","age":30,"active":true}
}
```

## JSON Decoding

Parse JSON back into Toka types:

```toka
import std/serde/json

fn decode() {
    let data = "{\"name\":\"Bob\",\"age\":25,\"active\":false}"
    let person: Person = json::decode(data)?
    println("Name: " + person.name)
    println("Age: " + str(person.age))
}
```

## Base64 Encoding

```toka
import std/encoding/base64

fn example() {
    let original = "Hello, Toka!"
    let encoded = base64::encode(original)
    println(encoded)  // SGVsbG8sIFRva2Eh
    
    let decoded = base64::decode(encoded)?
    println(decoded)  // Hello, Toka!
}
```

## Hex Encoding

```toka
import std/encoding/hex

fn example() {
    let bytes = [0x48, 0x65, 0x6C, 0x6C, 0x6F]
    let hex_str = hex::encode(bytes)
    println(hex_str)  // 48656C6C6F
    
    let decoded = hex::decode(hex_str)?
}
```

## Custom Serialization

Implement the `@Serialize` trait for custom types:

```toka
impl Person@Serialize {
    pub fn serialize(self) -> string {
        return "{name:" + self.name + ",age:" + str(self.age) + "}"
    }
}
```
