<script setup>
import DefaultTheme from "vitepress/theme";
import SearchBox from "./components/SearchBox.vue";
import FaviconText from "./components/FaviconText.vue";
import { useData } from "vitepress";
import { apply_prefix } from "./utils";

const { Layout } = DefaultTheme;

const { site } = useData();
const base = site.value.base;

const home = apply_prefix("/", base);
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <a :href="home">
        <FaviconText class="favicon"></FaviconText>
      </a>
      <span>&nbsp;</span>
    </template>
    <!-- <template #not-found> 404 not-found </template> -->
    <!-- <template #home-hero-image>  </template> -->
    <template #home-hero-after>
      <SearchBox></SearchBox>
    </template>
  </Layout>
</template>

<style>
.favicon {
  height: 50%;
}
.VPNavBarTitle span {
  /* size: fit-content; */
}
</style>
