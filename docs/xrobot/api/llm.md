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

新增 `extra.llm` 字段用于个性化LLM配置。这里的参数为**所有 LLM 模型通用的标准参数**，取值范围由后端统一定义、与具体模型无关，支持以下参数：

| 参数 | 类型 | 说明 | 默认值 | 接受范围 |
|------|------|------|--------|----------|
| `temperature` | number | 控制输出的随机性 | 0.7 | 0.0 ~ 2.0 |
| `top_p` | number | 核采样参数 | 1.0 | 0.0 ~ 1.0 |
| `frequency_penalty` | number | 频率惩罚参数 | 0.0 | -2.0 ~ 2.0 |
| `max_tokens` | integer | 最大输出令牌数（最长回复长度） | 500 | 1 ~ 8192 |
| `enable_search` | boolean | 是否联网搜索 | false | true / false |

::: warning 越界自动夹取，不报错
标准参数即使传了超出范围的值（如 `temperature: 999`），后端也**不会拒绝请求**，而是**静默夹取**到边界值（如 `2.0`）。要精确生效请自行传合法值。这一行为与下文的自定义参数「非法即拒绝」不同。
:::

> 与模型相关、需按模型 schema 校验的参数（如 `thinking`、`reasoning_effort` 等），请通过 `custom_params` 传入，详见下文 **「七、大模型自定义参数（custom_params）」**。

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
    "asrModelId": "ASR_DoubaoASR",
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

## 七、大模型自定义参数（custom_params）

除上一节的通用标准参数外，部分模型还支持**与模型强相关的自定义参数**（如思考/推理控制 `thinking`、`reasoning_effort` 等）。这类参数通过 `extra.llm.custom_params` 传入，在保存 agent 配置时会按**该模型声明的 schema 做校验**，非法参数会被**直接拒绝**（不会像标准参数那样被夹取）。

::: info 两类参数的区别
| 类别 | 例子 | 传参位置 | 校验方式 | 越限 / 非法时 |
|------|------|----------|----------|---------------|
| **标准参数** | temperature、top_p、frequency_penalty、max_tokens、enable_search | `extra.llm.<key>` | 后端固定范围**夹取** | 夹到边界值，**不报错** |
| **自定义参数** | thinking、reasoning_effort 等 | `extra.llm.custom_params.body.<key>` | 按**模型 schema** 白名单 + 类型校验 | **直接拒绝（400）** |
:::

### 传参位置

自定义参数必须包在 `custom_params.body` 里：

```json
{
  "extra": {
    "llm": {
      "custom_params": {
        "body": {
          "reasoning_effort": "high"
        }
      }
    }
  }
}
```

### 校验规则

保存 agent 配置时，后端按**该 agent 当前所选 LLM 模型**的 `custom_params_schema` 对 `body` 逐项校验：

| 规则 | 说明 |
|------|------|
| **key 白名单** | `body` 里的 key 必须在该模型声明的范围内，否则拒绝：`非法的大模型自定义参数：<key>` |
| **类型匹配** | 值的类型须与 schema 默认值类型一致（布尔 / 数字 / 字符串 / 对象 / 数组），否则拒绝：`大模型自定义参数 <key> 类型不合法` |
| **不校验** | 取值范围、枚举值、整型 vs 浮点、嵌套子 key —— 这些由调用方自行保证 |
| **无 schema / 空 `[]`** | 该模型**拒绝一切**自定义参数 |

::: warning 只校验「是否合法 key」和「类型」，不校验取值内容
例如 `reasoning_effort` 只校验它是字符串，**不校验**值是否在 `low / medium / high` 范围内。传了非法值平台会放行，但大模型侧调用时可能报错（400），需调用方自行保证取值合法。
:::

::: warning 支持哪些自定义参数由「所选模型」决定，请以查询结果为准
平台可用的模型会动态调整，**本文不固定列出具体模型及其参数**。某个模型是否支持自定义参数、支持哪些 key、类型是什么，请在接入时通过 schema 接口**实时查询**（见下文「自定义参数 schema 从哪来」），不要在代码里写死。
:::

### 自定义参数的常见形态

不同模型的自定义参数**没有统一的 key 和类型**——即便是同一类能力（如"是否开启思考/推理"），不同模型也可能用不同的 key、不同的值类型。常见形态如下（**仅为形态示例，实际 key 与类型请以模型 schema 为准**）：

