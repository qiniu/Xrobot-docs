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

// 获取智能体列表 - 参数定义
const getAgentListParameters = [
  {
    name: 'limit',
    in: 'query',
    type: 'integer',
    required: false,
    description: '单页数量，默认20，范围1-100',
    example: '20'
  },
  {
    name: 'cursor',
    in: 'query',
    type: 'string',
    required: false,
    description: '游标（上页最后一条ID，32位小写hex，格式：[a-f0-9]{32}）',
    example: '4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d'
  }
]

const getAgentListRequest = `GET /xiaozhi/agent/list?limit=20&cursor=4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 获取智能体列表 - 响应示例
const getAgentListResponse = `{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": "4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d",
      "agentName": "小智助手",
      "assistantName": "助手阿伟",
      "ttsModelName": "",
      "ttsVoiceName": "豪放可爱女",
      "llmModelName": "qwen3极速版",
      "vllmModelName": "智谱视觉AI",
      "memModelId": "Memory_mem_local_short",
      "systemPrompt": "[整体人设指导]\\n核心原则:你是一个名为\\\"{{assistant_name}}\\\"的AI助手，你的所有输出和行为都......",
      "summaryMemory": null,
      "lastConnectedAt": "2024-03-20 10:00:00",
      "deviceCount": 5,
      "extra": null
    }
  ],
  "nextCursor": "5a1b2c3d4e5f67890123456789abcdef"
}`

// 搜索智能体 - 参数定义
const searchAgentParameters = [
  {
    name: 'q',
    in: 'query',
    type: 'string',
    required: true,
    description: '搜索关键词',
    example: 'AA:BB:CC:DD:EE:FF'
  },
  {
    name: 'type',
    in: 'query',
    type: 'string',
    required: true,
    description: '搜索类型，支持 mac（设备 MAC 地址）、agent_id（智能体 ID）',
    example: 'mac'
  }
]

const searchAgentRequest = `// 示例 1：按设备 MAC 地址精确搜索
GET /xiaozhi/agent/search?q=AA:BB:CC:DD:EE:FF&type=mac HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>

// 示例 2：按智能体 ID 精确搜索
GET /xiaozhi/agent/search?q=4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d&type=agent_id HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

// 搜索智能体 - 响应示例
const searchAgentResponse = `{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": "4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d",
      "agentName": "小智助手",
      "assistantName": "助手阿伟",
      "ttsModelName": "",
      "ttsVoiceName": "豪放可爱女",
      "llmModelName": "qwen3极速版",
      "vllmModelName": "智谱视觉AI",
      "memModelId": "Memory_mem_local_short",
      "systemPrompt": "[整体人设指导]\\n核心原则:你是一个名为\\\"{{assistant_name}}\\\"的AI助手，你的所有输出和行为都......",
      "summaryMemory": null,
      "lastConnectedAt": "2024-03-20 10:00:00",
      "deviceCount": 5,
      "extra": null
    }
  ],
  "nextCursor": null
}`

const searchAgentStatusCodes = [
  { code: 0, description: 'OK - 成功搜索智能体', schema: 'ResultListAgentDTO' },
  { code: 401, description: 'Unauthorized - 未登录或token无效', schema: 'ErrorResponse' }
]

// 获取智能体详情 - 参数定义
const getAgentDetailParameters = [
  {
    name: 'id',
    in: 'path',
    type: 'string',
    required: true,
    description: '智能体ID',
    example: 'xxxxxxxxx'
  }
]

const getAgentDetailRequest = `GET /xiaozhi/agent/xxxxxx HTTP/1.1
Host: https://xrobo.qiniu.com
Authorization: Bearer <token>`

