---
title: ApiEndpoint组件使用样例
---
<script setup lang="ts">
// 定义请求示例字符串
const getRequestExample = `GET /v1/users?page=1&limit=20&status=active&search=john
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
User-Agent: MyApp/1.0.0`

// 定义响应示例字符串
const getResponseExample = `{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "status": "active",
        "role": "user",
        "avatar": "https://example.com/avatars/1.jpg",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "lastLoginAt": "2024-01-15T09:45:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1"
  }
}`

const getHeader = [
    {
      name: 'Authorization',
      type: 'string',
      required: true,
      description: 'Bearer token认证',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    },
    {
      name: 'Accept',
      type: 'string',
      required: false,
      description: '接受的响应格式',
      example: 'application/json'
    }
  ]

const getStatusCodes = [
    {
      code: 200,
      description: '请求成功',
      schema: 'UserListResponse'
    },
    {
      code: 400,
      description: '请求参数错误，如页码超出范围或搜索关键词过短'
    },
    {
      code: 401,
      description: '未授权访问，token无效或已过期'
    },
    {
      code: 403,
      description: '权限不足，当前用户无权限访问用户列表'
    },
    {
      code: 429,
      description: '请求频率限制，请稍后重试'
    },
    {
      code: 500,
      description: '服务器内部错误'
    }
  ]

  const getParams = [
    {
      name: 'page',
      type: 'number',
      required: false,
      description: '页码，从1开始',
      minimum: 1,
      default: 1,
      example: 1
    },
    {
      name: 'limit',
      type: 'number',
      required: false,
      description: '每页数量，默认10，最大100',
      minimum: 1,
      maximum: 100,
      default: 10,
      example: 20
    },
    {
      name: 'status',
      type: 'string',
      required: false,
      description: '用户状态筛选',
      enum: ['active', 'inactive', 'pending'],
      example: 'active'
    },
    {
      name: 'search',
      type: 'string',
      required: false,
      description: '搜索关键词，支持用户名和邮箱搜索',
      minLength: 2,
      maxLength: 50,
      example: 'john'
    }
  ]

const postRequestExample = `POST /v1/users
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
X-Request-ID: req_123456789

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass123!",
  "role": "user",
  "profile": {
    "phone": "+1234567890",
    "address": "123 Main St, New York, USA",
    "birthDate": "1990-05-15"
  }
}`

const postResponseExample = `{
  "success": true,
  "data": {
    "user": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user",
      "status": "active",
      "profile": {
        "phone": "+1234567890",
        "address": "123 Main St, New York, USA",
        "birthDate": "1990-05-15"
      },
      "createdAt": "2024-01-02T10:30:00Z",
      "updatedAt": "2024-01-02T10:30:00Z"
    }
  },
  "message": "用户创建成功",
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-02T10:30:00Z",
    "version": "v1"
  }
}`
</script>

## 用户管理API（TypeScript版本）

<ApiEndpoint
  host="https://api.example.com"
  basePath="/v1"
  endpoint="/users"
  method="get"
  title="获取用户列表"
  description="获取系统中所有用户的列表，支持分页和筛选"
  responseType="application/json"
  :parameters="getParams"
  :headers="getHeader"
  :requestExample="getRequestExample"
  :responseExample="getResponseExample"
  :statusCodes="getStatusCodes"
/>
