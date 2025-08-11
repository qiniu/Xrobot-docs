// API验证相关的组合式函数

import type { Parameter, StatusCode, HttpMethod } from "../types/api";

export const useApiValidation = () => {
  // 验证HTTP方法
  const validateHttpMethod = (method: string): method is HttpMethod => {
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

  // 验证参数对象
  const validateParameter = (param: any): param is Parameter => {
    if (typeof param !== "object" || param === null) {
      return false;
    }

    const requiredFields = ["name", "type", "required", "description"];
    for (const field of requiredFields) {
      if (!(field in param)) {
        console.error(`Missing required field: ${field}`);
        return false;
      }
    }

    if (typeof param.name !== "string" || param.name.trim() === "") {
      console.error("Parameter name must be a non-empty string");
      return false;
    }

    if (typeof param.type !== "string") {
      console.error("Parameter type must be a string");
      return false;
    }

    if (typeof param.required !== "boolean") {
      console.error("Parameter required must be a boolean");
      return false;
    }

    if (typeof param.description !== "string") {
      console.error("Parameter description must be a string");
      return false;
    }

    // 验证可选字段
    if (
      param.minLength !== undefined &&
      (typeof param.minLength !== "number" || param.minLength < 0)
    ) {
      console.error("Parameter minLength must be a non-negative number");
      return false;
    }

    if (
      param.maxLength !== undefined &&
      (typeof param.maxLength !== "number" || param.maxLength < 0)
    ) {
      console.error("Parameter maxLength must be a non-negative number");
      return false;
    }

    if (param.minimum !== undefined && typeof param.minimum !== "number") {
      console.error("Parameter minimum must be a number");
      return false;
    }

    if (param.maximum !== undefined && typeof param.maximum !== "number") {
      console.error("Parameter maximum must be a number");
      return false;
    }

    if (param.pattern !== undefined && typeof param.pattern !== "string") {
      console.error("Parameter pattern must be a string");
      return false;
    }

    if (param.enum !== undefined && !Array.isArray(param.enum)) {
      console.error("Parameter enum must be an array");
      return false;
    }

    return true;
  };

  // 验证状态码对象
  const validateStatusCode = (status: any): status is StatusCode => {
    if (typeof status !== "object" || status === null) {
      return false;
    }

    if (
      typeof status.code !== "number" ||
      status.code < 100 ||
      status.code > 599
    ) {
      console.error("Status code must be a number between 100 and 599");
      return false;
    }

    if (
      typeof status.description !== "string" ||
      status.description.trim() === ""
    ) {
      console.error("Status description must be a non-empty string");
      return false;
    }

    return true;
  };

  // 验证URL格式
  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.error(`Invalid URL format: ${url}`);
      return false;
    }
  };

  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 验证正则表达式
  const validateRegex = (pattern: string): boolean => {
    try {
      new RegExp(pattern);
      return true;
    } catch (error) {
      console.error(`Invalid regex pattern: ${pattern}`);
      return false;
    }
  };

  return {
    validateHttpMethod,
    validateParameter,
    validateStatusCode,
    validateUrl,
    validateEmail,
    validateRegex,
  };
};
