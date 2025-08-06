<script setup lang="ts">
import { useData } from "vitepress";
import {
  ChapterItems,
  Chapters,
  isChapter,
} from "../../../.vitepress/theme/constrants/route";

function apply_prefix(link: string, prefix: string) {
  if (!prefix) return link;
  if (link.startsWith("/") && prefix.endsWith("/")) {
    return prefix.slice(0, -1) + link;
  } else if (!link.startsWith("/") && !prefix.endsWith("/")) {
    return prefix + "/" + link;
  }
  return prefix + link;
}

const { chapter: chapter_root, root = true } = defineProps<{
  // 参数chapter应该是如 Chapter.xrobot_device这样的
  chapter: Chapters;
  // root用于控制递归生成目录
  root?: boolean;
}>();

const { site } = useData();
const base = site.value.base;

// console.log("contents");
let chapter_name: string[] = [];
let tocs: { link: string; text: string }[][] = [];

// console.log("chapter_root", chapter_root);
// console.log("ChapterItems[chapter_root]", ChapterItems[chapter_root]);

const items = ChapterItems[chapter_root];
if (!items) {
  const { page } = useData();
  console.warn(
    "Error at gen ChapterContents, chapter_root:",
    chapter_root,
    "filePath:",
    page.value.filePath,
    "title:",
    page.value.title
  );
} else {
  items.forEach((subchapter) => {
    // console.log(subchapter);
    const t = subchapter.items?.filter((item) => {
      return item.link !== chapter_root && !item.goback;
    });
    if (t) {
      tocs.push(t);
      chapter_name.push(subchapter.text);
    }
  });
}

// console.log("chapter_name:", chapter_name);
// console.log("tocs:", tocs);
</script>

<template>
  <h2 v-if="root">目录</h2>
  <div v-for="(subchapter, index) in tocs">
    <h3>{{ chapter_name[index] }}</h3>
    <div v-if="subchapter.length === 0"><span>暂无内容</span></div>
    <ol v-else>
      <li v-for="(item, index2) in subchapter" :key="item.link">
        <ol v-if="isChapter(item.link)">
          <ChapterContents
            :root="false"
            :chapter="item.link as Chapters"
          ></ChapterContents>
        </ol>
        <a v-else :href="apply_prefix(item.link, base)">{{ item.text }}</a>
      </li>
    </ol>
  </div>
</template>
