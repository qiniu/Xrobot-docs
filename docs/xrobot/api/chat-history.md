---

title: 聊天记录 API
---

<script setup lang="ts">
const commonHeaders = [
  { name: 'Content-Type', value: 'application/json', required: true, description: '请求内容类型' },
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
      "createdAt": "2025-08-28 15:57:16",
      "chatType": 1,
      "content": "那你西啊，帮我邀请一下大家来参加我们的展会。😊",
      "audioId": "aa2f6e1aadde09585e7a2acd165dfe9e",
      "macAddress": "09689edfb5a74846ad8f2a6512c26a73"
    },
    {
      "createdAt": "2025-08-28 15:57:19",
      "chatType": 1,
      "content": "这个有意思多了。😊",
      "audioId": "e8d7f48c8a30473279f4bf9c714bc3ae",
      "macAddress": "09689edfb5a74846ad8f2a6512c26a73"
    },
    ...
  ]
}`

// 获取音频对应的播放ID - 请求示例
const getAudioPlayIdRequest = `GET /xiaozhi/agent/audio/d9b8fdbc0ce492a0feb7a87e92c4eaf5 HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 获取音频对应的播放ID - 响应示例
const getAudioPlayIdResponse = `{
  "code": 0,
  "msg": "success",
  "data": "a040a914-ba53-42f4-a878-08293bf5877a"
}`

// 播放对话音频 - 请求示例
const playAudioRequest = `GET /xiaozhi/agent/play/a040a914-ba53-42f4-a878-08293bf5877a HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 播放对话音频 - 响应示例
const playAudioResponse = `HTTP/1.1 200 OK
Content-Disposition: attachment; filename="play.wav"
Content-Length: 7724
Content-Type: application/octet-stream

[Binary audio data]`

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

// 获取音频对应的播放ID - 参数定义
const getAudioPlayIdParameters = [
  {
    name: 'audioId',
    type: 'string',
    in: 'path',
    required: true,
    description: '音频ID，从聊天记录详情中获取',
    example: 'd9b8fdbc0ce492a0feb7a87e92c4eaf5'
  }
]

// 播放对话音频 - 参数定义
const playAudioParameters = [
  {
    name: 'playId',
    type: 'string',
    in: 'path',
    required: true,
    description: '播放ID，从获取音频对应的播放ID接口中获取',
    example: 'a040a914-ba53-42f4-a878-08293bf5877a'
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

// 删除聊天记录 - 响应字段
const deleteChatHistoryResponseFields = [
  { field: 'code', type: 'int', description: '业务状态码，0 表示成功' },
  { field: 'reqid', type: 'string', description: '请求ID，用于排查问题' },
  { field: 'data.deleted_count', type: 'int64', description: '删除的记录数量' }
]

// 删除聊天记录 - 错误响应
const deleteChatHistoryErrors = [
  { code: 400, description: 'MAC 地址格式不合法', example: '{"code":400,"msg":"invalid mac address. format: 1a:2b:3c:4d:5e:6f"}' },
  { code: 401, description: '未授权', example: 'HTTP 401' },
  { code: 403, description: '当前用户不是设备拥有者', example: '{"code":403,"msg":"permission denied"}' },
  { code: 404, description: '设备不存在', example: '{"code":404,"msg":"device not found"}' },
  { code: 599, description: '数据库或其他服务端内部错误', example: '{"code":599,"msg":"<error>"}' }
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
响应中的data是一个聊天消息数组，按时间顺序排列，每条消息包含创建时间、聊天类型、内容、音频ID和MAC地址。
:::

### 获取对话音频的播放ID

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/audio/{audioId}"
  method="get"
  title="获取对话音频的播放ID"
  description="通过音频ID（从聊天记录详情中获取）获取对应的播放ID，用于后续播放音频"
  :parameters="getAudioPlayIdParameters"
  :headers="getListHeaders"
  :requestExample="getAudioPlayIdRequest"
  :responseExample="getAudioPlayIdResponse"
  :statusCodes="getListStatusCodes"
/>

::: info
此接口用于获取播放ID，应与播放对话音频接口一同使用。
:::

### 播放对话音频

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/play/{playId}"
  method="get"
  title="播放对话音频"
  description="通过播放ID下载音频文件，返回二进制音频数据，支持直接播放或下载"
  :parameters="playAudioParameters"
  :headers="getListHeaders"
  :requestExample="playAudioRequest"
  :responseExample="playAudioResponse"
  :statusCodes="commonStatusCodes"
/>

::: info
响应为二进制音频文件（WAV格式），可用于下载或直接播放。此接口应与获取音频对应的播放ID接口一同使用。
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
