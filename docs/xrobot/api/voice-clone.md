---
title: 音色克隆API
---

## 接口基本信息

### baseUrl

https://xrobo.qiniu.com

### Headers

将`<token>`替换为账户的 token

```Plain
Authorization: Bearer <token>
Content-Type: application/json
```

### ResponseBody

code: 当前请求的状态码，成功时为 0，失败时为非 0

msg: 错误信息，只有在请求失败时才会有值

reqid: 唯一的请求 ID

data: 请求实际返回的信息

```Go
{
    "code": <int>,
    "msg": <string>,
    "reqid": <string>,
    "data": <object>
}
```

## 创建音色栏位

### 接口路径

POST /v1/voice-clones

### 传入参数

model_id: "QN_ACV"

### 返回参数

id: 音色的唯一 id

name: 默认的音色名称，形如"复刻音色-XXXXX"，(XXXXX 为大写字母、小写字母、数字组成的随机字符串)

language: ""

demo_url: ""

state: "Init"

```Plain
POST /v1/voice-clones
Authorization: Bearer <token>

{
    "model_id": <string>  // QN_ACV
}

响应
200
{
    "code": <int>,
    "data": {
        "id" <string> // 音色 id
        "name": <string>, // 音色名字，默认为"复刻音色-XXXXX"
        "language": <string>, // 音色对应语言
        "demo_url": <string> // 试听地址
        "state": <string>, // 状态，Init/Success/Training/Failed
    }
}
```

## 训练音色

### 接口路径

PUT /v1/voice-clones/`<id>`

### 传入参数

id: 待训练的音色，id 由"创建音色栏位"接口创建，可以通过"音色列取"接口查看有哪些 id

key: 可以为""或者一个合法的音频 url 连接，如果为空则表示只修改 name，不为空则根据 url 对应文件进行训练。

name: 必填，当前音色的名称，如果填入与原名称不同的字符串，将会更新原音色的名称

### 返回参数

id: 音色的唯一 id

name: 音色名称

language: 音色语言

demo_url: 音色的试听链接

state: ["Init", "Success", "Training", "Failed"]，表示当前音色的状态，只有处于"Success"状态的音色才可以使用

```Plain
PUT /v1/voice-clones/<id>
Authorization: Bearer <token>
{
    "key": <string> // 可选，如果为空则表示只修改 name，不为空则根据上传的文件进行训练。
    "name": <string> // 可选，如果不为空则更新音色名称（限制为20字符以内,汉字/字母/数字都是一个字符）
}
响应
200
{
    "code": <int>,
    "data": {
        "id": <string>,
        "name": <string>,
        "language": <string>,
        "demo_url": <string>,
        "state": <string>,
    }
}
```

## 获取音色

根据 id 获取音色信息

### 接口路径

GET /v1/voice-clones/`<id>`

### 传入参数

id: 待查询的音色

### 返回参数

id: 音色的唯一 id

name: 音色名称

language: 音色语言

demo_url: 音色的试听链接

state: ["Init", "Success", "Training", "Failed"]，表示当前音色的状态，只有处于"Success"状态的音色才可以使用

```Plain
GET /v1/voice-clones/<id>
Authorization: Bearer <token>

响应
200
{
    "code": <int>,
    "data": {
        "id": <string>,
        "name": <string>,
        "language": <string>,
        "demo_url": <string>,
        "state": <string>,
    }
}
```

## 音色列取

列取当前用户复刻音色

### 接口路径

GET /v1/voice-clones

### 返回参数

id: 音色的唯一 id

name: 音色名称

language: 音色语言

demo_url: 音色的试听链接

state: ["Init", "Success", "Training", "Failed"]，表示当前音色的状态，只有处于"Success"状态的音色才可以使用

```Plain
GET /v1/voice-clones
Authorization: Bearer <token>

响应
200
{
    "code": <int>,
    "data": {
        "voices": [
            {
                "id": <string>,
                "name": <string>,
                "language": <string>,
                "demo_url": <string>,
                "state": <string>,
            },
        ]
    }
}
```

## 删除音色

删除用户账户下的指定音色

### 接口路径

DELETE /v1/voice-clones/`<id>`

### 传入参数

id: 待删除的音色 id

```Plain
DELETE /v1/voice-clones/<id>
Authorization: Bearer <token>

响应
200
{
    "code": <int>,
    "data": {

    }
}
```
