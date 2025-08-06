---
title: 设备API
---


## 1. 设备绑定【设备激活码】

```

请求：
POST https://xrobo.qiniu.com/xiaozhi/device/bind/dfbea67edc2340708a03084d5b578387/605192 【605192 就是激活码】
Content-Type: application/json
authorization Bearer 4fxxxxxxxxxxxxxxxxxxxxxxx
{

}
响应：
{
"code":0,"msg":"success","data":null
}
```

## 2. 设备绑定【设备 MAC 地址】

```
请求：
POST https://xrobo.qiniu.com/xiaozhi/device/preregister
Content-Type: application/json
authorization Bearer 4fxxxxxxxxxxxxxxxxxxxxxxx
{

agent_id: "dfbea67edc2340708a03084d5b578387"
mac_addresses: ["0e:8e:18:32:ec:22"] 【设备 mac 地址】
serial_numbers: []
}
响应：
{
"success_count":0,
"failed":[{"value":"0e:8e:18:32:ec:22","reason":"已存在"}] 【错误响应】
}
```


## 3. 解除绑定

```
请求：
POST https://xrobo.qiniu.com/xiaozhi/device/unbind
Content-Type: application/json
authorization Bearer 4fxxxxxxxxxxxxxxxxxxxxxxx
{
deviceId: "8c:bf:ea:8f:38:28"
}
响应：
{
"code":0,"msg":"success","data":null
}

```