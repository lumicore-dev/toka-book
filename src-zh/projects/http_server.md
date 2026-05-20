# HTTP 服务器

使用 Toka 的现代网络库构建一个功能完整的 HTTP 服务器。

## 基本服务器

Toka 的 HTTP 引擎位于 `stdx/net/http` 中。你可以通过绑定 `std/net` 中的 `TcpListener` 并处理传入连接来构建轻量级 HTTP 服务器：

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
    // 演示服务器设置
    return 0
}
```

## 带 JSON 响应的 API

你可以使用 `stdx/serde/json` 中的 `@ToJson` trait 自动序列化自定义 shape 对象，并以 JSON 响应返回：

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
        text = String::from("服务器正在运行"),
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

## 路由参数

你可以轻松地手动匹 URL 路径中的动态部分来提取路由参数：

```toka
import stdx/net/http::{HttpRequest, HttpResponse}
import std/string::{String}

fn handle_user_route(req: HttpRequest) -> HttpResponse {
    // 匹配动态路径 "/api/users/<id>"
    if req.path.as_str().starts_with(s"/api/users/") {
        auto user_id = req.path.substr(11, req.path.len() - 11)
        auto body# = String::from("用户 ID: ")
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

## 中间件

包装你的路由处理器以注入自定义中间件功能，例如请求日志或执行计时：

```toka
import stdx/net/http::{HttpRequest, HttpResponse}
import std/string::{String}
import std/io::{println}

fn logger_middleware(req: HttpRequest, next: fn(HttpRequest) -> HttpResponse) -> HttpResponse {
    println("请求路径：{}", req.path)
    auto res = next(req)
    println("响应状态码：{}", String::from_int(res.status_code))
    return res
}

fn main() -> i32 {
    return 0
}
```

## 静态文件

使用 `std/fs` 模块动态读取文件来提供本地资源：

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

## 完整示例

一个完整的 HTTP 服务器，包含路由、HTML 渲染和自定义 API JSON 响应：

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
    // 演示服务器设置
    return 0
}
```
