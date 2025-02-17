<template>
  <Card class="mb-8 bg-gray-800 border border-gray-700 shadow-xl">
    <CardHeader>
      <CardTitle class="text-2xl flex items-center gap-2 text-blue-400">
        <Plus class="w-5 h-5" />
        Agregar Nueva Tarea
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Título -->
      <div class="space-y-2">
        <Label for="task-title" class="flex items-center gap-2 text-gray-300">
          <BookMarked class="w-4 h-4 text-blue-400" />
          Título
        </Label>
        <Input 
          id="task-title" 
          v-model="taskStore.newTask.title" 
          placeholder="Escribe el título..." 
          class="bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500" 
        />
      </div>

      <!-- Contenido -->
      <div class="space-y-2">
        <Label for="task-description" class="flex items-center gap-2 text-gray-300">
          <Edit2 class="w-4 h-4 text-blue-400" />
          Contenido
        </Label>
        <Textarea 
          id="task-description" 
          v-model="taskStore.newTask.description" 
          placeholder="Añadir contenido" 
          rows="4" 
          class="bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500" 
        />
      </div>

      <!-- Prioridad -->
      <div class="space-y-2">
        <Label for="task-priority" class="flex items-center gap-2 text-gray-300">
          <Tag class="w-4 h-4 text-blue-400" />
          Prioridad
        </Label>
        <Select v-model="taskStore.newTask.priority" id="task-priority">
          <SelectTrigger class="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Selecciona una prioridad" />
          </SelectTrigger>
          <SelectContent class="bg-gray-800 border-gray-700">
            <SelectItem v-for="priority in priorities" :key="priority.value" :value="priority.value" class="text-gray-100">
              <div class="flex items-center gap-2">
                <component :is="priority.icon" class="w-4 h-4" :class="priority.color" />
                {{ priority.label }}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Selector de Etiquetas -->
      <TagSelector @tag-selected="setTag" />

      <!-- Botón para agregar tarea -->
      <Button @click="handleAddTask" class="w-full flex items-center justify-center gap-2 text-lg font-semibold py-6 bg-blue-600 hover:bg-blue-700 text-white">
        <Plus class="w-5 h-5" /> Agregar Tarea
      </Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, BookMarked, Edit2, Tag } from 'lucide-vue-next';
import TagSelector from '@/components/tasks/TaskTagSelector.vue';

// Importar prioridades
import { priorities } from '@/data/constant';

// Store
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();

// Función para manejar la selección de etiqueta
const setTag = (selectedTag: string) => {
  taskStore.newTask.tag = selectedTag;
};

// Función para agregar tarea con validaciones
const handleAddTask = () => {
  if (!taskStore.newTask.title || !taskStore.newTask.description || !taskStore.newTask.priority) {
    alert("Todos los campos son obligatorios excepto la etiqueta.");
    return;
  }

  taskStore.addTask();

  // Resetear los valores después de agregar la tarea
  taskStore.newTask = {} as Omit<Task, 'id' | 'date'>;
};
</script>
