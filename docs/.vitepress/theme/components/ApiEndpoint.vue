<template>
  <div class="api-endpoint">
    <!-- API基本信息 (始终可见，点击可折叠/展开详情) -->
    <div class="api-header">
      <h3 v-if="title" class="api-title">{{ title }}</h3>
      <p v-if="description" class="api-description">{{ description }}</p>
      <div class="api-method-url">
        <span :class="['method-badge', methodClass]">{{
          method.toUpperCase()
        }}</span>
        <code class="api-url">{{ fullUrl }}</code>
      </div>
      <div class="expand-toggle-icon" @click="toggleOverallExpand">
        <div>点击{{ isOverallExpanded ? "折叠" : "展开" }}</div>
        <svg
          :class="{ rotated: isOverallExpanded }"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>

    <!-- API详细信息 (可折叠部分) -->
    <div :class="['api-details-wrapper', { expanded: isOverallExpanded }]">
      <div class="api-details">
        <!-- 基本信息 -->
        <div class="info-section">
          <h4 @click="toggleSection('info')" class="section-header">
            基本信息
            <div class="expand-toggle-icon">
              <svg
                :class="{ rotated: isSectionExpanded.info }"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </h4>
          <div
            :class="[
              'collapsible-content',
              { expanded: isSectionExpanded.info },
            ]"
          >
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Host:</span>
                <code class="info-value">{{ host }}</code>
              </div>
              <div class="info-item">
                <span class="label">Base Path:</span>
                <code class="info-value">{{ basePath }}</code>
              </div>
              <div class="info-item">
                <span class="label">Method:</span>
                <span :class="['method-badge', methodClass]">{{
                  method.toUpperCase()
                }}</span>
              </div>
              <div class="info-item">
                <span class="label">返回类型:</span>
                <code class="info-value">{{ responseType }}</code>
              </div>
            </div>
          </div>
        </div>

        <!-- 请求参数 -->
        <div v-if="parameters && parameters.length > 0" class="params-section">
          <h4 @click="toggleSection('params')" class="section-header">
            请求参数
            <div class="expand-toggle-icon">
              <svg
                :class="{ rotated: isSectionExpanded.params }"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </h4>
          <div
            :class="[
              'collapsible-content',
              { expanded: isSectionExpanded.params },
            ]"
          >
            <div class="params-table">
              <!-- 使用 ParameterTable 组件来渲染参数 -->
              <ParameterTable :parameters="parameters" />
            </div>
          </div>
        </div>

        <!-- 请求头 -->
        <div v-if="headers && headers.length > 0" class="headers-section">
          <h4 @click="toggleSection('headers')" class="section-header">
            请求头
            <div class="expand-toggle-icon">
              <svg
                :class="{ rotated: isSectionExpanded.headers }"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </h4>
          <div
            :class="[
              'collapsible-content',
              { expanded: isSectionExpanded.headers },
            ]"
          >
            <div class="params-table">
              <div class="table-header">
                <span>Header名</span>
                <span>类型</span>
                <span>必填</span>
                <span>说明</span>
              </div>
              <div
                v-for="header in headers"
                :key="header.name"
                class="table-row"
              >
                <code class="param-name">{{ header.name }}</code>
                <span class="param-type">{{ header.type }}</span>
                <span
                  :class="[
                    'param-required',
                    header.required ? 'required' : 'optional',
                  ]"
                >
                  {{ header.required ? "是" : "否" }}
                </span>
                <span class="param-description">{{ header.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 请求示例 -->
        <div v-if="requestExample" class="example-section">
          <h4 @click="toggleSection('requestExample')" class="section-header">
            请求示例
            <div class="expand-toggle-icon">
              <svg
                :class="{ rotated: isSectionExpanded.requestExample }"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </h4>
          <div
            :class="[
              'collapsible-content',
              { expanded: isSectionExpanded.requestExample },
            ]"
          >
            <div class="code-block">
              <pre><code>{{ requestExample }}</code></pre>
            </div>
          </div>
        </div>

        <!-- 响应示例 -->
        <div v-if="responseExample" class="example-section">
          <h4 @click="toggleSection('responseExample')" class="section-header">
            响应示例
            <div class="expand-toggle-icon">
              <svg
                :class="{ rotated: isSectionExpanded.responseExample }"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </h4>
          <div
            :class="[
              'collapsible-content',
              { expanded: isSectionExpanded.responseExample },
            ]"
          >
            <div class="code-block">
              <pre><code>{{ responseExample }}</code></pre>
            </div>
          </div>
        </div>

        <!-- 状态码 -->
        <div
          v-if="statusCodes && statusCodes.length > 0"
          class="status-section"
        >
          <h4 @click="toggleSection('statusCodes')" class="section-header">
            状态码
            <div class="expand-toggle-icon">
              <svg
                :class="{ rotated: isSectionExpanded.statusCodes }"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </h4>
          <div
            :class="[
              'collapsible-content',
              { expanded: isSectionExpanded.statusCodes },
            ]"
          >
            <div class="status-table">
              <div
                v-for="status in statusCodes"
                :key="status.code"
                class="status-row"
              >
                <span :class="['status-code', getStatusClass(status.code)]">{{
                  status.code
                }}</span>
                <span class="status-description">{{ status.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import ParameterTable from "./ParameterTable.vue";
import {
  type HttpMethod,
  type ContentType,
  type Parameter,
  type Header,
  type StatusCode,
  isValidHttpMethod,
  isValidParameter,
  isValidStatusCode,
  getStatusClass,
  validateUrl,
} from "../types/api"; // 确保路径正确

// Props接口定义
interface ApiEndpointProps {
  // 基本信息
  host: string;
  basePath?: string;
  endpoint: string;
  method: HttpMethod;
  responseType?: ContentType;

  // 描述信息
  title?: string;
  description?: string;

  // 参数和请求头
  parameters?: Parameter[];
  headers?: Header[];

  // 示例
  requestExample?: string;
  responseExample?: string;

  // 状态码
  statusCodes?: StatusCode[];
}

// Props定义
const props = withDefaults(defineProps<ApiEndpointProps>(), {
  basePath: "",
  responseType: "application/json",
  title: "",
  description: "",
  parameters: () => [],
  headers: () => [],
  requestExample: "",
  responseExample: "",
  statusCodes: () => [],
});

// 计算完整URL
const fullUrl = computed((): string => {
  const base = props.basePath ? props.basePath : "";
  return `${props.host}${base}${props.endpoint}`;
});

// 计算方法样式类
const methodClass = computed((): string => {
  if (!isValidHttpMethod(props.method)) {
    console.warn(`Invalid HTTP method: ${props.method}`);
    return "method-get";
  }
  return `method-${props.method.toLowerCase()}`;
});

// --- 折叠/展开逻辑 ---
const isOverallExpanded = ref(false); // 整体是否展开，默认折叠

// 各个分块的展开状态
const isSectionExpanded = reactive({
  info: true, // 基本信息默认展开
  params: true,
  headers: true,
  requestExample: true,
  responseExample: true,
  statusCodes: true,
});

// 切换整体展开状态
const toggleOverallExpand = () => {
  isOverallExpanded.value = !isOverallExpanded.value;
};

// 切换单个分块展开状态
const toggleSection = (sectionName: keyof typeof isSectionExpanded) => {
  isSectionExpanded[sectionName] = !isSectionExpanded[sectionName];
};

// 运行时验证 (保持不变)
if (process.env.NODE_ENV === "development") {
  // 验证参数
  if (props.parameters) {
    props.parameters.forEach((param, index) => {
      if (!isValidParameter(param)) {
        console.error(`Invalid parameter at index ${index}:`, param);
      }
    });
  }

  // 验证状态码
  if (props.statusCodes) {
    props.statusCodes.forEach((status, index) => {
      if (!isValidStatusCode(status)) {
        console.error(`Invalid status code at index ${index}:`, status);
      }
    });
  }

  // 验证URL格式
  try {
    if (!validateUrl(fullUrl.value)) {
      console.warn(`Invalid URL format: ${fullUrl.value}`);
    }
  } catch (error) {
    console.warn(`Error validating URL: ${fullUrl.value}`, error);
  }
}
</script>

<style scoped>
.api-endpoint {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 24px 0;
  overflow: hidden;
  background-color: var(--vp-c-bg); /* 确保背景色与VitePress主题一致 */
}

.api-header {
  background: var(--vp-c-bg-soft);
  padding: 20px;
  border-bottom: 1px solid var(--vp-c-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative; /* 用于定位展开图标 */
}

.api-method-url {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px; /* 调整间距 */
}

.method-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  flex-shrink: 0; /* 防止被挤压 */
}

.method-get {
  background-color: #10b981;
}
.method-post {
  background-color: #3b82f6;
}
.method-put {
  background-color: #f59e0b;
}
.method-delete {
  background-color: #ef4444;
}
.method-patch {
  background-color: #8b5cf6;
}
.method-head {
  background-color: #6b7280;
}
.method-options {
  background-color: #6b7280;
}

.api-url {
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  flex: 1;
  word-break: break-all; /* 允许长URL换行 */
}

.api-title {
  margin: 0; /* 移除默认margin */
  color: var(--vp-c-text-1);
  font-size: 20px; /* 调整标题大小 */
}

.api-description {
  margin: 0; /* 移除默认margin */
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 14px;
}

/* 整体详情部分的折叠动画 */
.api-details-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out; /* 调整动画速度 */
}

.api-details-wrapper.expanded {
  max-height: 5000px; /* 足够大的值以容纳所有内容 */
}

.api-details {
  padding: 20px;
  padding-top: 0; /* 避免双重padding */
}

.info-section,
.params-section,
.headers-section,
.example-section,
.status-section {
  margin-top: 12px;
  margin-bottom: 12px;
}

.section-header {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  cursor: pointer; /* 添加手型光标 */
  display: flex;
  align-items: center;
  justify-content: space-between; /* 标题和图标两端对齐 */
  padding-top: 12px; /* 增加顶部间距 */
  border-top: 1px solid var(--vp-c-border); /* 添加分隔线 */
}
.info-section .section-header {
  border-top: none; /* 基本信息顶部不需要分隔线 */
  padding-top: 0;
}

/* 各个分块内容的折叠动画 */
.collapsible-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.collapsible-content.expanded {
  max-height: 2000px; /* 足够大的值 */
}

.info-grid {
  display: flex; /* 使用flex布局 */
  flex-wrap: wrap; /* 允许换行 */
  gap: 12px 24px; /* 垂直和水平间距 */
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-basis: calc(50% - 12px); /* 默认两列布局，减去一半的水平gap */
  min-width: 250px; /* 确保在小屏幕下也能有足够空间 */
}

.label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  flex-shrink: 0; /* 防止标签被挤压 */
}

