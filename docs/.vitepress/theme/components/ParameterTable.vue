<template>
  <div class="parameter-table-container">
    <!-- 只有顶层表格才显示表头 -->
    <div class="table-header" v-if="level === 0">
      <span>参数名</span>
      <span>类型</span>
      <span>必填</span>
      <span>位置</span>
      <span>说明</span>
    </div>
    <template
      v-for="param in parameters"
      :key="param.name + (param.level || 0)"
    >
      <div
        class="table-row"
        :style="{ paddingLeft: (param.level || 0) * 20 + 12 + 'px' }"
      >
        <div class="param-name-wrapper">
          <!-- 展开/折叠按钮 -->
          <button
            v-if="param.children && param.children.length > 0"
            class="expand-btn"
            @click="toggleExpand(param.name)"
            :aria-label="isExpanded(param.name) ? '折叠' : '展开'"
          >
            <svg
              :class="{ rotated: isExpanded(param.name) }"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <code class="param-name">{{ param.name }}</code>
        </div>
        <span class="param-type">{{ param.type }}</span>
        <span
          :class="['param-required', param.required ? 'required' : 'optional']"
        >
          {{ param.required ? "是" : "否" }}
        </span>
        <span class="param-in">{{ param.in || "-" }}</span>
        <span class="param-description">{{ param.description }}</span>
      </div>
      <!-- 递归渲染子参数 -->
      <ParameterTable
        v-if="param.children && param.children.length > 0 && isExpanded(param.name)"
        :parameters="param.children"
        :level="(param.level || 0) + 1"
        :expanded-params="expandedParams"
        @update:expanded-params="$emit('update:expandedParams', $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Parameter } from "../types/api";

interface ParameterTableProps {
  parameters: Parameter[];
  level?: number;
  expandedParams: Set<string>;
}

const props = withDefaults(defineProps<ParameterTableProps>(), {
  level: 0,
  expandedParams: () => new Set(),
});

const emit = defineEmits<{
  (e: 'update:expandedParams', value: Set<string>): void;
}>();

// 检查是否展开
const isExpanded = (name: string) => props.expandedParams.has(name);

// 切换展开状态
const toggleExpand = (name: string) => {
  const newSet = new Set(props.expandedParams);
  if (newSet.has(name)) {
    newSet.delete(name);
  } else {
    newSet.add(name);
  }
  emit('update:expandedParams', newSet);
};
</script>

<style scoped>
.parameter-table-container {
  /* No border here, border will be on the parent .params-table */
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.5fr 0.5fr 2fr; /* 调整列宽 */
  background: var(--vp-c-bg-soft);
  padding: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-border);
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.5fr 0.5fr 2fr; /* 调整列宽 */
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-border);
  align-items: center;
  background-color: var(--vp-c-bg); /* 确保背景色与VitePress主题一致 */
}

.table-row:last-child {
  border-bottom: none;
}

/* Indentation for nested parameters */
.table-row .param-name {
  /* No specific style here, padding-left on the row handles it */
}

/* 参数名包装器，包含展开按钮 */
.param-name-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 展开/折叠按钮 - 与 ApiEndpoint.vue 保持一致 */
.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-3);
  transition: color 0.2s;
}

.expand-btn:hover {
  color: var(--vp-c-text-1);
}

.expand-btn svg {
  transition: transform 0.3s ease-out;
  transform: rotate(0deg);
}

.expand-btn svg.rotated {
  transform: rotate(90deg);
}

/* Inherit styles from ApiEndpoint.vue for consistency */
.param-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  word-break: break-all;
  justify-self: start;
}

.param-type {
  color: var(--vp-c-text-2);
  font-size: 13px;
  word-break: break-all;
}

.param-required.required {
  color: #ef4444;
  font-weight: 500;
}

.param-required.optional {
  color: var(--vp-c-text-3);
}

.param-in {
  color: var(--vp-c-text-2);
  font-size: 13px;
  text-transform: capitalize; /* 首字母大写 */
}

.param-description {
  color: var(--vp-c-text-2);
  font-size: 14px;
  word-break: break-all;
}

/* Responsive adjustments for ParameterTable */
@media (max-width: 768px) {
  .table-header {
    display: none;
  }
  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
    display: block;
    padding: 16px 12px;
  }
  .table-row > * {
    display: block;
    margin-bottom: 4px;
  }
  .param-name::before {
    content: "参数名: ";
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
  .param-type::before {
    content: "类型: ";
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
  .param-required::before {
    content: "必填: ";
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
  .param-in::before {
    content: "位置: ";
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
  .param-description::before {
    content: "说明: ";
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
}
</style>
