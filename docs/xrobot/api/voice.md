---
title: 声纹识别 API
---

# 声纹识别 API

## 接口概述

本文档介绍灵矽 AI 平台声纹识别 V2 相关的公开 API。V2 以“说话人”为核心管理身份信息：说话人保存可读名称和身份描述，声纹保存音频提取出的特征，智能体配置决定哪些说话人会参与当前智能体的声纹识别。

通过这些 API，您可以：

- **管理说话人**：创建、查询、更新和删除可识别的说话人。
- **维护说话人声纹**：为每个说话人设置一个默认声纹样本。
- **配置智能体识别人群**：将说话人列表绑定到指定智能体。
- **选择声纹样本**：查询带音频的智能体聊天记录，用作声纹创建来源。

::: tip 使用说明
V2 推荐使用清晰、干净的语音样本创建声纹。音频建议使用 WAV 格式、16kHz 采样率；接口当前通过 `audio_url` 下载音频并调用后端声纹提取服务，公开响应不会返回声纹特征向量。
:::

::: warning 兼容说明
旧版 `/v1/voiceprint/...` 角色、设备绑定接口仍保留兼容。新接入和新配置流程推荐使用本文档的 `/v1/speakers`、`/v1/speakers/{speakerId}/voiceprint` 和 `/v1/agents/{agentId}/speaker-config`。
:::

## 一、API 基本信息

**Base URL**: `https://xrobo.qiniu.com`

**认证方式**: `Authorization: Bearer <token>`

所有接口均需要用户认证。接口统一返回 HTTP 200，业务状态通过响应体 `code` 判断。

### 统一响应格式

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {}
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | integer | 业务状态码，0 表示成功，非 0 表示失败 |
| `msg` | string | 错误信息。成功时通常省略 |
| `reqid` | string | 请求 ID，用于问题排查 |
| `data` | object | 业务数据，随接口变化 |

## 二、说话人管理

说话人表示一个可识别的人，例如“妈妈”“客服小王”“会议主持人”。同一用户下允许创建同名说话人，系统以 `speaker_id` 作为唯一身份标识。

### 2.1 创建说话人

创建新的说话人。创建成功后可继续调用声纹接口为其设置默认声纹。

#### 接口信息

**请求方式：** `POST /v1/speakers`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 说话人名称。前后空格会被忽略，不能为空 |
| `desc` | string | 否 | 说话人描述，可用于提示智能体识别该说话人的身份或偏好 |

#### 请求示例

```http
POST /v1/speakers HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "妈妈",
  "desc": "家庭成员，喜欢被称呼为妈妈"
}
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "speaker_id": "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123",
    "name": "妈妈",
    "desc": "家庭成员，喜欢被称呼为妈妈",
    "created_at": "2026-08-05T10:00:00+08:00"
  }
}
```

### 2.2 获取说话人列表

获取当前用户的说话人列表，按创建时间倒序返回。

#### 接口信息

**请求方式：** `GET /v1/speakers`

#### 请求示例

```http
GET /v1/speakers HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "speakers": [
      {
        "speaker_id": "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123",
        "name": "妈妈",
        "desc": "家庭成员，喜欢被称呼为妈妈",
        "voiceprint_ids": [
          "9e2b47d8f40945268f8a7b6e5d4c3b21"
        ],
        "created_at": "2026-08-05T10:00:00+08:00"
      }
    ]
  }
}
```

::: info 字段说明
`voiceprint_ids` 表示该说话人已绑定的声纹 ID。当前 V2 公开流程每个说话人只维护一个默认声纹；没有声纹时该字段可能省略或为空数组。
:::

### 2.3 获取指定说话人

根据 `speaker_id` 获取说话人详情。

#### 接口信息

**请求方式：** `GET /v1/speakers/{speakerId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speakerId` | string | 是 | 说话人 ID |

#### 请求示例

