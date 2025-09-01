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

// 通用状态码定义
const commonStatusCodes = [
  { code: 0, description: 'OK - 操作成功', schema: 'ResultVoid' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
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

## API列表

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

## 其他说明项
