import axios from "axios";
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
  } as ApiError;
}

/**
 * GETリクエスト
 */
export async function get<T>(
  url: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<T>> {
  try {
    console.log(API_BASE_URL + url);
    const response = await axiosInstance.get(url, {
      headers: options?.headers,
      params: options?.params,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POSTリクエスト
 */
export async function post<T>(
  url: string,
  data: T,
  options?: ApiRequestOptions,
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: options?.headers,
      params: options?.params,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return handleError(error);
  }
}
