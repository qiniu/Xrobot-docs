# MCP 市场与开通


## 产品概述

MCP（Model Context Protocol）市场是灵矽平台为智能体（Agent）提供的能力扩展，开发者可以将外部工具服务接入灵矽，让智能体在对话中调用第三方 API。

通过 MCP 市场，用户可以：

- **浏览发现**：探索平台提供的各类 MCP 服务（如地图、翻译、天气等）
- **一键开通**：将心仪的 MCP 服务订阅到自己的账号下
- **灵活配置**：根据 MCP 服务要求填写 API 密钥、接口地址等参数
- **工具编排**：在 Agent 配置页面勾选要启用的 MCP，Agent 即具备相应能力
- **自建服务**：开发者可创建私有 MCP 服务供自己的智能体使用


## 名词解释

| 术语 | 说明 |
|------|------|
| **MCP Server** | 平台接入的 MCP 服务，包含名称、Logo、文档地址以及要求用户填写的配置模板（`config_schema`） |
| **MCP** | 用户在市场中「开通」一个 MCP Server 后，在自己账号下创建的配置实例：包含用户填写的实际参数（`config`），如 API Key、接口地址等 |
| **config_schema** | 市场服务定义的配置模板，规定用户开通该 MCP 时需要填写哪些参数（如 API Key 字段名、URL 格式等） |
| **config** | 用户开通 MCP 后填写的实际配置值 |
| **Agent-MCP** | Agent 与 MCP 的绑定关系。一个 Agent 可以绑定多个 MCP，一个 MCP 也可以被多个 Agent 引用 |


## 前提条件

- 拥有灵矽平台账号
- 已创建至少一个 Agent（智能体）
- 如需调用需要 API 密钥的 MCP 服务，需提前准备好第三方服务的密钥


## 一、MCP 市场

MCP 市场是平台提供的 MCP 服务商店，用户可以在此浏览、发现和开通各类 MCP 服务。

### 1.1 获取 MCP 市场列表

获取平台所有已发布的公共 MCP 服务。

```
GET /v1/mcp-store/public/servers
```

**请求头**

```
Authorization: Bearer <token>
```

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "servers": [
            {
                "id": "abc123def456",
                "is_private": false,
                "status": "published",
                "name": "地图服务",
                "logo_url": "https://example.com/logo.png",
                "document_url": "https://example.com/docs",
                "tags": ["地图", "位置", "导航"],
                "desc": "提供地理位置查询、路径规划、地址编码等功能",
                "content": "<p>地图服务是一款...</p>",
                "config_schema": {
                    "type": "sse",
                    "transport_type": 1,
                    "sse": {
                        "type": 0,
                        "url": "https://api.example.com/mcp",
                        "params": {
                            "api_key": "placeholder"
                        },
                        "header": {
                            "Authorization": "Bearer xxx"
                        }
                    }
                }
            }
        ]
    }
}
```

**响应字段说明**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | MCP Server 唯一标识 |
| `is_private` | bool | 是否为私有服务。`false` 表示平台公共 MCP |
| `status` | string | 服务状态。`published`=已发布可见，`unpublished`=未发布 |
| `name` | string | 服务名称 |
| `logo_url` | string | Logo 图片地址 |
| `document_url` | string | 官方文档地址 |
| `tags` | string[] | 标签列表，用于分类筛选 |
| `desc` | string | 服务简介 |
| `content` | string | 详细说明（富文本 HTML） |
| `config_schema` | object | 配置模板，定义开通时用户需填写的参数结构 |

### 1.2 获取 MCP 市场服务详情

```
GET /v1/mcp-store/public/servers/{id}
```

**请求参数**

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `id` | string | path | 是 | MCP Server 的 ID |

**请求头**

```
Authorization: Bearer <token>
```

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "abc123def456",
        "is_private": false,
        "status": "published",
        "name": "地图服务",
        "logo_url": "https://example.com/logo.png",
        "document_url": "https://example.com/docs",
        "tags": ["地图", "位置", "导航"],
        "desc": "提供地理位置查询、路径规划、地址编码等功能",
        "content": "<p>地图服务是一款专业的...</p>",
        "config_schema": {
            "type": "sse",
            "transport_type": 1,
            "sse": {
                "type": 0,
                "url": "https://api.example.com/mcp",
                "params": {
                    "api_key": "placeholder"
                },
                "header": {}
            }
        }
    }
}
```

