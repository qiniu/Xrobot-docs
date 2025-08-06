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
  base: "/Xrobot-docs/",
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
      { text: "开发文档", link: Chapters.xrobot },
      { text: "API", link: Chapters.xrobot_api },
      { text: "最佳实践", link: Chapters.xrobot_guide },
      { text: "FAQ", link: Chapters.xrobot_faq },
    ],
    sidebar: sidebarItems,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/qiniu/Xrobot-docs",
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
