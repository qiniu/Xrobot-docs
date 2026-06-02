---
title: 长期记忆 API
---

# 长期记忆 API

## 接口概述

本文档介绍灵矽AI平台长期记忆（Long-term Memory）相关的API接口，支持智能体跨会话的记忆能力。通过这些API，您可以：

- **管理记忆容器**：为智能体创建和配置专属的记忆存储空间
- **定义记忆变量**：设置智能体需要长期关注的关键信息字段
- **管理记忆值**：为不同用户(设备、或声纹识别人)存储和更新个性化记忆信息
- **记忆片段处理**：管理从对话中提取的事实性信息
- **运行时召回**：在对话中智能检索相关记忆内容

::: tip 使用说明
长期记忆功能需要先为智能体创建记忆容器，默认会有记忆片段产生，记忆变量用户可以根据业务需求创建，最后通过MCP服务在运行时召回记忆内容。
:::

## 一、记忆容器管理

### 1.1 创建记忆容器

为智能体创建一个专属的记忆存储容器，与AgentID一对一关联。

#### 接口信息

**请求方式：** `POST /v1/memories`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agent_id` | string | 是 | 要关联的智能体ID |
| `enabled` | boolean | 否 | 是否启用长期记忆功能，默认为 true |
| `memory_prompt` | string | 否 | 自定义的记忆提取提示词 |

#### 请求示例

```http
POST /v1/memories
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "agent_id": "AGT_1750667902769",
    "enabled": true,
    "memory_prompt": "请从对话中提取用户的个人信息、偏好和重要事实，用于后续个性化服务。"
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "mem_a1b2c3d4e5f6789",
        "agent_id": "AGT_1750667902769",
        "is_enabled": true,
        "memory_prompt": "请从对话中提取用户的个人信息、偏好和重要事实，用于后续个性化服务。",
        "created_at": "2025-09-22T10:30:00Z",
        "updated_at": "2025-09-22T10:30:00Z"
    }
}
```

### 1.2 获取记忆容器详情

根据记忆容器ID查询详情。

#### 接口信息

**请求方式：** `GET /v1/memories/{memory_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memory_id` | string | 是 | 记忆容器的唯一标识符 |

#### 请求示例

```http
GET /v1/memories/mem_a1b2c3d4e5f6789
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "mem_a1b2c3d4e5f6789",
        "agent_id": "AGT_1750667902769",
        "is_enabled": true,
        "memory_prompt": "请从对话中提取用户的个人信息、偏好和重要事实，用于后续个性化服务。",
        "created_at": "2025-09-22T10:30:00Z",
        "updated_at": "2025-09-22T10:30:00Z"
    }
}
```

### 1.3 获取记忆容器配置

查询智能体的记忆容器配置信息。

#### 接口信息

**请求方式：** `GET /v1/agents/{agent_id}/memory`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agentId` | string | 是 | 智能体的唯一标识符 |

#### 请求示例

```http
GET /v1/agents/AGT_1750667902769/memory
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "mem_a1b2c3d4e5f6789",
        "agent_id": "AGT_1750667902769",
        "is_enabled": true,
        "memory_prompt": "请从对话中提取用户的个人信息、偏好和重要事实，用于后续个性化服务。",
        "created_at": "2025-09-22T10:30:00Z",
        "updated_at": "2025-09-22T10:30:00Z"
    }
}
```

### 1.4 更新记忆容器配置

修改记忆容器的配置参数。

#### 接口信息

**请求方式：** `PUT /v1/memories/{memory_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memory_id` | string | 是 | 记忆容器的唯一标识符 |
| `enabled` | boolean | 否 | 是否启用长期记忆功能 |
| `memory_prompt` | string | 否 | 自定义的记忆提取提示词 |

#### 请求示例

```http
PUT /v1/memories/mem_a1b2c3d4e5f6789
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "enabled": true,
    "memory_prompt": "重点关注用户的饮食偏好、兴趣爱好和生活习惯，为个性化推荐提供依据。"
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "mem_a1b2c3d4e5f6789",
        "agent_id": "AGT_1750667902769",
        "is_enabled": true,
        "memory_prompt": "重点关注用户的饮食偏好、兴趣爱好和生活习惯，为个性化推荐提供依据。",
        "created_at": "2025-09-22T10:30:00Z",
        "updated_at": "2025-09-22T11:00:00Z"
    }
}
```

