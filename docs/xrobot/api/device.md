---
title: 设备 API
---

<script setup>
// 获取已绑定设备 API
const getDevicesPathParams = [
  {
    name: "agentId",
    type: "string",
    required: true,
    location: "path",
    description: "智能体ID，用于指定要查询设备的智能体",
  },
];

const getDevicesHeaders = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token，用户认证令牌",
  },
];

const getDevicesResponse = `{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "aa:bb:cc:dd:ee:ff",
      "userId": "user123",
      "macAddress": "aa:bb:cc:dd:ee:ff",
      "lastConnectedAt": "2024-01-15T10:30:00Z",
      "autoUpdate": 1,
      "board": "ESP32-S3",
      "alias": "客厅音箱",
      "agentId": "4057d21254664408a2f58200d7ba01e0",
      "appVersion": "1.2.3",
      "sort": 1,
      "updater": "user123",
      "updateDate": "2024-01-15T10:30:00Z",
      "creator": "user123",
      "createDate": "2024-01-10T08:00:00Z"
    }
  ]
}`;

const getDevicesStatusCodes = [
  { code: 0, description: "成功获取设备列表" },
  { code: 401, description: "未授权，token无效或已过期" },
  { code: 404, description: "智能体不存在" },
  { code: 500, description: "服务器内部错误" },
];

// 解绑设备 API
const unbindDeviceBodyParams = [
  {
    name: "deviceId",
    type: "string",
    required: true,
    location: "body",
    description: "要解绑的设备ID（通常是MAC地址）",
  },
];

const unbindDeviceHeaders = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token，用户认证令牌",
  },
  {
    name: "Content-Type",
    type: "string",
    required: true,
    description: "application/json",
  },
];

const unbindDeviceRequest = `{
  "deviceId": "aa:bb:cc:dd:ee:ff"
}`;

const unbindDeviceResponse = `{
  "code": 0,
  "message": "设备解绑成功"
}`;

const unbindDeviceStatusCodes = [
  { code: 0, description: "解绑成功" },
  //   { code: 400, description: '请求参数错误' },
  //   { code: 401, description: '未授权，token无效或已过期' },
  //   { code: 404, description: '设备不存在或未绑定' },
  //   { code: 500, description: '服务器内部错误' }
];

// 绑定设备 API
const bindDevicePathParams = [
  {
    name: "agentId",
    type: "string",
    required: true,
    location: "path",
    description: "智能体ID，设备将绑定到此智能体",
  },
  {
    name: "deviceCode",
    type: "string",
    required: true,
    location: "path",
    description: "设备激活码，用于验证设备身份",
  },
];

const bindDeviceHeaders = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token，用户认证令牌",
  },
];

const bindDeviceResponse = `{
  "code": 0,
  "message": "设备绑定成功",
  "data": {
    "id": "aa:bb:cc:dd:ee:ff",
    "userId": "user123",
    "macAddress": "aa:bb:cc:dd:ee:ff",
    "lastConnectedAt": "2024-01-15T10:30:00Z",
    "autoUpdate": 1,
    "board": "ESP32-S3",
    "alias": "新设备",
    "agentId": "4057d21254664408a2f58200d7ba01e0",
    "appVersion": "1.2.3",
    "sort": 1,
    "updater": "user123",
    "updateDate": "2024-01-15T10:30:00Z",
    "creator": "user123",
    "createDate": "2024-01-15T10:30:00Z"
  }
}`;

const bindDeviceStatusCodes = [
  { code: 0, description: "绑定成功" },
  { code: 400, description: "设备激活码无效或已使用" },
  { code: 401, description: "未授权，token无效或已过期" },
  { code: 404, description: "智能体不存在" },
  { code: 409, description: "设备已被绑定" },
  { code: 500, description: "服务器内部错误" },
];

// 更新设备信息 API
const updateDevicePathParams = [
  {
    name: "id",
    type: "string",
    required: true,
    location: "path",
    description: "设备ID（通常是MAC地址）",
  },
];

const updateDeviceBodyParams = [
  {
    name: "alias",
    type: "string",
    required: false,
    location: "body",
    description: "设备别名，用户自定义的设备名称",
  },
  {
    name: "autoUpdate",
    type: "number",
    required: false,
    location: "body",
    description: "自动更新开关，0关闭，1开启",
  },
  {
    name: "sort",
    type: "number",
    required: false,
    location: "body",
    description: "排序值，数字越小排序越靠前",
  },
];

