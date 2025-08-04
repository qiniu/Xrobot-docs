<script setup lang="ts">
import {
  ChapterItems,
  Chapters,
  isChapter,
} from "../../../.vitepress/theme/constrants/route";

const { chapter: chapter_root, root = true } = defineProps<{
  // 参数chapter应该是如 Chapter.xrobot_device这样的
  chapter: Chapters;
  // root用于控制递归生成目录
  root?: boolean;
}>();

// console.log("contents");
let chapter_name: string[] = [];
let tocs: { link: string; text: string }[][] = [];

// console.log(chapter_root);

ChapterItems[chapter_root]?.forEach((subchapter) => {
  const t = subchapter.items?.filter((item) => {
    return item.link !== chapter_root && !item.goback;
  });
  if (t) {
    tocs.push(t);
    chapter_name.push(subchapter.text);
  }
});

// console.log("chapter_name:", chapter_name);
// console.log("tocs:", tocs);
</script>

<template>
  <h1 v-if="root">目录</h1>
  <div v-for="(subchapter, index) in tocs">
    <h2>{{ chapter_name[index] }}</h2>
    <ol>
      <li v-for="(item, index2) in subchapter" :key="item.link">
        <ol v-if="isChapter(item.link)">
          <ChapterContents
            :root="false"
            :chapter="item.link as Chapters"
          ></ChapterContents>
        </ol>
        <a v-else :href="item.link">{{ item.text }}</a>
      </li>
    </ol>
  </div>
</template>