## 二、记忆变量管理

### 2.1 创建记忆变量

为记忆容器定义需要长期关注的结构化信息字段。

#### 接口信息

**请求方式：** `POST /v1/memories/{memory_id}/attentions`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `name` | string | 是 | 焦点的显示名称，如"用户饮食偏好" |
| `description` | string | 是 | 详细描述，用于LLM推理提示词 |
| `default_value` | string | 否 | 记忆变量的默认值 |
| `is_single_value` | boolean | 否 | 是否为单值模式，默认为 false（多值模式） |

#### 请求示例

```http
POST /v1/memories/mem_a1b2c3d4e5f6789/attentions
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "name": "用户饮食偏好",
    "description": "用户喜欢和不喜欢的食物类型，包括口味偏好、忌口食物等",
    "default_value": "暂无记录",
    "is_single_value": false
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "att_29f49752b7b3467b",
        "memory_id": "mem_a1b2c3d4e5f6789",
        "name": "用户饮食偏好",
        "description": "用户喜欢和不喜欢的食物类型，包括口味偏好、忌口食物等",
        "default_value": "暂无记录",
        "is_single_value": false,
        "created_at": "2025-09-22T10:35:00Z",
        "updated_at": "2025-09-22T10:35:00Z"
    }
}
```

### 2.2 获取记忆变量列表

查询记忆容器中定义的所有记忆变量。

#### 接口信息

**请求方式：** `GET /v1/memories/{memory_id}/attentions`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |

#### 请求示例

```http
GET /v1/memories/mem_a1b2c3d4e5f6789/attentions
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": [
        {
            "id": "att_29f49752b7b3467b",
            "name": "用户饮食偏好",
            "description": "用户喜欢和不喜欢的食物类型，包括口味偏好、忌口食物等",
            "default_value": "暂无记录",
            "is_single_value": false,
            "created_at": "2025-09-22T10:35:00Z",
            "updated_at": "2025-09-22T10:35:00Z"
        },
        {
            "id": "att_c12135e914d14d5d",
            "name": "兴趣爱好",
            "description": "用户的休闲娱乐活动、运动项目、收藏爱好等",
            "default_value": "暂无记录",
            "is_single_value": false,
            "created_at": "2025-09-22T10:36:00Z",
            "updated_at": "2025-09-22T10:36:00Z"
        }
    ]
}
```

### 2.3 更新记忆变量

修改已有记忆变量的定义信息。

#### 接口信息

