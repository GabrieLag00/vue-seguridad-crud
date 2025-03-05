import axios from "axios";

const API_URL = "http://localhost:3000/attack"; // Cambia según tu backend

export const attackService = {
  // ✅ Simulación de SQL Injection (GET)
  async simulateSQLInjection() {
    try {
      const response = await axios.get(`${API_URL}/sql-injection`);
      return response.data;
    } catch (error) {
      console.error("Error en SQL Injection:", error);
      return { status: "Error", message: "No se pudo realizar el ataque SQLi" };
    }
  },

  // ✅ Simulación de XSS (GET)
  async simulateXSS(userId: string) {
    try {
      const response = await axios.get(`${API_URL}/xss`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error en XSS:", error);
      return { status: "Error", message: "No se pudo realizar el ataque XSS" };
    }
  },

  // ✅ Simulación de SQL Injection con búsqueda (POST)
  async searchSQLInjection(term: string) {
    try {
      const response = await axios.post(`${API_URL}/sql-injection/search`, { term });
      return response.data;
    } catch (error) {
      console.error("Error en SQL Injection (POST):", error);
      return { status: "Error", message: "No se pudo ejecutar la búsqueda SQLi" };
    }
  },

  // ✅ Agregar comentario vulnerable a XSS (POST)
  async addXSSComment(comment: string, userId: string) {
    try {
      const response = await axios.post(`${API_URL}/xss`, { comment, user_id: userId });
      return response.data;
    } catch (error) {
      console.error("Error en XSS (POST):", error);
      return { status: "Error", message: "No se pudo agregar el comentario XSS" };
    }
  },
};