const getAgentDetailResponse = `{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "xxxx",
    "agentName": "小智助手",
    "assistantName": "助手阿伟",
    "llmModelId": "LLM_AliLLM",
    "ttsVoiceId": "xxxxxxx",
    "memModelId": "Memory_mem_local_short",
    "intentModelId": "Intent_intent_llm",
    "chatHistoryConf": 1,
    "systemPrompt": "...",
    "summaryMemory": null,
    "language": "中文",
    "langCode": "zh",
    "datasetIds": [],
    "deviceCount": 5,
    "lastConnectedAt": "2026-07-09 09:00:00",
    "createdAt": "2026-07-01 12:00:00",
    "updatedAt": "2026-07-09 09:00:00"
  }
}`

const getAgentDetailStatusCodes = [
  { code: 0, description: 'OK - 成功获取智能体详情', schema: 'ResultAgentInfoVO' },
  { code: 401, description: 'Unauthorized - 未授权或token无效', schema: 'ErrorResponse' },
  { code: 500, description: 'Internal Server Error - 智能体不存在', schema: 'ErrorResponse' }
]

// 创建智能体 - 参数定义
const createAgentParameters = [
    {
        name: 'agentName',
        in: 'body',
        type: 'string',
        required: true,
        description: '智能体名称',
        example: '客服助手'
    },
    {
        name: 'assistantName',
        in: 'body',
        type: 'string',
        required: true,
        description: '助手昵称',
        example: '助手阿伟'
    },
    {
        name: 'langCode',
        in: 'body',
        type: 'string',
        required: false,
        description: '语言编码，不传时使用默认模板。可通过 GET /v1/languages 获取可选语言',
        example: 'zh'
    },
    {
        name: 'ttsVoiceId',
        in: 'body',
        type: 'string',
        required: false,
        description: '音色ID，不传时使用系统或默认模板。可通过 GET /v1/voices 获取可选音色',
        example: 'a5b85a7ba5b24a9a96e24aa88b500d2f'
    },
    {
        name: 'systemPrompt',
        in: 'body',
        type: 'string',
        required: false,
        description: '角色设定，不传时使用默认模板配置',
        example: '你是一个专业的客服助手'
    },
    {
        name: 'llmModelId',
        in: 'body',
        type: 'string',
        required: false,
        description: '大语言模型配置ID，不传时使用默认模板。DeepSeek V4 Flash（推荐）：f3626c105383d71654a57f2bb8a973f3；其他可选模型通过 GET /v1/agents/models/llm 获取',
        example: 'f3626c105383d71654a57f2bb8a973f3'
    },
    {
        name: 'memModelId',
        in: 'body',
        type: 'string',
        required: false,
        description: '记忆模型ID，不传时使用默认模板。无记忆：Memory_nomem；长期记忆：Memory_long_term_memory',
        example: 'Memory_nomem'
    },
    {
        name: 'intentModelId',
        in: 'body',
        type: 'string',
        required: false,
        description: '意图模型ID，不传时使用默认模板。无意图识别：Intent_nointent；统一意图识别：Intent_function_call',
        example: 'Intent_function_call'
    }
]

