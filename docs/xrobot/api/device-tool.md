---
title: 设备工具描述API
---

<script setup>
const deviceToolHeaders = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Bearer token认证',
    example: 'Bearer your_token_here'
  }
]

const deviceToolWriteHeaders = [
  ...deviceToolHeaders,
  {
    name: 'Content-Type',
    type: 'string',
    required: true,
    description: '请求内容类型',
    example: 'application/json'
  }
]

const deviceToolIdPathParams = [
  {
    name: 'id',
    type: 'string',
    required: true,
    location: 'path',
    description: '设备工具描述配置ID，由查询、新增或更新接口返回',
    example: '9f4b1d7c2e8a4f5b9c0d1e2f3a4b5c6d'
  }
]

const deviceToolBodyParams = [
  {
    name: 'name',
    type: 'string',
    required: true,
    location: 'body',
    description: '设备工具名称',
    example: 'self.audio_speaker.set_volume'
  },
  {
    name: 'desc',
    type: 'string',
    required: true,
    location: 'body',
    description: '自定义工具描述，最长200个字符',
    example: '设置音量。'
  }
]

const listDeviceToolsResponse = `{
  "code": 0,
  "data": {
    "tools": [
      {
        "id": "9f4b1d7c2e8a4f5b9c0d1e2f3a4b5c6d",
        "name": "self.audio_speaker.set_volume",
        "desc": "设置音量。",
        "updated_at": "2026-06-10T14:30:00+08:00"
      }
    ]
  }
}`

const createDeviceToolRequest = `{
  "name": "self.audio_speaker.set_volume",
  "desc": "设置音量。"
}`

const createDeviceToolResponse = `{
  "code": 0,
  "data": {
    "id": "9f4b1d7c2e8a4f5b9c0d1e2f3a4b5c6d",
    "name": "self.audio_speaker.set_volume",
    "desc": "设置音量。",
    "updated_at": "2026-06-10T14:30:00+08:00"
  }
}`

const updateDeviceToolRequest = `{
  "name": "self.audio_speaker.set_volume",
  "desc": "设置音量。"
}`

const updateDeviceToolResponse = `{
  "code": 0,
  "data": {
    "id": "9f4b1d7c2e8a4f5b9c0d1e2f3a4b5c6d",
    "name": "self.audio_speaker.set_volume",
    "desc": "设置音量。",
    "updated_at": "2026-06-10T14:30:00+08:00"
  }
}`

const deleteDeviceToolResponse = `{
  "code": 0,
  "data": null
}`

const listDeviceToolsStatusCodes = [
  { code: 0, description: '查询成功' }
]

const createDeviceToolStatusCodes = [
  { code: 0, description: '新增成功' },
  { code: 400, description: '请求参数错误' },
  { code: 614, description: '同一用户已配置相同工具名称' }
]

const updateDeviceToolStatusCodes = [
  { code: 0, description: '更新成功' },
  { code: 400, description: '请求参数错误' },
  { code: 612, description: '配置不存在，或配置不属于当前用户' },
  { code: 614, description: '同一用户已配置相同工具名称' }
]

const deleteDeviceToolStatusCodes = [
  { code: 0, description: '删除成功' },
  { code: 612, description: '配置不存在，或配置不属于当前用户' }
]
</script>

设备工具描述API用于管理并自定义当前用户的设备工具描述。

::: tip 使用说明
不同设备支持的工具可能不同，请填写设备实际上报的工具名称。
:::

## 1. 查询设备工具描述

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/device/tools"
  method="get"
  title="查询设备工具描述"
  description="获取当前用户已配置的设备工具描述列表。"
  :headers="deviceToolHeaders"
  :responseExample="listDeviceToolsResponse"
  :statusCodes="listDeviceToolsStatusCodes"
/>

## 2. 新增设备工具描述

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/device/tools"
  method="post"
  title="新增设备工具描述"
  :parameters="deviceToolBodyParams"
  :headers="deviceToolWriteHeaders"
  :requestExample="createDeviceToolRequest"
  :responseExample="createDeviceToolResponse"
  :statusCodes="createDeviceToolStatusCodes"
/>

## 3. 更新设备工具描述

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/device/tools/{id}"
  method="put"
  title="更新设备工具描述"
  :parameters="[...deviceToolIdPathParams, ...deviceToolBodyParams]"
  :headers="deviceToolWriteHeaders"
  :requestExample="updateDeviceToolRequest"
  :responseExample="updateDeviceToolResponse"
  :statusCodes="updateDeviceToolStatusCodes"
/>

## 4. 删除设备工具描述

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/v1"
  endpoint="/device/tools/{id}"
  method="delete"
  title="删除设备工具描述"
  :parameters="deviceToolIdPathParams"
  :headers="deviceToolHeaders"
  :responseExample="deleteDeviceToolResponse"
  :statusCodes="deleteDeviceToolStatusCodes"
/>
