<template>
  <div>
    <!-- ✅ Formulario para agregar nueva tarea -->
    <TaskForm />

    <!-- Barra de búsqueda y filtro -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <!-- Input para buscar tareas -->
      <div class="flex-1 min-w-[250px]">
        <div class="relative">
          <Search class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            v-model="searchQuery"
            placeholder="Buscar tareas..." 
            class="pl-10 pr-4 py-2 bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500" 
          />
        </div>
      </div>

      <!-- Filtrar por prioridad -->
      <Select v-model="selectedPriority">
        <SelectTrigger class="w-[200px] bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500">
          <Filter class="w-4 h-4 mr-2 text-blue-400" />
          <SelectValue placeholder="Filtrar por prioridad" />
        </SelectTrigger>
        <SelectContent class="bg-gray-800 border-gray-700">
          <SelectItem value="all" class="text-gray-100">Todas las prioridades</SelectItem>
          <SelectItem v-for="priority in priorities" :key="priority.value" :value="priority.value" class="text-gray-100">
            <div class="flex items-center gap-2">
              <component :is="priority.icon" class="w-4 h-4" :class="priority.color" />
              {{ priority.label }}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- Filtrar por etiqueta -->
      <Select v-model="selectedTag">
        <SelectTrigger class="w-[200px] bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500">
          <Tag class="w-4 h-4 mr-2 text-blue-400" />
          <SelectValue placeholder="Filtrar por etiqueta" />
        </SelectTrigger>
        <SelectContent class="bg-gray-800 border-gray-700">
          <SelectItem value="all" class="text-gray-100">Todas las etiquetas</SelectItem>
          <SelectItem v-for="tag in tags" :key="tag.value" :value="tag.value" class="text-gray-100">
            <div class="flex items-center gap-2">
              <component :is="tag.icon" class="w-4 h-4" :class="tag.color" />
              {{ tag.label }}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- 📊 Mostrar cantidad de tareas -->
    <h2 class="text-gray-300 mb-4">
      Total de tareas: <span class="font-bold text-blue-400">{{ totalTareas }}</span>
    </h2>

    <!-- 📋 Lista de tareas filtradas y ordenadas -->
    <section class="space-y-4">
      <TaskItem v-for="task in sortedFilteredTasks" :key="task.id" :task="task" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Filter, Search, Tag } from 'lucide-vue-next'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskItem from '@/components/tasks/TaskItem.vue'
import { useTaskStore } from '@/stores/tasks'
import { priorities, tags } from '@/data/constant'

const taskStore = useTaskStore()

// 🔍 Estado para la búsqueda y filtros
const searchQuery = ref('')
const selectedPriority = ref('all')
const selectedTag = ref('all')

// 🧮 Computed para contar tareas
const totalTareas = computed(() => taskStore.tasks.length)

// 📝 Computed para filtrar y ordenar tareas
const sortedFilteredTasks = computed(() => {
  return taskStore.tasks.filter(task => {
    // 🎯 Filtrar por búsqueda (título)
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase())

    // 🎯 Filtrar por prioridad (si no es "all")
    const matchesPriority = selectedPriority.value === 'all' || task.priority === selectedPriority.value

    // 🎯 Filtrar por etiqueta (si no es "all")
    const matchesTag = selectedTag.value === 'all' || task.tag === selectedTag.value

    return matchesSearch && matchesPriority && matchesTag
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})
</script>
