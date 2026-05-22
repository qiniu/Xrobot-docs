---
title: 音色克隆API
---

<script setup>
// 创建音色栏位 API
const createVoiceCloneBodyParams = [
  {
    name: 'language',
    type: 'string',
    required: false,
    location: 'body',
    description: '音色语言，默认为 "zh"。免费版仅支持 zh(中文) 和 en(英语)，其他语言需使用 pro(付费) 版本：ja(日语), ko(韩语), es(西班牙语), pt(葡萄牙语), id(印尼语), de(德语), fr(法语), ar(阿拉伯语), hi(印地语), it(意大利语), tr(土耳其语), yue(粤语)',
    example: 'zh'
  },
  {
    name: 'tier',
    type: 'string',
    required: false,
    location: 'body',
    description: '付费等级，默认为 "free"，支持以下等级：free(免费), pro(付费)',
    example: 'free'
  }
]

const createVoiceCloneHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer your_token_here'
  },
  {
    name: 'Content-Type',
    type: 'string',
    required: true,
    description: '请求内容类型',
    example: 'application/json'
  }
]

const createVoiceCloneRequest = `{
  "language": "zh",
  "tier": "free"
}`

const createVoiceCloneResponse = `{
    "code": 0,
    "reqid": "0zooABHhub9fUgYA",
    "data": {
        "id": "95da00f77ad24c5ea246618b2a678cc6",
        "name": "复刻音色-78cc6",
        "language": "zh",
        "demo_url": "",
        "state": "Init",
        "tier": "free"
    }
}`

const createVoiceCloneStatusCodes = [
  { code: 0, description: '创建成功' },
  { code: 400, description: '请求参数错误' },
  { code: 401, description: '未授权访问' },
  { code: 500, description: '服务器内部错误' }
]

// 训练音色 API
const trainVoiceClonePathParams = [
  {
    name: 'id',
    type: 'string',
    required: true,
    location: 'path',
    description: '音色唯一标识符，由创建音色栏位接口返回',
    example: 'voice_clone_abc123'
  }
]

const trainVoiceCloneBodyParams = [
  {
    name: 'key',
    type: 'string',
    required: false,
    location: 'body',
    description: '音频文件URL。为空时仅修改名称，不为空时根据音频文件进行训练',
    example: 'https://example.com/audio.wav'
  },
  {
    name: 'name',
    type: 'string',
    required: true,
    location: 'body',
    description: '音色名称，限制20字符以内（汉字/字母/数字都算一个字符）',
    example: '我的专属音色'
  }
]

const trainVoiceCloneDesc = `使用音频文件训练指定的音色，或仅更新音色名称。
如果提供音频URL，系统将根据音频进行训练；如果仅提供名称，则只更新音色名称。`

const trainVoiceCloneHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer your_token_here'
  },
  {
    name: 'Content-Type',
    type: 'string',
    required: true,
    description: '请求内容类型',
    example: 'application/json'
  }
]

const trainVoiceCloneRequest = `{
  "key": "https://example.com/voice-sample.wav",
  "name": "我的专属音色"
}`

const trainVoiceCloneResponse = `{
    "code": 0,
    "reqid": "-qM3AFjdjsVfUgYA",
    "data": {
        "id": "f54b728eb9eb4faf960d82fdfcc6403a",
        "name": "复刻音色-6403a",
        "language": "zh",
        "demo_url": "https://example.com/demo.wav",
        "state": "Training",
        "tier": "free"
    }
}`

const trainVoiceCloneStatusCodes = [
  { code: 0, description: '训练请求提交成功' },
  { code: 400, description: '请求参数错误' },
  { code: 401, description: '未授权访问' },
  { code: 404, description: '音色不存在' },
  { code: 500, description: '服务器内部错误' }
]

// 获取音色 API
const getVoiceClonePathParams = [
  {
    name: 'id',
    type: 'string',
    required: true,
    location: 'path',
    description: '音色唯一标识符',
    example: 'voice_clone_abc123'
  }
]

const getVoiceCloneHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer your_token_here'
  }
]

const getVoiceCloneResponse = `{
  "code": 0,
  "msg": "",
  "reqid": "req_12345678",
  "data": {
    "id": "voice_clone_abc123",
    "name": "我的专属音色",
    "language": "zh",
    "demo_url": "https://example.com/demo.wav",
    "state": "Success",
    "tier": "free"
  }
}`

const getVoiceCloneStatusCodes = [
  { code: 0, description: '获取成功' },
  { code: 401, description: '未授权访问' },
  { code: 404, description: '音色不存在' },
  { code: 500, description: '服务器内部错误' }
]

// 音色列表 API
const listVoiceClonesHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer your_token_here'
  }
]

