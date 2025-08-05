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
  // guide
  xrobot_guide = "/xrobot/guide/",
  xrobot_guide_mp = "/xrobot/guide/mini-program/",
  xrobot_guide_device = "/xrobot/guide/device/",
  xrobot_guide_console = "/xrobot/guide/console/",
  xrobot_guide_net_config = "/xrobot/guide/net-config/",
  // api
  xrobot_api = "/xrobot/api/",
  xrobot_api_server = "/xrobot/api/server/",
  xrobot_api_client = "/xrobot/api/client/",
  xrobot_api_protocol = "/xrobot/api/protocol/",
  // platform
  xrobot_platform = "/xrobot/platform/",
  xrobot_platform_esp32 = "/xrobot/platform/esp32/",
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

export const items_xrobot_api_server = [
  {
    text: "服务端API参考",
    collapsed: true,
    link: Chapters.xrobot_api_server,
    items: [
      { text: "用户API", link: "user" },
      { text: "智能体API", link: "agent" },
      { text: "设备API", link: "device" },
      { text: "音色克隆API", link: "voice-clone" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_api_server)),
  },
];

export const items_xrobot_api_client = [
  {
    text: "客户端API参考",
    collapsed: true,
    link: Chapters.xrobot_api_client,
    items: [].map((item) => apply_prefix(item, Chapters.xrobot_api_client)),
  },
];

export const items_xrobot_api_protocol = [
  {
    text: "WebSocket API参考",
    collapsed: true,
    link: Chapters.xrobot_api_protocol,
    items: [{ text: "服务通信协议", link: "device-protocol" }].map((item) =>
      apply_prefix(item, Chapters.xrobot_api_protocol)
    ),
  },
];

export const items_xrobot_api = [
  {
    text: "API参考",
    collapsed: false,
    link: Chapters.xrobot_api,
    items: [
      ...items_xrobot_api_server,
      ...items_xrobot_api_client,
      ...items_xrobot_api_protocol,
    ],
  },
];

export const items_xrobot_guide_mp = [
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

export const items_xrobot_guide_device = [
  {
    text: "设备配置与使用",
    link: Chapters.xrobot_guide_device,
    collapsed: true,
    items: [
      { text: "使用指南", link: "device-intro" },
      { text: "绑定", link: "device-bind" },
      { text: "智能体连接指南", link: "device-connection" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_guide_device)),
  },
];

const items_xrobot_guide_console = [
  {
    text: "控制台（智控台）",
    link: Chapters.xrobot_guide_console,
    collapsed: true,
    items: [{ text: "example", link: "" }].map((item) =>
      apply_prefix(item, Chapters.xrobot_guide_console)
    ),
  },
];

const items_xrobot_guide_net_config = [
  {
    text: "配网",
    link: Chapters.xrobot_guide_net_config,
    collapsed: true,
    items: [{ text: "通过微信小程序", link: "mp" }].map((item) =>
      apply_prefix(item, Chapters.xrobot_guide_net_config)
    ),
  },
];

export const items_xrobot_guide = [];

const items_xrobot_platform_esp32 = [
  {
    text: "小智接入指南 (ESP32)",
    link: Chapters.xrobot_platform_esp32,
    collapsed: true,
    items: [
      { text: "esp32-s3", link: "S3" },
      { text: "esp32-c3", link: "C3" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_platform_esp32)),
  },
];

// todo: 调整guide内容位置
const items_xrobot_platform_others = [
  {
    text: "厂商接入指南",
    link: Chapters.xrobot_guide,
    collapsed: true,
    items: [
      ...items_xrobot_guide_mp,
      ...items_xrobot_guide_device,
      ...items_xrobot_guide_console,
      ...items_xrobot_guide_net_config,
    ],
  },
];

const items_xrobot_platform = [
  {
    text: "最佳实践",
    link: Chapters.xrobot_platform,
    collapsed: false,
    items: [...items_xrobot_platform_esp32, ...items_xrobot_platform_others],
  },
];

const items_xrobot_faq = [
  {
    text: "常见问题",
    link: Chapters.xrobot_faq,
    // collapsed: false,
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
      ...items_xrobot_guide,
      ...items_xrobot_api,
      ...items_xrobot_platform,
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
  // api
  [Chapters.xrobot_api]: [gobackItem(Chapters.xrobot), ...items_xrobot_api],
  [Chapters.xrobot_api_server]: [
    gobackItem(Chapters.xrobot_api),
    ...items_xrobot_api_server,
  ],
  [Chapters.xrobot_api_client]: [
    gobackItem(Chapters.xrobot_api),
    ...items_xrobot_api_client,
  ],
  [Chapters.xrobot_api_protocol]: [
    gobackItem(Chapters.xrobot_api),
    ...items_xrobot_api_protocol,
  ],
  // guide
  [Chapters.xrobot_guide]: [gobackItem(Chapters.xrobot), ...items_xrobot_guide],
  [Chapters.xrobot_guide_mp]: [
    gobackItem(Chapters.xrobot_guide),
    ...items_xrobot_guide_mp,
  ],
  [Chapters.xrobot_guide_device]: [
    gobackItem(Chapters.xrobot_guide),
    ...items_xrobot_guide_device,
  ],
  [Chapters.xrobot_guide_console]: [
    gobackItem(Chapters.xrobot_guide),
    ...items_xrobot_guide_console,
  ],
  [Chapters.xrobot_guide_net_config]: [
    gobackItem(Chapters.xrobot_guide),
    ...items_xrobot_guide_net_config,
  ],
  // platform
  [Chapters.xrobot_platform]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_platform,
  ],
  [Chapters.xrobot_platform_esp32]: [
    gobackItem(Chapters.xrobot_platform),
    ...items_xrobot_platform_esp32,
  ],
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