**请求方式：** `PUT /v1/memories/{memory_id}/attentions/{attention_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `attention_id` | string | 是 | 记忆变量ID |
| `name` | string | 否 | 新的显示名称 |
| `description` | string | 否 | 新的描述 |
| `default_value` | string | 否 | 新的默认值 |
| `is_single_value` | boolean | 否 | 是否为单值模式 |

#### 请求示例

```http
PUT /v1/memories/mem_a1b2c3d4e5f6789/attentions/att_29f49752b7b3467b
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "name": "用户饮食与健康偏好",
    "description": "用户的饮食偏好、健康需求、过敏信息和营养目标",
    "is_single_value": true
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "att_29f49752b7b3467b",
        "memory_id": "mem_a1b2c3d4e5f6789",
        "name": "用户饮食与健康偏好",
        "description": "用户的饮食偏好、健康需求、过敏信息和营养目标",
        "default_value": "暂无记录",
        "is_single_value": true,
        "created_at": "2025-09-22T10:35:00Z",
        "updated_at": "2025-09-22T11:00:00Z"
    }
}
```

### 2.4 删除记忆变量

删除指定的记忆变量定义。

#### 接口信息

**请求方式：** `DELETE /v1/memories/{memory_id}/attentions/{attention_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `attention_id` | string | 是 | 记忆变量ID |

#### 请求示例

```http
DELETE /v1/memories/mem_a1b2c3d4e5f6789/attentions/att_29f49752b7b3467b
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

::: warning 注意事项
删除记忆变量会同时删除所有用户在该变量上的记忆值，请谨慎操作。
:::

## 三、记忆值管理

### 3.1 创建或更新记忆值

为特定用户在某个记忆变量上设置或更新值。

#### 接口信息

**请求方式：** `POST /v1/memories/{memory_id}/identifiers/{identify_id}/attention_values/{attention_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户身份标识（如设备MAC地址） |
| `attention_id` | string | 是 | 记忆变量ID |
| `value` | any | 是 | 要设置的值（建议JSON格式或字符串） |

#### 请求示例

```http
POST /v1/memories/mem_a1b2c3d4e5f6789/identifiers/mac_00:1B:44:11:3A:B7/attention_values/att_29f49752b7b3467b
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "value": "川菜、辣味、不吃海鲜、偏爱素食"
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

::: tip 说明
此接口为 upsert 操作，如果已存在对应记录则更新，不存在则创建。
:::

### 3.2 获取用户记忆值列表

查询特定用户的所有记忆变量及其对应值。

#### 接口信息

**请求方式：** `GET /v1/memories/{memory_id}/identifiers/{identify_id}/attention_values`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户身份标识 |

#### 请求示例

```http
GET /v1/memories/mem_a1b2c3d4e5f6789/identifiers/mac_00:1B:44:11:3A:B7/attention_values
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": [
        {
            "id": "att_29f49752b7b3467b",
            "name": "用户饮食偏好",
            "description": "用户喜欢和不喜欢的食物类型，包括口味偏好、忌口食物等",
            "values": [
                "川菜",
                "辣味",
                "不吃海鲜",
                "偏爱素食"
            ]
        },
        {
            "id": "att_c12135e914d14d5d",
            "name": "兴趣爱好",
            "description": "用户的休闲娱乐活动、运动项目、收藏爱好等",
            "values": [
                "跑步",
                "摄影",
                "古典音乐"
            ]
        }
    ]
}
```

::: tip 说明
返回值是一个数组，每个元素包含 attention 的基本信息（id、name、description）及其对应的值列表（values）。
:::

## 四、记忆片段管理

### 4.1 创建记忆片段

手动或通过归档服务为特定用户添加记忆片段。

#### 接口信息

**请求方式：** `POST /v1/memories/{memory_id}/identifiers/{identify_id}/nodes`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户标识 |
| `content` | string | 是 | 片段内容（最大10000字符） |
| `source_session_id` | string | 否 | 来源会话ID |

#### 请求示例

```http
POST /v1/memories/mem_a1b2c3d4e5f6789/identifiers/mac_00:1B:44:11:3A:B7/nodes
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "content": "用户提到下周要去成都出差，希望了解当地的川菜餐厅推荐",
    "source_session_id": "session_1234567890"
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "node_9ea227d54b654ac5",
        "memory_id": "mem_a1b2c3d4e5f6789",
        "identify_id": "mac_00:1B:44:11:3A:B7",
        "content": "用户提到下周要去成都出差，希望了解当地的川菜餐厅推荐",
        "source_session_id": "session_1234567890",
        "created_at": "2025-09-22T11:30:00Z"
    }
}
```

### 4.2 获取记忆片段列表

查询特定用户的记忆片段列表。

#### 接口信息

**请求方式：** `GET /v1/memories/{memory_id}/identifiers/{identify_id}/nodes`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户标识 |
| `last_days` | integer | 否 | 查询最近 N 天内的记忆片段，不传则返回全部 |

#### 请求示例

```http
GET /v1/memories/mem_a1b2c3d4e5f6789/identifiers/mac_00:1B:44:11:3A:B7/nodes?last_days=7
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": [
        {
            "id": "node_9ea227d54b654ac5",
            "memory_id": "mem_a1b2c3d4e5f6789",
            "identify_id": "mac_00:1B:44:11:3A:B7",
            "content": "用户提到下周要去成都出差，希望了解当地的川菜餐厅推荐",
            "source_session_id": "session_1234567890",
            "created_at": "2025-09-22T11:30:00Z"
        },
        {
            "id": "node_8fb116c43a543bd4",
            "memory_id": "mem_a1b2c3d4e5f6789",
            "identify_id": "mac_00:1B:44:11:3A:B7",
            "content": "用户表示不喜欢海鲜，对虾蟹过敏",
            "source_session_id": "session_0987654321",
            "created_at": "2025-09-21T15:20:00Z"
        }
    ]
}
```

::: tip 说明
记忆片段查询可通过 `last_days` 参数控制时间范围，不传则返回所有记录。
:::

### 4.3 获取记忆片段详情

根据ID查询单个记忆片段的详情。

#### 接口信息

**请求方式：** `GET /v1/memories/{memory_id}/identifiers/{identify_id}/nodes/{node_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户标识 |
| `nodeId` | string | 是 | 记忆片段ID |

#### 请求示例

```http
GET /v1/memories/mem_a1b2c3d4e5f6789/identifiers/mac_00:1B:44:11:3A:B7/nodes/node_9ea227d54b654ac5
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "node_9ea227d54b654ac5",
        "memory_id": "mem_a1b2c3d4e5f6789",
        "identify_id": "mac_00:1B:44:11:3A:B7",
        "content": "用户提到下周要去成都出差，希望了解当地的川菜餐厅推荐",
        "source_session_id": "session_1234567890",
        "created_at": "2025-09-22T11:30:00Z"
    }
}
```

### 4.4 删除记忆片段

删除指定的记忆片段。

#### 接口信息

**请求方式：** `DELETE /v1/memories/{memory_id}/identifiers/{identify_id}/nodes/{node_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户标识 |
| `nodeId` | string | 是 | 记忆片段ID |

#### 请求示例

```http
DELETE /v1/memories/mem_a1b2c3d4e5f6789/identifiers/mac_00:1B:44:11:3A:B7/nodes/node_9ea227d54b654ac5
Authorization: Bearer <token>
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

### 4.5 更新记忆片段

修改指定记忆片段的内容。

#### 接口信息

**请求方式：** `PUT /v1/memories/{memory_id}/identifiers/{identify_id}/nodes/{node_id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `memoryId` | string | 是 | 记忆容器ID |
| `identify_id` | string | 是 | 终端用户标识 |
| `nodeId` | string | 是 | 记忆片段ID |
| `content` | string | 是 | 新的片段内容（最大10000字符） |

#### 请求示例

```http
PUT /v1/memories/mem_a1b2c3d4e5f6789/identifiers/00:1B:44:11:3A:B7/nodes/node_9ea227d54b654ac5
Content-Type: application/json
Authorization: Bearer <token>

{
    "content": "用户下周要去成都出差，希望了解当地的川菜餐厅推荐，同时对海鲜过敏。"
}
```

#### 响应示例

**成功响应**：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "node_9ea227d54b654ac5",
        "memory_id": "mem_a1b2c3d4e5f6789",
        "identify_id": "00:1B:44:11:3A:B7",
        "content": "用户下周要去成都出差，希望了解当地的川菜餐厅推荐，同时对海鲜过敏。",
        "source_session_id": "session_1234567890",
        "created_at": "2025-09-22T11:30:00Z",
        "updated_at": "2025-09-22T14:00:00Z"
    }
}
```

**失败响应（片段不存在）**：

```json
{
    "code": 612,
    "msg": "node not found",
    "data": null
}
```

## 五、记忆推理与召回

### 5.1 触发记忆推理更新

基于最新对话内容，异步触发记忆容器的总结和推理。

#### 接口信息

**请求方式：** `POST /v1/agents/{agent_id}/identifiers/{identify_id}/memory/infer`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agentId` | string | 是 | 智能体ID |
| `identify_id` | string | 是 | 用户或设备的唯一标识 |
| `dialog_content` | string | 是 | 当前对话上下文，OpenAI chat格式的JSON字符串 |

#### 请求示例

```http
POST /v1/agents/AGT_1750667902769/identifiers/mac_00:1B:44:11:3A:B7/memory/infer
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "dialog_content": "[{\"role\":\"user\",\"content\":\"我最近开始健身了，想了解一些高蛋白低脂的食物推荐\"},{\"role\":\"assistant\",\"content\":\"很棒的决定！高蛋白低脂的食物有...\"}]"
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "task_id": "task_abc123def456"
    }
}
```

### 5.2 运行时记忆召回

在用户与智能体交互过程中，召回最相关的记忆内容。

#### 接口信息

**请求方式：** `POST /v1/agents/{agent_id}/identifiers/{identify_id}/memory/recall`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `agentId` | string | 是 | 智能体ID |
| `identify_id` | string | 是 | 用户或设备的唯一标识 |
| `attention_value_limit` | integer | 否 | 记忆变量值召回上限，默认50 |

#### 请求示例

```http
POST /v1/agents/AGT_1750667902769/identifiers/mac_00:1B:44:11:3A:B7/memory/recall
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "attention_value_limit": 20
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "attention_values": {
            "用户饮食偏好": "川菜, 辣味, 不吃海鲜, 偏爱素食",
            "兴趣爱好": "跑步, 摄影, 古典音乐"
        },
        "memory_nodes": [
            {
                "id": "node_9ea227d54b654ac5",
                "content": "用户提到下周要去成都出差，希望了解当地的川菜餐厅推荐",
                "updated_at": "2025-09-22T11:30:00Z"
            },
            {
                "id": "node_8fb116c43a543bd4",
                "content": "用户表示不喜欢海鲜，对虾蟹过敏",
                "updated_at": "2025-09-21T15:20:00Z"
            }
        ]
    }
}
```

::: tip 说明
- `attention_values` 是一个 map，key 为 attention 的 name，value 为聚合后的字符串值（多个值以 `, ` 分隔）；首次召回时若无记录则返回 default_value
- `memory_nodes` 默认只返回最近7天内的记忆片段
:::

::: tip MCP服务集成
记忆召回功能已集成到MCP服务中，智能体可以通过`mcp.memory.search(agent_id, identify_id, query)`接口自动调用。
:::

## 六、智能体配置集成

将长期记忆功能集成到智能体配置中。

### 6.1 更新智能体记忆配置

#### 接口信息

**请求方式：** `PUT /xiaozhi/agent/{id}`

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 智能体的唯一标识符 |
| `mem_model_id` | string | 否 | 记忆模型ID，启用长期记忆时设置 |
| `extra.memory` | object | 否 | 长期记忆个性化配置参数 |

#### 长期记忆个性化配置

`extra.memory` 字段用于个性化记忆配置，支持以下参数：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `enabled` | boolean | 是否启用长期记忆 | false |
| `auto_infer` | boolean | 是否自动推理更新记忆 | true |
| `recall_limit` | integer | 记忆召回数量限制 | 10 |
| `retention_days` | integer | 记忆保留天数（0为永久） | 0 |

#### 请求示例

```http
PUT /xiaozhi/agent/AGT_1750667902769
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "agent_code": "AGT_1750667902769",
    "agent_name": "智能助手小智",
    "mem_model_id": "Memory_longterm",
    "system_prompt": "你是一个智能助手，能够记住用户的偏好和历史对话，提供个性化服务。",
    "extra": {
        "memory": {
            "enabled": true,
            "auto_infer": true,
            "recall_limit": 15,
            "retention_days": 365
        }
    }
}
```

#### 响应示例

```json
{
    "code": 0,
    "msg": "success",
    "data": null
}
```

## 错误码说明

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `612` | 记忆容器不存在 | 请先为智能体创建记忆容器 |
| `614` | 记忆容器已存在 | 该智能体已创建过记忆容器 |
| `40002` | 记忆焦点不存在 | 请检查记忆焦点ID是否正确 |
| `40003` | 用户身份标识无效 | 请提供有效的 identify_id |
| `40004` | 记忆推理任务失败 | 请检查对话内容格式是否正确 |
| `50001` | 记忆存储服务异常 | 请稍后重试或联系技术支持 |

## 最佳实践

### 记忆变量设计建议

1. **合理规划变量数量**：建议每个智能体的记忆变量不超过20个
2. **清晰的名称和描述**：便于LLM理解和推理
3. **避免过于细粒度**：将相关信息合并到同一变量中
4. **单值与多值模式**：`is_single_value` 为 true 时，每个用户在该变量上只能有一个值

### 性能优化建议

1. **适当设置召回限制**：避免一次性召回过多记忆内容
2. **定期清理无用片段**：删除过时或无价值的记忆片段
3. **合理使用自动推理**：在对话量大的场景下可考虑降低推理频率
4. **注意时间范围**：记忆片段查询默认只返回最近7天内的记录

### 数据隐私保护

1. **用户身份匿名化**：使用设备MAC地址等匿名标识
2. **敏感信息处理**：避免存储用户隐私敏感信息
3. **数据保留期限**：根据业务需求设置合理的数据保留时间

## 相关文档

- [**智能体 API**](./agent.md) - 查看智能体管理接口
- [**大语言模型 API**](./llm.md) - 了解LLM模型配置
- [**API 概览**](./index.md) - 查看所有可用的API接口
