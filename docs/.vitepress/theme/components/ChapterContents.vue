<script setup lang="ts">
import { useData } from "vitepress";
import {
  ChapterItems,
  Chapters,
} from "../../../.vitepress/theme/constrants/route";
import Contents from "./Contents.vue";

const { chapter: chapter_root, root = true } = defineProps<{
  // 参数chapter应该是如 Chapter.xrobot_device这样的
  chapter: Chapters;
  // root用于控制递归生成目录
  root?: boolean;
}>();

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
}
</script>

<template>
  <h2 v-if="root">目录</h2>
  <slot name="header"></slot>
  <Contents :chapter_data="items" :root="true"></Contents>
</template>
