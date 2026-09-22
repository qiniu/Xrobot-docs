---
title: OTA 协议(网关)
---

## OTA（Over-The-Air）更新介绍

OTA（Over-The-Air）更新是一种通过无线网络将软件更新直接推送到设备的技术。设备通过 OTA 上报当前固件信息，服务端返回激活状态、WebSocket 连接配置、服务器时间和固件更新信息。

设备正式访问地址为：

<https://xrobo.qiniuapi.com/v1/ota/>

通过 OTA 请求获取到激活码和 WebSocket 地址后，再进行 WebSocket 通信。

## OTA 上报

### 请求

```text
POST https://xrobo.qiniuapi.com/v1/ota/
```

生产网关的对外路径是 `/v1/ota/`。Manager 内部实现使用 `/xiaozhi/ota/`，该路径不作为设备接入地址。

#### 请求头

- `Activation-Version`：激活版本（必需，设备芯片 efuse 区是否存储了有效的序列号，有则为 `2`，无则为 `1`）
- `Device-Id`：设备的唯一标识符（必需，使用 MAC 地址或由硬件 ID 生成的伪 MAC 地址）
- `Client-Id`：客户端的唯一标识符，由软件自动生成的 UUID v4（必需，擦除 FLASH 或重装后会变化）
- `Serial-Number`：设备的序列号（可选；如果设备通过序列号预注册，则应传入序列号）
- `User-Agent`：客户端的名称和版本号（必需，例如 `esp-box-3/1.5.6`）
- `Accept-Language`：客户端当前语言（可选，例如 `zh-CN`）

#### 请求体

请求体为 JSON，包含以下字段：

- `application`：设备当前固件版本信息（必需）
  - `version`：当前固件版本号
  - `elf_sha256`：设备上报的固件 Hash 信息。当前服务端只接收并保留该字段，不执行固件完整性校验
- `mac_address`：MAC 地址（必需）。该值必须与请求头 `Device-Id` 完全一致
- `uuid`：Client-Id（可选），与 HTTP Header 中的 `Client-Id` 一致
- `chip_model_name`：设备芯片型号，例如 `esp32s3`（可选）
- `flash_size`：设备闪存大小（可选）
- `partition_table`：设备分区表，用于设备侧检查下载固件所需空间（可选）
- `board`：开发板类型及其运行环境（必需）
  - `type`：开发板类型
  - `ssid`：设备接入的 Wi-Fi 名称
  - `rssi`：设备接入的 Wi-Fi 信号强度

### 成功响应

HTTP 状态码为 `200 OK` 时，响应体为 JSON。字段是否出现取决于设备绑定状态和固件配置：

- `activation`：激活信息。仅在设备未绑定且未通过预注册自动绑定时返回
  - `code`：设备激活码。当前为 6 位数字；同一设备在缓存有效期内重复上报会复用激活码
  - `message`：设备展示用的激活提示，当前由智控台地址、换行符和激活码组成
  - `challenge`：历史兼容的设备标识回显，当前等于本次请求的 `Device-Id`，通常也等于请求体中的 `mac_address`

    `challenge` 不是随机数或一次性 nonce，不参与签名、挑战应答或 WebSocket 鉴权，设备不需要回传。服务端当前不会再次读取、校验或消费该字段。
- `mqtt`：MQTT 协议服务器配置（协议预留字段）
- `websocket`：WebSocket 协议服务器配置
  - `url`：设备建立 WebSocket 连接的地址
  - `token`：WebSocket 鉴权凭证。仅在设备已经绑定后返回；未绑定设备不返回该字段
- `server_time`：Manager 服务器时间信息
  - `timestamp`：Unix 毫秒时间戳，表示从 Unix Epoch 开始计算的绝对时间，不是 UTC+0 的格式化本地时间
  - `timezone`：Manager 服务进程使用的 IANA 时区名称
  - `timezone_offset`：Manager 服务进程时区相对 UTC 的偏移量，单位为分钟；正数表示快于 UTC，负数表示慢于 UTC，例如 `480` 表示 UTC+8
- `firmware`：固件信息，不是每次成功响应都必然存在
  - 未绑定设备会收到当前版本和兼容用的无效升级地址
  - 已绑定设备根据自动更新开关、开发板类型和可用固件决定是否返回及返回内容
  - `version`：固件版本号
  - `url`：固件下载地址（如果有更新）

