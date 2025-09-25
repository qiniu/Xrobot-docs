---
title:  灵矽AI小程序+后台解决方案
---

## 🚀 解决方案概述

灵矽AI官方打造的小程序+后台一体化解决方案，为企业提供完整的BtoC智能客服体系。通过深度对接灵矽AI平台，帮助企业快速构建专属的用户服务生态，实现从用户获取到服务交付的全链路数字化转型。

### 核心价值

- **🎯 真正的BtoC体验**：为企业提供面向终端用户的完整服务体系
- **👥 专属用户体系**：独立的用户管理和权限控制系统
- **📱 多端一体化**：小程序前端 + 管理后台的完整解决方案
- **💻 源代码级别交付**：提供完整源代码，支持二次开发和定制化需求
- **🔒 完全私有化部署**：数据完全掌控在企业手中，确保信息安全
- **🏢 独立品牌运营**：可部署到企业自有小程序和公众号，打造专属品牌形象
- **🛠️ 高度可定制**：开放源码架构，支持企业个性化功能扩展

## 📱 小程序功能特性

体验入口：

<img src="./imgs/platform-mp/mp-qr-code.png" class="img-center" alt="灵矽AI小程序二维码" style="zoom: 33%;" />

### 1. 用户自定义与管理智能体

用户可以自由创建智能体，配置音色与提示词。

| <img src="./imgs/platform-mp/agent-create.jpg" class="img-center" alt="创建智能体" /> | <img src="./imgs/platform-mp/agent-manage.jpg" class="img-center" alt="管理智能体" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

### 2. 智能体广场

可以由管理员在后台将智能体添加到智能体广场，用户可以在小程序中查看并使用这些智能体。

| <img src="./imgs/platform-mp/agent-square.jpg" class="img-center" alt="智能体广场" style="zoom:33%;" /> |
| ------------------------------------------------------------ |

### 3. 设备管理

支持用户通过[蓝牙配网](/xrobot/platform/blufi-config)绑定设备，并将设备与智能体绑定。

| <img src="./imgs/platform-mp/device-manage.jpg" class="img-center" alt="设备管理" /> | <img src="./imgs/platform-mp/device-bind.jpg" class="img-center" alt="智能体绑定" /> | <img src="./imgs/platform-mp/device-config.jpg" class="img-center" alt="蓝牙配网" /> |
| ------------------------------------------------------------ |  ------------------------------------------------------------ |------------------------------------------------------------ |

### 4. 音色复刻

支持用户上传一段音频，或录音一段时间，复刻音频音色。

*尚未上线，敬请期待。*

## 后台功能特性

后台前后端分离

### 后端

- 使用MySQL数据库
- 权限控制系统完善，精准控制用户权限
- 提供API接口，方便与小程序前端进行数据交互
- 配有微信插件，支持通过微信小程序注册、登录
- 通过灵矽apikey与灵矽AI平台进行交互

### 前端

#### 用户管理

通过小程序“手机号”快捷登录的用户自动注册到后台。

<img src="./imgs/platform-mp/frontend-users.png" class="img-center" alt="用户管理" />

支持进一步开发，对用户分组，设置不同的权限。

#### 配置管理

配置后台与灵矽AI平台的交互参数，目前只包含apikey。

<img src="./imgs/platform-mp/frontend-apikey.png" class="img-center" alt="配置管理" />

#### 智能体管理

智能体管理允许同步灵矽平台的智能体，还支持将智能体设为公开（发布到广场）。

<img src="./imgs/platform-mp/frontend-agent.png" class="img-center" alt="智能体管理" />

#### 设备管理

<img src="./imgs/platform-mp/frontend-device.png" class="img-center" alt="设备管理" />

## 联系我们

通过灵矽AI小程序+后台解决方案，企业可以快速构建专业的智能客服体系，提升用户体验，降低运营成本，实现数字化转型升级。立即开始您的智能化之旅！
