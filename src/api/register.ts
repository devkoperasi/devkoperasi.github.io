import { BaseAPIURL } from './config'; // ✅ correct

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  message: string;
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await fetch(BaseAPIURL + "/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Registrasi gagal!");
  }

  return data;
}