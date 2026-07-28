---

title: 聊天记录 API
---

<script setup lang="ts">
const commonHeaders = [
  { name: 'Authorization', value: 'Bearer <token>', required: true, description: '用户认证令牌，格式为 Bearer + 空格 + token' }
]

const getListHeaders = [
  { name: 'Authorization', value: 'Bearer <token>', required: true, description: '用户认证令牌，格式为 Bearer + 空格 + token' }
]

// 获取聊天记录列表 - 请求示例
const getSessionsRequest = `GET /xiaozhi/agent/09689edfb5a74846ad8f2a6512c26a73/sessions?page=1&limit=20 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 获取聊天记录列表 - 响应示例
const getSessionsResponse = `{
  "code": 0,
  "msg": "success",
  "data": {
    "total": 139,
    "list": [
      {
        "sessionId": "7465966b-4582-4dae-99be-420364d422d7",
        "createdAt": "2025-08-28 16:02:49",
        "chatCount": 75
      },
      {
        "sessionId": "9eab0c2b-79c0-402c-a695-09d802bd977a",
        "createdAt": "2025-08-28 12:25:01",
        "chatCount": 3
      },
      ...(limit=20, 共20条)
    ]
  }
}`

// 获取聊天记录详情 - 请求示例
const getChatHistoryRequest = `GET /xiaozhi/agent/09689edfb5a74846ad8f2a6512c26a73/chat-history/7465966b-4582-4dae-99be-420364d422d7 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 获取聊天记录详情 - 响应示例
const getChatHistoryResponse = `{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "createdAt": "2026-07-28 11:57:26",
      "chatType": 1,
      "content": "你好，请问我是谁？",
      "audioId": null,
      "audioUrl": "https://xrobot-obj.qnlinx.com/chat-history/2026/07/28/audio.wav",
      "macAddress": "09689edfb5a74846ad8f2a6512c26a73",
      "toolInfo": "",
      "toolDuration": 0,
      "clientListenMode": "auto"
    },
    {
      "createdAt": "2026-07-28 11:57:27",
      "chatType": 2,
      "content": "哦？这不是那个整天围着电子屏幕打转的人吗？",
      "audioId": null,
      "audioUrl": "https://xrobot-obj.qnlinx.com/chat-history/2026/07/28/response.wav",
      "macAddress": "09689edfb5a74846ad8f2a6512c26a73",
      "toolInfo": "",
      "toolDuration": 0,
      "clientListenMode": "auto"
    },
    ...
  ]
}`

// 生成音频签名 URL - 请求示例
const getSignedUrlRequest = `POST /v1/objects/signed-url HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://xrobot-obj.qnlinx.com/chat-history/2026/07/28/audio.wav"
}`

// 生成音频签名 URL - 响应示例
const getSignedUrlResponse = `{
  "code": 0,
  "msg": "success",
  "data": {
    "signed_url": "https://xrobot-obj.qnlinx.com/chat-history/2026/07/28/audio.wav?e=<Unix时间戳>&token=<签名token>"
  }
}`

// 删除聊天记录 - 请求示例
const deleteChatHistoryRequest = `DELETE /v1/devices/AA:C8:BD:B8:00:77/chat-history HTTP/1.1
Host: xrobo.qiniu.com
Authorization: Bearer <token>`

// 删除聊天记录 - curl 示例
const deleteChatHistoryCurl = `curl -X DELETE "https://xrobo.qiniu.com/v1/devices/AA:C8:BD:B8:00:77/chat-history" \\
  -H "Authorization: Bearer f9b859fa515af888cfdf53d03dc0d561"`

// 删除聊天记录 - 响应示例
const deleteChatHistoryResponse = `{
  "code": 0,
  "reqid": "v8ghAP2OBo4QVQYA",
  "data": {
    "deleted_count": 55
  }
}`

// 获取聊天记录列表 - 参数定义
const getSessionsParameters = [
  {
    name: 'agentId',
    type: 'string',
    in: 'path',
    required: true,
    description: '智能体ID',
    example: '09689edfb5a74846ad8f2a6512c26a73'
  },
  {
    name: 'page',
    type: 'integer',
    in: 'query',
    required: false,
    description: '页码，从1开始',
    example: 1
  },
  {
    name: 'limit',
    type: 'integer',
    in: 'query',
    required: false,
    description: '每页记录数',
    example: 20
  }
]

// 获取聊天记录详情 - 参数定义
const getChatHistoryParameters = [
  {
    name: 'agentId',
    type: 'string',
    in: 'path',
    required: true,
    description: '智能体ID',
    example: '09689edfb5a74846ad8f2a6512c26a73'
  },
  {
    name: 'sessionId',
    type: 'string',
    in: 'path',
    required: true,
    description: '会话ID',
    example: '7465966b-4582-4dae-99be-420364d422d7'
  }
]