const updateDeviceHeaders = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token，用户认证令牌",
  },
  {
    name: "Content-Type",
    type: "string",
    required: true,
    description: "application/json",
  },
];

const updateDeviceRequest = `{
  "alias": "客厅音箱",
  "autoUpdate": 1,
  "sort": 2
}`;

const updateDeviceResponse = `{
  "code": 0,
  "message": "设备信息更新成功",
  "data": {
    "id": "aa:bb:cc:dd:ee:ff",
    "userId": "user123",
    "macAddress": "aa:bb:cc:dd:ee:ff",
    "lastConnectedAt": "2024-01-15T10:30:00Z",
    "autoUpdate": 1,
    "board": "ESP32-S3",
    "alias": "客厅音箱",
    "agentId": "agent123",
    "appVersion": "1.2.3",
    "sort": 2,
    "updater": "user123",
    "updateDate": "2024-01-15T11:00:00Z",
    "creator": "user123",
    "createDate": "2024-01-10T08:00:00Z"
  }
}`;

const updateDeviceStatusCodes = [
  { code: 0, description: "更新成功" },
  //   { code: 400, description: '请求参数错误' },
  //   { code: 401, description: '未授权，token无效或已过期' },
  //   { code: 404, description: '设备不存在' },
  //   { code: 500, description: '服务器内部错误' }
];

// 手动添加设备 API
const manualAddDeviceBodyParams = [
  {
    name: "deviceCode",
    type: "string",
    required: true,
    location: "body",
    description: "设备激活码，设备配网后自动播报",
  },
];

const manualAddDeviceHeaders = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token，用户认证令牌",
  },
  {
    name: "Content-Type",
    type: "string",
    required: true,
    description: "application/json",
  },
];

const manualAddDeviceRequest = `{
  "deviceCode": "DEVICE123456"
}`;

const manualAddDeviceResponse = `{
  "code": 0,
  "message": "设备添加成功",
  "data": {
    "id": "aa:bb:cc:dd:ee:ff",
    "userId": "user123",
    "macAddress": "aa:bb:cc:dd:ee:ff",
    "lastConnectedAt": null,
    "autoUpdate": 1,
    "board": "ESP32-S3",
    "alias": "新设备",
    "agentId": null,
    "appVersion": "1.2.3",
    "sort": 1,
    "updater": "user123",
    "updateDate": "2024-01-15T10:30:00Z",
    "creator": "user123",
    "createDate": "2024-01-15T10:30:00Z"
  }
}`;

const manualAddDeviceStatusCodes = [
  { code: 0, description: "添加成功" },
  //   { code: 400, description: '设备激活码无效或已使用' },
  //   { code: 401, description: '未授权，token无效或已过期' },
  //   { code: 409, description: '设备已存在' },
  //   { code: 500, description: '服务器内部错误' }
];
// 批量导入设备 API
const preregisterDeviceBodyParams = [
  {
    name: "agent_id",
    type: "string",
    required: true,
    location: "body",
    description: "智能体ID，设备将关联到此智能体",
  },
  {
    name: "mac_addresses",
    type: "array",
    required: true,
    location: "body",
    description: "MAC地址数组，要导入的设备MAC地址列表",
  },
  {
    name: "serial_numbers",
    type: "array",
    required: true,
    location: "body",
    description: "序列号数组，设备序列号列表（可为空）",
  },
];

const preregisterDeviceHeaders = [
  {
    name: "Authorization",
    type: "string",
    required: true,
    description: "Bearer token，用户认证令牌",
  },
  {
    name: "Content-Type",
    type: "string",
    required: true,
    description: "application/json",
  },
];

const preregisterDeviceRequest = `{
  "agent_id": "4057d21254664408a2f58200d7ba01e0",
  "mac_addresses": [
    "F2:F1:A8:6A:C4:6B"
  ],
  "serial_numbers": []
}`;

const preregisterDeviceSuccessResponse = `{
  "success_count": 1,
  "failed": []
}` + `\n\n // 失败示例\n`
+ `{
  "success_count": 0,
  "failed": [
    {
      "value": "F2:F1:A8:6A:C4:6B",
      "reason": "已存在"
    }
  ]
}`;