---

## 二、开通 MCP

开通是将市场中的 MCP 服务「订阅」到自己的账号下，并填写必要的配置参数。

### 2.1 开通 MCP

```
POST /v1/mcps
```

**请求头**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求体**

```json
{
    "mcp_id": "abc123def456",
    "name": "我的地图服务",
    "desc": "给家庭助手配置地图能力",
    "config": {
        "type": "sse",
        "transport_type": 1,
        "sse": {
            "type": 0,
            "url": "https://api.example.com/mcp",
            "params": {
                "api_key": "your-api-key-here"
            },
            "header": {
                "Authorization": "Bearer your-bearer-token"
            }
        }
    }
}
```

**请求字段说明**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mcp_id` | string | 是 | 要开通的 MCP Server ID（从市场列表获取） |
| `name` | string | 是 | 给这个开通的 MCP 起一个名字，方便识别 |
| `desc` | string | 是 | 描述该 MCP 的用途 |
| `config.type` | string | 否 | 服务类型，普通 MCP 固定为 `sse`，由服务端写入 |
| `config.transport_type` | int | 是 | 通信方式，固定填 `1`（Streamable HTTP） |
| `config.sse.type` | int | 否 | 认证模式。`0`=用户提供 API 密钥，`1`=平台提供密钥 |
| `config.sse.url` | string | 是 | MCP 服务端点地址 |
| `config.sse.params` | object | 否 | Query 参数（由 `config_schema` 定义字段） |
| `config.sse.header` | object | 否 | HTTP Header（由 `config_schema` 定义字段） |

**认证模式说明**

| 值 | 说明 |
|------|------|
| `0` | 用户自行提供 API 密钥，填入 `params` 或 `header` |
| `1` | 平台提供密钥，用户无需填写 |

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "mcp-instance-001",
        "mcp_id": "abc123def456",
        "name": "我的地图服务",
        "desc": "给家庭助手配置地图能力",
        "logo_url": "https://example.com/logo.png",
        "is_private": false,
        "config": {
            "type": "sse",
            "transport_type": 1,
            "sse": {
                "type": 0,
                "url": "https://api.example.com/mcp",
                "params": {
                    "api_key": "your-api-key-here"
                },
                "header": {
                    "Authorization": "Bearer your-bearer-token"
                }
            }
        }
    }
}
```

### 2.2 获取已开通的 MCP 列表

```
GET /v1/mcps
```

**请求头**

```
Authorization: Bearer <token>
```

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "mcps": [
            {
                "id": "mcp-instance-001",
                "mcp_id": "abc123def456",
                "name": "我的地图服务",
                "desc": "给家庭助手配置地图能力",
                "logo_url": "https://example.com/logo.png",
                "is_private": false,
                "config": {
                    "type": "sse",
                    "transport_type": 1,
                    "sse": {
                        "type": 0,
                        "url": "https://api.example.com/mcp",
                        "params": {
                            "api_key": "your-api-key-here"
                        },
                        "header": {}
                    }
                }
            }
        ]
    }
}
```

### 2.3 获取已开通 MCP 详情

```
GET /v1/mcps/{id}
```

**请求参数**

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `id` | string | path | 是 | 开通的 MCP 实例 ID（非 MCP Server ID） |

### 2.4 更新 MCP 配置

已开通的 MCP 的配置参数（如 API Key 过期）可以通过此接口更新。

```
PUT /v1/mcps/{id}
```

**请求体**

```json
{
    "name": "我的地图服务",
    "desc": "给家庭助手配置地图能力",
    "config": {
        "type": "sse",
        "transport_type": 1,
        "sse": {
            "type": 0,
            "url": "https://api.example.com/mcp",
            "params": {
                "api_key": "new-api-key-here"
            },
            "header": {}
        }
    }
}
```

### 2.5 删除已开通的 MCP

删除前请确保该 MCP 未被任何 Agent 关联使用，否则会返回错误。

```
DELETE /v1/mcps/{id}
```

**请求参数**

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `id` | string | path | 是 | 开通的 MCP 实例 ID |

**错误响应**

如果该 MCP 正在被 Agent 使用：

```json
{
    "code": 613,
    "msg": "cannot delete in use mcp"
}
```

## 三、MCP 工具配置

开通 MCP 后，用户可以获取该 MCP 提供的工具列表，并为每个工具配置调用参数。

### 3.1 获取 MCP 工具列表

获取该 MCP 服务暴露的所有工具（函数）定义。

```
GET /v1/mcps/{id}/tools
```

**请求参数**

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `id` | string | path | 是 | 开通的 MCP 实例 ID |

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "mcp_id": "mcp-instance-001",
        "tools": [
            {
                "name": "get_weather",
                "description": "获取指定城市的天气预报",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "city": {
                            "type": "string",
                            "description": "城市名称，如北京、上海"
                        },
                        "days": {
                            "type": "integer",
                            "description": "预报天数，默认1天"
                        }
                    },
                    "required": ["city"]
                }
            },
            {
                "name": "get_location",
                "description": "根据地址获取经纬度坐标",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "address": {
                            "type": "string",
                            "description": "详细地址"
                        }
                    },
                    "required": ["address"]
                }
            }
        ]
    }
}
```

