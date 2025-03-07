import axios from "axios";

// ✅ Configuración base de la API
const API_BASE_URL = "http://localhost:3000";

// ✅ Función genérica para peticiones GET y POST
export const apiRequest = async (method: "get" | "post", endpoint: string, data: any = {}, token?: string) => {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers,
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Error en API:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
