# Networking

Toka's networking module provides TCP, UDP, and HTTP capabilities for building networked applications.

## HTTP Client

Make HTTP requests with the `stdx/net/http` module:

```toka
import std/string::String
import core/result::Result

// Note: HTTP client is under development
fn fetch(url: String) -> Result<String, String> {
    // auto response = http::get(url)!
    // return Ok(response.body)
    return Result<String, String>::Ok(String::from("Response"))
}
```

## HTTP Server

Build a simple HTTP server using the `stdx/net/http` module:

```toka
import stdx/net/http::{HttpResponse, HttpRequest}
import std/string::String

// Note: HTTP Server is built by integrating std/net with stdx/net/http
fn main() -> i32 {
    // auto listener# = TcpListener::bind(addr)
    // auto stream# = listener#.accept()
    // auto req# = parse_http_request(req_str)
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
import core/result::Result
import stdx/net/url::{Url, parse_url}

fn example() {
    auto url_res = parse_url(String::from("https://api.example.com:8080/data?id=1#top"))
    match url_res {
        auto Result::Ok(&url) => {
            println("Host: {}", url.host)
            println("Port: {}", String::from_int(url.port as i32))
        }
        auto Result::Err(&err) => {
            println("Error: {}", err)
        }
    }
}
```