const listVoiceClonesResponse = `{
  "code": 0,
  "msg": "",
  "reqid": "req_12345678",
  "data": {
    "voices": [
      {
        "id": "voice_clone_abc123",
        "name": "我的专属音色",
        "language": "zh",
        "demo_url": "https://example.com/demo1.wav",
        "state": "Success",
        "tier": "free"
      },
      {
        "id": "voice_clone_def456",
        "name": "复刻音色-X9Y8Z",
        "language": "",
        "demo_url": "",
        "state": "Training",
        "tier": "pro"
      }
    ]
  }
}`

const listVoiceClonesStatusCodes = [
  { code: 0, description: '获取成功' },
  { code: 401, description: '未授权访问' },
  { code: 500, description: '服务器内部错误' }
]

// 删除音色 API
const deleteVoiceClonePathParams = [
  {
    name: 'id',
    type: 'string',
    required: true,
    location: 'path',
    description: '待删除的音色唯一标识符',
    example: 'voice_clone_abc123'
  }
]

const deleteVoiceCloneHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer your_token_here'
  }
]

const deleteVoiceCloneResponse = `{
  "code": 0,
  "msg": "",
  "reqid": "req_12345678",
  "data": {}
}`

const deleteVoiceCloneStatusCodes = [
  { code: 0, description: '删除成功' },
  { code: 401, description: '未授权访问' },
  { code: 403, description: '付费音色栏位不可删除' },
  { code: 404, description: '音色不存在' },
  { code: 500, description: '服务器内部错误' }
]
</script>

## 音色状态说明

音色在训练过程中会经历以下状态：

- **Init**: 初始状态，刚创建的音色栏位
- **Training**: 训练中，正在处理音频文件
- **Success**: 训练成功，音色可以正常使用
- **Failed**: 训练失败，需要重新训练

## 1. 创建音色栏位

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath=""
  endpoint="/v1/voice-clones"
  method="post"
  title="创建音色栏位"
  description="创建一个新的音色栏位，为后续的音色训练做准备。创建成功后会返回音色ID和默认名称。(注意：音色栏位创建后，语言不可修改！)"
  :parameters="createVoiceCloneBodyParams"
  :headers="createVoiceCloneHeaders"
  :requestExample="createVoiceCloneRequest"
  :responseExample="createVoiceCloneResponse"
  :statusCodes="createVoiceCloneStatusCodes"
/>

## 2. 训练音色

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath=""
  endpoint="/v1/voice-clones/{id}"
  method="put"
  title="训练音色"
  :description=trainVoiceCloneDesc
  :parameters="[...trainVoiceClonePathParams, ...trainVoiceCloneBodyParams]"
  :headers="trainVoiceCloneHeaders"
  :requestExample="trainVoiceCloneRequest"
  :responseExample="trainVoiceCloneResponse"
  :statusCodes="trainVoiceCloneStatusCodes"
/>

::: info

1. **付费复刻**: 付费音色栏位在进行音色复刻时，会消耗复刻音色额度！（仅更新名称时不会消耗）
2. **音色名称限制**: 音色名称最多20个字符，汉字、字母、数字都算作一个字符
3. **音频文件要求**: 训练音频建议时长在10-60秒之间，音质清晰，无背景噪音
4. **训练时间**: 音色训练通常需要几分钟到十几分钟，请耐心等待
:::

## 3. 获取音色信息

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath=""
  endpoint="/v1/voice-clones/{id}"
  method="get"
  title="获取音色信息"
  description="根据音色ID获取指定音色的详细信息，包括名称、语言、试听链接和当前状态。"
  :parameters="getVoiceClonePathParams"
  :headers="getVoiceCloneHeaders"
  :responseExample="getVoiceCloneResponse"
  :statusCodes="getVoiceCloneStatusCodes"
/>

::: info
**状态检查**: 只有状态为"Success"的音色才能正常使用
:::

## 4. 获取音色列表

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath=""
  endpoint="/v1/voice-clones"
  method="get"
  title="获取音色列表"
  description="获取当前用户账户下所有的音色克隆列表，包括各种状态的音色。"
  :headers="listVoiceClonesHeaders"
  :responseExample="listVoiceClonesResponse"
  :statusCodes="listVoiceClonesStatusCodes"
/>

## 5. 删除音色

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath=""
  endpoint="/v1/voice-clones/{id}"
  method="delete"
  title="删除音色"
  description="删除指定的音色克隆。删除后该音色将无法恢复，请谨慎操作。(付费音色栏位不可删除！)"
  :parameters="deleteVoiceClonePathParams"
  :headers="deleteVoiceCloneHeaders"
  :responseExample="deleteVoiceCloneResponse"
  :statusCodes="deleteVoiceCloneStatusCodes"
/>

::: warning
删除音色后无法恢复，请谨慎操作
:::
