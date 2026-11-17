const API_URL = "http://localhost:3000/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const token = sessionStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData
      ? { "Content-Type": "application/json" }
      : {}),
    ...options.headers,
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {})
  };


  if (isFormData) {
    delete headers["Content-Type"];
    delete headers["content-type"];
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Réponse non-JSON du serveur (${response.status})`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur serveur");
  }

  return data;
}
