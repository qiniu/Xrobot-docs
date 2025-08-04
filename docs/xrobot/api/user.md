---
title: 用户API
---

## 1. 用户注册

```plain
请求：
POST https://xrobo.qiniu.com/xiaozhi/user/register
Content-Type: application/json
{
"username": "",
"password": "",
"captcha": "etnjx", 【下面的方法获取】
"mobileCaptcha": "", 【否】
"captchaId": "" 【uuid：cfa94872-48b6-425b-8e6a-17b912b6b6f4"】
}
响应：
{
"code": 0,
"msg": "",
"data": {}
}

```

```
// 如何获取 captcha
GET https://xrobo.qiniu.com/xiaozhi/user/captcha?uuid=cfa94872-48b6-425b-8e6a-17b912b6b6f4 [uuid 随机生成]
```

响应：
<img src="../device/imgs/device-bind/4.captcha-eg.png" class="img-center">

## 2. 用户登录

```

请求：
POST https://xrobo.qiniuapi.com/xiaozhi/user/login
Content-Type: application/json
{
areaCode: "+86"
captcha: "xxxxx"
captchaId: "d4224c42-a0a2-4e38-87a5-edc3ad03c014"
mobile: ""
password: "xxxx"
username: "xxx"
}
响应：
{
"code": 0,
"msg": "success",
"data": {
"token": "4fxxxxxxxxxxxxxxxxxxxxxxx", 【后续创建 agent 等操作，需要带上 token】
"expire": 43200,
"clientHash": "xxxxxx"
}
}

```

## 3. 声音复刻

见 [声音复刻](./voice-clone.md)
