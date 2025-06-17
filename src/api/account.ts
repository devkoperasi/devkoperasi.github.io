import Cookies from "js-cookie";
import { BaseAPIURL } from './config'; 

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

export async function fetchCurrentUser(): Promise<UserData> {
  const token = Cookies.get("app_token");

  if (!token) {
    throw new Error("Token tidak tersedia.");
  }

  const res = await fetch(`${BaseAPIURL}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data pengguna.");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  const token = Cookies.get("app_token");

  if (!token) return;

  await fetch(`${BaseAPIURL}/api/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  Cookies.remove("app_token");
}