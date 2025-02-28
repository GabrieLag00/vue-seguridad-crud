import { defineStore } from "pinia";
import axios from "axios";
import { useStorage } from "@vueuse/core"; // ✅ useStorage para reactividad

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: useStorage("token", null),
    user: null,
    userId: useStorage("userId", null),
  }),

  actions: {
    async registerUser(email: string, password: string) {
      try {
        // ✅ Realizar registro
        const res = await axios.post("http://localhost:3000/users/register", { email, password });

        if (res.status === 200) { // ✅ Asegurarnos de que el registro fue exitoso
          console.log("✅ Registro exitoso. Iniciando sesión...");
          return await this.loginUser(email, password); // 🔥 Iniciar sesión automáticamente
        }

        return { message: "Registro exitoso, pero no se pudo iniciar sesión automáticamente" };
      } catch (error) {
        const errorMessage = (error as any).response?.data?.error || "Error en el registro";
        return { message: errorMessage };
      }
    },

    async loginUser(email: string, password: string) {
      try {
        // ✅ Realizar login
        const res = await axios.post("http://localhost:3000/users/login", { email, password });

        if (res.data.token) {
          this.token = res.data.token;
          this.userId = res.data.id;
          
          await this.getUserProfile(); // ✅ Obtener el perfil del usuario
          return { message: "Login exitoso" };
        }

        return { message: "Error al iniciar sesión" };
      } catch (error) {
        const errorMessage = (error as any).response?.data?.error || "Error en el login";
        return { message: errorMessage };
      }
    },

    async getUserProfile() {
      if (!this.token || !this.userId) return;
      try {
        const res = await axios.get(`http://localhost:3000/users/user/${this.userId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = res.data;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },

    async logout() {
      try {
        await axios.post("http://localhost:3000/users/logout", {}, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      } finally {
        this.token = null;
        this.user = null;
        this.userId = null;
      }
    },
  },
});
