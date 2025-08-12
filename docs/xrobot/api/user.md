---
title: 用户API文档
---

<script setup>
// 用户注册API数据
const registerParameters = [
  {
    name: 'username',
    type: 'string',
    required: true,
    location: 'body',
    description: '用户名',
    example: 'john_doe'
  },
  {
    name: 'password',
    type: 'string',
    required: true,
    location: 'body',
    description: '用户密码',
    example: 'password123'
  },
  {
    name: 'captcha',
    type: 'string',
    required: true,
    location: 'body',
    description: '图形验证码',
    example: 'ABCD'
  },
  {
    name: 'mobileCaptcha',
    type: 'string',
    required: false,
    location: 'body',
    description: '手机验证码',
    example: '123456'
  },
  {
    name: 'captchaId',
    type: 'string',
    required: true,
    location: 'body',
    description: '验证码ID',
    example: 'cfa94872-48b6-425b-8e6a-17b912b6b6f4'
  }
]

const registerHeaders = [
  {
    name: 'Content-Type',
    value: 'application/json',
    required: true,
    description: '请求内容类型'
  }
]

const registerRequestExample = `{
  "username": "example",
  "password": "password",
  "captcha": "ABCD",
  "mobileCaptcha": "123456",
  "captchaId": "cfa94872-48b6-425b-8e6a-17b912b6b6f4"
}`

const registerResponseExample = `{
  "code": 0,
  "msg": "注册成功",
  "data": {}
}`

const registerStatusCodes = [
  {
    code: 0,
    description: '注册成功'
  },
  {
    code: 400,
    description: '请求参数错误'
  },
  {
    code: 409,
    description: '用户名已存在'
  },
  {
    code: 500,
    description: '服务器内部错误'
  }
]

// 获取验证码API数据
const captchaParameters = [
  {
    name: 'uuid',
    type: 'string',
    required: true,
    location: 'query',
    description: '随机生成的UUID',
    example: 'cfa94872-48b6-425b-8e6a-17b912b6b6f4'
  }
]

const captchaStatusCodes = [
  {
    code: 0,
    description: '成功返回验证码图片'
  },
  {
    code: 400,
    description: 'UUID参数错误'
  },
  {
    code: 500,
    description: '服务器内部错误'
  }
]

// 用户登录API数据
const loginParameters = [
  {
    name: 'areaCode',
    type: 'string',
    required: false,
    location: 'body',
    description: '区号',
    example: '+86',
    default: '+86'
  },
  {
    name: 'captcha',
    type: 'string',
    required: true,
    location: 'body',
    description: '图形验证码',
    example: 'ABCD'
  },
  {
    name: 'captchaId',
    type: 'string',
    required: true,
    location: 'body',
    description: '验证码ID',
    example: 'd4224c42-a0a2-4e38-87a5-edc3ad03c014'
  },
  {
    name: 'mobile',
    type: 'string',
    required: false,
    location: 'body',
    description: '手机号码',
    example: '13800138000'
  },
  {
    name: 'password',
    type: 'string',
    required: true,
    location: 'body',
    description: '用户密码',
    example: 'password123'
  },
  {
    name: 'username',
    type: 'string',
    required: true,
    location: 'body',
    description: '用户名',
    example: 'john_doe'
  }
]

const loginHeaders = [
  {
    name: 'Content-Type',
    value: 'application/json',
    required: true,
    description: '请求内容类型'
  }
]

const loginRequestExample = `{
  "areaCode": "+86",
  "captcha": "ABCD",
  "captchaId": "d4224c42-a0a2-4e38-87a5-edc3ad03c014",
  "mobile": "13800138000",
  "password": "password123",
  "username": "john_doe"
}`

const loginResponseExample = `{
  "code": 0,
  "msg": "success",
  "data": {
    "token": "4fxxxxxxxxxxxxxxxxxxxxxxx",
    "expire": 43200,
    "clientHash": "xxxxxx"
  }
}`

const loginStatusCodes = [
  {
    code: 0,
    description: '登录成功'
  },
  {
    code: 400,
    description: '请求参数错误'
  },
  {
    code: 401,
    description: '用户名或密码错误'
  },
  {
    code: 403,
    description: '验证码错误'
  },
  {
    code: 500,
    description: '服务器内部错误'
  }
]
</script>

# 用户API文档

本文档描述了用户相关的API接口，包括用户注册、登录和验证码获取等功能。

## 1. 用户注册

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/user/register"
  method="post"
  title="用户注册"
  description="创建新用户账户。需要提供用户名、密码和验证码信息。"
  :parameters="registerParameters"
  :headers="registerHeaders"
  :requestExample="registerRequestExample"
  :responseExample="registerResponseExample"
  :statusCodes="registerStatusCodes"
/>

## 2. 获取验证码

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/user/captcha"
  method="get"
  title="获取图形验证码"
  description="获取用于注册和登录的图形验证码。返回PNG格式的验证码图片。"
  :parameters="captchaParameters"
  :statusCodes="captchaStatusCodes"
/>

::: tip 提示
UUID需要随机生成，建议使用标准的UUID v4格式。验证码图片为PNG格式，需要用户识别并输入验证码内容。
:::

## 3. 用户登录

<ApiEndpoint
  host="https://xrobo.qiniuapi.com"
  basePath="/xiaozhi"
  endpoint="/user/login"
  method="post"
  title="用户登录"
  description="用户登录认证。成功后返回访问令牌，该令牌用于后续API调用的身份验证。"
  :parameters="loginParameters"
  :headers="loginHeaders"
  :requestExample="loginRequestExample"
  :responseExample="loginResponseExample"
  :statusCodes="loginStatusCodes"
/>

::: warning 重要说明
返回的 `token` 是后续大多数API调用的凭证，请妥善保存。`expire` 字段表示令牌的有效期（秒），建议在令牌过期前进行刷新。
:::

## 认证说明

登录成功后，大部分API需要在请求头中携带认证信息：

```text
Authorization: Bearer {token}
```

其中 `{token}` 是登录接口返回的访问令牌。