### 3.2 获取工具 Schema

获取该 MCP 工具配置的输入参数结构定义。

```
GET /v1/mcps/{id}/tool-schema
```

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "name_prefix": "weather",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {
                    "description": "城市名称",
                    "type": "string"
                },
                "days": {
                    "description": "预报天数",
                    "type": "integer"
                }
            },
            "required": ["city"]
        }
    }
}
```

### 3.3 获取工具配置

获取该 MCP 的工具配置信息（如 Prompt 模板等）。

```
GET /v1/mcps/{id}/tool-config
```

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "tools": [
            {
                "name": "get_weather",
                "description": "当用户询问天气预报时调用",
                "value_mapping": [
                    {
                        "content": {
                            "text": "prompt-weather-default"
                        },
                        "arguments": {
                            "city": "北京",
                            "days": 1
                        }
                    }
                ]
            }
        ]
    }
}
```

### 3.4 保存工具配置

更新 MCP 的工具配置参数。

```
PUT /v1/mcps/{id}/tool-config
```

**请求体**

```json
{
    "tools": [
        {
            "name": "get_weather",
            "description": "当用户询问天气预报时调用",
            "value_mapping": [
                {
                    "content": {
                        "text": "prompt-weather-default"
                    },
                    "arguments": {
                        "city": "北京",
                        "days": 1
                    }
                }
            ]
        }
    ]
}
```


## 四、绑定 Agent

开通并配置好 MCP 后，需要将 MCP 绑定到具体的 Agent，Agent 才会在对话中调用这些工具。

### 4.1 获取 Agent 的 MCP 列表

获取指定 Agent 当前已绑定和未绑定的 MCP 列表。

```
GET /v1/agents/{agent_id}/mcps?include_unselected=true
```

