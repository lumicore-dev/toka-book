# Installation

Getting Toka on your system takes just a few seconds.

## Quick Install

The easiest way to install Toka is via the official install script:

```bash
curl -fsSL https://tokalang.dev/install.sh | bash
```

This script will:
1. Detect your operating system and CPU architecture
2. Download the latest stable release
3. Install to `~/.toka/bin/`
4. Configure environment variables

## Setting Up Environment

After installation, add these to your `~/.bashrc` or `~/.zshrc`:

```bash
export PATH="$HOME/.toka/bin:$PATH"
export TOKA_LIB="$HOME/.toka/lib"
```

Reload your shell:

```bash
source ~/.bashrc
```

## Verify Installation

```bash
tokac --version
```

You should see output similar to:

```
toka version 0.9.6 (Built: May 17 2026)
```

## Hello, Toka!

Create your first program:

```bash
echo 'import std/io::println

fn main() -> i32 {
    println("Hello, Toka!")
    return 0
}' > hello.tk

toka run hello.tk
```

Expected output:

```
Hello, Toka!
```

## Building from Source

For the latest development version:

```bash
git clone https://github.com/tokalang/toka.git
cd tokalang
./rebuild.sh
```

## Supported Platforms

| Platform | Status |
|----------|--------|
| Linux (x86_64) | ✅ Primary |
| macOS (Apple Silicon) | ✅ Supported |
| macOS (Intel) | ✅ Supported |
| Windows (x86_64) | ✅ Supported |
| Linux (ARM64) | ⚠️ Experimental |
