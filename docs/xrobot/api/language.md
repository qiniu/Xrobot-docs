---
title: 获取语言列表 API
---

# 获取语言列表 API

## 接口概述

接口 `GET /v1/languages` 用于获取当前支持的所有语言列表，返回「语言名称 + 语言代码」。数据来源于 manager 配置的 `language.json`，可用于前端下拉选项、音色筛选、智能体语种选择等场景。

## 认证方式

```http
Header: Authorization: Bearer <token>
```

## 获取语言列表

```http
GET /v1/languages
```

### 请求参数

无请求参数。

### 返回字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | integer | 0 成功，非 0 失败 |
| `msg` | string | 消息 |
| `data` | object | 语言列表数据 |
| `data.languages` | array | 语言数组 |
| `data.languages[].language` | string | 语言名称（如「中文」「粤语」） |
| `data.languages[].lang_code` | string | 语言代码（如 zh、yue） |

### 示例请求

```bash
GET /v1/languages
Authorization: Bearer <token>
```

### 示例响应

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "languages": [
      { "language": "中文", "lang_code": "zh" },
      { "language": "英文", "lang_code": "en" },
      { "language": "日语", "lang_code": "ja" },
      { "language": "粤语", "lang_code": "yue" }
    ]
  }
}
```

### 示例错误响应

```json
{
  "code": 401,
  "msg": "未授权",
  "data": null
}
```

## 常见错误码

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 401 | 未授权（Token 无效或缺失） |
| 403 | 无权限 |
| 500 | 服务端异常 |

