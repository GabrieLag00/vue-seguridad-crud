<script setup lang="ts">
import { ref } from "vue";
import { useAttackStore } from "@/stores/attacks";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Alert from "@/components/ui/alert/Alert.vue";

const attackStore = useAttackStore();
const authStore = useAuthStore();
const comment = ref("");
const userId = authStore.userId || "1"; // Usa el ID del usuario autenticado
const message = ref("");

const sendComment = async () => {
  if (!comment.value) {
    message.value = "El comentario no puede estar vacío.";
    return;
  }
  const res = await attackStore.sendXssComment(comment.value, userId);
  message.value = res.message;
  await fetchComments(); // Recargar comentarios después de enviar uno nuevo
};

const fetchComments = async () => {
  await attackStore.fetchXssComments(userId);
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Simulación de Ataque XSS</h2>

    <div class="mb-4">
      <label class="block text-gray-400">Escribe un comentario (sin sanitizar):</label>
      <Input v-model="comment" placeholder="Ej: <script>alert('XSS')</script>" class="mt-2" />
    </div>

    <Button @click="sendComment" class="bg-red-500 hover:bg-red-600 text-white w-full">
      Enviar comentario malicioso
    </Button>

    <Alert v-if="message" class="mt-4">{{ message }}</Alert>

    <div class="mt-6">
      <h3 class="text-lg font-bold">Comentarios Recibidos</h3>
      <ul v-if="attackStore.xssComments.length">
        <li v-for="(item, index) in attackStore.xssComments" :key="index" v-html="item.payload" class="bg-gray-800 p-2 mt-2 rounded"></li>
      </ul>
      <p v-else class="text-gray-500">No hay comentarios.</p>
    </div>
  </div>
</template>
