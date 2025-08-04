export type ChapterItem = {
  // 标题
  text: string;
  // 链接
  link: string;
  // 初始时是否折叠, 如果未指定，侧边栏组不可折叠
  collapsed?: boolean;
  // 子项
  items?: ChapterItem[];
  // 返回上级章节
  goback?: boolean;
};

// 章节路由，注意，首尾都要有 `/`
// 不在其中的章节不会正确生成目录
export enum Chapters {
  // xrobot 分章
  xrobot = "/xrobot/",
  xrobot_device = "/xrobot/device/",
  xrobot_api = "/xrobot/api/",
  xrobot_faq = "/xrobot/faq/",
  xrobot_guide = "/xrobot/guide",
  xrobot_guide_mp = "/xrobot/guide/mini-program",
}

// 判断一个link 字符串是否是章节link
export function isChapter<T extends Record<string, string>>(
  link: string
): link is T[keyof T] {
  return Object.values(Chapters).includes(link as Chapters);
}

// 给 ChapterItem 的 link 字段追加当前章节的 link 前缀
function apply_prefix(item: ChapterItem, prefix: Chapters) {
  if (item?.link.startsWith("/") && prefix.endsWith("/")) {
    return { ...item, link: prefix.slice(0, -1) + item.link };
  } else if (!item.link.startsWith("/") && !prefix.endsWith("/")) {
    return { ...item, link: prefix + "/" + item.link };
  }
  return { ...item, link: prefix + item.link };
}

const items_xrobot_api = [
  {
    text: "API参考",
    items: [
      { text: "用户API", link: "user" },
      { text: "智能体API", link: "agent" },
      { text: "设备API", link: "device" },
      { text: "音色克隆API", link: "voice-clone" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_api)),
    collapsed: false,
    link: Chapters.xrobot_api,
  },
];

const items_xrobot_device = [
  {
    text: "设备指南",
    items: [
      { text: "设备使用指南", link: "device-intro" },
      { text: "设备绑定", link: "device-bind" },
      { text: "设备服务通信协议", link: "device-protocol" },
      { text: "智能体连接指南", link: "device-connection" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_device)),
    link: Chapters.xrobot_device,
    collapsed: false,
  },
  // 子章节
];

const items_xrobot_faq = [
  {
    text: "常见问题",
    items: [{ text: "FAQ", link: "faq" }].map((item) =>
      apply_prefix(item, Chapters.xrobot_faq)
    ),
    link: Chapters.xrobot_faq,
    collapsed: false,
  },
  // 子章节
];

const items_xrobot_guide_mp = [
  {
    text: "微信小程序",
    link: Chapters.xrobot_guide_mp,
    collapsed: true,
    items: [
      { text: "智能体管理", link: "agent-management" },
      { text: "角色配置", link: "role-config" },
      { text: "设备管理", link: "device-management" },
      { text: "设备配网", link: "device-net-config" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_guide_mp)),
  },
];

const items_xrobot_guide = [
  {
    text: "操作指南",
    link: Chapters.xrobot_guide,
    collapsed: false,
    items: [...items_xrobot_guide_mp],
  },
];

// xrobot章节整体
const items_xrobot = [
  {
    text: "Xrobot",
    items: [
      ...items_xrobot_api,
      ...items_xrobot_device,
      ...items_xrobot_faq,
      ...items_xrobot_guide,
    ],
    link: Chapters.xrobot,
    collapsed: false,
  },
];

function gobackItem(chapter: Chapters) {
  return {
    text: "返回上级",
    link: chapter,
    goback: true,
  };
}

// todo: 把子章节从ChapterItems中抽离出来
export const ChapterItems: Record<Chapters, ChapterItem[]> = {
  [Chapters.xrobot]: items_xrobot,
  [Chapters.xrobot_device]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_device,
  ],
  [Chapters.xrobot_api]: [gobackItem(Chapters.xrobot), ...items_xrobot_api],
  [Chapters.xrobot_faq]: [gobackItem(Chapters.xrobot), ...items_xrobot_faq],
  [Chapters.xrobot_guide]: [gobackItem(Chapters.xrobot), ...items_xrobot_guide],
  [Chapters.xrobot_guide_mp]: [
    gobackItem(Chapters.xrobot_guide),
    ...items_xrobot_guide_mp,
  ],
};