.info-value {
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  word-break: break-all; /* 允许长值换行 */
  flex-grow: 1; /* 允许值占据剩余空间 */
}

.params-table,
.status-table {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

/* 请求头表格样式 - 与 ParameterTable.vue 保持完全一致 */
.headers-section .params-table .table-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.5fr 2fr; /* Header名, 类型, 必填, 说明 */
  background: var(--vp-c-bg-soft);
  padding: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-border);
}

.headers-section .params-table .table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.5fr 2fr; /* Header名, 类型, 必填, 说明 */
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-border);
  align-items: center;
  background-color: var(--vp-c-bg);
}

.headers-section .params-table .table-row:last-child {
  border-bottom: none;
}

/* 请求头表格中的样式类 - 与 ParameterTable.vue 保持完全一致 */
.headers-section .param-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  word-break: break-all;
  justify-self: start; /* 修复参数名背景宽度问题 */
}

.headers-section .param-type {
  color: var(--vp-c-text-2);
  font-size: 13px;
  word-break: break-all;
}

.headers-section .param-required.required {
  color: #ef4444;
  font-weight: 500;
}

.headers-section .param-required.optional {
  color: var(--vp-c-text-3);
}

.headers-section .param-description {
  color: var(--vp-c-text-2);
  font-size: 14px;
  word-break: break-all;
}

