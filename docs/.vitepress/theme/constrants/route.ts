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
  xrobot_api_server = "/xrobot/api/server/",
  // xrobot_api_client = "/xrobot/api/client/",
  // mcp
  xrobot_mcp = "/xrobot/mcp/",
  // guide
  xrobot_guide = "/xrobot/guide/",
  xrobot_guide_quick_start = "/xrobot/guide/quick-start/",
  xrobot_guide_quick_start_net_config = "/xrobot/guide/quick-start/net-config/",
  xrobot_guide_xiaozhi_firmware = "/xrobot/guide/xiaozhi-firmware/",
  xrobot_guide_xiaozhi_hardware = "/xrobot/guide/xiaozhi-hardware/",
  xrobot_guide_platform_mp = "/xrobot/guide/platform-mp/",
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
    collapsed: false,
    items: [
      { text: "OTA", link: "OTA" },
      { text: "websocket", link: "websocket" },
      { text: "MQTT", link: "MQTT" },
    ].map((item) => apply_prefix(item, Chapters.xrobot_platform)),
  },
];

const items_xrobot_api_server = [
  {
    text: "服务端 API",
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

// const items_xrobot_api_client = [
//   {
//     text: "设备接入协议",
//     collapsed: true,
//     link: Chapters.xrobot_api_client,
//     items: [].map((item) => apply_prefix(item, Chapters.xrobot_api_client)),
//   },
// ];

const items_xrobot_api = [
  {
    text: "平台API",
    collapsed: false,
    link: Chapters.xrobot_api,
    items: [
      ...items_xrobot_api_server,
      // ...items_xrobot_api_client,
    ],
  },
];

const items_xrobot_mcp = [
  {
    text: "MCP接入",
    collapsed: false,
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
const items_xrobot_platform_net_config = [
  {
    text: "配网",
    link: Chapters.xrobot_guide_quick_start_net_config,
    collapsed: true,
    items: [
      { text: "通过微信小程序", link: "mp" },
      { text: "通过浏览器", link: "browser" },
    ].map((item) =>
      apply_prefix(item, Chapters.xrobot_guide_quick_start_net_config)
    ),
  },
];

const items_xrobot_guide_quick_start = [
  {
    text: "快速入门",
    link: Chapters.xrobot_guide_quick_start,
    collapsed: false,
    items: [
      ...[{ text: "设备基本配置流程说明", link: "device-intro" }].map((item) =>
        apply_prefix(item, Chapters.xrobot_guide_quick_start)
      ),
      ...items_xrobot_platform_net_config,
      ...[
        { text: "智能体连接指南", link: "device-connection" },
      ].map((item) =>
        apply_prefix(item, Chapters.xrobot_guide_quick_start)
      ),
    ]
  },
];

const items_xrobot_guide_xiaozhi_firmware = [
  {
    text: "小智固件接入",
    link: Chapters.xrobot_guide_xiaozhi_firmware,
    collapsed: true,
    items: [
      ...[
        { text: "灵矽 固件 & 服务", link: "lingxi-service" },
        { text: "编译小智固件", link: "firmware-compilation" },
        { text: "烧录固件", link: "flashing" },
        { text: "设备绑定", link: "device-bind" },
      ].map((item) =>
        apply_prefix(item, Chapters.xrobot_guide_xiaozhi_firmware)
      ),
      ...items_xrobot_guide_quick_start.flatMap((item) => ({
        text: item.text,
        link: item.link,
      })),
    ],
  },
];

const items_xrobot_guide_xiaozhi_hardware = [
  {
    text: "小智硬件接入",
    link: Chapters.xrobot_guide_xiaozhi_hardware,
    collapsed: true,
    items: [
      { text: "智能体管理", link: "agent-management" },
      { text: "角色配置", link: "role-config" },
      { text: "设备管理", link: "device-management" },
      { text: "设备配网", link: "device-net-config" },
    ].map((item) =>
      apply_prefix(item, Chapters.xrobot_guide_xiaozhi_hardware)
    ),
  },
];
const items_xrobot_guide_platform_mp = [
  {
    text: "平台小程序接入",
    link: Chapters.xrobot_guide_platform_mp,
    collapsed: true,
    items: [].map((item) =>
      apply_prefix(item, Chapters.xrobot_guide_platform_mp)
    ),
  },
];

const items_xrobot_guide = [
  {
    text: "最佳实践",
    link: Chapters.xrobot_guide,
    collapsed: false,
    items: [
      ...items_xrobot_guide_quick_start,
      ...items_xrobot_guide_xiaozhi_firmware,
      ...items_xrobot_guide_xiaozhi_hardware,
      ...items_xrobot_guide_platform_mp,
    ],
    // .map((item) => apply_prefix(item, Chapters.xrobot_guide)),
  },
];

const items_xrobot_faq = [
  {
    text: "常见问题",
    link: Chapters.xrobot_faq,
    collapsed: false,
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
  [Chapters.xrobot_api_server]: [
    gobackItem(Chapters.xrobot_api),
    ...items_xrobot_api_server,
  ],
  // mcp
  [Chapters.xrobot_mcp]: [gobackItem(Chapters.xrobot), ...items_xrobot_mcp],
  // [Chapters.xrobot_api_client]: [
  //   gobackItem(Chapters.xrobot_api),
  //   ...items_xrobot_api_client,
  // ],
  // guide
  [Chapters.xrobot_guide]: [gobackItem(Chapters.xrobot), ...items_xrobot_guide],
  [Chapters.xrobot_guide_quick_start]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_guide_quick_start,
  ],
  [Chapters.xrobot_guide_quick_start_net_config]: [
    gobackItem(Chapters.xrobot_guide_quick_start),
    ...items_xrobot_platform_net_config,
  ],
  [Chapters.xrobot_guide_xiaozhi_firmware]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_guide_xiaozhi_firmware,
  ],
  [Chapters.xrobot_guide_xiaozhi_hardware]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_guide_xiaozhi_hardware,
  ],
  [Chapters.xrobot_guide_platform_mp]: [
    gobackItem(Chapters.xrobot),
    ...items_xrobot_guide_platform_mp,
  ],
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
