import { defineConfig } from "vitepress";
import { Chapters, getChapterItems } from "./theme/constrants/route";
import autoH1 from "./plugins/autoH1";

// 限制sidebar最多深入两层章节
const sidebarItems = getChapterItems(1, 2);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "灵矽文档中心",
  description: "A 灵矽 Documentation Project",
  lastUpdated: true,
  cleanUrls: true,
  locales: {
    root: {
      label: "简体中文",
      lang: "cn",
    },
    // en: {
    //   label: "English",
    //   lang: "en",
    // },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],
    nav: [
      { text: "主页", link: "/" },
      { text: "设备操作指南", link: Chapters.xrobot_guide_device },
      { text: "API参考", link: Chapters.xrobot_api },
      { text: "FAQ", link: Chapters.xrobot_faq },
    ],
    sidebar: sidebarItems,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/realdream-ai/xrobot-miniprogram",
      },
    ],
  },
  markdown: {
    toc: {
      level: [1, 2, 3, 4],
    },
    config: (md) => {
      md.use(autoH1);
    },
  },
});
