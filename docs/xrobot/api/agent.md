---
title: 智能体 API
---

<script setup lang="ts">
const commonHeaders = [
  { name: 'Content-Type', value: 'application/json', required: true, description: '请求内容类型' },
  { name: 'Authorization', value: 'Bearer <token>', required: true, description: '用户认证令牌，格式为 Bearer + 空格 + token' }
]

const getListHeaders = [
  { name: 'Authorization', value: 'Bearer <token>', required: true, description: '用户认证令牌，格式为 Bearer + 空格 + token' }
]

const getAgentListRequest = `GET /xiaozhi/agent/list HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 获取智能体列表 - 响应示例
const getAgentListResponse = `{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": "31dad2a8042a40ec879ef92a7bc240ae",
      "agentName": "1",
      "ttsModelName": "",
      "ttsVoiceName": "豪放可爱女",
      "llmModelName": "qwen3极速版",
      "vllmModelName": "智谱视觉AI",
      "memModelId": "Memory_mem_local_short",
      "systemPrompt": "[整体人设指导]\\n核心原则:你是一个名为\\"{{assistant_name}}\\"的AI助手，你的所有输出和行为都......",
      "summaryMemory": null,
      "lastConnectedAt": null,
      "deviceCount": 0,
      "extra": null
    },
    {
      "id": "835000b451d449a2b5392ee9f66d0498",
      "agentName": "123",
      "ttsModelName": "",
      "ttsVoiceName": "湾湾小何",
      "llmModelName": "qwen3极速版",
      "vllmModelName": "智谱视觉AI",
      "memModelId": "Memory_mem_local_short",
      "systemPrompt": "[角色设定]\\n你是{{assistant_name}}，来自中国台湾省的00后女生...",
      "summaryMemory": null,
      "lastConnectedAt": null,
      "deviceCount": 0,
      "extra": null
    }
  ]
}`

// 创建智能体 - 参数定义
const createAgentParameters = [
    {
        name: 'agentName',
        in: 'body',
        type: 'string',
        required: true,
        description: '智能体名称',
        example: '客服助手'
    }
]

const createAgentRequest = `POST /xiaozhi/agent HTTP/1.1
Host: https://xrobo.qiniu.com
Content-Type: application/json
Authorization: Bearer <token>

{
  "agentName": "客服助手"
}`

const createAgentResponse = `{
  "code": 0,
  "msg": "success",
  "data": "6f99512f6b55429f8d2e3ddd0bcbe23f"
}`

// 创建智能体 - 状态码定义
const createAgentStatusCodes = [
  { code: 0, description: 'OK - 智能体创建成功，返回智能体ID', schema: 'ResultString' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
]

// 更新智能体 - 参数定义
const updateAgentParameters = [
  {
    name: 'id',
    type: 'string',
    in: 'path',
    required: true,
    description: '智能体ID',
    example: '31dad2a8042a40ec879ef92a7bc240ae'
  },
  {
    name: 'agentUpdateObj',
    type: 'AgentUpdateObj',
    in: 'body',
    required: true,
    description: '智能体更新对象',
    children: [
      {
        name: 'agentCode',
        type: 'string',
        required: false,
        description: '智能体代号，一般不用管',
        example: 'AGT_1754966279238'
      },
      {
        name: 'agentName',
        type: 'string',
        required: false,
        description: '智能体名称',
        example: '123test'
      },
      {
        name: 'asrModelId',
        type: 'string',
        required: false,
        description: '语音识别模型ID',
        example: 'ASR_FunASR'
      },
      {
        name: 'vadModelId',
        type: 'string',
        required: false,
        description: '语音活动检测ID',
        example: 'VAD_SileroVAD'
      },
      {
        name: 'llmModelId',
        type: 'string',
        required: false,
        description: '大语言模型ID',
        example: 'LLM_AliLLM'
      },
      {
        name: 'vllmModelId',
        type: 'string',
        required: false,
        description: 'VLLM模型ID',
        example: 'VLLM_QwenVLVLLM'
      },
      {
        name: 'ttsModelId',
        type: 'string',
        required: false,
        description: '语音合成模型ID',
        example: ''
      },
      {
        name: 'ttsVoiceId',
        type: 'string',
        required: false,
        description: '音色ID',
        example: 'a5b85a7ba5b24a9a96e24aa88b500d2f'
      },
      {
        name: 'chatHistoryConf',
        type: 'integer(int32)',
        required: false,
        description: '聊天记录配置（0不记录 1仅记录文本 2记录文本和语音）',
        example: 0
      },
      {
        name: 'memModelId',
        type: 'string',
        required: false,
        description: '记忆模型ID',
        example: 'Memory_mem_local_short'
      },
      {
        name: 'intentModelId',
        type: 'string',
        required: false,
        description: '意图模型ID',
        example: 'Intent_intent_llm'
      },
      {
        name: 'systemPrompt',
        type: 'string',
        required: false,
        description: '角色设定参数',
        example: '*新的角色介绍'
      },
      {
        name: 'summaryMemory',
        type: 'string',
        required: false,
        description: '总结记忆',
        example: null
      },
      {
        name: 'langCode',
        type: 'string',
        required: false,
        description: '语言代码',
        example: 'zh'
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: '语言代码对应的名称',
        example: '中文'
      },
      {
        name: 'sort',
        type: 'integer(int32)',
        required: false,
        description: '排序序号',
        example: 0
      },
      {
        name: 'functions',
        type: 'array',
        required: false,
        description: '插件函数信息',
        children: [
          {
            name: 'pluginId',
            type: 'string',
            required: false,
            description: '插件ID',
            example: 'SYSTEM_PLUGIN_MUSIC'
          },
          {
            name: 'paramInfo',
            type: 'object',
            required: false,
            description: '函数参数信息',
            example: '{}'
          }
        ]
      },
      {
        name: 'extra',
        type: 'object',
        required: false,
        description: '额外高级配置信息',
        children: [
          {
            name: 'voice',
            type: 'object',
            required: false,
            description: '语音配置',
            children: [
              {
                name: 'speed',
                type: 'number',
                required: false,
                description: '语速',
                example: 1
              },
              {
                name: 'pitch',
                type: 'number',
                required: false,
                description: '音调',
                example: 1
              },
              {
                name: 'volume',
                type: 'number',
                required: false,
                description: '音量',
                example: 50
              },
              {
                name: 'emotion',
                type: 'string',
                required: false,
                description: '情感',
                example: 'default'
              }
            ]
          }
        ]
      }
    ]
  }
]

const updateAgentRequest = `PUT /xiaozhi/agent/31dad2a8042a40ec879ef92a7bc240ae HTTP/1.1
Host: https://xrobo.qiniu.com
Content-Type: application/json
Authorization: Bearer <token>

