<!-- .vitepress/theme/components/SearchBox.vue -->
<template>
  <div class="custom-search">
    <button
      ref="searchButton"
      class="search-button"
      @click="openSearch"
      aria-label="搜索文档"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="M21 21l-4.35-4.35"></path>
      </svg>
      <span class="DocSearch-Button-Placeholder">搜索文档...</span>
    </button>
  </div>
</template>

<script setup>
const openSearch = async () => {
  const ele = document.getElementById("local-search").querySelector("button");
  console.log("search", ele);
  ele.click();
};
</script>

<style scoped>
.custom-search {
  max-width: 580px;
  width: 100%;
  margin: 0 auto 32px;
  padding: 0 24px;
}

.search-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: var(--vp-shadow-1);
  text-align: left;
}

.search-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
  box-shadow: var(--vp-shadow-2);
}

.search-button:active {
  transform: translateY(1px);
}

.search-button svg {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  color: var(--vp-c-text-2);
  transition: color 0.25s ease;
}

.search-button:hover svg {
  color: var(--vp-c-brand);
}

.search-button span {
  font-size: 15px;
  color: var(--vp-c-text-2);
  transition: color 0.25s ease;
}

.search-button:hover span {
  color: var(--vp-c-text-1);
}

/* 在首页的特殊样式 */
.VPHero.has-image .custom-search {
  margin-top: 24px;
  margin-bottom: 48px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .custom-search {
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .search-button {
    padding: 8px 14px;
  }

  .search-button span {
    font-size: 14px;
  }
}
</style>
