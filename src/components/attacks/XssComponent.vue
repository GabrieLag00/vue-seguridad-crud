<template>
    <div class="comment-section">
      <h2>Comentarios</h2>
      <div v-if="comments.length === 0">No hay comentarios aún. ¡Sé el primero en comentar!</div>
      <ul>
        <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
      </ul>
      <textarea v-model="newComment" placeholder="Escribe un comentario..."></textarea>
      <button @click="handleAddComment">Agregar comentario</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useAttackStore } from "@/stores/attacks";
  
  export default defineComponent({
    name: "CommentSection",
    setup() {
      const attackStore = useAttackStore();
      const newComment = ref("");
  
      onMounted(() => {
        attackStore.getComments();
      });
  
      const handleAddComment = () => {
        if (newComment.value.trim() === "") {
          attackStore.showAlert("Advertencia", "El comentario no puede estar vacío.", "error");
          return;
        }
        attackStore.addComment(newComment.value);
        newComment.value = "";
      };
  
      return {
        comments: attackStore.comments,
        newComment,
        handleAddComment,
      };
    },
  });
  </script>
  