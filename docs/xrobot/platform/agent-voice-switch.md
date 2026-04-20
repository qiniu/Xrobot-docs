---
title: 智能体与音色切换
---

# 智能体切换与音色切换

## 概述

在 WebSocket 连接中，支持智能体切换和音色切换两种功能：

- **智能体切换**：连接握手时通过 `X-Agent-ID` Header 指定
- **音色切换**：会话中发送 `listen` 消息的 `agent_params.voice` 参数

::: info 说明
Header 里的音色切换不再支持，统一走 `listen` 消息进行音色切换。
:::

## 1. 智能体切换

在 WebSocket 握手 Header 中传入 `X-Agent-ID`：

```http
X-Agent-ID: <agent_id>
```

此参数决定当前连接使用哪个智能体配置。

## 2. 音色切换（会话内）

在 `listen` 消息中通过 `agent_params.voice` 参数切换 TTS 音色：

```json
{
  "type": "listen",
  "state": "detect",
  "agent_params": {
    "voice": {
      "id": "xxxxx"
    }
  }
}
```

带文本的示例：

```json
{
  "type": "listen",
  "state": "detect",
  "text": "你当前身份是李白，结合之前你杜甫的身份，开始对话吧",
  "agent_params": {
    "voice": {
      "id": "xxxxx"
    }
  }
}
```

### 参数说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 音色 ID，去空白后非空，长度 `<= 128` |
| `volume` | 否 | 音量，范围 `[1.0, 100.0]` |
| `speed` | 否 | 语速，范围 `[0.5, 2.0]` |
| `pitch` | 否 | 音调，范围 `[0.5, 2.0]` |
| `emotion` | 否 | 情感，字符串，去空白后非空，长度 `<= 32` |

## 3. 行为说明

- `X-Agent-ID`：决定当前连接使用哪个智能体配置
- `listen.voice`：只改 TTS 音色，不切换智能体
- 音色切换默认保持当前会话上下文连续
