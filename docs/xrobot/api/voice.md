---
title: 声纹识别 API
---

# 声纹识别 API

## 接口概述

本文档介绍灵矽AI平台声纹识别（Voiceprint Recognition）相关的API接口，基于3D-Speaker模型提供高精度声纹识别与特征提取服务。通过这些API，您可以：

- **声纹特征提取**：从音频数据中提取192维声纹特征向量
- **设备声纹注册**：为设备注册多个说话者的声纹特征
- **声纹匹配识别**：进行实时声纹匹配和身份识别
- **设备数据管理**：管理设备的声纹数据和统计信息

::: tip 使用说明
声纹识别服务支持WAV格式音频文件，建议使用16kHz采样率。
:::

## 一、统一响应格式

所有API接口均采用统一的响应格式：

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | integer | 业务状态码，0表示成功，非0表示失败 |
| `msg` | string | 错误信息，成功时为空字符串 |
| `data` | object | 业务数据，成功时包含具体数据，失败时为null |

::: info HTTP状态码说明
所有API接口统一返回HTTP状态码200 OK，具体的业务状态通过响应体中的code字段表示。
:::

## 二、声纹管理

### 2.1 创建声纹并绑定设备和角色

在创建声纹的基础上，增加设备和角色绑定功能。

#### 接口信息

**请求方式：** `POST /v1/voiceprint/voices/create`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `device_id` | string | 是 | 设备ID，设备必须存在 |
| `role_id` | string | 否 | 角色ID，未提供则绑定到默认角色 |
| `threshold` | float | 否 | 声纹识别阈值，范围0-1 |
| `audio_url` | string | 否 | 音频文件下载链接（URL方式） |

::: info 音频要求和限制

支持两种音频传递方式：

裸数据方式：直接在请求体中传递音频二进制数据，deviceId、roleId、threshold参数放在请求头中
URL方式：通过JSON格式请求体传递参数，包括deviceId、roleId、threshold和audio_url参数
当同时提供两种方式时，优先使用URL方式。

裸数据方式限制：音频文件大小不超过512KB
URL方式限制：音频文件大小不超过10MB
格式：WAV格式
:::

#### 请求示例（裸数据方式）

```http
POST /v1/voiceprint/voices/create HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: audio/wav
X-Device-ID: device_001
X-Role-ID: role_001
X-Threshold: 0.2
Content-Length: 7724

[Binary audio data]
```

#### 请求示例（URL方式）

```http
POST /v1/voiceprint/voices/create HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "device_id": "device_001",
  "role_id": "role_001",
  "threshold": 0.2,
  "audio_url": "https://example.com/audio.wav"
}
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "voice_id": "00001",
    "voice_name": "妈妈的声音",
    "voice_url": "https://example.com/voice/00001.wav",
    "status": "activate",
    "threshold": 0.2,
    "created_at": "2023-01-01T12:00:00Z"
  }
}
```

### 2.2 删除声纹

删除指定的声纹记录。

#### 接口信息

**请求方式：** `DELETE /v1/voiceprint/voices/{voiceId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `voiceId` | string | 是 | 声纹ID |

#### 请求示例

```http
DELETE /v1/voiceprint/voices/0001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 2.3 获取声纹列表

获取当前用户的所有声纹记录。

#### 接口信息

**请求方式：** `GET /v1/voiceprint/voices`

#### 请求示例

```http
GET /v1/voiceprint/voices HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "voice_id": "100010001",
      "voice_name": "妈妈的声音",
      "voice_url": "https://example.com/voice/100010001.wav",
      "status": "activate",
      "threshold": 0.2,
      "role_bind": {
        "role_id": "000100010001",
        "role_name": "妈妈"
      },
      "dev_bind": [
        {
          "device_id": "0001",
          "device_name": "0001"
        }
      ],
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-01T12:00:00Z"
    }
  ]
}
```

::: warning 特殊说明
- 当声纹没有绑定角色时，`role_bind`字段返回空对象`{}`
- 当声纹绑定了一个不存在的角色时，`role_bind`字段也返回空对象`{}`
:::

### 2.5 获取特定声纹

获取指定声纹的详细信息。

#### 接口信息

