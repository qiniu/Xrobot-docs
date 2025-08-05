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
  // api
  xrobot_api = "/xrobot/api/",
  xrobot_api_server = "/xrobot/api/server/",
  // xrobot_api_client = "/xrobot/api/client/",
  xrobot_api_protocol = "/xrobot/api/protocol/",
  // platform
  xrobot_platform = "/xrobot/platform/",
  xrobot_platform_esp32 = "/xrobot/platform/esp32/",
  xrobot_platform_others = "/xrobot/platform/others/",
  xrobot_platform_others_mp = "/xrobot/platform/others/mini-program/",
  xrobot_platform_others_console = "/xrobot/platform/others/console/",
  xrobot_platform_others_device = "/xrobot/platform/others/device/",
  xrobot_platform_others_device_net_config = "/xrobot/platform/others/net-config/",
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
    text: "平台接入API",
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

// export const items_xrobot_api_client = [
//   {
//     text: "设备接入协议",
//     collapsed: true,
//     link: Chapters.xrobot_api_client,
//     items: [].map((item) => apply_prefix(item, Chapters.xrobot_api_client)),
//   },
// ];

export const items_xrobot_api_protocol = [
  {
    text: "设备接入协议",
    collapsed: true,
    link: Chapters.xrobot_api_protocol,
    items: [
      { text: "WebSocket 协议", link: "websocket" },
      { text: "MQTT 协议", link: "MQTT" },
      { text: "OTA协议", link: "OTA" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_api_protocol)),
  },
];

export const items_xrobot_api = [
  {
    text: "API参考",
    // collapsed: false,
    link: Chapters.xrobot_api,
    items: [
      ...items_xrobot_api_server,
      // ...items_xrobot_api_client,
      ...items_xrobot_api_protocol,
    ],
  },
];

export const items_xrobot_platform_mp = [
  {
    text: "微信小程序",
    link: Chapters.xrobot_platform_others_mp,
    collapsed: true,
    items: [
      { text: "智能体管理", link: "agent-management" },
      { text: "角色配置", link: "role-config" },
      { text: "设备管理", link: "device-management" },
      { text: "设备配网", link: "device-net-config" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_platform_others_mp)),
  },
];

const items_xrobot_platform_net_config = [
  {
    text: "配网",
    link: Chapters.xrobot_platform_others_device_net_config,
    collapsed: true,
    items: [
      { text: "通过微信小程序", link: "mp" },
      { text: "通过浏览器", link: "browser" },
    ].map((item) =>
      apply_prefix(item, Chapters.xrobot_platform_others_device_net_config)
    ),
  },
];

export const items_xrobot_platform_device = [
  {
    text: "设备配置与使用",
    link: Chapters.xrobot_platform_others_device,
    collapsed: true,
    items: [
      ...[{ text: "设备基本配置流程说明", link: "device-intro" }].map((item) =>
        apply_prefix(item, Chapters.xrobot_platform_others_device)
      ),
      ...items_xrobot_platform_net_config,
    ],
  },
];

const items_xrobot_platform_console = [
  {
    text: "控制台（智控台）",
    link: Chapters.xrobot_platform_others_console,
    collapsed: true,
    items: [
      // { text: "基本介绍", link: "intro" },
      { text: "智能体连接指南", link: "device-connection" },
      { text: "设备绑定", link: "device-bind" },
    ].map((item) =>
      apply_prefix(item, Chapters.xrobot_platform_others_console)
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
    link: Chapters.xrobot_platform_others,
    collapsed: true,
    items: [
      ...items_xrobot_platform_device,
      ...items_xrobot_platform_mp,
      ...items_xrobot_platform_console,
    ],
  },
];

const items_xrobot_platform = [
  {
    text: "最佳实践",
    link: Chapters.xrobot_platform,
    // collapsed: false,
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
  // [Chapters.xrobot_api_client]: [
  //   gobackItem(Chapters.xrobot_api),
  //   ...items_xrobot_api_client,
  // ],
  [Chapters.xrobot_api_protocol]: [
    gobackItem(Chapters.xrobot_api),
    ...items_xrobot_api_protocol,
  ],
  // guide
  [Chapters.xrobot_guide]: [gobackItem(Chapters.xrobot), ...items_xrobot_guide],
  // platform
  [Chapters.xrobot_platform]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_platform,
  ],
  // - esp32
  [Chapters.xrobot_platform_esp32]: [
    gobackItem(Chapters.xrobot_platform),
    ...items_xrobot_platform_esp32,
  ],
  // - others
  [Chapters.xrobot_platform_others]: [
    gobackItem(Chapters.xrobot_platform),
    ...items_xrobot_platform_others,
  ],
  [Chapters.xrobot_platform_others_mp]: [
    gobackItem(Chapters.xrobot_platform_others),
    ...items_xrobot_platform_mp,
  ],
  [Chapters.xrobot_platform_others_device]: [
    gobackItem(Chapters.xrobot_platform_others),
    ...items_xrobot_platform_device,
  ],
  [Chapters.xrobot_platform_others_console]: [
    gobackItem(Chapters.xrobot_platform_others),
    ...items_xrobot_platform_console,
  ],
  [Chapters.xrobot_platform_others_device_net_config]: [
    gobackItem(Chapters.xrobot_platform_others),
    ...items_xrobot_platform_net_config,
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
