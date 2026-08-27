---
title: 固件管理API
---

<script setup>
import { Chapters } from "../../.vitepress/theme/constrants/route";

const chapter_root = Chapters.xrobot_api;
</script>

## 概述

固件管理 API 用于管理设备的 OTA 固件信息，支持固件的创建、查询、更新和删除操作。

**基础路径**: `/v1/firmwares`

**认证方式**: Bearer Token (需要在请求头中携带 `Authorization: Bearer <token>`)

---

## 数据结构

### Firmware (固件)

| 字段            | 类型   | 说明                                |
| --------------- | ------ | ----------------------------------- |
| `id`            | string | 固件唯一标识符 (UUID)               |
| `board`         | string | 硬件型号，如 `esp32-s3`、`esp32-c3` |
| `version`       | string | 固件版本号，如 `1.0.0`              |
| `size`          | int64  | 固件文件大小 (字节)                 |
| `remark`        | string | 备注信息                            |
| `firmware_path` | string | 固件文件 URL 地址                   |
| `created_at`    | string | 创建时间 (ISO 8601 格式)            |
| `updated_at`    | string | 更新时间 (ISO 8601 格式)            |

---

## 接口列表

### 1. 创建固件

创建新的固件记录。如果相同用户 (`uid`) 下已存在相同 `board` + `version` 的固件，则覆盖更新。

**请求**

```http
POST /v1/firmwares
Authorization: Bearer <token>
Content-Type: application/json

{
    "board": "esp32-s3",
    "version": "1.0.0",
    "size": 1048576,
    "firmware_path": "https://example.com/firmware/esp32-s3-v1.0.0.bin",
    "remark": "测试固件"
}
```

**请求参数**

| 参数            | 类型   | 必填 | 说明            |
| --------------- | ------ | ---- | --------------- |
| `board`         | string | 是   | 硬件型号        |
| `version`       | string | 是   | 固件版本号      |
| `size`          | int64  | 否   | 文件大小 (字节) |
| `firmware_path` | string | 否   | 固件文件 URL    |
| `remark`        | string | 否   | 备注信息        |

**响应**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "board": "esp32-s3",
    "version": "1.0.0",
    "size": 1048576,
    "remark": "测试固件",
    "firmware_path": "https://example.com/firmware/esp32-s3-v1.0.0.bin",
    "created_at": "2026-08-27T17:00:00Z",
    "updated_at": "2026-08-27T17:00:00Z"
  }
}
```

---

### 2. 查询固件列表

获取当前用户的所有固件列表，支持按硬件型号筛选。

**请求**

```http
GET /v1/firmwares?board=esp32-s3
Authorization: Bearer <token>
```

**查询参数**

| 参数    | 类型   | 必填 | 说明               |
| ------- | ------ | ---- | ------------------ |
| `board` | string | 否   | 按硬件型号模糊筛选 |

**响应**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "firmwares": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "board": "esp32-s3",
        "version": "1.0.0",
        "size": 1048576,
        "remark": "测试固件",
        "firmware_path": "https://example.com/firmware/esp32-s3-v1.0.0.bin",
        "created_at": "2026-08-27T17:00:00Z",
        "updated_at": "2026-08-27T17:00:00Z"
      },
      {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "board": "esp32-s3",
        "version": "1.1.0",
        "size": 2097152,
        "remark": "新版本固件",
        "firmware_path": "https://example.com/firmware/esp32-s3-v1.1.0.bin",
        "created_at": "2026-08-27T18:00:00Z",
        "updated_at": "2026-08-27T18:00:00Z"
      }
    ]
  }
}
```

---

### 3. 获取固件详情

根据固件 ID 获取单个固件的详细信息。

**请求**

```http
GET /v1/firmwares/:id
Authorization: Bearer <token>
```

**路径参数**

| 参数 | 类型   | 必填 | 说明    |
| ---- | ------ | ---- | ------- |
| `id` | string | 是   | 固件 ID |