```http
GET /v1/speakers/2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "speaker_id": "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123",
    "name": "妈妈",
    "desc": "家庭成员，喜欢被称呼为妈妈",
    "voiceprint_ids": [
      "9e2b47d8f40945268f8a7b6e5d4c3b21"
    ],
    "created_at": "2026-08-05T10:00:00+08:00"
  }
}
```

### 2.4 更新说话人

更新说话人的名称和描述。

#### 接口信息

**请求方式：** `PUT /v1/speakers/{speakerId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speakerId` | string | 是 | 说话人 ID |
| `name` | string | 是 | 说话人名称。前后空格会被忽略，不能为空 |
| `desc` | string | 否 | 说话人描述。传空字符串可清空描述 |

#### 请求示例

```http
PUT /v1/speakers/2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "妈妈",
  "desc": "家庭成员，回答家庭日程时优先使用温和语气"
}
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "speaker_id": "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123",
    "name": "妈妈",
    "desc": "家庭成员，回答家庭日程时优先使用温和语气",
    "created_at": "2026-08-05T10:00:00+08:00"
  }
}
```

### 2.5 删除说话人

删除指定说话人。删除说话人时会同步删除该说话人下的默认声纹。

#### 接口信息

**请求方式：** `DELETE /v1/speakers/{speakerId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speakerId` | string | 是 | 说话人 ID |

#### 请求示例

```http
DELETE /v1/speakers/2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {}
}
```

::: warning 删除限制
如果说话人仍被任一智能体的 `speaker_ids` 引用，删除会失败并返回 `speaker is used by agent`。请先更新相关智能体的说话人配置，再删除说话人。
:::

## 三、说话人声纹管理

每个说话人当前维护一个默认声纹。创建新的声纹时会替换旧声纹，并同步更新说话人的 `voiceprint_ids`。

### 3.1 创建或替换说话人声纹

根据音频 URL 下载样本，提取声纹特征，并设置为该说话人的默认声纹。

#### 接口信息

**请求方式：** `POST /v1/speakers/{speakerId}/voiceprint`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speakerId` | string | 是 | 说话人 ID |
| `audio_url` | string | 是 | 音频文件 URL，仅支持 `http` 或 `https` |
| `source_device_id` | string | 否 | 采样来源设备 ID，用于记录声纹样本来自哪个设备 |

#### 请求示例

```http
POST /v1/speakers/2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123/voiceprint HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "audio_url": "https://xrobot-obj.qnlinx.com/chat-history/2026/08/05/sample.wav",
  "source_device_id": "AA:BB:CC:DD:EE:FF"
}
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "voiceprint_id": "9e2b47d8f40945268f8a7b6e5d4c3b21",
    "audio_url": "https://xrobot-obj.qnlinx.com/chat-history/2026/08/05/sample.wav",
    "source_device_id": "AA:BB:CC:DD:EE:FF"
  }
}
```

::: info 音频 URL 处理规则
- 后端会下载 `audio_url` 指向的音频，最大支持 10MB。
- 仅支持 `http` 和 `https` URL。
- 为避免服务端请求风险，`localhost`、内网地址、回环地址、链路本地地址等不可作为音频 URL。
- 如果 URL 属于平台私有对象存储域名，后端会自动生成签名 URL 后再下载；公开 URL 会原样下载。
- 公开响应只返回声纹 ID 和音频来源，不返回 `voice_vector`。
:::

### 3.2 获取说话人默认声纹

获取指定说话人的默认声纹信息。

#### 接口信息

**请求方式：** `GET /v1/speakers/{speakerId}/voiceprint`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speakerId` | string | 是 | 说话人 ID |

#### 请求示例

```http
GET /v1/speakers/2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123/voiceprint HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "voiceprint_id": "9e2b47d8f40945268f8a7b6e5d4c3b21",
    "audio_url": "https://xrobot-obj.qnlinx.com/chat-history/2026/08/05/sample.wav",
    "source_device_id": "AA:BB:CC:DD:EE:FF"
  }
}
```

::: warning 特殊说明
如果说话人不存在，或该说话人还没有默认声纹，接口会返回非 0 业务码，并在 `msg` 中返回 `speaker not found` 或 `voiceprint not found`。
:::

