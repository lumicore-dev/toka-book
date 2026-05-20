# 序列化

Toka 提供对数据序列化和反序列化的内置支持，开箱即用支持 JSON。

## JSON 编码

将数据序列化为 JSON：

```toka
import stdx/serde/json
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
    // println("{}", json_str)  // {"name":"Alice","age":30,"active":true}
}
```

## JSON 解码

将 JSON 解析回 Toka 类型：

```toka
import stdx/serde/json
import std/string::String
import std/io::println
import core/result::Result

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

## Base64 编码

```toka
import stdx/encoding/base64
import std/string::String
import std/io::println

fn example() {
    auto original = String::from("Hello, Toka!")
    auto encoded = base64::encode_str(original)
    println("{}", encoded)  // SGVsbG8sIFRva2Eh
    
    // 注意：base64::decode 正在开发中
    // auto decoded = base64::decode(encoded)!
}
```

## Hex 编码

```toka
import stdx/encoding/hex
import std/io::println

fn example() {
    auto bytes: [u8; 5] = [0x48, 0x65, 0x6C, 0x6C, 0x6F]
    auto hex_str = hex::encode_hex(*bytes as *[u8], 5:usize)
    println("{}", hex_str)  // 48656C6C6F
    
    // 注意：hex::decode 正在开发中
    // auto decoded = hex::decode(hex_str)!
}
```

## 自定义序列化

为自定义类型实现 `@Serialize` trait：

```toka
import stdx/serde/json::{@ToJson}
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
