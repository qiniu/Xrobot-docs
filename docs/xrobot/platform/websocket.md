---
title: WebSocket 协议
---

## WebSocket 协议介绍

WebSocket 是一种网络通信协议，提供了全双工通信通道，允许客户端和服务器之间进行实时数据交换。与传统的 HTTP 请求-响应模型不同，WebSocket 允许在单个连接上进行双向通信，这使得它非常适合需要实时更新的应用场景，如在线聊天、实时游戏和金融交易等。

WebSocket 协议的主要特点包括：

- **全双工通信**：客户端和服务器可以同时发送和接收消息，减少了延迟。
- **持久连接**：一旦建立连接，客户端和服务器可以在不重新建立连接的情况下进行多次数据交换。
- **低开销**：WebSocket 连接在建立后，数据传输的开销较小，适合频繁的数据交换。

在本指南中，我们将详细介绍 WebSocket 的地址、通信协议、会话流程以及如何在小智设备中实现 WebSocket 通信。

请确保在使用 WebSocket 协议时，设备已连接到稳定的网络，以确保数据传输的可靠性。

## 1. WebSocket 地址

<wss://xrobo-io.qiniuapi.com/v1/ws/>

## 2. WebSocket 通信协议

### 基本信息

- 协议版本: 1
- 传输方式: WebSocket
- 音频格式: OPUS
- 音频参数:
  - 采样率: 16000Hz
  - 通道数: 1
  - 帧长: 60ms

### 会话流程

1. 建立 WebSocket 连接
2. 交换 hello 消息
3. 开始语音交互:
   - 发送开始监听
   - 发送音频数据
   - 接收识别结果
   - 接收 TTS 音频
4. 结束会话时关闭连接

### 连接建立

1. 客户端连接 WebSocket 服务器时需要携带以下 headers:

   ```Plain Text
   Authorization: Bearer <access_token> 【服务端如果开启 auth，则需要验证 token】
   Protocol-Version: 1
   Device-Id: <设备 MAC 地址> 【服务端验证，需要先服务端绑定智能体或者预注册，才能验证通过】
   Client-Id: <设备 UUID>
   ```

   设备 MAC 地址和 UUID 都是设备唯一识别码。

   用户登录(login)服务获取到 token。

   请参考[小智固件接入-三、设备绑定](../guide/xiaozhi-firmware#三、设备绑定)

2. 连接成功后，客户端发送 hello 消息:

   ```JSON
   {
   "type": "hello",
   "version": 1,
   "transport": "websocket",
   "audio_params": {
   "format": "opus",
   "sample_rate": 16000,
   "channels": 1,
   "frame_duration": 60
   }
   }
   ```

3. 服务端响应 hello 消息:

   ```JSON
   {
   "type": "hello",
   "transport": "websocket",
   "audio_params": {
   "format": "opus",
   "sample_rate": 24000,
   "channels": 1,
   "frame_duration": 60
   }
   }
   ```

   WebSocket 协议不返回 session_id，所以消息中的会话 ID 可设置为空。

### 消息类型

1. 语音识别相关消息

   开始监听

   ```JSON
   {
   "session_id": "<会话 ID>",
   "type": "listen",
   "state": "start",
   "mode": "<监听模式>"
   }
   ```

   监听模式:

   - "auto": 自动停止
   - "manual": 手动停止
   - "realtime": 持续监听
     auto 与 realtime 是服务器端 VAD 的两种工作模式，realtime 需要 AEC 支持。

   停止监听

   ```JSON
   {
   "session_id": "<会话 ID>",
   "type": "listen",
   "state": "stop"
   }
   ```

   唤醒词检测

   ```JSON
   {
   "session_id": "<会话 ID>",
   "type": "listen",
   "state": "detect",
   "text": "<唤醒词>"
   }
   ```

2. 语音合成相关消息

   服务端发送的 TTS 状态消息:

   ```JSON
   {
   "type": "tts",
   "state": "<状态>",
   "text": "<文本内容>" // 仅在 sentence_start 时携带
   }
   ```

   状态类型:

   - "start": 开始播放
   - "stop": 停止播放
   - "sentence_start": 新句子开始

3. 中止消息

   ```JSON
   {
   "session_id": "<会话 ID>",
   "type": "abort",
   "reason": "wake_word_detected" // 可选
   }
   ```

4. 情感状态消息
   大语言模型会使用 1 个 token 来输出 emoji 来表示当前的心情，这个 emoji 不会被 TTS 朗读出来，但是会被以独立数据类型进行返回。
   示例：

```JSON
   {"type":"llm", "text": "😊", "emotion": "smile"}
```

以下是常用的 emoji 列表。

1. 😶 - neutral
2. 🙂 - happy
3. 😆 - laughing
4. 😂 - funny
5. 😔 - sad
6. 😠 - angry
7. 😭 - crying
8. 😍 - loving
9. 😳 - embarrassed
10. 😲 - surprised
11. 😱 - shocked
12. 🤔 - thinking
13. 😉 - winking
14. 😎 - cool
15. 😌 - relaxed
16. 🤤 - delicious
17. 😘 - kissy
18. 😏 - confident
19. 😴 - sleepy
20. 😜 - silly
21. 🙄 - confused

### 状态流程图

Manual 模式
<img src="./imgs/websocket/manual.png" class="img-center" />

Auto 模式
<img src="./imgs/websocket/auto.png" class="img-center" />

### 二进制数据传输

- 音频数据使用二进制帧传输
- 客户端发送 OPUS 编码的音频数据
- 服务端返回 OPUS 编码的 TTS 音频数据

### 错误处理

当发生网络错误时，客户端会收到错误消息并关闭连接。客户端需要实现重连机制。
