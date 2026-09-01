---
title: 资源包与额度 API
---

<script setup>
const quotaParameters = [
  { name: 'resource_type', type: 'number', required: false, location: 'query', description: '资源类型：0 全部资源，1 音色克隆，2 设备资源池，3 设备资源包，4 系统免费资源池。不传时查询全部资源。', example: '1' },
  { name: 'limit', type: 'number', required: false, location: 'query', description: '每页返回条数，默认值和最大值均为 100', example: '100' },
  { name: 'cursor', type: 'string', required: false, location: 'query', description: '上一页响应中的 next_cursor，首次请求不传', example: 'quota_abc123_2026-08-01T10:00:00Z' }
]
const quotaHeaders = [{ name: 'Authorization', type: 'string', required: true, description: 'Bearer token认证', example: 'Bearer your_token_here' }]
const quotaResponse = `{
  "code": 0,
  "msg": "",
  "data": {
    "quotas": [{
      "id": "quota_abc123",
      "user_id": 10001,
      "po_id": "order_xyz789",
      "resource_type": "linxi:api:voice_clone",
      "resource_package": { "type": "lite", "period_unit": 1, "period_value": 1 },
      "status": 0,
      "usage_count": 2,
      "total_count": 10,
      "expired_time": "2026-12-31T23:59:59Z",
      "created_at": "2026-08-01T10:00:00Z"
    }],
    "next_cursor": ""
  }
}`
const quotaStatusCodes = [
  { code: 0, description: '查询成功' },
  { code: 400, description: '请求参数错误' },
  { code: 401, description: '未授权访问' },
  { code: 500, description: '服务器内部错误' }
]
</script>

## 查询资源包额度

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath=""
  endpoint="/v1/quotas"
  method="get"
  title="查询资源包额度"
  description="查询当前用户账户下的资源包使用情况。可通过 resource_type 筛选资源类型。"
  :parameters="quotaParameters"
  :headers="quotaHeaders"
  :responseExample="quotaResponse"
  :statusCodes="quotaStatusCodes"
/>

::: info

- `usage_count` 和 `total_count` 可按资源类型或音色档位分别求和，剩余额度为 `total_count - usage_count`。当前可用额度只统计 `status=0` 且未过期的资源包。
- `next_cursor` 不为空时，将其作为下一次请求的 `cursor`；为空表示查询完成。

:::