const createAgentRequest = `POST /xiaozhi/agent HTTP/1.1
Host: https://xrobo.qiniu.com
Content-Type: application/json
Authorization: Bearer <token>

{
  "agentName": "客服助手",
  "assistantName": "助手阿伟",
  "llmModelId": "f3626c105383d71654a57f2bb8a973f3",
  "intentModelId": "Intent_function_call"
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
        name: 'assistantName',
        type: 'string',
        required: false,
        description: '助手昵称',
        example: '助手阿伟'
      },
      {
        name: 'asrModelId',
        type: 'string',
        required: false,
        description: '语音识别模型ID',
        example: 'ASR_DoubaoASR'
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
            name: 'llm',
            type: 'object',
            required: false,
            description: 'LLM 个性化配置。标准参数越界会被自动夹取到边界值（不报错）；custom_params 走模型 schema 校验，非法参数直接拒绝',
            children: [
              {
                name: 'temperature',
                type: 'number',
                required: false,
                description: '温度，控制输出随机性（接受范围 0.0~2.0，越界夹取）',
                example: 0.7
              },
              {
                name: 'top_p',
                type: 'number',
                required: false,
                description: '核采样参数（接受范围 0.0~1.0，越界夹取）',
                example: 1.0
              },
              {
                name: 'frequency_penalty',
                type: 'number',
                required: false,
                description: '频率惩罚（接受范围 -2.0~2.0，越界夹取）',
                example: 0.0
              },
              {
                name: 'max_tokens',
                type: 'integer',
                required: false,
                description: '单轮最大输出回复 token 数（范围 1~8192，越界夹取）',
                example: 500
              },
              {
                name: 'enable_search',
                type: 'boolean',
                required: false,
                description: '是否启用联网搜索',
                example: false
              },
              {
                name: 'custom_params',
                type: 'object',
                required: false,
                description: '大模型自定义参数，按所选 LLM 模型的 schema 校验，非法参数直接拒绝（400）。支持哪些参数取决于所选模型、且会随模型调整而变化，详见「大语言模型 API」文档',
                children: [
                  {
                    name: 'body',
                    type: 'object',
                    required: false,
                    description: '自定义参数键值对，key 与类型由所选模型的 schema 决定，接入前需先查询该模型 schema 再传',
                    example: '{ "<自定义参数key>": "<按 schema 取值>" }'
                  }
                ]
              }
            ]
          },
          {
            name: 'voice',
            type: 'object',
            required: false,
            description: '语音合成（TTS）配置',
            children: [
              {
                name: 'volume',
                type: 'number',
                required: false,
                description: '音量（范围 1.0~100.0，默认 50.0）',
                example: 50
              },
              {
                name: 'speed',
                type: 'number',
                required: false,
                description: '语速（范围 0.5~2.0，默认 1.0）',
                example: 1
              },
              {
                name: 'pitch',
                type: 'number',
                required: false,
                description: '语调（范围 0.5~2.0，默认 1.0）',
                example: 1
              },
              {
                name: 'emotion',
                type: 'string',
                required: false,
                description: '情绪类型，如 "happy"、"sad" 等（取决于音色支持的情绪列表）',
                example: 'default'
              },
              {
                name: 'quality',
                type: 'string',
                required: false,
                description: '音质等级（可选值：low | medium | high | lossless）',
                example: 'medium'
              },
              {
                name: 'enable_tts_emotion',
                type: 'boolean',
                required: false,
                description: '是否启用多情感模式，开启后 emotion 字段才生效',
                example: false
              }
            ]
          },
          {
            name: 'asr',
            type: 'object',
            required: false,
            description: '语音识别（ASR）配置',
            children: [
              {
                name: 'disable_emotion',
                type: 'boolean',
                required: false,
                description: '是否禁用情绪识别',
                example: false
              },
              {
                name: 'enable_auto_lang',
                type: 'boolean',
                required: false,
                description: '混合语种识别开关。开启后 ASR 不锁定语种，由引擎自动检测',
                example: false
              }
            ]
          },
          {
            name: 'goodbye',
            type: 'object',
            required: false,
            description: '结束语配置',
            children: [
              {
                name: 'prompt',
                type: 'string',
                required: false,
                description: '结束语提示词',
                example: ''
              },
              {
                name: 'language',
                type: 'string',
                required: false,
                description: '结束语语言',
                example: ''
              },
              {
                name: 'emotion',
                type: 'string',
                required: false,
                description: '结束语情绪',
                example: ''
              },
              {
                name: 'content',
                type: 'string',
                required: false,
                description: '结束语内容',
                example: ''
              }
            ]
          },
          {
            name: 'voiceprint',
            type: 'object',
            required: false,
            description: '声纹配置',
            children: [
              {
                name: 'chat_only_enabled',
                type: 'boolean',
                required: false,
                description: '开启后，智能体只在识别到已绑定说话人时响应',
                example: false
              }
            ]
          },
          {
            name: 'disabled_builtin_tools',
            type: 'array',
            required: false,
            description: '禁用的内置工具列表。传空数组表示不清空任何工具',
            children: [
              {
                name: 'item',
                type: 'string',
                required: false,
                description: '要禁用的内置工具名称',
                example: ''
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
  "assistantName": "助手阿伟",
  "asrModelId": "ASR_DoubaoASR",
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
    "llm": {
      "temperature": 0.7,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "max_tokens": 500,
      "enable_search": false,
      "custom_params": {
        "body": {
          "<自定义参数key>": "<按 schema 取值>"
        }
      }
    },
    "voice": {
      "volume": 50,
      "speed": 1.0,
      "pitch": 1.0,
      "emotion": "default",
      "quality": "medium",
      "enable_tts_emotion": false
    },
    "asr": {
      "disable_emotion": false,
      "enable_auto_lang": false
    },
    "goodbye": {
      "prompt": "",
      "language": "",
      "emotion": "",
      "content": ""
    },
    "voiceprint": {
      "chat_only_enabled": false
    },
    "disabled_builtin_tools": []
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

// 更新设备智能体 - 参数定义
const updateDeviceAgentHeaders = [
  { name: 'Authorization', value: 'Bearer <用户登录 Token 或 API Key>', required: true, description: '用户认证凭证' },
  { name: 'Content-Type', value: 'application/json', required: true, description: '请求体格式' }
]

const updateDeviceAgentParameters = [
  {
    name: 'mac_address',
    type: 'string',
    in: 'path',
    required: true,
    description: '设备 MAC 地址，格式为 00:1A:2B:3C:4D:5E，大小写均可',
    example: 'AB:CA:A9:60:D8:48'
  },
  {
    name: 'agent_id',
    type: 'string',
    in: 'path',
    required: true,
    description: '目标智能体 ID（32 位小写 hex，必须归属当前认证用户）',
    example: '03fe2c47ec8c47a28c7f382a47b4f838'
  },
  {
    name: 'disable_chat_history_migration',
    type: 'boolean',
    in: 'body',
    required: false,
    description: '是否禁止迁移聊天历史；`false` 或省略时迁移，`true` 时仅切换设备绑定',
    example: false
  }
]

const updateDeviceAgentRequest = `PUT /v1/devices/AB:CA:A9:60:D8:48/agent/03fe2c47ec8c47a28c7f382a47b4f838 HTTP/1.1
Host: xrobo.qiniu.com
Authorization: Bearer <用户登录 Token 或 API Key>
Content-Type: application/json

