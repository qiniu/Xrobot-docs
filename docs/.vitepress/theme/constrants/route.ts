// todo: 增加sidebar的层次感

export type ChapterItem = {
  // 标题
  text: string;
  // 链接
  link: string;
  // 初始时是否折叠, 如果未指定，侧边栏组不可折叠
  collapsed?: boolean;
  // 子项，元素顺序影响页面、章节顺序
  items?: ChapterItem[];
  // 返回上级章节
  goback?: boolean;
};

// 章节路由，注意，首尾都要有 `/`
// 不在其中的章节不会正确生成目录
export enum Chapters {
  // xrobot 主章节
  xrobot = "/xrobot/",
  // platform
  xrobot_platform = "/xrobot/platform/",
  // api
  xrobot_api = "/xrobot/api/",
  // mcp
  xrobot_mcp = "/xrobot/mcp/",
  // guide
  xrobot_guide = "/xrobot/guide/",
  // faq
  xrobot_faq = "/xrobot/faq/",
}

// 判断一个link 字符串是否是章节link
export function isChapter<T extends Record<string, string>>(
  link: string
): link is T[keyof T] {
  return Object.values(Chapters).includes(link as Chapters);
}

export function isSubChapter(link: string) {
  const t = link.split("/").filter((p) => p !== "");
  return t.length > 1 && isChapter(link);
}

// // 给 ChapterItem 的 link 字段追加当前章节的 link 前缀
// // 通过是否包含子items来判断
// export function apply_prefix2(item: ChapterItem, prefix: Chapters) {
//   if (item.items) {
//     return item.items.map((item2) => {
//       apply_prefix2(item2, item.link as Chapters);
//     });
//   } else {
//     return apply_prefix(item, prefix);
//   }
// }

// 给 ChapterItem 的 link 字段追加当前章节的 link 前缀
export function apply_prefix(item: ChapterItem, prefix: Chapters) {
  // // 包含子章节
  // if (item.items && isChapter(item.link))
  //   return item.items.map((item2) =>
  //     apply_prefix(item2, item.link as Chapters)
  //   );

  if (item?.link.startsWith("/") && prefix.endsWith("/")) {
    return { ...item, link: prefix.slice(0, -1) + item.link };
  } else if (!item.link.startsWith("/") && !prefix.endsWith("/")) {
    return { ...item, link: prefix + "/" + item.link };
  }
  return { ...item, link: prefix + item.link };
}

const items_xrobot_platform = [
  {
    text: "设备接入协议",
    link: Chapters.xrobot_platform,
    collapsed: true,
    items: [
      { text: "OTA", link: "OTA" },
      { text: "websocket", link: "websocket" },
      { text: "MQTT", link: "MQTT" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_platform)),
  },
];

const items_xrobot_api = [
  {
    text: "平台API",
    collapsed: true,
    link: Chapters.xrobot_api,
    items: [
      { text: "用户API", link: "user" },
      { text: "智能体API", link: "agent" },
      { text: "设备API", link: "device" },
      { text: "音色克隆API", link: "voice-clone" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_api)),
  },
];

const items_xrobot_mcp = [
  {
    text: "MCP接入",
    collapsed: true,
    link: Chapters.xrobot_mcp,
    items: [
      // { text: "硬件MCP", link: "hardware-mcp" },
      // { text: "软件MCP", link: "software-mcp" },
    ].map((item) =>
      apply_prefix(item, Chapters.xrobot_mcp)
    ),
  },
];

// 设备接入指南
const items_xrobot_guide = [
  {
    text: "最佳实践",
    link: Chapters.xrobot_guide,
    collapsed: true,
    items: [
      { text: "快速入门", link: "quick-start" },
      { text: "开源小智固件接入", link: "xiaozhi-firmware" },
      { text: "开源小智硬件接入", link: "xiaozhi-hardware" },
      { text: "平台小程序接入", link: "platform-mp" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_guide)),
  },
];

const items_xrobot_faq = [
  {
    text: "常见问题",
    link: Chapters.xrobot_faq,
    collapsed: true,
    items: [{ text: "FAQ", link: "faq" }].map((item) =>
      apply_prefix(item, Chapters.xrobot_faq)
    ),
  },
];

// xrobot章节整体
const items_xrobot = [
  {
    text: "",
    link: Chapters.xrobot,
    // collapsed: false,
    items: [
      ...items_xrobot_platform,
      ...items_xrobot_api,
      ...items_xrobot_mcp,
      ...items_xrobot_guide,
      ...items_xrobot_faq,
    ],
  },
];

function gobackItem(chapter: Chapters) {
  return {
    text: "< 返回上级",
    link: chapter,
    goback: true,
  };
}

export const ChapterItems: Record<Chapters, ChapterItem[]> = {
  // main
  [Chapters.xrobot]: items_xrobot,
  // platform
  [Chapters.xrobot_platform]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_platform,
  ],
  // api
  [Chapters.xrobot_api]: [gobackItem(Chapters.xrobot), ...items_xrobot_api],
  // mcp
  [Chapters.xrobot_mcp]: [gobackItem(Chapters.xrobot), ...items_xrobot_mcp],
  // guide
  [Chapters.xrobot_guide]: [gobackItem(Chapters.xrobot), ...items_xrobot_guide],
  // platform - others END
  // faq
  [Chapters.xrobot_faq]: [gobackItem(Chapters.xrobot), ...items_xrobot_faq],
};

// 获得章节items, 所有level~maxLevel层级的章节
export function getChapterItems(
  level?: 1 | 2 | 3 | 4 | 5,
  maxLevel?: 1 | 2 | 3 | 4 | 5
) {
  const _level = level ?? 1;
  const _maxLevel = maxLevel ?? 6;
  // 满足条件的ChapterItems的key
  const chap = Object.values(Chapters).filter((ch) => {
    const len = ch.split("/").filter((p) => p !== "").length;
    return _level <= len && len <= _maxLevel;
  });

  let res = {};
  chap.forEach((ch) => {
    res[ch] = ChapterItems[ch];
  });
  return res;
}
