/**
 * APIレスポンスの基本型
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
}

/**
 * APIエラーの型
 */
export interface ApiError {
  message: string;
  status: number;
}

/**
 * APIリクエストのオプション
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}
