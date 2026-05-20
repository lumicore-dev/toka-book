# 网络编程

Toka 的网络模块提供 TCP、UDP 和 HTTP 能力，用于构建网络应用。

## HTTP 客户端

使用 `stdx/net/http` 模块发起 HTTP 请求：

```toka
import std/string::String
import core/result::Result

// 注意：HTTP 客户端正在开发中
fn fetch(url: String) -> Result<String, String> {
    // auto response = http::get(url)!
    // return Ok(response.body)
    return Result<String, String>::Ok(String::from("Response"))
}
```

## HTTP 服务器

使用 `stdx/net/http` 模块构建简单的 HTTP 服务器：

```toka
import stdx/net/http::{HttpResponse, HttpRequest}
import std/string::String

// 注意：HTTP 服务器通过将 std/net 与 stdx/net/http 集成构建
fn main() -> i32 {
    // auto listener# = TcpListener::bind(addr)
    // auto stream# = listener#.accept()
    // auto req# = parse_http_request(req_str)
    return 0
}
```

## TCP 连接

使用 `net` 模块进行原始 TCP 通信：

```toka
import std/net::TcpStream
import std/string::String
import std/io::println
import core/result::Result

fn handle_client(stream#: TcpStream) {
    auto buf: [u8; 1024] = [0:u8; 1024]
    auto *buf_ptr# = &buf[0] as *u8
    auto res = stream#.read(*buf_ptr, 1024:usize)
    match res {
        auto Result<usize, String>::Ok(n) => {
            println("收到 {} 字节", n)
            stream#.write_string(String::from("ACK"))
        }
        auto Result<usize, String>::Err(&e) => {
            println("错误")
        }
    }
}
```

## WebSocket

对于实时双向通信，使用 `stdx/websocket` 模块：

```toka
import std/io::println
import std/string::String

// 注意：WebSocket 正在开发中
fn echo_server() {
    // auto ws = websocket::Server::new()
    // ws.on_message(|msg| => println("Got: {}", msg))
    // ws.listen(9000)
}
```

## URL 解析

```toka
import std/io::println
import std/string::String
import core/result::Result
import stdx/net/url::{Url, parse_url}

fn example() {
    auto url_res = parse_url(String::from("https://api.example.com:8080/data?id=1#top"))
    match url_res {
        auto Result<Url, String>::Ok(&url) => {
            println("主机：{}", url.host)
            println("端口：{}", String::from_int(url.port as i32))
        }
        auto Result<Url, String>::Err(&err) => {
            println("错误：{}", err)
        }
    }
}
```
