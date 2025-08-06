---
title: 通过微信小程序
---

<script setup>
import { Chapters, ChapterItems } from "../../../../.vitepress/theme/constrants/route";
import { apply_prefix } from "../../../../.vitepress/theme/utils";
import { useData } from "vitepress";

const { site } = useData();
const base = site.value.base;

const chapter_root = Chapters.xrobot_guide_xiaozhi_hardware;
const mp_net_config_link = ChapterItems[chapter_root].filter(item => item.link === chapter_root)[0].items.filter(item => item.link.endsWith("net-config"))[0].link;
</script>

参考 <a :href="apply_prefix(mp_net_config_link, base)">微信小程序-设备配网</a>
