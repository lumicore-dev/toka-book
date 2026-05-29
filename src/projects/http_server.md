# HTTP Server

Build a fully-functional HTTP server using Toka's modern networking library.

## Basic Server

Toka's HTTP engine is located in `stdx/net/http`. You can build a lightweight HTTP server by binding a `TcpListener` from `std/net` and processing incoming connections:

```toka
import std/io::{println}
import stdx/net/http::{HttpRequest, HttpResponse, parse_http_request}
import std/net::{TcpListener, TcpStream, Ipv4Addr, SocketAddrV4}
import core/result::{Result}

fn handle_client(stream#: TcpStream) {
    auto buf: [char; 1024] = [0 as char; 1024]
    auto *buf_ptr# = &buf[0] as *u8
    
    auto read_res = stream#.read(*buf_ptr, 1024:usize)
    match read_res {
        auto Result::Ok(n) => {
            if n > 0:usize {
                auto req_str = string::from_with_len(&buf[0] as *char, n as i32)
                auto req# = parse_http_request(req_str)
                
                auto resp# = HttpResponse::not_found()
                if req.path.eq(string::from("/")) {
                    resp = HttpResponse::html(string::from("<h1>Hello, Toka!</h1>"))
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

pub shape Message(text: string, status: string)

impl Message@ToJson {
    pub fn write_json(self, buf#: string) -> string {
        return serialize_shape(self, buf)
    }
}

fn api_status() -> HttpResponse {
    auto msg = Message(
        text = string::from("Server is running"),
        status = string::from("ok")
    )
    auto json_body = to_json(msg)
    return HttpResponse(
        status_code = 200,
        content_type = string::from("application/json"),
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

fn handle_user_route(req: HttpRequest) -> HttpResponse {
    // Match dynamic path "/api/users/<id>"
    if req.path.as_str().starts_with("/api/users/") {
        auto user_id = req.path.substr(11, req.path.len() - 11)
        auto body# = string::from("User ID: ")
        body#.push_view(user_id)
        return HttpResponse(
            status_code = 200,
            content_type = string::from("text/plain"),
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
import std/io::{println}

fn logger_middleware(req: HttpRequest, next: fn(HttpRequest) -> HttpResponse) -> HttpResponse {
    println("Request Path: {}", req.path)
    auto res = next(req)
    println("Response Status: {}", string::from_int(res.status_code))
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
import std/fs::{read_to_string}
import core/result::{Result}

fn serve_static_file(path: string) -> HttpResponse {
    auto file_content = read_to_string(path)
    match file_content {
        auto Result::Ok(&content) => {
            return HttpResponse(
                status_code = 200,
                content_type = string::from("text/html"),
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
import core/result::{Result}

fn route_request(req: HttpRequest) -> HttpResponse {
    auto is_get# = false
    match req.method {
        auto HttpMethod::GET => { is_get = true }
        _ => {}
    }
    
    if is_get && req.path.eq(string::from("/status")) {
        return HttpResponse(
            status_code = 200,
            content_type = string::from("application/json"),
            body = string::from("{\"status\":\"ok\"}")
        )
    }
    
    if is_get && req.path.eq(string::from("/")) {
        return HttpResponse::html(string::from("<h1>Toka HTTP Server</h1>"))
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
                auto req_str = string::from_with_len(&buf[0] as *char, n as i32)
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
