const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("pyramid_token") : null;
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${API}${path}`, { ...init, headers });
  if (!res.ok) throw new Error((await res.text()) || `Request failed: ${res.status}`);
  return res.json();
}

export const authApi = {
  guest: () => request<{ accessToken: string; user: any }>("/auth/guest", { method: "POST", body: "{}" }),
  me: () => request<any>("/auth/me"),
  updateProfile: (body: { name?: string; title?: string; username?: string }) => request<any>("/auth/profile", { method: "PATCH", body: JSON.stringify(body) }),
};

export const taskApi = {
  list: () => request<any[]>("/tasks"),
  create: (body: any) => request<any>("/tasks", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: any) => request<any>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  remove: (id: string) => request<{ success: boolean }>(`/tasks/${id}`, { method: "DELETE" }),
};

export const userApi = {
  updateTheme: (theme: string) => request<any>("/users/theme", { method: "PATCH", body: JSON.stringify({ theme }) }),
};
