# Serialization

Toka provides built-in support for serializing and deserializing data, with JSON support out of the box.

## JSON Encoding

Serialize data to JSON:

```toka
import std/serde/json
import std/string::String
import std/io::println

pub shape Person(
    name: String,
    age: i32,
    active: bool
)

fn encode() {
    auto person = Person(name = String::from("Alice"), age = 30, active = true)
    // auto json_str = json::to_json(person)
    // println("{}", json_str.c_str())  // {"name":"Alice","age":30,"active":true}
}
```

## JSON Decoding

Parse JSON back into Toka types:

```toka
import std/serde/json
import std/string::String
import std/io::println
import core/result::Okay

pub shape Person(
    name: String,
    age: i32,
    active: bool
)

fn decode() {
    auto data = "{\"name\":\"Bob\",\"age\":25,\"active\":false}"
    // auto person_res = json::deserialize_shape<Person>(data)
}
```

## Base64 Encoding

```toka
import std/encoding/base64
import std/string::String
import std/io::println

fn example() {
    auto original = String::from("Hello, Toka!")
    auto encoded = base64::encode_str(original.as_str())
    println("{}", encoded.c_str())  // SGVsbG8sIFRva2Eh
    
    // Note: base64::decode is under development
    // auto decoded = base64::decode(encoded)?
}
```

## Hex Encoding

```toka
import std/encoding/hex
import std/io::println

fn example() {
    auto bytes: [u8; 5] = [0x48, 0x65, 0x6C, 0x6C, 0x6F]
    auto hex_str = hex::encode_hex(*bytes as *[u8], 5:usize)
    println("{}", hex_str.c_str())  // 48656C6C6F
    
    // Note: hex::decode is under development
    // auto decoded = hex::decode(hex_str)?
}
```

## Custom Serialization

Implement the `@Serialize` trait for custom types:

```toka
import std/serde/json::{@ToJson}
import std/string::String

pub shape Person(name: String, age: i32, active: bool)

impl Person@ToJson {
    pub fn write_json(self, buf#: String) -> String {
        buf#.push_str("{\"name\":\"")
        buf#.push_str(self.name.c_str())
        buf#.push_str("\",\"age\":")
        buf#.push_str(String::from_int(self.age).c_str())
        buf#.push_str("}")
        return buf
    }
}
```
