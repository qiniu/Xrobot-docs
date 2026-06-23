---
title: 平台API
---

<script setup>
import { Chapters } from "../../.vitepress/theme/constrants/route";

const chapter_root = Chapters.xrobot_api;
</script>

## API基本信息

**Base URL**: `https://xrobo.qiniu.com`

**认证方式**: Bearer Token/API-KEY

1. 所有API接口都需要有效的认证令牌
2. 开放API推荐使用 API-KEY，认证格式为 `Bearer <api_key>`

    `<api_key>` 在[灵矽AI控制台](https://xrobo.qiniu.com/#/api-key-management)创建。


### 通用响应格式

所有API都遵循统一的响应格式：

```json
{
  "code": 0,           // 0表示成功，其他值表示失败
  "msg": "",           // 消息内容
  "data": {}           // 响应数据，根据具体API而定
}
```

### 常见错误码

- `0`: 操作成功
- `401`: 未登录或认证令牌无效/过期

当API调用失败时，响应中的 `code` 字段将不为0，`msg` 字段会包含具体的错误信息。请根据错误信息进行相应的处理。

<ChapterContents :chapter=chapter_root />