**请求方式：** `GET /v1/voiceprint/voices/{voiceId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `voiceId` | string | 是 | 声纹ID |

#### 请求示例

```http
GET /v1/voiceprint/voices/100010001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "voice_id": "100010001",
    "voice_name": "妈妈的声音",
    "voice_url": "https://example.com/voice/100010001.wav",
    "status": "activate",
    "threshold": 0.2,
    "role_bind": {
      "role_id": "000100010001",
      "role_name": "妈妈"
    },
    "dev_bind": [
      {
        "device_id": "0001",
        "device_name": "0001"
      }
    ],
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-01T12:00:00Z"
  }
}
```

### 2.6 更新声纹绑定信息

更新指定声纹的绑定信息。一个声纹可以绑定多个设备，一个声纹也可以绑定到不同角色。声纹绑定信息声纹识别阈值、角色绑定、设备绑定信息。

#### 接口信息

**请求方式：** `PUT /v1/voiceprint/voicesbind/{voiceId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `threshold` | float | 否 | 识别阈值 |
| `role_bind` | object | 否 | 角色绑定信息 |
| `dev_bind` | object | 否 | 设备绑定信息 |

#### 请求示例

```http
PUT /v1/voiceprint/voices/100010001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "threshold": 0.2,
  "role_bind": {
    "role_id": "000100010001"
  }
  "dev_bind": [
    {
      "device_id": "11:22:33:44:55:66",
      "device_id": "11:22:33:44:55:88",
    }
  ]
}
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

## 三、角色管理

有了声纹，对话的一端可以真的对应到人，而不是设备，因此角色管理也变得重要。可以在智能体交互屏蔽其他角色的干扰、打断，也可以针对角色做个人性化设置，让对话更人性化。

### 3.1 创建角色

创建新的用户角色。

#### 接口信息

**请求方式：** `POST /v1/voiceprint/roles`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `role_name` | string | 是 | 角色名称 |

#### 请求示例

```http
POST /v1/voiceprint/roles HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "role_name": "妈妈"
}
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "role_id": "000100010001"
  }
}
```

### 3.2 获取角色列表

获取所有角色的列表。

#### 接口信息

**请求方式：** `GET /v1/voiceprint/roles`

#### 请求示例

```http
GET /v1/voiceprint/roles HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "role_id": "000100010001",
      "role_name": "妈妈",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-01T12:00:00Z"
    }
  ]
}
```

### 3.3 获取特定角色

获取指定角色的详细信息。

#### 接口信息

**请求方式：** `GET /v1/voiceprint/roles/{roleId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `roleId` | string | 是 | 角色ID |

#### 请求示例

```http
GET /v1/voiceprint/roles/000100010001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "role_id": "000100010001",
    "role_name": "妈妈",
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-01T12:00:00Z"
  }
}
```

### 3.4 删除角色

删除指定的角色。

#### 接口信息

**请求方式：** `DELETE /v1/voiceprint/roles/{roleId}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `roleId` | string | 是 | 角色ID |

#### 请求示例

```http
DELETE /v1/voiceprint/roles/000100010001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

## 四、角色打断配置管理

设置了角色打断配置后，当智能体收到新的消息时，会根据配置判断是否打断当前正在说话的声纹。

### 4.1 获取角色打断配置

获取指定智能体的角色打断配置。

#### 接口信息

**请求方式：** `GET /v1/voiceprint/roleinterrupt/{agent_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agent_id` | string | 是 | 智能体ID |

#### 请求示例

```http
GET /v1/voiceprint/roleinterrupt/agent_001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "roleinterrupt": [
      {
        "role_id": "000100010001",
        "role_name": "妈妈",
        "interrupt": "true"
      },
      {
        "role_id": "000100010002",
        "role_name": "爸爸",
        "interrupt": "false"
      }
    ]
  }
}
```

### 4.2 更新角色打断配置

更新指定智能体的角色打断配置。

#### 接口信息

**请求方式：** `PUT /v1/voiceprint/roleinterrupt/{agent_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agent_id` | string | 是 | 智能体ID |
| `roleinterrupt` | array | 是 | 角色打断配置列表 |

#### 请求示例

```http
PUT /v1/voiceprint/roleinterrupt/agent_001 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "roleinterrupt": [
    {
      "role_id": "000100010001",
      "role_name": "妈妈",
      "interrupt": "true"
    },
    {
      "role_id": "000100010002",
      "role_name": "爸爸",
      "interrupt": "false"
    }
  ]
}
```

#### 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

::: info 特殊说明
请求体中包含`role_name`字段以保持与获取配置API响应字段一致，但后端实际仅使用`role_id`和`interrupt`字段进行更新操作，`role_name`字段会被忽略。
:::


## 最佳实践

### 声纹数据管理

1. **声纹数量控制**：建议每个设备注册不超过4个声纹，保证识别准确率
2. **音频质量**：使用16kHz采样率、WAV格式、干净无噪音的音频
3. **阈值设置**：根据安全要求调整，高安全场景使用0.2+，便民场景使用0.1-0.2
4. **定期维护**：建议每6个月更新一次声纹数据，应对声音变化


## 相关文档

- [**智能体 API**](./agent.md) - 查看智能体管理接口
- [**大语言模型 API**](./llm.md) - 了解LLM模型配置  
- [**声纹识别最佳实践**](../guide/voice-start.md) - 声纹识别使用指南
- [**API 概览**](./index.md) - 查看所有可用的API接口资源监控
