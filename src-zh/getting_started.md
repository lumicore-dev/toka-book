# 快速入门

欢迎使用 Toka！本章将引导你安装 Toka、编写你的第一个程序，并理解项目结构。

## 安装

Toka 为 Linux、macOS 和 Windows 提供预编译的二进制文件。最简单的安装方式是通过快速安装脚本：

```bash
curl -fsSL https://tokalang.dev/install.sh | bash
```

该脚本会自动检测你的操作系统和 CPU 架构，将最新的稳定版本下载到 `~/.toka/`，并配置你的环境。

### 设置环境变量

安装完成后，你需要设置两个环境变量，以便在任何目录下使用 Toka：

```bash
export PATH="$HOME/.toka/bin:$PATH"
export TOKA_LIB="$HOME/.toka/lib"
```

将这些行添加到你的 `~/.bashrc` 或 `~/.zshrc` 中，使其永久生效。

### 验证安装

运行以下命令确认一切正常：

```bash
tokac --version
```

你应该会看到类似如下的输出：

```
toka version 0.9.6 (Built: May 17 2026 13:53:33)
```
