---
title: 声纹识别 V2 API
---

# 声纹识别 V2 API

## 接口概述

声纹识别 V2 以 **说话人（Speaker）** 为核心管理身份信息。一个说话人可以设置一条默认声纹；智能体需要绑定 `speaker_id` 后，才会识别该说话人。

::: warning 版本说明
旧版 [声纹识别 API](./voice.md) 仍保留兼容，后续会逐步废弃。新接入和新配置流程建议使用本文档的 V2 接口。
:::

::: tip 使用说明
本文档只描述软件侧配置接口。声纹处理由平台内部完成，公开接口不会返回声纹特征向量。
:::

## 一、基础信息

**Base URL**: `https://xrobo.qiniu.com`

**认证方式**: `Authorization: Bearer <token>`

所有接口统一返回 HTTP 200，业务状态通过响应体中的 `code` 判断。

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {}
}
```

## 二、说话人管理

### 2.1 创建说话人

**请求方式：** `POST /v1/speakers`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 说话人名称 |
| `desc` | string | 否 | 说话人描述 |

#### 请求示例

```json
{
  "name": "妈妈",
  "desc": "家庭成员"
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
    "desc": "家庭成员",
    "created_at": "2026-08-05T10:00:00+08:00"
  }
}
```

### 2.2 获取说话人列表

**请求方式：** `GET /v1/speakers`

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
        "desc": "家庭成员",
        "voiceprint_ids": [
          "9e2b47d8f40945268f8a7b6e5d4c3b21"
        ],
        "created_at": "2026-08-05T10:00:00+08:00"
      }
    ]
  }
}
```

### 2.3 获取说话人详情

**请求方式：** `GET /v1/speakers/{speakerId}`

### 2.4 更新说话人

**请求方式：** `PUT /v1/speakers/{speakerId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 说话人名称 |
| `desc` | string | 否 | 说话人描述 |

### 2.5 删除说话人

**请求方式：** `DELETE /v1/speakers/{speakerId}`

::: warning 删除限制
如果说话人仍被智能体引用，需要先从对应智能体的说话人绑定中移除。
:::

## 三、声纹管理

当前每个说话人维护一条默认声纹。重新创建声纹会替换旧声纹。

### 3.1 创建或替换声纹

**请求方式：** `POST /v1/speakers/{speakerId}/voiceprint`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `audio_url` | string | 是 | 平台可访问的声纹样本音频 URL |
| `source_device_id` | string | 否 | 采样来源设备 ID |

#### 请求示例

```json
{
  "audio_url": "https://example.com/sample.wav"
}
```

#### 响应示例

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "voiceprint_id": "9e2b47d8f40945268f8a7b6e5d4c3b21",
    "audio_url": "https://example.com/sample.wav"
  }
}
```

::: tip 音频说明
建议使用清晰、单人、无明显噪声的语音样本。平台会处理音频并保存声纹，接口响应不包含声纹特征向量。
:::

### 3.2 获取默认声纹

**请求方式：** `GET /v1/speakers/{speakerId}/voiceprint`

### 3.3 删除默认声纹

**请求方式：** `DELETE /v1/speakers/{speakerId}/voiceprint`

## 四、智能体说话人绑定

智能体说话人绑定用于维护当前智能体可识别的说话人。未绑定到智能体的说话人，不会参与该智能体的声纹识别。

### 4.1 获取绑定

**请求方式：** `GET /v1/agents/{agentId}/speaker-config`

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

### 4.2 更新绑定

**请求方式：** `PUT /v1/agents/{agentId}/speaker-config`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `speaker_ids` | array | 否 | 要绑定的说话人 ID 列表，传空数组表示清空绑定 |

#### 请求示例

```json
{
  "speaker_ids": [
    "2f6c9f1f4d0f4a8ca3d9a7f6b8e2a123"
  ]
}
```

::: info 绑定说明
`speaker_ids` 会按用户权限校验并自动去重。`voice_chat_only_enabled` 是只读的对话模式开关，如需修改请通过 [智能体 API](./agent.md) 更新智能体配置。
:::

## 五、最近语音样本

该接口仅用于辅助选择声纹样本，默认只返回当前智能体最近少量带音频的对话记录，不提供历史记录批量查询或导出能力。

**请求方式：** `GET /v1/agents/{agentId}/chat-history`

#### 响应示例

以下示例仅展示创建声纹需要依赖的字段。

```json
{
  "code": 0,
  "reqid": "req_12345678",
  "data": {
    "records": [
      {
        "audio_url": "https://example.com/sample.wav"
      }
    ]
  }
}
```

## 六、推荐接入流程

1. 调用 `POST /v1/speakers` 创建说话人，保存返回的 `speaker_id`。
2. 调用 `GET /v1/agents/{agentId}/chat-history`，从最近语音样本中选择一段清晰音频。
3. 调用 `POST /v1/speakers/{speakerId}/voiceprint`，为说话人创建默认声纹。
4. 调用 `PUT /v1/agents/{agentId}/speaker-config`，将 `speaker_id` 写入 `speaker_ids`。完成绑定后，该智能体才会识别该说话人。

## 相关文档

- [**声纹识别 API**](./voice.md) - 旧版声纹接口
- [**智能体 API**](./agent.md) - 智能体配置接口
