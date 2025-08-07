---
title: 开源小智固件接入指南
---

## 一、固件编译

参考 [小智开源固件编译流程](https://github.com/xinnan-tech/xiaozhi-esp32-server/blob/main/docs/firmware-build.md) 进行固件编译。

## 二、固件烧录

参考教程 [Flash工具/Web端烧录固件（无IDF开发环境）-方式二：ESP-Launchpad 浏览器WEB端烧录-3. 烧录固件/下载到开发板](https://ccnphfhqs21z.feishu.cn/wiki/Zpz4wXBtdimBrLk25WdcXzxcnNS#CzSmd9PXYoGOHzxDi9bcwtsan9f)。

## 三、设备绑定

### 1. 绑定 MAC 地址

- 第一步：访问控制台，注册账号，登录

- 第二步：新建智能体：

  <img src="./imgs/device-bind/agentcard-eg.png">

- 第三步：在“设备管理”中，选择 批量导入，填写设备的 mac 地址：

  <img src="./imgs/device-bind/device-import.png">

  不知道设备 mac 地址怎么办？

### 2. 绑定设备激活码

- 第三步：通过 在“设备管理”中，选择新增，填写 设备激活码
  <img src="./imgs/device-bind/3.device-code.png">

怎么获取设备激活码？

#### 2.1 获取设备激活码

通过 OTA 通信协议获取，参考 [OTA 协议](/xrobot/platform/OTA)

#### 2.2 ESP32 设备通过 OTA 拿到激活码后，没有及时绑定会怎么样？

首先，设备会一直定期的发送 ota/activate 请求，提醒您去绑定；此时设备也无法唤醒，无法通话

<img src="./imgs/device-bind/2.2.png" class="img-center">

其次，如果服务端 auth 验证需要 token，这个 token 是有保活期，超过了，需要重启设备，因为市面上的固件都没有定期 ota 过程，只有重启设备才会有 ota 消息发送。

#### 2.3 怎么重新绑定

需要在控制台先解除绑定，再重新绑定，设备解除绑定后，设备当前通话并不会立刻终止，只有当重新开启会话时，会提醒你重启设备，重新拿到激活码，重新去走一遍流程。

<img src="./imgs/device-bind/2.3.png" class="img-center">