| 形态 | 值类型 | 传值示例 | 说明 |
|------|--------|----------|------|
| 布尔开关 | boolean | `true` / `false` | 直接开/关某项能力 |
| 结构化对象 | object | `{ "type": "enabled" }` | 用对象字段做更细的控制 |
| 枚举字符串 | string | `"low"` / `"medium"` / `"high"` | 以档位/等级取值 |

::: warning 不要用同一个 key 套所有模型
由于 key 和类型因模型而异，接入前请**按目标模型查它声明的确切 key 和类型**，再决定怎么传；换模型时需重新确认。
:::
### 请求示例

以下为通用写法示例，`<llmModelId>` 填目标模型 ID，`body` 内的 key/值请以该模型 schema 为准：

```http
PUT /xiaozhi/agent/your-agent-id
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
  "llmModelId": "<llmModelId>",
  "extra": {
    "llm": {
      "temperature": 0.7,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "max_tokens": 500,
      "enable_search": false,
      "custom_params": {
        "body": {
          "<自定义参数key>": "<按 schema 取值>"
        }
      }
    }
  }
}
```

::: details 会被拒绝的例子（`<key>` 表示 body 里传入的自定义参数名）

```jsonc
// 1) key 不在该模型 schema 内
{ "llmModelId": "<llmModelId>",
  "extra": { "llm": { "custom_params": { "body": { "<未声明的key>": "..." } } } } }
// → 400 非法的大模型自定义参数：<未声明的key>

// 2) 类型不符（例如 schema 要求布尔，却传了字符串）
{ "llmModelId": "<llmModelId>",
  "extra": { "llm": { "custom_params": { "body": { "<key>": "true" } } } } }
// → 400 大模型自定义参数 <key> 类型不合法

// 3) 给「无 schema / 空 schema」的模型传自定义参数
{ "llmModelId": "<llmModelId>",
  "extra": { "llm": { "custom_params": { "body": { "<key>": "..." } } } } }
// → 400 非法的大模型自定义参数：<key>
```

:::

### 如何查询某模型支持的自定义参数

平台可用的模型和它们支持的自定义参数会动态调整，**请在接入时自行查询、以查询结果为准，不要在代码里写死**。查询分两步（示例用 `curl`，`<token>` 替换为你的认证令牌）：

**第一步：列出当前可用的 LLM 模型，拿到模型 `id`**

```bash
curl -s 'https://xrobo.qiniu.com/v1/agents/models/llm' \
  -H 'Authorization: Bearer <token>'
```

返回中 `data.publics[]` / `data.privates[]` 每个元素的 `id` 即为模型 ID（接口详情见本文 **「五、获取LLM名称列表」**）。若装有 `jq`，可直接列出「id + 名称」：

```bash
curl -s 'https://xrobo.qiniu.com/v1/agents/models/llm' \
  -H 'Authorization: Bearer <token>' \
  | jq -r '.data.publics[], .data.privates[] | "\(.id)\t\(.name)"'
```

**第二步：用模型 `id` 查它当前声明的自定义参数 schema**

```bash
curl -s 'https://xrobo.qiniu.com/v1/models/<模型id>/custom-config-schema' \
  -H 'Authorization: Bearer <token>'
```

返回的 schema 就是该模型**当前**支持的自定义参数（key / 类型 / 默认值），也是后端的校验白名单——即你能往 `custom_params.body` 里传哪些 key、每个 key 是什么类型的依据。

::: tip 一步到位
先取第一个模型的 id，再查它的 schema：

```bash
ID=$(curl -s 'https://xrobo.qiniu.com/v1/agents/models/llm' -H 'Authorization: Bearer <token>' | jq -r '.data.publics[0].id')
curl -s "https://xrobo.qiniu.com/v1/models/$ID/custom-config-schema" -H 'Authorization: Bearer <token>' | jq .
```
:::

> 说明：标准参数（第六节）的范围由后端固定，改代码才会变；自定义参数 schema 则随模型配置动态维护，务必以上述查询接口的实时结果为准。

## 相关文档

- [**智能体 API**](./agent.md) - 查看更多智能体管理接口
- [**语音合成 API**](./voice-clone.md) - 了解TTS模型配置
- [**API 概览**](./index.md) - 查看所有可用的API接口
