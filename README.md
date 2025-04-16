# Sola AI: Solana区块链上的AI语音助手

Sola AI是一个个性化的AI语音助手，通过免提用户体验将Solana区块链技术与AI技术相结合。

![应用截图](https://github.com/user-attachments/assets/c6464910-2ab6-45fd-b751-071562775d44)

## 项目概述

本应用提供用户、OpenAI和区块链数据之间通过语音和文本的无缝交互。主要特点包括：

* **实时通信:** 利用WebRTC进行无缝语音和文本通信。
* **现代前端:** 使用Next.js框架和Tailwind CSS构建用户界面。
* **可扩展后端:** 采用微服务架构实现高效数据处理。
* **区块链数据过滤:** 微服务根据用户查询过滤和处理区块链数据。
* **区块链交互:** 支持Solana链上交互（如转账、兑换）。

## 核心组件

1. **Sola AI应用:** 作为处理用户输入、与服务通信以及集成AI模型与区块链交互的中心枢纽。
   * 与OpenAI接口进行自然语言处理。
   * 将用户请求路由到适当的微服务。
   * 提供AI驱动的智能界面。

2. **数据服务:**
   * 提供区块链数据的微服务，使用Rust构建。
   * 根据用户查询过滤和结构化Solana区块链和网络数据。

3. **钱包服务:**
   * 帮助构建预定义交易并提供交易对象。
   * 使用Rust实现快速数据处理。

4. **用户服务:**
   * 管理用户数据，如聊天室管理、聊天历史记录、用户设置等。

## 技术栈

### 前端
- Next.js 15.2.1
- React 19
- Tailwind CSS
- Zustand (状态管理)
- Framer Motion (动画)

### 区块链集成
- @solana/web3.js
- @solana/spl-token
- @bonfida/spl-name-service
- @phantom/wallet-sdk

### 认证
- @privy-io/react-auth
- @privy-io/server-auth

### API集成
- Axios
- WebRTC

## 项目结构

```
├── src/                      # 源代码目录
│   ├── app/                  # Next.js应用目录
│   │   ├── api/              # API路由
│   │   │   ├── openai/       # OpenAI相关API
│   │   │   └── wallet/       # 钱包相关API
│   │   ├── dashboard/        # 仪表板界面
│   │   │   └── chat/         # 聊天功能
│   │   └── _components/      # 应用级组件
│   ├── components/           # 共享组件
│   │   ├── common/           # 通用组件
│   │   └── messages/         # 消息相关组件
│   ├── store/                # 状态管理
│   │   ├── SessionHandler.ts # WebRTC会话管理
│   │   ├── WalletHandler.ts  # 钱包功能管理
│   │   └── ChatRoomHandler.ts# 聊天室管理
│   ├── services/             # 服务层
│   ├── hooks/                # 自定义React钩子
│   ├── lib/                  # 工具库
│   └── utils/                # 工具函数
├── public/                   # 静态资源
└── prisma/                   # Prisma ORM配置
```

## 主要功能

### AI语音助手
- 使用WebRTC与OpenAI实时API建立语音通信
- 支持多种AI声音和情感设置
- 用户可以通过语音或文本与助手交互

### 区块链集成
- 查看代币报告和市场数据
- 执行代币转账和交换操作
- 查看NFT收藏
- 解析Solana域名

### 钱包功能
- 支持多个钱包连接
- 监控代币余额和持有的NFT
- 准备和发送交易
- 与Phantom钱包集成

### 聊天功能
- 创建和管理聊天室
- 存储聊天历史记录
- 支持不同类型的消息显示（代币数据、交易卡等）

## 核心技术实现

### WebRTC会话管理
应用使用WebRTC与OpenAI的实时API建立连接，实现语音识别和合成。SessionHandler负责管理此连接，包括:
- 建立RTCPeerConnection
- 管理音频流
- 处理数据通道消息
- 发送用户文本和系统消息

### 区块链数据处理
应用通过API接口从区块链获取数据:
- 获取代币余额和价格
- 查找NFT资产
- 监控钱包变化
- 解析域名

### 钱包交互
支持多种钱包操作:
- 连接外部钱包
- 内置Phantom钱包集成
- 准备和发送交易
- 代币转账
- 代币交换

## 安装指南

详细安装说明请参考[INSTALL.md](INSTALL.md)文件。

## 贡献指南

欢迎贡献！要贡献代码：

1. Fork仓库并创建新分支。
2. 进行更改并彻底测试。
3. 提交详细说明更改的拉取请求。

更多指南请参见[CONTRIBUTING.md](CONTRIBUTING.md)文件。

## 许可证

本项目基于GNU通用公共许可证v3.0授权。详情请参阅[LICENSE](LICENSE)文件。
