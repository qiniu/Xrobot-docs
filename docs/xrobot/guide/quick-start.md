---
title: 快速入门
---

## 智能体连接指南

### 一、智能体设置

#### 1.1 进入智能体设置

登录智控台(<https://xrobo.qiniu.com/>) ，选择对应智能体-配置角色。

<img src="./imgs/device-connection/1.1.png" class="img-center" alt="进入智能体设置" />

#### 1.2 角色配置

可以自定义设定角色，比如设定一个博物馆导游：

<img src="./imgs/device-connection/1.2.png" class="img-center" alt="角色配置" />

```Plain Text
[角色设定]
你是{{assistant_name}}，擅长一对一的为用户讲解博物馆展品，并及时回答用户的提问。
[核心特征]

- 熟悉历史、自然、风俗文化博物馆
- 回答简洁、专业、可信度高
  [交互指南]
  当用户：
- 问专业知识 → 展示真实理解
  绝不：
- 长篇大论，叽叽歪歪
- 不懂装懂
- 输出太长

```

#### 1.3 保存配置

右上角每次保存配置，需要重启设备才生效，针对 web-demo 测试则需要断开连接，重新连接后才会生效。

<img src="./imgs/device-connection/1.3.png" class="img-center" alt="保存配置" />

#### 1.4 记忆说明

本地短期记忆：会总结每次的对话内容，并保存记录在左侧记忆框中；

无记忆：不会记录并保存；

<img src="./imgs/device-connection/1.4.png" class="img-center" alt="记忆说明" />

#### 1.5 意图识别

- LLM 意图识别：每次对话判断用户意图，并支持内置函数调用（天气、时间、新闻、音乐播放、退出、屏幕亮度和音量大小）

- 无意图识别：不支持内置函数调用

<img src="./imgs/device-connection/1.5.png" class="img-center" alt="意图识别" />

### 二、添加设备

#### 2.1 添加智能体

登陆智控台（<https://xrobo.qiniu.com/>），如果没有智能体，则添加新的智能体。

<img src="./imgs/device-connection/2.3.1.png" class="img-center" alt="登陆智控台" />

#### 2.2 绑定设备

在智能体中添加设备验证码对应的设备。

<img src="./imgs/device-connection/2.3.2.0.png" class="img-center" alt="添加设备 1" />

<img src="./imgs/device-connection/2.3.2.1.png" class="img-center" alt="添加设备 2" />

<img src="./imgs/device-connection/2.3.2.2.png" class="img-center" alt="添加设备 3" />

### 三. 重启设备

按下设备的重启按钮，重启设备。设备启动完毕后，会进入待命状态。