{}`

const updateDeviceAgentResponse = `{
  "code": 0,
  "reqid": "request-id",
  "data": {}
}`

const updateDeviceAgentErrorResponse = `{
  "code": 400,
  "msg": "invalid request body",
  "reqid": "request-id",
  "data": null
}`

const updateDeviceAgentStatusCodes = [
  { code: 0, description: '成功', schema: 'ResultVoid' },
  { code: 400, description: 'MAC 地址或智能体 ID 不合法；请求体缺失或 JSON 格式错误', schema: 'ErrorResponse' },
  { code: 401, description: '未携带认证凭证或认证凭证无效', schema: 'ErrorResponse' },
  { code: 403, description: 'Token 已过期或无设备操作权限', schema: 'ErrorResponse' },
  { code: 404, description: '已注册和预注册记录中均不存在该设备', schema: 'ErrorResponse' },
  { code: 599, description: '服务端内部异常', schema: 'ErrorResponse' }
]
</script>

## 认证说明

所有API接口都需要在请求头中包含有效的认证令牌：

```text
Authorization: Bearer <token>
```

获取token方式参见 [平台api概要](./index)

当认证失败时，请求响应状态码为`200`，但返回以下响应：

```json
{
  "code": 401,
  "msg": "未登录",
  "data": []
}
```

## API列表

### 获取用户智能体列表（支持分页）

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/list"
  method="get"
  title="获取用户智能体列表（支持分页）"
  description="获取当前用户的智能体列表，支持分页查询。包含智能体的基本信息和配置状态"
  :parameters="getAgentListParameters"
  :headers="getListHeaders"
  :requestExample="getAgentListRequest"
  :responseExample="getAgentListResponse"
  :statusCodes="getListStatusCodes"
/>

::: info 分页规则说明
**默认行为**：
- `limit` 和 `cursor` 都不传：返回全量列表（兼容旧版本），`nextCursor` 为 `null`
- 只传 `cursor`：`limit` 默认为 20
- `limit <= 0`：自动修正为 20
- `limit > 100`：自动修正为 100

**游标说明**：
- `nextCursor` 为 `null` 表示无更多数据
- 游标格式为32位小写十六进制字符串（如：`4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d`）
:::

::: details 分页使用示例

**示例1：获取全量列表（兼容模式）**
```http
GET /xiaozhi/agent/list
```
返回全量列表，`nextCursor` 为 `null`

**示例2：首页查询**
```http
GET /xiaozhi/agent/list?limit=20
```
获取前20条记录

**示例3：翻页查询**
```http
GET /xiaozhi/agent/list?limit=20&cursor=4f3a8c7e0b6f4b5c9d3d0b8a2a1f0c9d
```
从指定游标位置继续获取20条记录

**示例4：参数自动修正**
```http
GET /xiaozhi/agent/list?limit=0
# 服务端自动修正为 limit=20

