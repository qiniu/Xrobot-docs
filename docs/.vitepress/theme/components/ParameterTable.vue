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
        <code class="param-name">{{ param.name }}</code>
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
        v-if="param.children && param.children.length > 0"
        :parameters="param.children"
        :level="(param.level || 0) + 1"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { type Parameter } from "../types/api"; // Adjust path as needed

interface ParameterTableProps {
  parameters: Parameter[];
  level?: number;
}

withDefaults(defineProps<ParameterTableProps>(), {
  level: 0,
});
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
