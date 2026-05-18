# Networking

Toka's networking module provides TCP, UDP, and HTTP capabilities for building networked applications.

## HTTP Client

Make HTTP requests with the `net_http` module:

```toka
import std/string::String
import core/result::Result

// Note: HTTP client is under development
fn fetch(url: String) -> Result<String, String> {
    // auto response = net_http::get(url)?
    // return Ok(response.body)
    return Result<String, String>::Ok(String::from("Response"))
}
```

## HTTP Server

Build a simple HTTP server:

```toka
import std/net_http::{HttpResponse, HttpRequest}
import std/string::String

// Note: HTTP Server is under development
fn main() -> i32 {
    // auto server = net_http::Server::new()
    // server.get("/", |req| => HttpResponse::html(String::from("<h1>Hello, Toka!</h1>")))
    // server.listen(8080)
    return 0
}
```

## TCP Connections

Use the `net` module for raw TCP:

```toka
import std/net::TcpStream
import std/string::String
import std/io::println
import core/result::Result

fn handle_client(stream#: TcpStream) {
    auto buf: [u8; 1024] = [0:u8; 1024]
    auto res = stream#.read(&buf[0], 1024:usize)
    match res {
        auto Result::Ok(n) => {
            println("Received {} bytes", n)
            stream#.write_string(String::from("ACK"))
        }
        auto Result::Err(&e) => {
            println("Error")
        }
    }
}
```

## WebSocket

For real-time bidirectional communication, use the `stdx/websocket` module:

```toka
import std/io::println
import std/string::String

// Note: WebSocket is under development
fn echo_server() {
    // auto ws = websocket::Server::new()
    // ws.on_message(|msg| => println("Got: {}", msg))
    // ws.listen(9000)
}
```

## URL Parsing

```toka
import std/io::println
import std/string::String

// Note: URL parsing is under development
fn parse_url() {
    // auto url = net::Url::parse("https://api.example.com/data?id=1")
    // println("Host: {}", url.host)
}
```