GET /xiaozhi/agent/list?limit=1000
# 服务端自动修正为 limit=100
```

**示例5：无效游标的错误响应**
```http
GET /xiaozhi/agent/list?limit=20&cursor=invalid-cursor
```
```json
{
  "code": 500,
  "msg": "无效的游标参数",
  "data": null
}
```

**示例6：数据已全部获取**
```json
{
  "code": 0,
  "msg": "success",
  "data": [],
  "nextCursor": null
}
```
:::

### 搜索智能体

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/search"
  method="get"
  title="搜索智能体"
  description="支持按设备 MAC 地址或智能体 ID 搜索智能体"
  :parameters="searchAgentParameters"
  :headers="getListHeaders"
  :requestExample="searchAgentRequest"
  :responseExample="searchAgentResponse"
  :statusCodes="searchAgentStatusCodes"
/>

::: tip 搜索类型与匹配规则
- **mac（设备 MAC 地址）**：采用**精确匹配**，查询绑定该 MAC 设备且归属于当前用户的智能体
- **agent_id（智能体 ID）**：采用**精确匹配**，按智能体 ID 查询归属于当前用户的智能体

📌 **说明**：搜索结果目前为全量返回，响应体中的 `nextCursor` 固定为 `null`，无需处理游标分页。
:::

::: info
创建智能体时可指定大语言模型和意图模型；未传模型ID时使用默认模板配置，也可在创建后通过更新接口修改
:::

### 创建智能体

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent"
  method="post"
  title="创建智能体"
  description="创建一个新的智能体，可在创建时指定大语言模型和意图模型。未指定的模型使用默认模板配置，返回data为新智能体的ID，可用于更新、删除等api"
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

::: tip LLM 参数说明
`extra.llm` 下的标准参数（temperature、top_p 等）越界会被自动夹取、不报错；`extra.llm.custom_params.body` 下的自定义参数会按所选模型的 schema 校验，非法参数直接拒绝。支持哪些自定义参数取决于所选模型、且会随模型调整而变化，具体 key/类型请以模型 schema 查询结果为准，详见 [大语言模型 API](./llm.md) 的「大模型自定义参数（custom_params）」一节。
:::

::: tip 记忆模型说明
`memModelId` 用于配置智能体的记忆模式。详细说明及系统行为请参见 [长期记忆 API](./longterm-memory.md)。
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

### 切换设备关联智能体

**Base URL：** `https://xrobo.qiniu.com/v1`

将设备切换到目标智能体。对于已正式注册的设备，默认会把该设备的**全部聊天历史**迁移至目标智能体；可通过请求体禁止迁移。若设备尚未注册、但存在预注册记录，则仅更新预注册设备绑定的智能体，不涉及聊天记录迁移。

