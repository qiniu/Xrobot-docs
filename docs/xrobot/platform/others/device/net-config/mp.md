---
title: 通过微信小程序
---

<script setup>
import { Chapters, ChapterItems } from "../../../../../.vitepress/theme/constrants/route";

const chapter_root = Chapters.xrobot_platform_others_mp;
const mp_net_config_link = ChapterItems[chapter_root].filter(item => item.link === chapter_root)[0].items.filter(item => item.link.endsWith("net-config"))[0].link;
</script>

参考 <a :href="mp_net_config_link">微信小程序-设备配网</a>
