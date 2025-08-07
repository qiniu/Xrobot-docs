<script setup>
import DefaultTheme from "vitepress/theme";
import SearchBox from "./components/SearchBox.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <!-- <template #not-found> 404 not-found </template> -->
    <!-- <template #home-hero-image>  </template> -->
    <template #home-hero-after>
      <SearchBox></SearchBox>
    </template>
  </Layout>
</template>
