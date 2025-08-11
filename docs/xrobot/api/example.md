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

# TypeScript API文档示例

## 用户管理API（TypeScript版本）

<ApiEndpoint
  host="https://api.example.com"
  basePath="/v1"
  endpoint="/users"
  method="get"
  title="获取用户列表"
  description="获取系统中所有用户的列表，支持分页和筛选"
  responseType="application/json"
  :parameters="[
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
  ]"
  :headers="[
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
  ]"
  :requestExample="getRequestExample"
  :responseExample="getResponseExample"
  :statusCodes="[
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
  ]"
/>

<ApiEndpoint
  host="https://api.example.com"
  basePath="/v1"
  endpoint="/users"
  method="post"
  title="创建新用户"
  description="在系统中创建一个新的用户账户，支持批量创建"
  responseType="application/json"
  :parameters="[
    {
      name: 'name',
      type: 'string',
      required: true,
      description: '用户姓名',
      minLength: 2,
      maxLength: 50,
      pattern: '^[a-zA-Z\\s\\u4e00-\\u9fa5]+$',
      example: 'Jane Smith'
    },
    {
      name: 'email',
      type: 'string',
      required: true,
      description: '用户邮箱，必须是有效的邮箱格式且系统中唯一',
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      example: 'jane@example.com'
    },
    {
      name: 'password',
      type: 'string',
      required: true,
      description: '用户密码，至少8个字符，包含字母和数字',
      minLength: 8,
      maxLength: 128,
      pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$',
      example: 'SecurePass123!'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      description: '用户角色',
      enum: ['admin', 'user', 'guest'],
      default: 'user',
      example: 'user'
    },
    {
      name: 'profile',
      type: 'object',
      required: false,
      description: '用户档案信息',
      example: {
        phone: '+1234567890',
        address: '123 Main St, City, Country',
        birthDate: '1990-01-01'
      }
    }
  ]"
  :headers="[
    {
      name: 'Authorization',
      type: 'string',
      required: true,
      description: 'Bearer token认证，需要admin权限',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    },
    {
      name: 'Content-Type',
      type: 'string',
      required: true,
      description: '请求内容类型',
      example: 'application/json'
    },
    {
      name: 'X-Request-ID',
      type: 'string',
      required: false,
      description: '请求追踪ID，用于日志追踪',
      example: 'req_123456789'
    }
  ]"
  :requestExample="postRequestExample"
  :responseExample="postResponseExample"
  :statusCodes="[
    {
      code: 201,
      description: '用户创建成功',
      schema: 'UserCreateResponse'
    },
    {
      code: 400,
      description: '请求参数错误，如邮箱格式不正确、密码强度不够等'
    },
    {
      code: 401,
      description: '未授权访问，token无效或已过期'
    },
    {
      code: 403,
      description: '权限不足，当前用户无权限创建用户'
    },
    {
      code: 409,
      description: '资源冲突，邮箱已存在'
    },
    {
      code: 422,
      description: '数据验证失败，请检查输入数据格式'
    },
    {
      code: 500,
      description: '服务器内部错误'
    }
  ]"
/>