// 生成音频签名 URL - 参数定义
const getSignedUrlParameters = [
  {
    name: 'url',
    type: 'string',
    in: 'body',
    required: true,
    description: '需要签名的音频 URL（从聊天记录详情中获取的 audioUrl）',
    example: 'https://xrobot-obj.qnlinx.com/chat-history/2026/07/28/audio.wav'
  }
]

// 删除聊天记录 - 参数定义
const deleteChatHistoryParameters = [
  {
    name: 'mac_address',
    type: 'string',
    in: 'path',
    required: true,
    description: '设备MAC地址，格式: 1a:2b:3c:4d:5e:6f',
    example: 'AA:C8:BD:B8:00:77'
  }
]

// 通用状态码定义
const commonStatusCodes = [
  { code: 0, description: 'OK - 操作成功', schema: 'ResultVoid' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
]

const deleteChatHistoryStatusCodes = [
  { code: 0, description: 'OK - 成功删除聊天记录', schema: 'ResultDeleteChatHistory' },
  { code: 400, description: 'Bad Request - MAC 地址格式不合法', schema: 'ErrorResponse' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' },
  { code: 403, description: 'Forbidden - 当前用户不是设备拥有者', schema: 'ErrorResponse' },
  { code: 404, description: 'Not Found - 设备不存在', schema: 'ErrorResponse' },
  { code: 599, description: 'Internal Server Error - 数据库或其他服务端内部错误', schema: 'ErrorResponse' }
]

const getListStatusCodes = [
  { code: 0, description: 'OK - 成功获取聊天记录列表', schema: 'ResultListSessionDTO' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
]

const unauthorizedResponse = `{
  "code": 401,
  "msg": "未登录",
  "data": []
}`
</script>

### 获取聊天记录列表

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/{agentId}/sessions"
  method="get"
  title="获取聊天记录列表"
  description="获取指定智能体的聊天会话列表，支持分页查询"
  :parameters="getSessionsParameters"
  :headers="getListHeaders"
  :requestExample="getSessionsRequest"
  :responseExample="getSessionsResponse"
  :statusCodes="getListStatusCodes"
/>

::: info
响应中的list包含会话的基本信息，包括sessionId、创建时间和聊天数量。total表示总记录数。
:::

### 获取聊天记录详情

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/{agentId}/chat-history/{sessionId}"
  method="get"
  title="获取聊天记录详情"
  description="获取指定智能体和会话的详细聊天记录"
  :parameters="getChatHistoryParameters"
  :headers="getListHeaders"
  :requestExample="getChatHistoryRequest"
  :responseExample="getChatHistoryResponse"
  :statusCodes="getListStatusCodes"
/>

::: info
响应中的data是一个聊天消息数组，按时间顺序排列，每条消息包含：
- `createdAt`：创建时间
- `chatType`：消息类型（1=用户，2=AI，3=工具调用）
- `content`：消息内容
- `audioId`：音频ID（已废弃，始终为null）
- `audioUrl`：音频文件地址，需要签名后才能访问
- `macAddress`：设备MAC地址
- `toolInfo`：工具调用信息
- `toolDuration`：工具执行耗时（毫秒）
- `clientListenMode`：客户端聆听模式（realtime/auto）
:::

### 生成音频签名 URL

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/objects/signed-url"
  method="post"
  title="生成音频签名 URL"
  description="为聊天记录中的音频文件生成签名 URL，支持直接播放或下载"
  :parameters="getSignedUrlParameters"
  :headers="commonHeaders"
  :requestExample="getSignedUrlRequest"
  :responseExample="getSignedUrlResponse"
  :statusCodes="commonStatusCodes"
/>


::: info 注意事项
- **需认证**：此接口需要用户登录 token
- **签名有效期**：1 小时（`e` 参数为 Unix 时间戳）
- **自动兼容**：旧 bucket URL 会直接返回原 URL，无需二次处理
:::

### 删除聊天记录

按设备 MAC 地址删除聊天记录。

::: info
目前只删除数据库记录，OSS 上的音频文件由 60 天自动清理机制处理。
:::

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/devices/{mac_address}/chat-history"
  method="delete"
  title="删除聊天记录"
  description="按设备 MAC 地址删除聊天记录（隐私保护功能）"
  :parameters="deleteChatHistoryParameters"
  :headers="getListHeaders"
  :requestExample="deleteChatHistoryRequest"
  :responseExample="deleteChatHistoryResponse"
  :statusCodes="deleteChatHistoryStatusCodes"
/>
