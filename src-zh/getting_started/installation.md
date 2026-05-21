# 安装 Toka

在你的系统上安装 Toka 只需几秒钟。

## 快速安装

安装 Toka 最简单的方式是通过官方安装脚本：

```bash
curl -fsSL https://tokalang.dev/install.sh | bash
```

该脚本会自动：
1. 检测你的操作系统和 CPU 架构
2. 下载最新的稳定版本
3. 安装到 `~/.toka/bin/` 目录
4. 配置环境变量

## 配置环境

安装完成后，将以下内容添加到你的 `~/.bashrc` 或 `~/.zshrc` 中：

```bash
export PATH="$HOME/.toka/bin:$PATH"
export TOKA_LIB="$HOME/.toka/lib"
```

重新加载你的 shell：

```bash
source ~/.bashrc
```

## 验证安装

```bash
tokac --version
```

你应该会看到类似如下的输出：

```
toka version 0.9.7 (Built: May 21 2026)
```

## 从源码编译

如果你想使用最新的开发版本：

```bash
git clone https://github.com/tokalang/toka.git
cd tokalang
make -C build -j8
```

## 支持平台

| 平台 | 状态 |
|------|------|
| Linux (x86_64) | ✅ 主力支持 |
| macOS (Apple Silicon) | ✅ 已支持 |
| macOS (Intel) | ✅ 已支持 |
| Windows (x86_64) | ✅ 已支持 |
| Linux (ARM64) | ⚠️ 实验阶段 |