### 3.3 删除说话人默认声纹

删除指定说话人的默认声纹，并清空该说话人的 `voiceprint_ids`。

#### 接口信息

**请求方式：** `DELETE /v1/speakers/{speakerId}/voiceprint`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speakerId` | string | 是 | 说话人 ID |

#### 请求示例

```http
DELETE /v1/speakers/2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123/voiceprint HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {}
}
```

## 四、智能体说话人配置

智能体说话人配置用于声明某个智能体当前认识哪些说话人。运行时会根据这里保存的 `speaker_ids` 下发说话人和声纹信息。

### 4.1 获取智能体说话人配置

获取指定智能体当前关联的说话人列表和声纹对话模式开关。

#### 接口信息

**请求方式：** `GET /v1/agents/{agentId}/speaker-config`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agentId` | string | 是 | 智能体 ID |

#### 请求示例

```http
GET /v1/agents/31dad2a8042a40ec879ef92a7bc240ae/speaker-config HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "speaker_ids": [
      "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123"
    ],
    "voice_chat_only_enabled": false
  }
}
```

### 4.2 更新智能体说话人配置

全量更新指定智能体关联的说话人列表。

#### 接口信息

**请求方式：** `PUT /v1/agents/{agentId}/speaker-config`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agentId` | string | 是 | 智能体 ID |
| `speaker_ids` | array | 否 | 说话人 ID 列表。省略或传空数组表示清空配置 |

#### 请求示例

```http
PUT /v1/agents/31dad2a8042a40ec879ef92a7bc240ae/speaker-config HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "speaker_ids": [
    "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123",
    "7f4c2c9f8b1d42c0b4ef0e68a2a4b789"
  ]
}
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "speaker_ids": [
      "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123",
      "7f4c2c9f8b1d42c0b4ef0e68a2a4b789"
    ],
    "voice_chat_only_enabled": false
  }
}
```

::: info 配置规则
- `speaker_ids` 会自动去重，并忽略空字符串。
- 单个智能体最多可关联 20 个说话人。
- 所有 `speaker_ids` 必须属于当前用户；不存在或无权限访问时返回 `speaker not found`。
- `voice_chat_only_enabled` 是响应字段，表示当前智能体是否开启“仅响应已识别说话人”的声纹对话模式。该字段读取自智能体 `extra.voiceprint.chat_only_enabled`，本接口的 PUT 请求不会更新这个开关。需要修改时，请通过 [智能体 API](./agent.md) 更新智能体 `extra.voiceprint.chat_only_enabled`。
:::

## 五、智能体带音频聊天记录

该接口用于查询指定智能体下带 `audio_url` 的聊天记录，常用于从历史语音中选择一段音频作为声纹样本。

### 5.1 获取带音频聊天记录

#### 接口信息

**请求方式：** `GET /v1/agents/{agentId}/chat-history`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agentId` | string | 是 | 智能体 ID |
| `limit` | integer | 否 | 返回数量，默认 20，最大 100。小于等于 0 或非法值会使用默认值 |
| `device_id` | string | 否 | 设备 ID，对应聊天记录中的设备 MAC 地址 |
| `chat_type` | integer | 否 | 消息类型：1 表示用户消息，2 表示智能体消息，3 表示工具消息 |
| `session_id` | string | 否 | 会话 ID |

#### 请求示例

```http
GET /v1/agents/31dad2a8042a40ec879ef92a7bc240ae/chat-history?limit=20&device_id=AA:BB:CC:DD:EE:FF&chat_type=1 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "records": [
      {
        "session_id": "7465966b-4582-4dae-99be-420364d422d7",
        "device_id": "AA:BB:CC:DD:EE:FF",
        "chat_type": 1,
        "audio_url": "https://xrobot-obj.qnlinx.com/chat-history/2026/08/05/sample.wav",
        "content": "你好，请问我是谁？",
        "created_at": "2026-08-05T10:10:00+08:00"
      }
    ]
  }
}
```

