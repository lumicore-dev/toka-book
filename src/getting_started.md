# Getting Started

Welcome to Toka! This chapter will guide you through installing Toka, writing your first program, and understanding the project structure.

## Installation

Toka provides pre-compiled binaries for Linux, macOS, and Windows. The easiest way to install is via the quick install script:

```bash
curl -fsSL https://tokalang.dev/install.sh | bash
```

This script will automatically detect your operating system and CPU architecture, download the latest stable release to `~/.toka/`, and configure your environment.

### Setting Up Environment Variables

After installation, you need to set up two environment variables to use Toka from any directory:

```bash
export PATH="$HOME/.toka/bin:$PATH"
export TOKA_LIB="$HOME/.toka/lib"
```

Add these lines to your `~/.bashrc` or `~/.zshrc` to make them permanent.

### Verify Installation

Run the following command to confirm everything is working:

```bash
tokac --version
```

You should see output similar to:

```
toka version 0.9.6 (Built: May 17 2026 13:53:33)
```