.code-block {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.5;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-border);
}

.status-row:last-child {
  border-bottom: none;
}

.status-code {
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
}

.status-code.success {
  background: #dcfce7;
  color: #166534;
}

.status-code.client-error {
  background: #fef2f2;
  color: #991b1b;
}

.status-code.server-error {
  background: #fef2f2;
  color: #991b1b;
}

.status-code.info {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.status-description {
  color: var(--vp-c-text-2);
}

/* 展开/折叠图标样式 */
.expand-toggle-icon {
  cursor: pointer; /* 添加手型光标表示可点击 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  transition: transform 0.3s ease-out;
}

.api-header .expand-toggle-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}

.expand-toggle-icon svg {
  transform: rotate(90deg); /* 默认向右 */
  transition: transform 0.3s ease-out;
}

.api-header .expand-toggle-icon svg.rotated {
  transform: rotate(270deg); /* 整体展开时向下 */
}

.section-header .expand-toggle-icon svg.rotated {
  transform: rotate(270deg); /* 分块展开时向下 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .api-method-url {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .api-header .expand-toggle-icon {
    top: 16px;
    right: 16px;
  }

  .info-grid {
    flex-direction: column; /* 在小屏幕下改为单列 */
    gap: 12px;
  }
  .info-item {
    flex-basis: 100%; /* 占据整行 */
    min-width: auto;
  }
}
</style>
