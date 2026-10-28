---
title: 自定义 MCP
---

# 自定义 MCP

开发者可以创建并管理自建 MCP 服务。

## 一、创建自定义 MCP 服务

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
        "type": "sse",
        "transport_type": 1,
        "sse": {
            "type": 0,
            "url": "https://my-weather.example.com/mcp",
            "params": {
                "api_key": ""
            },
            "header": {}
        }
    }
}
```

**配置说明**

`config_schema.type` 为服务类型，普通 MCP 服务固定填 `sse`；`transport_type` 固定填 `1`。`config_schema.sse` 定义开通时需要用户填写的参数模板：`url` 为 MCP 服务地址，`type` 为认证模式（`0` 用户自备 API 密钥，`1` 平台提供密钥），`params` 和 `header` 声明需要用户填写的 Query 参数与 HTTP Header。

**权限说明**

普通用户创建的服务只能是私有服务（`is_private=true`）。

## 二、更新自定义服务

```
PUT /v1/mcp-store/servers/{id}
```

请求体与创建一致，`config_schema.type` 不可修改。

## 三、发布服务

```
PUT /v1/mcp-store/servers/{id}/publish
```

## 四、删除自定义服务

```
DELETE /v1/mcp-store/servers/{id}
```

> **注意**：如果该 MCP 服务已被用户开通，则无法删除。

## 五、获取我的自定义服务列表

```
GET /v1/mcp-store/servers
```

## 六、MCP Proxy（高级）

MCP Proxy 为需要通过 WebSocket 通信的 MCP 服务提供代理转发能力，适用于需要长连接的服务。

### 6.1 获取 MCP Proxy Token

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

### 6.2 WebSocket 连接

使用获取到的 Token，通过 WebSocket 协议连接 MCP Proxy。

```
WS /v1/mcpproxy/connect?token=<token>
```

连接建立后，MCP 请求通过 `/v1/mcpproxy/mcp`（Streamable HTTP）转发，Token 通过 `X-MCP-Token` 请求头或 `token` 查询参数携带。

## 相关文档

- [MCP 市场与开通](./mcp-store.md)
- [端侧MCP](./hardware-mcp.md)
- [云端MCP](./software-mcp.md)