{
  "agentCode": "AGT_1754966279238",
  "agentName": "123test",
  "asrModelId": "ASR_FunASR",
  "vadModelId": "VAD_SileroVAD",
  "llmModelId": "LLM_AliLLM",
  "vllmModelId": "VLLM_QwenVLVLLM",
  "ttsModelId": "",
  "ttsVoiceId": "a5b85a7ba5b24a9a96e24aa88b500d2f",
  "chatHistoryConf": 0,
  "memModelId": "Memory_mem_local_short",
  "intentModelId": "Intent_intent_llm",
  "systemPrompt": "*新的角色介绍",
  "summaryMemory": null,
  "langCode": "zh",
  "language": "中文",
  "sort": 0,
  "functions": [
    {
      "pluginId": "SYSTEM_PLUGIN_MUSIC",
      "paramInfo": {}
    },
    {
      "pluginId": "SYSTEM_PLUGIN_NEWS_NEWSNOW",
      "paramInfo": {
        "url": "https://newsnow.busiyi.world/api/s?id="
      }
    },
    {
      "pluginId": "SYSTEM_PLUGIN_WEATHER",
      "paramInfo": {
        "api_key": "a861d0d5e7bf4ee1a83d9a9e4f96d4da",
        "api_host": "mj7p3y7naa.re.qweatherapi.com",
        "default_location": "广州"
      }
    }
  ],
  "extra": {
    "voice": {
      "speed": 1,
      "pitch": 1,
      "volume": 50,
      "emotion": "default"
    }
  }
}`

const updateAgentResponse = `{
  "code": 0,
  "msg": "success",
  "data": null
}`

// 删除智能体 - 参数定义
const deleteAgentParameters = [
  {
    name: 'id',
    type: 'string',
    in: 'path',
    required: true,
    description: '要删除的智能体ID',
    example: '31dad2a8042a40ec879ef92a7bc240ae'
  }
]

const deleteAgentRequest = `DELETE /xiaozhi/agent/31dad2a8042a40ec879ef92a7bc240ae HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 删除智能体 - 响应示例
const deleteAgentResponse = `{
  "code": 0,
  "msg": "删除成功",
  "data": {}
}`

// 通用状态码定义
const commonStatusCodes = [
  { code: 0, description: 'OK - 操作成功', schema: 'ResultVoid' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
]

const getListStatusCodes = [
  { code: 0, description: 'OK - 成功获取智能体列表', schema: 'ResultListAgentDTO' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
]

const unauthorizedResponse = `{
  "code": 401,
  "msg": "未登录",
  "data": []
}`
</script>

## 认证说明

所有API接口都需要在请求头中包含有效的认证令牌：

```text
Authorization: Bearer <token>
```

获取token方式参见 用户相关API

当认证失败时，请求响应状态码为`200`，但返回以下响应：

```json
{
  "code": 401,
  "msg": "未登录",
  "data": []
}
```

## API列表

### 获取用户智能体列表

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/list"
  method="get"
  title="获取用户智能体列表"
  description="获取当前用户的所有智能体列表，包含智能体的基本信息和配置状态"
  :parameters="[]"
  :headers="getListHeaders"
  :requestExample="getAgentListRequest"
  :responseExample="getAgentListResponse"
  :statusCodes="getListStatusCodes"
/>

::: info
创建智能体时只需提供名称，其他配置可后续通过更新接口修改
:::

### 创建智能体

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent"
  method="post"
  title="创建智能体"
  description="创建一个新的智能体，只需要提供智能体名称，系统会自动分配其他默认配置，返回data为新智能体的ID，可用于更新、删除等api"
  :parameters="createAgentParameters"
  :headers="commonHeaders"
  :requestExample="createAgentRequest"
  :responseExample="createAgentResponse"
  :statusCodes="createAgentStatusCodes"
/>

### 更新智能体

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/{id}"
  method="put"
  title="更新智能体"
  description="更新指定智能体的配置信息，包括模型配置、系统提示词、记忆设置、插件函数等"
  :parameters="updateAgentParameters"
  :headers="commonHeaders"
  :requestExample="updateAgentRequest"
  :responseExample="updateAgentResponse"
  :statusCodes="commonStatusCodes"
/>

::: info
更新智能体时，只需传递需要修改的字段，未传递的字段可以不传
:::

### 删除智能体

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/{id}"
  method="delete"
  title="删除智能体"
  description="删除指定的智能体，此操作不可逆，请谨慎使用"
  :parameters="deleteAgentParameters"
  :headers="getListHeaders"
  :requestExample="deleteAgentRequest"
  :responseExample="deleteAgentResponse"
  :statusCodes="commonStatusCodes"
/>

::: warning
删除操作不可逆，请确认后再执行
:::

## 其他说明项
