<template>
  <div class="api-endpoint">
    <!-- API基本信息 -->
    <div class="api-header">
      <div class="api-method-url">
        <span :class="['method-badge', methodClass]">{{
          method.toUpperCase()
        }}</span>
        <code class="api-url">{{ fullUrl }}</code>
      </div>
      <h3 v-if="title" class="api-title">{{ title }}</h3>
      <p v-if="description" class="api-description">{{ description }}</p>
    </div>

    <!-- API详细信息 -->
    <div class="api-details">
      <!-- 基本信息 -->
      <div class="info-section">
        <h4>基本信息</h4>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Host:</span>
            <code>{{ host }}</code>
          </div>
          <div class="info-item">
            <span class="label">Base Path:</span>
            <code>{{ basePath }}</code>
          </div>
          <div class="info-item">
            <span class="label">Method:</span>
            <span :class="['method-badge', methodClass]">{{
              method.toUpperCase()
            }}</span>
          </div>
          <div class="info-item">
            <span class="label">返回类型:</span>
            <code>{{ responseType }}</code>
          </div>
        </div>
      </div>

      <!-- 请求参数 -->
      <div v-if="parameters && parameters.length > 0" class="params-section">
        <h4>请求参数</h4>
        <div class="params-table">
          <div class="table-header">
            <span>参数名</span>
            <span>类型</span>
            <span>必填</span>
            <span>说明</span>
          </div>
          <div v-for="param in parameters" :key="param.name" class="table-row">
            <code class="param-name">{{ param.name }}</code>
            <span class="param-type">{{ param.type }}</span>
            <span
              :class="[
                'param-required',
                param.required ? 'required' : 'optional',
              ]"
            >
              {{ param.required ? "是" : "否" }}
            </span>
            <span class="param-description">{{ param.description }}</span>
          </div>
        </div>
      </div>

      <!-- 请求头 -->
      <div v-if="headers && headers.length > 0" class="headers-section">
        <h4>请求头</h4>
        <div class="params-table">
          <div class="table-header">
            <span>Header名</span>
            <span>类型</span>
            <span>必填</span>
            <span>说明</span>
          </div>
          <div v-for="header in headers" :key="header.name" class="table-row">
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

      <!-- 请求示例 -->
      <div v-if="requestExample" class="example-section">
        <h4>请求示例</h4>
        <div class="code-block">
          <pre><code>{{ requestExample }}</code></pre>
        </div>
      </div>

      <!-- 响应示例 -->
      <div v-if="responseExample" class="example-section">
        <h4>响应示例</h4>
        <div class="code-block">
          <pre><code>{{ responseExample }}</code></pre>
        </div>
      </div>

      <!-- 状态码 -->
      <div v-if="statusCodes && statusCodes.length > 0" class="status-section">
        <h4>状态码</h4>
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
</template>

<script setup lang="ts">
import { computed } from "vue";

// 类型定义
type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options";

type ContentType =
  | "application/json"
  | "application/xml"
  | "text/plain"
  | "text/html"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | string;

type ParameterType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "file"
  | string;

interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  example?: string | number | boolean;
  enum?: string[];
  default?: string | number | boolean;
}

interface Header {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  example?: string;
}

interface StatusCode {
  code: number;
  description: string;
}

type StatusClass = "success" | "client-error" | "server-error" | "info";

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

// 验证HTTP方法
const validateMethod = (method: string): method is HttpMethod => {
  const validMethods: HttpMethod[] = [
    "get",
    "post",
    "put",
    "delete",
    "patch",
    "head",
    "options",
  ];
  return validMethods.includes(method.toLowerCase() as HttpMethod);
};

// 计算完整URL
const fullUrl = computed((): string => {
  const base = props.basePath ? props.basePath : "";
  return `${props.host}${base}${props.endpoint}`;
});

// 计算方法样式类
const methodClass = computed((): string => {
  if (!validateMethod(props.method)) {
    console.warn(`Invalid HTTP method: ${props.method}`);
    return "method-get";
  }
  return `method-${props.method.toLowerCase()}`;
});

// 获取状态码样式类
const getStatusClass = (code: number): StatusClass => {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "client-error";
  if (code >= 500) return "server-error";
  return "info";
};

// 类型守卫函数
const isValidParameter = (param: any): param is Parameter => {
  return (
    typeof param === "object" &&
    param !== null &&
    typeof param.name === "string" &&
    typeof param.type === "string" &&
    typeof param.required === "boolean" &&
    typeof param.description === "string"
  );
};

const isValidStatusCode = (status: any): status is StatusCode => {
  return (
    typeof status === "object" &&
    status !== null &&
    typeof status.code === "number" &&
    typeof status.description === "string"
  );
};

// 运行时验证
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
    new URL(fullUrl.value);
  } catch (error) {
    console.warn(`Invalid URL format: ${fullUrl.value}`);
  }
}
</script>

<style scoped>
.api-endpoint {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 24px 0;
  overflow: hidden;
}

.api-header {
  background: var(--vp-c-bg-soft);
  padding: 20px;
  border-bottom: 1px solid var(--vp-c-border);
}

.api-method-url {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.method-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
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
}

.api-title {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.api-description {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.api-details {
  padding: 20px;
}

.info-section,
.params-section,
.headers-section,
.example-section,
.status-section {
  margin-bottom: 24px;
}

.info-section h4,
.params-section h4,
.headers-section h4,
.example-section h4,
.status-section h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  min-width: 80px;
}

.params-table,
.status-table {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 80px 2fr;
  background: var(--vp-c-bg-soft);
  padding: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-border);
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 80px 2fr;
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-border);
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.param-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
}

.param-type {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.param-required.required {
  color: #ef4444;
  font-weight: 500;
}

.param-required.optional {
  color: var(--vp-c-text-3);
}

.param-description {
  color: var(--vp-c-text-2);
  font-size: 14px;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .api-method-url {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .table-header {
    display: none;
  }

  .table-row {
    display: block;
    padding: 16px 12px;
  }

  .table-row > * {
    display: block;
    margin-bottom: 4px;
  }

  .param-name::before {
    content: "参数: ";
    font-weight: 500;
  }

  .param-type::before {
    content: "类型: ";
    font-weight: 500;
  }

  .param-required::before {
    content: "必填: ";
    font-weight: 500;
  }

  .param-description::before {
    content: "说明: ";
    font-weight: 500;
  }
}
</style>
