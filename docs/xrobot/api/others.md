<script setup>
const voicesParameters = []

const voicesHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer cab2efa1c82b6b6fb153c123962be6ce'
  }
]

const voicesRequestExample = `GET /v1/voices HTTP/1.1
Host: xrobo.qiniu.com
Authorization: Bearer cab2efa1c82b6b6fb153c123962be6ce`

const voicesResponseExample = `{
  "code": 0,
  "reqid": "req_12345",
  "data": {
    "voices": [
      {
        "id": "voice_001",
        "name": "小雅/Xiaoya",
        "demo": "https://example.com/demo.mp3",
        "tags": {
          "languages": ["zh", "en"],
          "age": "young",
          "gender": "female",
          "styles": ["温柔", "甜美"],
          "scenes": ["客服", "播音"],
          "profile": "standard",
          "emotions": [
            {
              "emotion": "开心",
              "demo_url": "https://example.com/happy.mp3"
            },
            {
              "emotion": "平静",
              "demo_url": "https://example.com/calm.mp3"
            }
          ]
        }
      }
    ]
  }
}`

const voicesStatusCodes = [
  {
    code: 0,
    description: '请求成功'
  },
  {
    code: 401,
    description: '认证失败，token无效或过期'
  },
  {
    code: 500,
    description: '服务器内部错误'
  }
]
</script>

# 其他API文档

## 获取语音列表

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/voices"
  method="get"
  title="获取语音列表"
  description="获取系统中所有可用的语音模型列表，包含语音的详细信息、标签和情感支持"
  :parameters="voicesParameters"
  :headers="voicesHeaders"
  :requestExample="voicesRequestExample"
  :responseExample="voicesResponseExample"
  :statusCodes="voicesStatusCodes"
/>

### 认证说明

此API需要Bearer token认证，请在请求头中包含有效的访问令牌：

```text
Authorization: Bearer {token}
```
