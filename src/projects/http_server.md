# HTTP Server

Build a fully-functional HTTP server using Toka's modern networking library.

## Basic Server

Toka's HTTP engine is located in `stdx/net/http`. You can build a lightweight HTTP server by binding a `TcpListener` from `std/net` and processing incoming connections:

```toka
import std/io::{println}
import stdx/net/http::{HttpRequest, HttpResponse, parse_http_request}
import std/net::{TcpListener, TcpStream, Ipv4Addr, SocketAddrV4}
import std/string::{String}
import core/result::{Result}

fn handle_client(stream#: TcpStream) {
    auto buf: [char; 1024] = [0 as char; 1024]
    auto *buf_ptr# = &buf[0] as *u8
    
    auto read_res = stream#.read(*buf_ptr, 1024:usize)
    match read_res {
        auto Result::Ok(n) => {
            if n > 0:usize {
                auto req_str = String::from_with_len(&buf[0] as *char, n as i32)
                auto req# = parse_http_request(req_str)
                
                auto resp# = HttpResponse::not_found()
                if req.path.eq(String::from("/")) {
                    resp = HttpResponse::html(String::from("<h1>Hello, Toka!</h1>"))
                }
                
                auto resp_str = resp#.to_string()
                auto *ptr = resp_str.c_str() as *u8
                stream#.write(*ptr, resp_str.len() as usize)
            }
        }
        _ => {}
    }
    stream#.close()
}

fn main() -> i32 {
    // Demonstration server setup
    return 0
}
```

## API with JSON Responses

You can use the `@ToJson` trait from `stdx/serde/json` to automatically serialize custom shape objects and return them as JSON responses:

```toka
import stdx/net/http::{HttpResponse}
import stdx/serde/json::{serialize_shape, to_json, @ToJson}
import std/string::{String}

pub shape Message(text: String, status: String)

impl Message@ToJson {
    pub fn write_json(self, buf#: String) -> String {
        return serialize_shape(self, buf)
    }
}

fn api_status() -> HttpResponse {
    auto msg = Message(
        text = String::from("Server is running"),
        status = String::from("ok")
    )
    auto json_body = to_json(msg)
    return HttpResponse(
        status_code = 200,
        content_type = String::from("application/json"),
        body = json_body
    )
}

fn main() -> i32 {
    return 0
}
```

## Route Parameters

You can easily match dynamic parts of a URL path to extract route parameters manually:

```toka
import stdx/net/http::{HttpRequest, HttpResponse}
import std/string::{String}

fn handle_user_route(req: HttpRequest) -> HttpResponse {
    // Match dynamic path "/api/users/<id>"
    if req.path.as_str().starts_with(s"/api/users/") {
        auto user_id = req.path.substr(11, req.path.len() - 11)
        auto body# = String::from("User ID: ")
        body#.push_view(user_id)
        return HttpResponse(
            status_code = 200,
            content_type = String::from("text/plain"),
            body = body
        )
    }
    return HttpResponse::not_found()
}

fn main() -> i32 {
    return 0
}
```

## Middleware

Wrap your routing handlers to inject custom middleware functionality, such as request logging or execution timing:

```toka
import stdx/net/http::{HttpRequest, HttpResponse}
import std/string::{String}
import std/io::{println}

fn logger_middleware(req: HttpRequest, next: fn(HttpRequest) -> HttpResponse) -> HttpResponse {
    println("Request Path: {}", req.path)
    auto res = next(req)
    println("Response Status: {}", String::from_int(res.status_code))
    return res
}

fn main() -> i32 {
    return 0
}
```

## Static Files

Serve local assets by reading files dynamically using the `std/fs` module:

```toka
import stdx/net/http::{HttpResponse}
import std/string::{String}
import std/fs::{read_to_string}
import core/result::{Result}

fn serve_static_file(path: String) -> HttpResponse {
    auto file_content = read_to_string(path)
    match file_content {
        auto Result::Ok(&content) => {
            return HttpResponse(
                status_code = 200,
                content_type = String::from("text/html"),
                body = content.clone()
            )
        }
        _ => return HttpResponse::not_found()
    }
}

fn main() -> i32 {
    return 0
}
```

## Full Example

A complete HTTP server featuring routing, HTML rendering, and custom API JSON responses:

```toka
import std/io::{println}
import stdx/net/http::{HttpRequest, HttpResponse, HttpMethod, parse_http_request}
import std/net::{TcpListener, TcpStream, Ipv4Addr, SocketAddrV4}
import std/string::{String}
import core/result::{Result}

fn route_request(req: HttpRequest) -> HttpResponse {
    auto is_get# = false
    match req.method {
        auto HttpMethod::GET => { is_get = true }
        _ => {}
    }
    
    if is_get && req.path.eq(String::from("/status")) {
        return HttpResponse(
            status_code = 200,
            content_type = String::from("application/json"),
            body = String::from("{\"status\":\"ok\"}")
        )
    }
    
    if is_get && req.path.eq(String::from("/")) {
        return HttpResponse::html(String::from("<h1>Toka HTTP Server</h1>"))
    }
    
    return HttpResponse::not_found()
}

fn handle_connection(stream#: TcpStream) {
    auto buf: [char; 1024] = [0 as char; 1024]
    auto *buf_ptr# = &buf[0] as *u8
    
    auto read_res = stream#.read(*buf_ptr, 1024:usize)
    match read_res {
        auto Result::Ok(n) => {
            if n > 0:usize {
                auto req_str = String::from_with_len(&buf[0] as *char, n as i32)
                auto req# = parse_http_request(req_str)
                auto resp# = route_request(req)
                auto resp_str = resp#.to_string()
                
                auto *ptr = resp_str.c_str() as *u8
                stream#.write(*ptr, resp_str.len() as usize)
            }
        }
        _ => {}
    }
    stream#.close()
}

fn main() -> i32 {
    // Demonstration server setup
    return 0
}
```