`timezone` 和 `timezone_offset` 表示 Manager 服务器时区，不是设备所在地时区，也不会根据设备销售国家自动变化。设备不能仅根据 `timezone_offset` 推断具体 IANA 时区，因为相同偏移量可能对应多个国家和地区，部分地区还存在夏令时。

国内部署的 Manager 应配置具名时区 `TZ=Asia/Shanghai`。如果未配置，Go Manager 可能返回 `timezone: "Local"`，即使 `timezone_offset` 已正确计算为 `480`。

### 错误响应

OTA 上报接口当前按以下规则返回错误：

- 缺少 `Device-Id`，或请求体不是合法 JSON：HTTP `400 Bad Request`
- 请求体业务校验失败（例如 `mac_address` 与 `Device-Id` 不一致、缺少 `application`）：HTTP `200 OK`，响应体包含 `error`
- 服务端内部错误：HTTP `500 Internal Server Error`，只返回通用错误信息；具体数据库、Redis 或内部实现错误仅记录在服务端日志中

业务校验失败示例：

```json
{
  "error": "Invalid OTA request"
}
```

服务端内部错误示例：

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
```

```json
{
  "error": "Internal server error"
}
```

## 快速激活状态检查

设备完成激活码绑定后，可以调用快速激活状态检查接口确认绑定状态。

### 请求

```text
POST https://xrobo.qiniuapi.com/v1/ota/activate
```

请求头：

- `Device-Id`：设备的唯一标识符（必需）

请求体：无请求体。

生产网关会将该请求转发到 Manager 内部的 `POST /xiaozhi/ota/activate` 路径；设备不需要直接访问内部路径。

### 响应

- 设备已绑定：HTTP `200 OK`，响应体为文本 `success`
- 设备不存在、尚未绑定，或 `Device-Id` 为空：HTTP `202 Accepted`，响应体为空
- 完全缺少 `Device-Id`，或服务端数据库查询失败：当前为了兼容 Java Manager，返回 HTTP `200 OK`，响应体为业务错误对象，业务码为 `500`

兼容错误响应示例：

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "code": 500,
  "msg": "Server internal exception"
}
```

设备收到 `200 OK` 和文本 `success` 后，应重新调用 `POST https://xrobo.qiniuapi.com/v1/ota/`。重新上报后，服务端会按已绑定设备返回 WebSocket `url` 和 `token`。

## 请求示例

```http
POST https://xrobo.qiniuapi.com/v1/ota/
Host: xrobo.qiniuapi.com
Activation-Version: 1
Accept-Language: zh-CN
Content-Type: application/json
Device-Id: D4:06:06:B6:A9:FA
Client-Id: 550e8400-e29b-41d4-a716-446655440000
User-Agent: xiaoling-web-test/1.0.0
```

```json
{
  "version": 0,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "application": {
    "name": "xiaoling-web-test",
    "version": "1.0.0",
    "compile_time": "2025-04-16 10:00:00",
    "idf_version": "4.4.3",
    "elf_sha256": "1234567890abcdef1234567890abcdef1234567890abcdef"
  },
  "ota": { "label": "xiaoling-web-test" },
  "board": {
    "type": "xiaoling-web-test",
    "ssid": "xxxxxx",
    "rssi": 0,
    "channel": 0,
    "ip": "192.168.1.1",
    "mac": "D4:06:06:B6:A9:FA"
  },
  "flash_size": 0,
  "minimum_free_heap_size": 0,
  "mac_address": "D4:06:06:B6:A9:FA",
  "chip_model_name": "",
  "chip_info": { "model": 0, "cores": 0, "revision": 0, "features": 0 },
  "partition_table": [
    { "label": "", "type": 0, "subtype": 0, "address": 0, "size": 0 }
  ]
}
```

## 响应示例

```json
{
  "server_time": {
    "timestamp": 1752119934489,
    "timezone": "Asia/Shanghai",
    "timezone_offset": 480
  },
  "activation": {
    "code": "608303",
    "message": "http://60.205.58.18:8002\n608303",
    "challenge": "D4:06:06:B6:A9:FA"
  },
  "firmware": {
    "version": "1.0.0",
    "url": "https://xrobo.qiniuapi.com/v1/ota/INVALID_FIRMWARE_FOR_TEST"
  },
  "websocket": {
    "url": "ws://xrobo-io.qiniuapi.com/v1/ws/"
  }
}
```

## 快速激活响应示例

已绑定设备：

```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
```

```text
success
```

未绑定设备：

```http
HTTP/1.1 202 Accepted
```

响应体为空。
