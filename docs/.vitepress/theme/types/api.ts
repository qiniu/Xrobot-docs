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
  | "integer(int32)" // Specific type from the HTML doc
  | "integer(int64)" // Specific type from the HTML doc
  | "string(byte)" // Specific type from the HTML doc
  | "string(date-time)" // Specific type from the HTML doc
  | string;

export interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  in?: "path" | "query" | "header" | "body" | "formData"; // Added 'in' property
  example?: string | number | boolean | object; // Added object for complex examples
  enum?: string[];
  default?: string | number | boolean;
  children?: Parameter[]; // For nested objects/arrays in body
  level?: number; // To track nesting level for indentation in recursive table
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
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
  schema?: string; // Added schema for response body type
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
  if (code === 0) return "success";
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "client-error";
  if (code >= 500) return "server-error";
  return "info";
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
