import { BaseAPIURL } from './config'; // ✅ correct

export interface LoginPayload {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(BaseAPIURL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Login gagal");
  }

  return data;
}
