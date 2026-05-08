# MCP服务 用户接入指南


## 产品概述

 MCP（Model Context Protocol）市场是灵矽平台为智能体（Agent）提供的一种能力扩展，允许开发者将外部工具服务接入灵矽，使智能体(Agent) 在与用户对话时能够调用第三方 API 实现丰富功能。

通过 MCP 市场，用户可以：

- **浏览发现**：探索平台提供的各类 MCP 服务（如地图、翻译、天气等）
- **一键开通**：将心仪的 MCP 服务订阅到自己的账号下
- **灵活配置**：根据 MCP 服务要求填写 API 密钥、接口地址等参数
- **工具编排**：在 Agent 配置页面勾选要启用的 MCP，Agent 即具备相应能力
- **自主发布**：开发者可将自建的 MCP 服务发布到市场，供用户使用


## 名词解释

| 术语 | 说明 |
|------|------|
| **MCP Server** | 包含服务名称、Logo、文档地址、以及要求用户填写的配置模板（`config_schema`）。|
| **MCP** | 用户在市场中「开通」一个 MCP Server 后，在自己账号下创建的配置实例：包含用户填写的实际参数（`config`），如 API Key、接口地址等 |
| **config_schema** | 市场服务定义的配置模板，规定用户开通该 MCP 时需要填写哪些参数（如 API Key 字段名、URL 格式等） |
| **config** | 用户开通 MCP 后填写的实际配置值 |
| **SSE Type** | MCP 通信类型。当前只支持 SSE（Server-Sent Events）。`type=0` 为普通 SSE，用户需自行提供 API 密钥；`type=1` 为应用型 SSE，灵矽平台提供 |
| **Agent-MCP** | Agent 与 MCP 的绑定关系，存储在 `ai_agent_mcp` 表。一个 Agent 可以绑定多个 MCP，一个 MCP 也可以被多个 Agent 引用 |


## 前提条件

