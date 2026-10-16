---
title: 知识库 API
---

#  知识库 API

## 产品概述

知识库是灵矽AI平台智能体的核心能力之一，允许您为智能体注入专业领域知识，提升问答的准确性和专业性。通过知识库API，您可以：

- **文档管理**：上传、编辑和删除知识文档
- **智能检索**：基于语义理解的知识检索能力
- **智能体集成**：将知识库与智能体绑定，实现智能问答


##  一、创建知识库

创建一个新的知识库，为后续文档上传和知识管理做准备。每个知识库都可以独立配置和管理，支持多个智能体同时使用。

### 接口信息

**请求方式：** `POST /v1/datasets`

### 请求示例

```http
POST /v1/datasets 
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "name": "产品使用说明",
    "desc": "产品相关文档",
    "retrieval_model": {
      "top_k": 5,
      "score_threshold": 0.7
    }
}
```

### 响应示例

成功创建知识库后，返回知识库的详细信息：

```json
{
    "data": {
        "id": "dataset_123456",
        "name": "产品使用说明",
        "desc": "产品相关文档",
        "retrieval_model": {
          "top_k": 5,
          "score_threshold": 0.7
        },
        "created_at": "2026-10-15T10:00:00Z",
        "updated_at": "2026-10-15T10:00:00Z"
    }
}
```

### 获取知识库信息

**请求方式：** `GET /v1/datasets/{dataset_id}`

**接口说明：** 获取指定知识库的详细信息

**请求头：**
```http
Authorization: Bearer <token>
```

**响应示例：**
```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "dataset_123456",
        "name": "产品使用说明",
        "desc": "产品相关文档",
        "retrieval_model": {
            "top_k": 5,
            "score_threshold": 0.7
        },
        "created_at": "2026-10-15T10:00:00Z",
        "updated_at": "2026-10-15T10:00:00Z"
    }
}
```

### 删除知识库

**请求方式：** `DELETE /v1/datasets/{dataset_id}`

**接口说明：** 删除指定知识库，需要检查是否被智能体引用以及知识库下面是否存在文档

**请求头：**
```http
Authorization: Bearer <token>
```

