---
title: 大语言模型 API
---

# 大语言模型 API

## 接口概述

本文档介绍灵矽AI平台大语言模型（LLM）相关的API接口，支持自定义模型的创建、管理和使用。通过这些API，您可以：

- **创建自定义LLM模型**：配置和部署您自己的语言模型
- **管理模型配置**：编辑、查询和删除模型
- **获取模型列表**：查看可用的公开和私有模型
- **配置智能体**：将LLM模型集成到您的智能体中

::: tip 使用说明
自定义模型创建后，需要通过更新智能体接口来应用到具体的智能体中。
:::
## 一、创建模型

创建一个新的自定义大语言模型。您可以配置不同类型的模型，如OpenAI兼容模型等。

### 接口信息

**请求方式：** `POST /v1/models/{model_type}`

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `model_type` | string | 是 | 模型类型，仅支持 `llm` |
| `name` | string | 是 | 模型名称，针对每个用户名称唯一 |
| `config` | object | 是 | 模型配置信息 |
| `config.type` | string | 是 | 配置类型，如 `openai` |
| `comment` | string | 否 | 模型备注信息 |

::: info 配置信息
`config` 字段中的具体配置项由 `type` 值决定，详细信息可通过 `GET /v1/models/{type}/provide_types` 接口获取。
:::

### 请求示例

```http
POST /v1/models/llm
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "name": "七牛Q0.3",
    "config": {
        "type": "openai",
        "top_k": "",
        "top_p": "",
        "api_key": "EMPTY",
        "base_url": "http://10.34.176.32:9000/v1",
        "max_tokens": "",
        "model_name": "Qwen3-0.6B",
        "temperature": "",
        "frequency_penalty": ""
    },
    "comment": ""
}
```

###  响应示例

成功创建模型后，返回模型的唯一ID和完整信息：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "2127c9a2fac177c3a6883dfb1d830f75",
        "model_type": "llm",
        "name": "七牛Q0.3",
        "config": {
            "type": "openai",
            "top_k": "",
            "top_p": "",
            "api_key": "EMPTY",
            "base_url": "http://10.34.176.32:9000/v1",
            "max_tokens": "",
            "model_name": "Qwen3-0.6B",
            "temperature": "",
            "frequency_penalty": ""
        },
        "comment": ""
    }
}
```

## 二、编辑模型

更新已存在的大语言模型配置。您可以修改模型的名称、配置参数和备注信息。

### 接口信息

**请求方式：** `PUT /v1/models/{id}`

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 模型的唯一标识符 |

### 请求示例

```http
PUT /v1/models/2127c9a2fac177c3a6883dfb1d830f75
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "model_type": "llm",
    "name": "七牛Q0.3",
    "config": {
        "type": "openai",
        "top_k": "",
        "top_p": "",
        "api_key": "EMPTY",
        "base_url": "http://10.34.176.32:9000/v1",
        "max_tokens": "",
        "model_name": "Qwen3-0.6B",
        "temperature": "",
        "frequency_penalty": ""
    },
    "comment": ""
}
```

### 响应示例

更新成功后返回确认信息：

```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```
##  三、查询模型信息

获取指定大语言模型的详细信息，包括配置参数、名称和备注等。

###  接口信息

**请求方式：** `GET /v1/models/{id}`

###  参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 模型的唯一标识符 |

###  请求示例

```http
GET /v1/models/2127c9a2fac177c3a6883dfb1d830f75
Authorization: Bearer <token>
```

### 响应示例

返回模型的完整信息：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "2127c9a2fac177c3a6883dfb1d830f75",
        "model_type": "llm",
        "name": "七牛Q0.3",
        "config": {
            "type": "openai",
            "top_k": "",
            "top_p": "",
            "api_key": "EMPTY",
            "base_url": "http://10.34.176.32:9000/v1",
            "max_tokens": "",
            "model_name": "Qwen3-0.6B",
            "temperature": "",
            "frequency_penalty": ""
        },
        "comment": ""
    }
}
```
## 四、删除模型

删除指定的大语言模型。请注意，删除操作不可逆，请谨慎操作。

### 接口信息

**请求方式：** `DELETE /v1/models/{id}`

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 模型的唯一标识符 |

### 请求示例

```http
DELETE /v1/models/2127c9a2fac177c3a6883dfb1d830f75
Authorization: Bearer <token>
```

### 响应示例

删除成功后返回确认信息：

