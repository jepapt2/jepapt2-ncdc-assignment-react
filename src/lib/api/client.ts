import axios from "axios";
import * as v from "valibot";
import type { ApiError, ApiRequestOptions, ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

/**
 * エラーハンドリング
 */
function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const apiError: ApiError = {
      message: error.response?.data?.message ?? error.message,
      status: error.response?.status ?? 500,
    };
    throw apiError;
  }

  throw {
    message:
      error instanceof Error ? error.message : "不明なエラーが発生しました",
    status: 500,
  };
}

/**
 * GETリクエスト
 */
export async function getApi<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>({
  url,
  schema,
  options,
}: {
  url: string;
  schema: T;
  options?: ApiRequestOptions;
}): Promise<ApiResponse<v.InferOutput<T>>> {
  try {
    const response = await axiosInstance.get(url, {
      headers: options?.headers,
      params: options?.params,
    });
    const parsedResponseData = v.parse(schema, response.data);
    return {
      data: parsedResponseData,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POSTリクエスト
 */
export async function postApi<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  K extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>({
  url,
  data,
  createSchema,
  responseSchema,
  options,
}: {
  url: string;
  data: v.InferInput<T>;
  createSchema: T;
  responseSchema: K;
  options?: ApiRequestOptions;
}): Promise<ApiResponse<v.InferOutput<K>>> {
  try {
    const parsedData = v.parse(createSchema, data);
    const response = await axiosInstance.post(url, parsedData, {
      headers: options?.headers,
      params: options?.params,
    });
    const parsedResponseData = v.parse(responseSchema, response.data);
    return {
      data: parsedResponseData,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUTリクエスト
 */
export async function putApi<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  K extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>({
  url,
  data,
  updateSchema,
  responseSchema,
  options,
}: {
  url: string;
  data: v.InferInput<T>;
  updateSchema: T;
  responseSchema: K;
  options?: ApiRequestOptions;
}): Promise<ApiResponse<v.InferOutput<K>>> {
  try {
    const parsedData = v.parse(updateSchema, data);
    const response = await axiosInstance.put(url, parsedData, {
      headers: options?.headers,
      params: options?.params,
    });
    const parsedResponseData = v.parse(responseSchema, response.data);
    return {
      data: parsedResponseData,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETEリクエスト
 */
export async function deleteApi<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>({
  url,
  schema,
  options,
}: {
  url: string;
  schema?: T;
  options?: ApiRequestOptions;
}): Promise<ApiResponse<v.InferOutput<T> | undefined>> {
  try {
    const response = await axiosInstance.delete(url, {
      headers: options?.headers,
      params: options?.params,
    });
    // スキーマが指定場合はパースして返す
    if (schema) {
      const parsedResponseData = v.parse(schema, response.data);
      return {
        data: parsedResponseData,
        status: response.status,
      };
    }
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
}