**响应示例：**
```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

## 二、上传文档

向知识库中上传文档，系统会自动进行文本提取、分块处理和向量化存储。支持多种文档格式，确保知识内容能够被智能体有效利用。

### 接口信息

**请求方式：** `POST /v1/datasets/{dataset_id}/documents`

### 请求示例

```http
POST /v1/datasets/{dataset_id}/documents
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
    "name": "产品使用说明",
    "url": "https://example.com/docs/product-guide.pdf",
    "process_rule": {
      "mode": "automatic",
      "rules": {
        "segmentation": {
          "separator": "\n\n",
          "max_tokens": 1024
        }
      }
    }
}
```

### 响应示例

文档上传并处理完成后，返回文档信息：

```json
{
    "data": {
        "id": "document_123456",
        "name": "产品使用说明",
        "status": "completed",
        "created_at": "2026-10-15T10:05:00Z",
        "updated_at": "2026-10-15T10:05:00Z"
    }
}
```

::: info 处理流程
文档上传后会进入处理队列，系统会自动进行文本提取和向量化处理。处理完成后，文档状态会更新为 "completed"，此时知识内容就可以被智能体检索和使用了。
:::

## 三、知识检索

基于用户问题进行语义检索，从知识库中找到最相关的知识片段。这是智能问答功能的核心接口，支持多种检索策略和结果排序。

### 接口信息

**请求方式：** `POST /v1/datasets/{dataset_id}/retrieve`

### 请求示例

```http
POST /v1/datasets/{dataset_id}/retrieve
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
  "query": "如何设置设备音量？",
  "retrieval_model": {
    "top_k": 5,
    "score_threshold": 0.7
  }
}
```

### 响应示例

返回最相关的知识片段：

```json
{
   "data": {
    "records": [
      {
        "segment": {
          "id": "segment_123456",
          "index": 0,
          "content": "打开设备设置，选择音量后进行调节。",
          "document_id": "document_123456",
          "document_name": "产品使用说明"
        },
        "score": 0.93
      }
    ]
  }
}
```

## 四、获取知识库列表

获取当前用户下的所有知识库，支持分页和筛选。这个接口通常用于管理界面展示和知识库选择功能。

### 接口信息

**请求方式：** `GET /v1/datasets`

### 请求示例

```http
GET /v1/datasets
Authorization: Bearer <token>
```

### 响应示例

返回知识库列表：

```json
{
    "data": {
      "datasets": [
        {
          "id": "dataset_123456",
          "name": "产品使用说明",
          "desc": "产品相关文档",
          "created_at": "2026-10-15T10:00:00Z",
          "updated_at": "2026-10-15T10:00:00Z"
        }
      ]
    }
}
```

## 五、更新知识库

修改知识库的基本信息，如名称、描述、处理参数等。某些参数修改后可能需要重新处理已有文档。

### 接口信息

**请求方式：** `PUT /v1/datasets/{dataset_id}`

其中 `dataset_id` 是要更新的知识库 ID。

### 请求示例

```http
PUT /v1/datasets/{dataset_id}
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
   "name": "产品使用说明（更新）",
    "desc": "更新后的产品文档",
    "retrieval_model": {
      "top_k": 5,
      "score_threshold": 0.7
    }
}
```

### 响应示例

更新成功后返回完整的知识库信息：

```json
{
    "data": {
        "id": "dataset_123456",
        "name": "产品使用说明（更新）",
        "desc": "更新后的产品文档",
        "retrieval_model": {
          "top_k": 5,
          "score_threshold": 0.7
        },
        "created_at": "2026-10-15T10:00:00Z",
        "updated_at": "2026-10-15T10:10:00Z"
    }
}
```

## 其他API接口

### 更新文档

**请求方式：** `PUT /v1/datasets/{dataset_id}/documents/{document_id}`

**接口说明：** 当前只支持更新文档名称，需要校验用户是否拥有这个知识库

**请求头：**
```http
Content-Type: application/json
Authorization: Bearer <token>
```

**请求体：**
```json
{
    "name": "产品使用说明（更新）"
}
```

**响应示例：**
```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": "document_123456",
        "name": "产品使用说明（更新）",
        "status": "completed",
        "created_at": "2026-10-15T10:05:00Z",
        "updated_at": "2026-10-15T10:15:00Z"
    }
}
```

### 删除文档

**请求方式：** `DELETE /v1/datasets/{dataset_id}/documents/{document_id}`

**接口说明：** 删除指定文档，需要校验用户是否拥有这个知识库

**请求头：**
```http
Authorization: Bearer <token>
```

**响应示例：**
```json
{
    "code": 0,
    "msg": "success",
    "data": {}
}
```

### 列举文档

**请求方式：** `GET /v1/datasets/{dataset_id}/documents`

**接口说明：** 获取指定知识库下的所有文档列表，需要校验用户是否拥有这个知识库

**请求头：**
```http
Authorization: Bearer <token>
```

**响应示例：**
```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "documents": [
            {
                "id": "document_123456",
                "name": "产品使用说明",
                "created_at": "2026-10-15T10:05:00Z",
                "updated_at": "2026-10-15T10:05:00Z"
            }
        ]
    }
}
```

### 列举文档段落

**请求方式：** `GET /v1/datasets/{dataset_id}/documents/{document_id}/segments`

**接口说明：** 获取指定文档的所有分段内容，需要校验用户是否拥有这个知识库

**请求头：**
```http
Authorization: Bearer <token>
```

**响应示例：**
```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "segments": [
            {
                "id": "segment_123456",
                "index": 0,
                "content": "Operation guide"
            }
        ]
    }
}
```