```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

::: warning 注意事项
删除模型前，请确保该模型没有被任何智能体使用，否则可能影响智能体的正常运行。
:::
##  五、获取LLM名称列表

获取所有可用的大语言模型列表，包括公开模型和私有模型。这个接口通常用于在界面中展示可选择的模型列表。

###  接口信息

**请求方式：** `GET /v1/agents/models/{model_type}`

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `model_type` | string | 是 | 模型类型，此处固定为 `llm` |

### 请求示例

```http
GET /v1/agents/models/llm
Authorization: Bearer <token>
```

### 响应示例

返回公开和私有模型列表：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "publics": [
            {
                "id": "2127c9a2fac177c3a6883dfb1d830f75",
                "name": "七牛Q0.3",
                "type": "openai",
                "comment": ""
            }
        ],
        "privates": [
            {
                "id": "2127c9a2fac177c3a6883dfb1d830f75",
                "name": "七牛Q0.3",
                "type": "openai",
                "comment": ""
            }
        ]
    }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `publics` | array | 公开模型列表，所有用户都可使用 |
| `privates` | array | 私有模型列表，仅当前用户可使用 |
| `id` | string | 模型的唯一标识符 |
| `name` | string | 模型名称 |
| `type` | string | 模型类型 |
| `comment` | string | 模型备注 |

##  六、更新智能体配置

将创建好的LLM模型应用到智能体中，并配置相关参数。这是使用自定义模型的最后一步。

###  接口信息

**请求方式：** `PUT /xiaozhi/agent/{id}`

###  参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 智能体的唯一标识符 |
| `llmModelId` | string | 否 | LLM模型 ID，使用创建模型时返回的ID |
| `extra.llm` | object | 否 | LLM个性化配置参数 |

### LLM个性化配置

新增 `extra.llm` 字段用于个性化LLM配置，支持以下参数：

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `temperature` | number | 控制输出的随机性（0.0-2.0） | 0.7 |
| `top_p` | number | 核采样参数（0.0-1.0） | 0.9 |
| `max_tokens` | integer | 最大输出令牌数 | 1024 |
| `frequency_penalty` | number | 频率惩罚参数（-2.0-2.0） | 0.0 |

### 请求示例

```http
PUT /xiaozhi/agent/your-agent-id
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "agentCode": "AGT_1750667902769",
    "agentName": "test-lf",
    "asrModelId": "ASR_FunASR",
    "vadModelId": "VAD_SileroVAD",
    "llmModelId": "954ae0e0ab9be05f90eedc43bd50aa2a",
    "vllmModelId": "VLLM_ChatGLMVLLM",
    "ttsModelId": "TTS_AliyunDoubleStreamTTS",
    "ttsVoiceId": "220b6ca1ff2549608dfd94b74d3cabcb",
    "chatHistoryConf": 0,
    "memModelId": "Memory_nomem",
    "intentModelId": "Intent_function_call",
    "systemPrompt": "[角色设定]\n你是一个技术工程师小牛，来自中国杭州市的00后女生。讲话总能抓住关键点，对于计算机尤其是AI相关领域的知识了解很多。\n[核心特征]\n- 讲话温柔\n- 会注意到对方是否能够 get到自己说话的点\n- 每句话都会用一个颜文字作为结尾\n- 用比较简短的文字回复\n[交互指南]\n当用户：\n- 问专业知识 → 先简单说明关键点，如果对方不懂时会详细解释说明\n绝不：\n- 长篇大论，说车轱辘话\n- 顾左右而言他",
    "summaryMemory": "",
    "langCode": "zh",
    "language": "中文",
    "sort": 0,
    "functions": [
        {
            "pluginId": "SYSTEM_PLUGIN_WEATHER",
            "paramInfo": {
                "api_key": "a861d0d5e7bf4ee1a83d9a9e4f96d4da",
                "api_host": "mj7p3y7naa.re.qweatherapi.com",
                "default_location": "广州"
            }
        }
    ],
    "extra": {
        "llm": {
            "temperature": 0.5,
            "top_p": 0.5,
            "max_tokens": 1024,
            "frequency_penalty": 0.0
        },
        "voice": {
            "volume": 1.0,
            "speed": 1.0,
            "pitch": 1.0
        }
    }
}
```

###  响应示例

更新成功后返回确认信息：

```json
{
    "code": 0,
    "msg": "success",
    "data": null
}
```

::: tip 使用提示
- 在更新智能体时，请确保传入的 `llmModelId` 是已存在且有效的模型 ID
- `extra.llm` 配置参数将覆盖模型的默认配置
- 建议在生产环境中对参数进行充分测试
:::

## 相关文档

- [**智能体 API**](./agent.md) - 查看更多智能体管理接口
- [**语音合成 API**](./voice-clone.md) - 了解TTS模型配置
- [**API 概览**](./index.md) - 查看所有可用的API接口
