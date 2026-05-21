# Frequently Asked Questions

## General

**Q: Is Toka production-ready?**

Toka is currently in beta (v0.9.7). It's suitable for personal projects, prototyping, and experimentation. The 1.0 release is planned with a focus on production stability.

**Q: What platforms does Toka support?**

Linux, macOS, and Windows are supported. The LLVM backend provides cross-compilation capabilities.

**Q: Is there a package manager?**

Toka has a built-in package manager via `toka add`. Official library registry at pkg.tokalang.dev.

## Language Design

**Q: How is Toka different from Rust?**

Toka achieves memory safety through the Hat Principle instead of a borrow checker. This means no lifetime annotations — just simple hat (`^`) tokens that make ownership visible in the syntax.

**Q: Does Toka have a garbage collector?**

No. Memory is managed at compile time through the PAL Checker. There is no runtime GC overhead.

**Q: Is Toka compatible with C libraries?**

Yes. Toka has native C interop without FFI overhead. You can call C functions directly.

## Learning

**Q: Do I need to know C or Rust to learn Toka?**

Not at all. Toka's syntax is clean and Go-like. If you know any programming language, you can learn Toka in a weekend.

**Q: Where can I find more examples?**

Check out the `examples/` directory in the Toka repository and the `tokalibs` collection of community libraries.

**Q: Is there a community or forum?**

Join the Toka community on GitHub Discussions at github.com/tokalang/toka.

## Technical

**Q: How fast is Toka?**

Toka compiles at approximately 80,000 lines of code per second (Clang backend) and produces optimized native binaries via LLVM 20. Performance is comparable to C for equivalent code.

**Q: How large are Toka binaries?**

A minimal HTTP server binary is approximately 250 KB — no runtime, no VM, just native code.

**Q: Does Toka support multithreading?**

Yes. Toka provides tasks, MPSC channels, atomic operations, and mutexes for concurrent programming.