::: info 查询规则
- 仅返回 `audio_url` 不为空的聊天记录。
- 结果按 `created_at` 倒序排列。
- `limit` 超过 100 时会裁剪为 100。
- `device_id` 和 `session_id` 如果传入 `undefined` 或 `null` 字符串，会按未传处理。
- `chat_type` 非数字时返回 `invalid chat_type`。
:::

## 六、推荐接入流程

### 6.1 从历史语音创建声纹并绑定智能体

1. 调用 `POST /v1/speakers` 创建说话人。
2. 调用 `GET /v1/agents/{agentId}/chat-history` 查询带音频的用户消息。
3. 选择一条清晰的用户语音，将其 `audio_url` 传给 `POST /v1/speakers/{speakerId}/voiceprint`。
4. 调用 `PUT /v1/agents/{agentId}/speaker-config` 将 `speaker_id` 保存到智能体。
5. 如需只响应已识别说话人，通过智能体 API 设置 `extra.voiceprint.chat_only_enabled=true`。

### 6.2 运行时说明

公开 API 不返回声纹特征向量。智能体运行时会通过内部配置读取 `speaker_config` 和对应说话人的声纹向量，用于在设备会话中注册和匹配说话人。外部客户端只需要维护说话人、声纹样本和智能体关联关系。

## 七、常见错误

| code | msg | 说明 |
|------|-----|------|
| `400` | `invalid request body` | 请求体格式错误 |
| `400` | `name is required` | 创建或更新说话人时名称为空 |
| `400` | `invalid speaker id` | 路径中的说话人 ID 为空 |
| `400` | `audio_url is required` | 创建声纹时未提供音频 URL |
| `400` | `failed to download audio from URL` | 音频 URL 无法下载、超过大小限制或不符合安全规则 |
| `400` | `speaker is used by agent` | 删除仍被智能体引用的说话人 |
| `400` | `speaker_ids exceeds max count 20` | 智能体关联的说话人超过数量上限 |
| `400` | `speaker not found` | 更新智能体说话人配置时包含不存在或无权限访问的说话人 |
| `400` | `invalid chat_type` | 查询聊天记录时 `chat_type` 不是数字 |
| `404` | `speaker not found` | 说话人不存在或不属于当前用户 |
| `404` | `voiceprint not found` | 说话人未设置默认声纹 |
| `404` | `agent not found` | 智能体不存在或不属于当前用户 |
| `599` | `failed to extract voiceprint feature` | 后端声纹提取失败 |
| `599` | `failed to process voiceprint feature` | 声纹特征处理失败 |

## 最佳实践

### 声纹样本

1. **选择清晰样本**：优先选择无明显背景噪音、说话人单一的用户语音。
2. **控制样本长度**：避免过短或过长，建议选择自然说话的一小段音频。
3. **保留来源设备**：创建声纹时传入 `source_device_id`，便于后续排查不同设备采样差异。
4. **及时替换**：同一说话人创建新声纹会替换默认声纹，可用于重新采样和优化识别效果。

### 说话人配置

1. **名称用于展示，ID 用于绑定**：同名说话人是允许的，业务侧应保存和传递 `speaker_id`。
2. **描述保持简短准确**：`desc` 会参与运行时说话人信息表达，建议写身份或交互偏好，不要写无关信息。
3. **控制识别范围**：只把当前智能体需要识别的人加入 `speaker_ids`，避免候选说话人过多影响使用体验。
4. **删除前解除绑定**：删除说话人前先从所有相关智能体的 `speaker_ids` 中移除。

## 相关文档

- [**智能体 API**](./agent.md) - 查看智能体管理与 `extra.voiceprint.chat_only_enabled` 配置
- [**聊天记录 API**](./chat-history.md) - 查看完整聊天记录查询和音频签名能力
- [**声纹识别最佳实践**](../guide/voice-start.md) - 了解声纹录制与使用建议
- [**API 概览**](./index.md) - 查看所有可用 API
