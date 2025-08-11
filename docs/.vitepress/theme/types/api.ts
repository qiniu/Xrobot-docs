// API相关类型定义文件

export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options";

export type ContentType =
  | "application/json"
  | "application/xml"
  | "text/plain"
  | "text/html"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | string;

export type ParameterType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "file"
  | string;

export interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  example?: string | number | boolean;
  enum?: string[];
  default?: string | number | boolean;
  pattern?: string; // 正则表达式模式
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
}

export interface Header {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  example?: string;
}

export interface StatusCode {
  code: number;
  description: string;
  schema?: string; // 响应数据结构描述
}

export interface ApiEndpointProps {
  // 基本信息
  host: string;
  basePath?: string;
  endpoint: string;
  method: HttpMethod;
  responseType?: ContentType;

  // 描述信息
  title?: string;
  description?: string;
  tags?: string[];
  deprecated?: boolean;

  // 参数和请求头
  parameters?: Parameter[];
  headers?: Header[];

  // 示例
  requestExample?: string;
  responseExample?: string;

  // 状态码
  statusCodes?: StatusCode[];

  // 安全性
  security?: SecurityRequirement[];
}

export interface SecurityRequirement {
  type: "apiKey" | "http" | "oauth2" | "openIdConnect";
  name?: string;
  in?: "query" | "header" | "cookie";
  scheme?: string;
  description?: string;
}

export type StatusClass = "success" | "client-error" | "server-error" | "info";

// 类型守卫函数
export const isValidHttpMethod = (method: string): method is HttpMethod => {
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

export const isValidParameter = (param: any): param is Parameter => {
  return (
    typeof param === "object" &&
    param !== null &&
    typeof param.name === "string" &&
    typeof param.type === "string" &&
    typeof param.required === "boolean" &&
    typeof param.description === "string"
  );
};

export const isValidStatusCode = (status: any): status is StatusCode => {
  return (
    typeof status === "object" &&
    status !== null &&
    typeof status.code === "number" &&
    typeof status.description === "string"
  );
};

// 工具函数
export const getStatusClass = (code: number): StatusClass => {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "client-error";
  if (code >= 500) return "server-error";
  return "info";
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
