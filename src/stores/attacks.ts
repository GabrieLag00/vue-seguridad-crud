import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { apiRequest } from "@/services/api";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

export const useAttackStore = defineStore("attack", () => {
  const comments = ref<any[]>(JSON.parse(localStorage.getItem("comments") || "[]")); // Carga inicial desde localStorage
  const authStore = useAuthStore();

  const saveToLocalStorage = () => {
    localStorage.setItem("comments", JSON.stringify(comments.value));
  };

  // Observa cambios en los comentarios y actualiza localStorage
  watch(comments, saveToLocalStorage, { deep: true });

  const getComments = async (userId?: string) => {
    try {
      const response = await apiRequest("get", "/attack/xss", {}, authStore.validToken);
      comments.value = response.results || [];
      saveToLocalStorage();
    } catch (error) {
      showAlert("Error", "No se pudieron cargar los comentarios", "error");
    }
  };

  const addComment = async (comment: string) => {
    try {
      await apiRequest("post", "/attack/xss", { comment, user_id: authStore.validUserId }, authStore.validToken);
      comments.value.push(comment); // Agregar comentario localmente
      saveToLocalStorage();
      showAlert("Éxito", "Comentario agregado correctamente", "success");
    } catch (error) {
      showAlert("Error", "No se pudo agregar el comentario", "error");
    }
  };

  const showAlert = (title: string, text: string, icon: "success" | "error") => {
    Swal.fire({ title, text, icon, confirmButtonText: "OK" });
  };

  return { comments, getComments, addComment };
});