响应 HTTP 状态码当前统一为 `200 OK`；请以响应体的 `code` 判断业务是否成功。`code = 0` 表示成功，非 `0` 表示失败。

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/devices/{mac_address}/agent/{agent_id}"
  method="put"
  title="切换设备关联智能体"
  description="切换设备到目标智能体；已注册设备默认迁移该 MAC 下全部聊天历史，预注册设备仅更新绑定关系"
  :parameters="updateDeviceAgentParameters"
  :headers="updateDeviceAgentHeaders"
  :requestExample="updateDeviceAgentRequest"
  :responseExample="updateDeviceAgentResponse"
  :statusCodes="updateDeviceAgentStatusCodes"
/>

::: warning 请求体必填
请求体**必须存在**，即使使用默认行为也必须传递 `{}`。请求体缺失或不是合法 JSON 时，接口返回业务错误 `code: 400`。
:::

#### 请求体

```json
{
  "disable_chat_history_migration": false
}
```

`disable_chat_history_migration` 为可选布尔值，默认 `false`：

| 值 | 已注册设备行为 | 预注册设备行为 |
|---|---|---|
| `false` 或省略 | 切换设备绑定，并将该 MAC 下全部聊天记录迁移至目标智能体。 | 仅更新预注册设备绑定，不迁移聊天记录。 |
| `true` | 仅切换设备绑定，原聊天记录保留在原智能体名下。 | 仅更新预注册设备绑定，不迁移聊天记录。 |

#### 切换且迁移聊天历史（默认）

```bash
curl -X PUT 'https://xrobo.qiniu.com/v1/devices/AB:CA:A9:60:D8:48/agent/03fe2c47ec8c47a28c7f382a47b4f838' \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

#### 切换但保留原聊天历史归属

```bash
curl -X PUT 'https://xrobo.qiniu.com/v1/devices/AB:CA:A9:60:D8:48/agent/03fe2c47ec8c47a28c7f382a47b4f838' \
  -H 'Authorization: Bearer <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"disable_chat_history_migration":true}'
```

#### 权限和行为说明

| 情况 | 行为 |
|---|---|
| 目标智能体不属于当前用户 | 拒绝切换。 |
| 已注册设备不属于当前用户 | 拒绝切换。 |
| 已注册设备的原智能体不属于当前用户 | 拒绝切换。 |
| 预注册设备不属于当前用户 | 拒绝切换。 |
| 已注册和预注册表中均找不到设备 | 返回设备不存在。 |

#### 常见失败响应

```json
{
  "code": 400,
  "msg": "invalid request body",
  "reqid": "request-id",
  "data": null
}
```

| `code` | `msg` | 场景 |
|---:|---|---|
| `400` | `invalid mac address` / `invalid mac address. format: ...` | MAC 地址为空或格式不合法。 |
| `400` | `invalid agent id` | 目标智能体 ID 为空。 |
| `400` | `invalid request body` | 没有请求体或 JSON 格式不正确。 |
| `401` | `authorization header required` / `invalid token` | 未认证或认证凭证无效。 |
| `403` | `token is expired` | 登录 Token 已过期。 |
| `403` | `permission denied` | 当前用户无该设备或预注册设备的操作权限。 |
| `404` | `device not found` | 已注册和预注册记录中均不存在该 MAC。 |
| 非 `0` | 智能体不存在或无智能体权限 | 目标智能体不存在、不归属当前用户，或原智能体归属校验失败。 |
| `599` | 具体错误信息 | 服务端内部异常。 |

### 获取智能体详情

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/agent/{id}"
  method="get"
  title="获取智能体详情"
  description="获取指定智能体的配置详情，包括基础信息、模型配置、提示词、知识库绑定、设备数量和最近连接时间"
  :parameters="getAgentDetailParameters"
  :headers="getListHeaders"
  :requestExample="getAgentDetailRequest"
  :responseExample="getAgentDetailResponse"
  :statusCodes="getAgentDetailStatusCodes"
/>

## 其他说明项
