import Cookies from "js-cookie";
import { BaseAPIURL } from "./config";

export interface UserAccount {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

export async function fetchUserAccounts(): Promise<UserAccount[]> {
  const token = Cookies.get("app_token");

  if (!token) {
    throw new Error("Token tidak tersedia.");
  }

  const res = await fetch(`${BaseAPIURL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data akun.");
  }

  const json = await res.json();
  return json.data;
}