const preregisterDeviceFailedResponse = `{
  "success_count": 0,
  "failed": [
    {
      "value": "F2:F1:A8:6A:C4:6B",
      "reason": "已存在"
    }
  ]
}`;

const preregisterDeviceStatusCodes = [
  { code: 0, description: "批量导入完成（可能部分失败）" },
  //   { code: 400, description: '请求参数错误' },
  //   { code: 401, description: '未授权，token无效或已过期' },
  //   { code: 404, description: '智能体不存在' },
  //   { code: 500, description: '服务器内部错误' }
];
</script>

## 1. 获取已绑定设备

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/device/bind/{agentId}"
  method="get"
  title="获取已绑定设备"
  description="获取指定智能体下所有已绑定的设备列表，包含设备的详细信息如MAC地址、连接状态、版本信息等。"
  :parameters="getDevicesPathParams"
  :headers="getDevicesHeaders"
  :responseExample="getDevicesResponse"
  :statusCodes="getDevicesStatusCodes"
/>

## 2. 解绑设备

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/device/unbind"
  method="post"
  title="解绑设备"
  description="解除设备与用户账户的绑定关系。解绑后设备将无法接收智能体指令。"
  :parameters="unbindDeviceBodyParams"
  :headers="unbindDeviceHeaders"
  :requestExample="unbindDeviceRequest"
  :responseExample="unbindDeviceResponse"
  :statusCodes="unbindDeviceStatusCodes"
/>

## 3. 绑定设备

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/device/bind/{agentId}/{deviceCode}"
  method="post"
  title="绑定设备"
  description="使用设备激活码将设备绑定到指定的智能体。绑定成功后设备可以接收该智能体的指令。"
  :parameters="bindDevicePathParams"
  :headers="bindDeviceHeaders"
  :responseExample="bindDeviceResponse"
  :statusCodes="bindDeviceStatusCodes"
/>

<!-- ## 4. 更新设备信息

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/device/update/{id}"
  method="put"
  title="更新设备信息"
  description="更新设备的配置信息，如设备别名、自动更新开关、排序等。支持部分更新。"
  :parameters="[...updateDevicePathParams, ...updateDeviceBodyParams]"
  :headers="updateDeviceHeaders"
  :requestExample="updateDeviceRequest"
  :responseExample="updateDeviceResponse"
  :statusCodes="updateDeviceStatusCodes"
/> -->

<!-- ## 5. 手动添加设备

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/device/manual-add"
  method="post"
  title="手动添加设备"
  description="通过设备激活码手动添加设备到用户账户。与绑定设备不同，此接口不需要指定智能体。"
  :parameters="manualAddDeviceBodyParams"
  :headers="manualAddDeviceHeaders"
  :requestExample="manualAddDeviceRequest"
  :responseExample="manualAddDeviceResponse"
  :statusCodes="manualAddDeviceStatusCodes"
/> -->

## 4. 批量导入设备

<ApiEndpoint
  host="https://xrobo.qiniu.com"
  basePath="/xiaozhi"
  endpoint="/device/preregister"
  method="post"
  title="批量导入设备"
  description="通过MAC地址批量导入设备到指定智能体。支持同时导入多个设备，返回成功和失败的统计信息。"
  :parameters="preregisterDeviceBodyParams"
  :headers="preregisterDeviceHeaders"
  :requestExample="preregisterDeviceRequest"
  :responseExample="preregisterDeviceSuccessResponse"
  :statusCodes="preregisterDeviceStatusCodes"
/>

## 设备实体结构

设备对象包含以下字段：

- **id**: 设备唯一标识符（通常是MAC地址）
- **userId**: 关联用户ID
- **macAddress**: 设备MAC地址
- **lastConnectedAt**: 最后连接时间（ISO 8601格式）
- **autoUpdate**: 自动更新开关（0关闭/1开启）
- **board**: 设备硬件型号
- **alias**: 设备别名
- **agentId**: 绑定的智能体ID
- **appVersion**: 固件版本号
- **sort**: 排序值
- **updater**: 更新者ID
- **updateDate**: 更新时间（ISO 8601格式）
- **creator**: 创建者ID
- **createDate**: 创建时间（ISO 8601格式）

## 认证说明

所有设备管理API都需要在请求头中包含有效的Bearer token：

```text
Authorization: Bearer {token}
```
