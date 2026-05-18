# HTTP Server

Build a fully-functional HTTP server using Toka's built-in networking.

## Basic Server

```toka
import std/net_http

fn main() -> i32 {
    let server = net_http::Server::new()

    server.get("/", fn(req) -> Response {
        return Response::html("<h1>Hello, Toka!</h1>")
    })

    println("Server running on http://localhost:8080")
    server.listen(8080)?
    return 0
}
```

## API with JSON Responses

```toka
import std/net_http
import std/serde/json

pub shape Message(
    text: str,
    status: str
)

let server = net_http::Server::new()

server.get("/api/status", fn(req) -> Response {
    let msg = Message(text = "Server is running", status = "ok")
    return Response::json(json::encode(msg))
})
```

## Route Parameters

```toka
server.get("/api/users/:id", fn(req) -> Response {
    let user_id = req.param("id")
    let body = "User ID: " + user_id
    return Response::text(body)
})
```

## Middleware

```toka
server.use(fn(req, next) -> Response {
    println("Request: " + req.method + " " + req.path)
    let start = time::now()
    let res = next(req)
    let elapsed = time::now() - start
    println("Completed in " + str(elapsed.ms()) + "ms")
    return res
})
```

## Static Files

```toka
server.serve_static("/static", "./public")
// Serves files from ./public at /static/filename
```

## Full Example

A complete CRUD server:

```toka
fn main() -> i32 {
    let server = net_http::Server::new()
    let db = SharedDb::new()

    server.get("/items", fn(req) {
        return Response::json(db.list_all())
    })

    server.post("/items", fn(req) {
        let body: CreateItem = json::decode(req.body)?
        let item = db.create(body)
        return Response::json(json::encode(item))
    })

    server.delete("/items/:id", fn(req) {
        db.delete(req.param("id"))
        return Response::status(204)
    })

    server.listen(8080)?
    return 0
}
```
