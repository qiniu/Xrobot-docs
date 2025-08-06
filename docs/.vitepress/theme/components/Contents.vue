<script setup lang="ts">
import { useData } from "vitepress";
import { apply_prefix } from "../utils";
import {
  ChapterItem,
  isChapter,
} from "../../../.vitepress/theme/constrants/route";

const { chapter_data = [{ text: "", link: "" }], root = true } = defineProps<{
  chapter_data: ChapterItem[];
  // root用于控制递归生成目录
  root?: boolean;
}>();

const { site } = useData();
const base = site.value.base;

console.log("chapter_data", chapter_data);

// 过滤
const items: ChapterItem[] = chapter_data.filter((sub) => {
  return !sub.goback;
});
</script>

<template>
  <div v-if="items.length === 0"><span>暂无内容</span></div>
  <div v-for="(subchapter, index) in items">
    <h3 v-if="isChapter(subchapter.link)">
      {{ chapter_data[index].text }}
    </h3>
    <a v-else :href="apply_prefix(subchapter.link, base)">{{
      subchapter.text
    }}</a>
    <ol>
      <div v-if="items.length === 0"><span>暂无内容</span></div>
      <div v-else :key="subchapter.link">
        <Contents
          v-if="isChapter(subchapter.link)"
          :root="false"
          :chapter_data="subchapter.items as ChapterItem[]"
        ></Contents>
      </div>
    </ol>
  </div>
</template>
