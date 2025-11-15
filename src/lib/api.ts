const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

type RequestOptions = RequestInit & { json?: unknown };

const request = async <TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> => {
  const { json, headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: json !== undefined ? JSON.stringify(json) : options.body,
    ...rest,
  });

  if (!response.ok) {
    const message = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(message.message ?? message.error ?? "Request failed");
  }

  return response.json();
};

export const adminApi = {
  getHero: () => request<{ imageUrl: string; updatedAt: string }>("/admin/hero"),
  updateHero: (payload: { imageUrl: string }) =>
    request<{ imageUrl: string; updatedAt: string }>("/admin/hero", {
      method: "POST",
      json: payload,
    }),
  login: (payload: { username: string; password: string }) =>
    request<{ success: boolean; username: string }>("/auth/login", {
      method: "POST",
      json: payload,
    }),
  updateCredentials: (payload: { currentPassword: string; username?: string; password?: string }) =>
    request<{ success: boolean; username: string }>("/auth/credentials", {
      method: "PUT",
      json: payload,
    }),
  getAlbums: () => request<{ albums: any[] }>("/admin/albums"),
  createAlbum: (payload: {
    title: string;
    year?: string;
    coverUrl: string;
    summary?: string;
    tracks?: string[];
    links?: any[];
  }) =>
    request("/admin/albums", {
      method: "POST",
      json: payload,
    }),
  updateAlbum: (id: string, payload: {
    title: string;
    year?: string;
    coverUrl: string;
    summary?: string;
    tracks?: string[];
    links?: any[];
  }) =>
    request(`/admin/albums/${id}`, {
      method: "PUT",
      json: payload,
    }),
  deleteAlbum: (id: string) =>
    request(`/admin/albums/${id}`, {
      method: "DELETE",
    }),
  getVideos: () => request<{ videos: any[] }>("/admin/videos"),
  createVideo: (payload: { title: string; youtubeUrl: string; views?: string; description?: string }) =>
    request("/admin/videos", {
      method: "POST",
      json: payload,
    }),
  updateVideo: (id: string, payload: { title?: string; youtubeUrl?: string; views?: string; description?: string }) =>
    request(`/admin/videos/${id}`, {
      method: "PUT",
      json: payload,
    }),
  deleteVideo: (id: string) =>
    request(`/admin/videos/${id}`, {
      method: "DELETE",
    }),
  getTours: () => request<{ tours: any[] }>("/admin/tours"),
  createTour: (payload: { date: string; city: string; venue: string; ticketUrl: string }) =>
    request("/admin/tours", {
      method: "POST",
      json: payload,
    }),
  updateTour: (id: string, payload: { date?: string; city?: string; venue?: string; ticketUrl?: string }) =>
    request(`/admin/tours/${id}`, {
      method: "PUT",
      json: payload,
    }),
  deleteTour: (id: string) =>
    request(`/admin/tours/${id}`, {
      method: "DELETE",
    }),
};


