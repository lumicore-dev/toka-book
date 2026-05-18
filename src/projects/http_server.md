# HTTP Server

Build a fully-functional HTTP server using Toka's built-in networking.

## Basic Server

```tokalang
import std/net_http

fn main() -> i32 {
    auto server = net_http::Server::new()

    server.get("/", |req| => {
        return HttpResponse::html(String::from("<h1>Hello, Toka!</h1>"))
    })

    println("Server running on http://localhost:8080")
    server.listen(8080)?
    return 0
}
```

## API with JSON Responses

```tokalang
import std/net_http
import std/serde/json

pub shape Message(
    text: str,
    status: str
)

auto server = net_http::Server::new()

server.get("/api/status", |req| => {
    auto msg = Message(text = String::from("Server is running"), status = String::from("ok"))
    return HttpResponse::json(json::to_json(msg))
})
```

## Route Parameters

```tokalang
server.get("/api/users/:id", |req| => {
    auto user_id = req.param("id")
    auto body# = String::from("User ID: ")
    body#.push_str(user_id.c_str())
    return HttpResponse::text(body)
})
```

## Middleware

```tokalang
server.use(|req, next| => {
    println("Request: {} {}", req.method, req.path)
    auto start = time::Instant::now()
    auto res = next(req)
    auto elapsed = start.elapsed()
    println("Completed in {}ms", elapsed.as_millis())
    return res
})
```

## Static Files

```tokalang
server.serve_static("/static", "./public")
// Serves files from ./public at /static/filename
```

## Full Example

A complete CRUD server:

```tokalang
fn main() -> i32 {
    auto server = net_http::Server::new()
    auto db = SharedDb::new()

    server.get("/items", |req| => {
        return HttpResponse::json(db.list_all())
    })

    server.post("/items", |req| => {
        auto body_res = json::deserialize_shape<CreateItem>(req.body)
        auto item = db.create(body_res.unwrap())
        return HttpResponse::json(json::to_json(item))
    })

    server.delete("/items/:id", |req| => {
        db.delete(req.param("id"))
        return HttpResponse::status(204)
    })

    server.listen(8080)?
    return 0
}
```