**响应**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "board": "esp32-s3",
    "version": "1.0.0",
    "size": 1048576,
    "remark": "测试固件",
    "firmware_path": "https://example.com/firmware/esp32-s3-v1.0.0.bin",
    "created_at": "2026-08-27T17:00:00Z",
    "updated_at": "2026-08-27T17:00:00Z"
  }
}
```

**错误响应**

```json
{
  "code": 404,
  "msg": "firmware not found",
  "data": null
}
```

---

### 4. 更新固件

更新指定固件的信息。更新时不允许修改为已存在的 `board` + `version` 组合。

**请求**

```http
PUT /v1/firmwares/:id
Authorization: Bearer <token>
Content-Type: application/json

{
    "board": "esp32-s3",
    "version": "1.1.0",
    "size": 2097152,
    "firmware_path": "https://example.com/firmware/esp32-s3-v1.1.0.bin",
    "remark": "更新版本"
}
```

**路径参数**

| 参数 | 类型   | 必填 | 说明    |
| ---- | ------ | ---- | ------- |
| `id` | string | 是   | 固件 ID |

**请求参数**

| 参数            | 类型   | 必填 | 说明            |
| --------------- | ------ | ---- | --------------- |
| `board`         | string | 是   | 硬件型号        |
| `version`       | string | 是   | 固件版本号      |
| `size`          | int64  | 否   | 文件大小 (字节) |
| `firmware_path` | string | 否   | 固件文件 URL    |
| `remark`        | string | 否   | 备注信息        |

**响应**

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

**错误响应 - 重复版本**

```json
{
  "code": 400,
  "msg": "已存在相同 board 和 version 的固件，请修改后重试",
  "data": null
}
```

---

### 5. 删除固件

删除指定的固件记录。删除操作会同时清理数据库记录和存储中的固件文件。

**请求**

```http
DELETE /v1/firmwares/:id
Authorization: Bearer <token>
```

支持批量删除，多个 ID 用逗号分隔：

```http
DELETE /v1/firmwares/550e8400-e29b-41d4-a716-446655440000,660e8400-e29b-41d4-a716-446655440001
Authorization: Bearer <token>
```

**路径参数**

| 参数 | 类型   | 必填 | 说明                     |
| ---- | ------ | ---- | ------------------------ |
| `id` | string | 是   | 固件 ID (多个用逗号分隔) |

**响应**

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

**错误响应**

```json
{
  "code": 404,
  "msg": "firmware not found",
  "data": null
}
```

---

## 错误码说明

| HTTP 状态码 | code | 说明                      |
| ----------- | ---- | ------------------------- |
| 200         | 0    | 成功                      |
| 200         | 非 0 | 业务错误，查看 `msg` 字段 |
| 400         | -    | 请求参数错误              |
| 401         | -    | 未认证或 Token 无效       |
| 404         | -    | 资源不存在                |
| 500         | -    | 服务器内部错误            |

---

## 使用示例

### cURL 示例

**创建固件**

```bash
curl -X POST https://xrobo.qiniu.com/v1/firmwares \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "board": "esp32-s3",
    "version": "1.0.0",
    "size": 1048576,
    "firmware_path": "https://example.com/firmware/esp32-s3-v1.0.0.bin",
    "remark": "测试固件"
  }'
```

**查询固件列表**

```bash
curl -X GET "https://xrobo.qiniu.com/v1/firmwares?board=esp32-s3" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**获取固件详情**

```bash
curl -X GET https://xrobo.qiniu.com/v1/firmwares/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**更新固件**

```bash
curl -X PUT https://xrobo.qiniu.com/v1/firmwares/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "board": "esp32-s3",
    "version": "1.1.0",
    "size": 2097152,
    "firmware_path": "https://example.com/firmware/esp32-s3-v1.1.0.bin",
    "remark": "新版本修复了xxx问题"
  }'
```

**删除固件**

```bash
curl -X DELETE https://xrobo.qiniu.com/v1/firmwares/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

<ChapterContents :chapter=chapter_root />
