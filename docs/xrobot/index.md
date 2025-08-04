<script setup>
import { Chapters } from "../.vitepress/theme/constrants/route";

const chapter_root = Chapters.xrobot;
</script>

<ChapterContents :chapter=chapter_root />