- 拥有平台灵矽账号
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
                    "types": ["sse"],
                    "sse": {
                        "type": 0,
                        "url": "https://api.example.com/sse",
                        "shared_key": false,
                        "params": {
                            "api_key": "placeholder"
                        },
                        "header": {
                            "Authorization": "Bearer xxx"
                        },
                        "reset_header_default_value": ["Authorization"]
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
            "types": ["sse"],
            "sse": {
                "type": 0,
                "url": "https://api.example.com/sse",
                "shared_key": false,
                "params": {
                    "api_key": "placeholder"
                },
                "header": {},
                "reset_header_default_value": []
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
        "sse": {
            "type": 0,
            "url": "https://api.example.com/sse",
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
| `config.type` | string | 是 | 通信类型，当前固定为 `"sse"` |
| `config.sse.type` | int | 是 | SSE 类型。`0`=普通 SSE，`1`=应用型 SSE |
| `config.sse.url` | string | 是 | MCP 服务的 SSE 端点地址 |
| `config.sse.params` | object | 否 | Query 参数（由 `config_schema` 定义字段） |
| `config.sse.header` | object | 否 | HTTP Header（由 `config_schema` 定义字段） |

**SSE Type 说明**

| 值 | 类型 | 说明 |
|------|------|------|
| `0` | SSETypeNormal | 普通 SSE。用户自行提供 API 密钥，填入 `params` 或 `header` |
| `1` | SSETypeApp | 应用型 SSE。灵矽平台提供，用户无需手动填 Key |

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
            "sse": {
                "type": 0,
                "url": "https://api.example.com/sse",
                "params": {
                    "api_key": "your-api-key-here"
                },
                "header": {
                    "Authorization": "Bearer your-bearer-token"
                }
            }
        },
        "created_at": "2026-05-06T10:00:00Z",
        "updated_at": "2026-05-06T10:00:00Z"
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
                    "sse": {
                        "type": 0,
                        "url": "https://api.example.com/sse",
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
        "sse": {
            "type": 0,
            "url": "https://api.example.com/sse",
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

获取指定工具的输入参数结构定义。

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

**请求体（新版本数组结构）**

```json
{
    "tools": [
        {
            "name": "get_weather",
            "description": "当用户询问天气预报时调用",
            "required": ["city"],
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


## 五、MCP Proxy（高级）

MCP Proxy 为需要通过 WebSocket 通信的 MCP 服务提供代理转发能力，适用于设备端本地 MCP 或需要长连接的服务。

### 5.1 获取 MCP Proxy Token

获取用于连接 MCP Proxy 的认证 Token，有效期为 30 天。

```
GET /v1/mcpproxy/token
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
        "wss_endpoint": "wss://api.example.com/v1/mcpproxy/connect?token=xrobot_mcp_xxxx",
        "expires_at": "2026-06-05T15:41:00+08:00",
        "created_at": "2026-05-06T15:41:00+08:00"
    }
}
```

**响应字段说明**

| 字段 | 类型 | 说明 |
|------|------|------|
| `wss_endpoint` | string | WebSocket 连接地址 |
| `expires_at` | string | Token 过期时间 |
| `created_at` | string | Token 创建时间 |

### 5.2 WebSocket 连接

使用获取到的 Token，通过 WebSocket 协议连接 MCP Proxy。

```
WS /v1/mcpproxy/connect?token=<token>
```

连接建立后，客户端可使用 MCP 协议与远程 MCP 服务进行通信（stdio/sse 统一代理）。


## 六、自定义 MCP（开发者）

开发者可以将自建的 MCP 服务发布到平台，供其他用户使用。

### 6.1 创建自定义 MCP 服务

```
POST /v1/mcp-store/servers
```

**请求头**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求体**

```json
{
    "name": "我的自定义天气服务",
    "is_private": true,
    "logo_url": "https://example.com/my-weather-logo.png",
    "document_url": "https://example.com/my-weather-docs",
    "tags": ["天气", "自定义"],
    "desc": "基于公开天气 API 的 MCP 服务",
    "content": "<p>这是一个自定义天气服务...</p>",
    "config_schema": {
        "types": ["sse"],
        "sse": {
            "type": 0,
            "url": "https://my-weather.example.com/sse",
            "shared_key": false,
            "params": {
                "api_key": ""
            },
            "header": {},
            "reset_header_default_value": []
        }
    }
}
```

**权限说明**

| 用户类型 | `is_private` 取值 | 说明 |
|----------|-------------------|------|
| 普通用户 | 只能为 `true` | 私有服务仅自己可用 |
| SuperAdmin | 只能为 `false` | 公共发布到市场供所有用户使用 |

### 6.2 更新自定义服务

```
PUT /v1/mcp-store/servers/{id}
```

### 6.3 发布服务

将 MCP 服务发布到公共市场（仅对 SuperAdmin 开放）。

```
PUT /v1/mcp-store/servers/{id}/publish
```

### 6.4 下架服务

```
PUT /v1/mcp-store/servers/{id}/unpublish
```

### 6.5 删除自定义服务

```
DELETE /v1/mcp-store/servers/{id}
```

> **注意**：如果该 MCP 服务已被其他用户开通（存在 `mcp` 记录），则无法删除。

### 6.6 获取我的自定义服务列表

```
GET /v1/mcp-store/servers
```

## 七、错误码

| HTTP 状态码 | code | msg | 说明 |
|-------------|------|-----|------|
| 200 | 0 | success | 请求成功 |
| 400 | - | invalid request body | 请求参数格式错误 |
| 400 | - | invalid id | 缺少或无效的 ID 参数 |
| 400 | - | invalid config type | config_schema 中包含不支持的配置类型 |
| 400 | - | unsupported config type | 该 MCP 不支持此配置类型 |
| 403 | - | normal user only create private mcp server | 普通用户只能创建私有服务 |
| 403 | - | admin user only create public mcp server | 管理员只能创建公共服务 |
| 404 | 612 | no such mcp | MCP 记录不存在 |
| 404 | 612 | no such mcp server | MCP Server 不存在 |
| 409 | 613 | cannot delete in use mcp | MCP 正在被 Agent 使用，无法删除 |
| 409 | 613 | cannot delete in use mcp server | MCP Server 有用户开通，无法删除 |
| 409 | 614 | existing mcp server | 同名 MCP Server 已存在（唯一键冲突） |
| 409 | 614 | existing mcp | 该用户已开通同名 MCP |
| 502 | - | fetch tools failed | SSE 工具列表获取失败，请检查 URL 和认证配置 |
| 502 | - | tool call failed | 工具调用失败 |

## 八、完整 API 索引

### MCP 市场

| 操作 | 方法 | 路径 |
|------|------|------|
| 列取公共市场服务 | GET | `/v1/mcp-store/public/servers` |
| 获取公共市场服务详情 | GET | `/v1/mcp-store/public/servers/{id}` |
| 列取我的自定义服务 | GET | `/v1/mcp-store/servers` |
| 获取我的自定义服务详情 | GET | `/v1/mcp-store/servers/{id}` |
| 创建自定义服务 | POST | `/v1/mcp-store/servers` |
| 更新自定义服务 | PUT | `/v1/mcp-store/servers/{id}` |
| 发布服务 | PUT | `/v1/mcp-store/servers/{id}/publish` |
| 下架服务 | PUT | `/v1/mcp-store/servers/{id}/unpublish` |
| 删除服务 | DELETE | `/v1/mcp-store/servers/{id}` |

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

### MCP Proxy

| 操作 | 方法 | 路径 |
|------|------|------|
| 获取连接 Token | GET | `/v1/mcpproxy/token` |
| WebSocket 连接 | WS | `/v1/mcpproxy/connect?token=<token>` |

---

## 九、使用流程总览

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
│ Agent 在与小智对话时，LLM 自动调用已绑定的 MCP 工具            │
└──────────────────────────────────────────────────────────────┘
```

## 相关文档

- [知识库 API](https://linx.qiniu.com/docs/xrobot/api/knowledge)
- [智能体 API](https://linx.qiniu.com/docs/xrobot/api/agent)
- [聊天记录 API](https://linx.qiniu.com/docs/xrobot/api/chat)
