// import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { Chapters, getChapterItems } from "./theme/constrants/route";
import autoH1 from "./plugins/autoH1";

// 限制sidebar最多深入两层章节
const sidebarItems = getChapterItems(1, 2);

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: "zh",
  title: "灵矽文档中心",
  description: "A 灵矽 Documentation Project",
  lastUpdated: true,
  cleanUrls: true,
  base: "/docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],
    nav: [
      { text: "灵矽官网", link: "https://xiaoling.qiniu.com/" },
      { text: "主页", link: "/" },
      { text: "设备接入协议", link: Chapters.xrobot_platform },
      { text: "API", link: Chapters.xrobot_api },
      { text: "MCP接入", link: Chapters.xrobot_mcp },
      { text: "最佳实践", link: Chapters.xrobot_guide },
      { text: "FAQ", link: Chapters.xrobot_faq + "faq/" },
    ],
    sidebar: sidebarItems,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/qiniu/Xrobot-docs",
      },
    ],
    search: {
      provider: "local",
    },
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