**请求参数**

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `agent_id` | string | path | 是 | Agent ID |
| `include_unselected` | bool | query | 否 | 是否返回未选中的 MCP。默认为 `false`（仅返回已绑定列表） |

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "selecteds": [
            {
                "mcp_id": "mcp-instance-001",
                "name": "我的地图服务",
                "is_private": false
            }
        ],
        "unselecteds": [
            {
                "mcp_id": "mcp-instance-002",
                "name": "翻译服务",
                "is_private": false
            }
        ]
    }
}
```

**响应字段说明**

| 字段 | 类型 | 说明 |
|------|------|------|
| `selecteds` | array | 已绑定到该 Agent 的 MCP 列表 |
| `unselecteds` | array | 用户已开通但未绑定到该 Agent 的 MCP 列表 |

### 4.2 更新 Agent 的 MCP 绑定

全量替换模式：将指定的 MCP 列表设置为 Agent 的绑定列表。系统自动计算需新增和删除的关联记录。

```
PUT /v1/agents/{agent_id}/mcps
```

**请求参数**

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `agent_id` | string | path | 是 | Agent ID |

**请求头**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求体**

```json
{
    "mcp_ids": ["mcp-instance-001", "mcp-instance-002"]
}
```

**字段说明**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `mcp_ids` | string[] | 是 | 要绑定到该 Agent 的 MCP ID 列表（全量替换） |

**响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

> **注意**：`mcp_ids` 为全量替换模式。如果 Agent 原来绑定了 `[A, B]`，传入 `[B, C]`，则最终结果为 `[B, C]`（A 被解绑，C 被新增）。


## 五、错误码

所有接口的 HTTP 状态码均为 `200`，业务状态由响应体中的 `code` 表示。

| code | msg | 说明 |
|------|-----|------|
| `0` | success | 请求成功 |
| `400` | invalid request body | 请求参数格式错误 |
| `400` | invalid id | 缺少或无效的 ID 参数 |
| `400` | invalid mcp config | 配置非法或实现类型不可修改 |
| `403` | normal user only create private mcp server | 普通用户只能创建私有服务 |
| `502` | fetch tools failed | 获取工具列表失败，请检查服务地址和认证配置 |
| `502` | 具体错误信息 | 工具调用失败 |
| `599` | 具体错误信息 | 服务内部错误 |
| `612` | no such mcp | MCP 实例不存在 |
| `612` | no such mcp server | MCP Server 不存在 |
| `613` | cannot delete in use mcp | MCP 正在被 Agent 使用，无法删除 |
| `613` | cannot delete in use mcp server | MCP Server 已有用户开通，无法删除 |
| `614` | existing mcp server | 同名 MCP Server 已存在 |
| `614` | existing mcp | 该用户已开通同名 MCP |

## 六、API 索引

### MCP 市场

| 操作 | 方法 | 路径 |
|------|------|------|
| 列取公共市场服务 | GET | `/v1/mcp-store/public/servers` |
| 获取公共市场服务详情 | GET | `/v1/mcp-store/public/servers/{id}` |

### MCP 开通

| 操作 | 方法 | 路径 |
|------|------|------|
| 列取已开通的 MCP | GET | `/v1/mcps` |
| 获取已开通 MCP 详情 | GET | `/v1/mcps/{id}` |
| 开通 MCP | POST | `/v1/mcps` |
| 更新 MCP 配置 | PUT | `/v1/mcps/{id}` |
| 删除已开通 MCP | DELETE | `/v1/mcps/{id}` |
| 获取工具列表 | GET | `/v1/mcps/{id}/tools` |
| 调用工具 | POST | `/v1/mcps/{id}/toolcall` |
| 获取工具 Schema | GET | `/v1/mcps/{id}/tool-schema` |
| 获取工具配置 | GET | `/v1/mcps/{id}/tool-config` |
| 保存工具配置 | PUT | `/v1/mcps/{id}/tool-config` |

### Agent 绑定

| 操作 | 方法 | 路径 |
|------|------|------|
| 获取 Agent 的 MCP 列表 | GET | `/v1/agents/{agent_id}/mcps` |
| 更新 Agent 的 MCP 绑定 | PUT | `/v1/agents/{agent_id}/mcps` |

---

## 七、使用流程总览

```
┌──────────────────────────────────────────────────────────────┐
│ 第一步：浏览市场                                              │
│ GET /v1/mcp-store/public/servers                            │
│ → 查看可用的公共 MCP 服务                                      │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ 第二步：开通 MCP                                              │
│ POST /v1/mcps                                              │
│ → 将市场服务「订阅」到自己账号                                  │
│ → 根据 config_schema 填写 API Key、URL 等参数                │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ 第三步：配置工具（可选）                                        │
│ GET /v1/mcps/:id/tools      → 获取可用工具列表               │
│ PUT /v1/mcps/:id/tool-config → 调整工具调用参数               │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ 第四步：绑定 Agent                                           │
│ PUT /v1/agents/:agent_id/mcps                              │
│ → 将已开通的 MCP 关联到目标 Agent                             │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ 第五步：对话使用                                              │
│ 用户与智能体对话时，智能体自动调用已绑定的 MCP 工具        │
└──────────────────────────────────────────────────────────────┘
```

## 相关文档

- [端侧MCP](./hardware-mcp.md)
- [云端MCP](./software-mcp.md)
- [自定义 MCP](./custom-mcp.md)
