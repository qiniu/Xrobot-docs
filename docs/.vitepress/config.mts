import { defineConfig } from "vitepress";
import { ChapterItems, Chapters } from "./theme/constrants/route";
import autoH1 from "./plugins/autoH1";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xrobot Docs",
  description: "A Xrobot Documentation Project",
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
      { text: "设备操作指南", link: Chapters.xrobot_device },
      { text: "API参考", link: Chapters.xrobot_api },
      { text: "FAQ", link: Chapters.xrobot_faq },
    ],
    sidebar: {
      "/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
      ...ChapterItems,
    },
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
