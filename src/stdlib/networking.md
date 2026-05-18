# Networking

Toka's networking module provides TCP, UDP, and HTTP capabilities for building networked applications.

## HTTP Client

Make HTTP requests with the `net_http` module:

```toka
import std/net_http

fn fetch(url: str) -> Result<string, string> {
    auto response = net_http::get(url)?
    return Ok(response.body)
}
```

## HTTP Server

Build a simple HTTP server:

```toka
import std/net_http

fn main() -> i32 {
    let server = net_http::Server::new()

    server.get("/", fn(req) -> Response {
        return Response::html("<h1>Hello, Toka!</h1>")
    })

    server.get("/api/hello", fn(req) -> Response {
        return Response::json("{\"message\": \"Hello from Toka!\"}")
    })

    server.listen(8080)?
    return 0
}
```

## TCP Connections

Use the `net` module for raw TCP:

```toka
import std/net

fn handle_client(stream: net::TcpStream) {
    let msg = stream.read_line()?
    println("Received: " + msg)
    stream.write("ACK: " + msg)?
}
```

## WebSocket

For real-time bidirectional communication, use the `stdx/websocket` module:

```toka
import stdx/websocket

fn echo_server() {
    let ws = websocket::Server::new()
    
    ws.on_message(fn(msg) {
        println("Got: " + msg)
        ws.send("Echo: " + msg)?
    })
    
    ws.listen(9000)?
}
```

## URL Parsing

```toka
import std/net

fn parse_url() {
    let url = net::Url::parse("https://api.example.com/data?id=1")?
    println("Host: " + url.host)
    println("Path: " + url.path)
}
```
