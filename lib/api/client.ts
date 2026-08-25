import { getToken, clearAuth } from '../auth/token';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  requiresAuth?: boolean;
  headers?: Record<string, string>;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;

    try {
      const body = await res.json();
      message = body.message || message;
    } catch {
      // response wasn't JSON — keep default message
    }

    throw new ApiError(message, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}


export async function apiAuthFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = 'GET', body, requiresAuth = true, headers = {} } = options;

  if (requiresAuth) {
    const token = getToken();
    if (!token) {
      clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Authentication required. Please log in.');
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await apiFetch<T>(path, requestOptions);
    return response;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Session expired. Please log in again.');
    }
    throw error;
  }
}
  