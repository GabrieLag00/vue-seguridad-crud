<template>
  <Card class="p-6 bg-gray-800 border border-gray-700 hover:shadow-xl">
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-4">
        <Avatar class="w-12 h-12 border-2 border-blue-500">
          <AvatarImage :src="fictitiousUser.profilePhoto" alt="User" />
          <AvatarFallback>{{ fictitiousUser.name.charAt(0) }}</AvatarFallback>
        </Avatar>
        <div>
          <h3 class="text-lg font-semibold mb-1 text-blue-400">{{ task.title }}</h3>
          <p class="text-gray-400 mb-3">{{ task.description }}</p>
          <div class="flex flex-wrap items-center gap-2">
            <!-- Mostrar prioridad -->
            <Badge 
              v-if="task.priority" 
              variant="outline" 
              :class="getPriorityClass(task.priority)"
            >
              <component :is="getPriorityIcon(task.priority)" class="w-3 h-3 mr-1" />
              {{ getPriorityLabel(task.priority) }}
            </Badge>

            <!-- Mostrar fecha -->
            <Badge variant="outline" class="flex items-center gap-1 px-2 py-1 border-gray-500 text-gray-300">
              <Calendar class="w-3 h-3" /> {{ formatDate(task.date) }}
            </Badge>

            <!-- Mostrar etiqueta -->
            <Badge 
              v-if="getTag(task.tag)" 
              variant="outline" 
              :class="getTagClass(getTag(task.tag)?.color)"
            >
              <component :is="getTag(task.tag)?.icon" class="w-3 h-3 mr-1" />
              {{ getTag(task.tag)?.label }}
            </Badge>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <TaskEditModal :task="task" @update-task="updateTask" />
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="outline" size="icon" class="rounded-full bg-gray-700 border-gray-600 hover:bg-red-600 hover:text-white">
              <Trash2 class="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent class="bg-gray-800 border border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle class="flex items-center gap-2 text-xl text-red-500">
                <AlertCircle class="w-6 h-6" />
                ¿Eliminar tarea?
              </AlertDialogTitle>
              <AlertDialogDescription class="text-gray-400">
                Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar esta tarea?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel class="bg-gray-700 text-gray-300 hover:bg-gray-600">
                <X class="w-4 h-4 mr-2" /> Cancelar
              </AlertDialogCancel>
              <AlertDialogAction @click="confirmDeleteTask" class="bg-red-600 text-white hover:bg-red-700">
                <Trash2 class="w-4 h-4 mr-2" /> Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Calendar, Trash2, AlertCircle, X, ArrowDown, ArrowRight, ArrowUp, Tag as TagIcon } from 'lucide-vue-next'
import { fictitiousUser, tags } from '@/data/constant'
import type { Task, Priority, Tag } from '@/interfaces/task'
import TaskEditModal from './TaskEditModal.vue'
import { useTaskStore } from '@/stores/tasks'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'deleteTask', id: number): void
  (e: 'updateTask', task: Task): void
}>()

const taskStore = useTaskStore()

const deleteTask = () => {
  emit('deleteTask', props.task.id)
}

const confirmDeleteTask = () => {
  taskStore.deleteTask(props.task.id)
}

const updateTask = (updatedTask: Task) => {
  emit('updateTask', updatedTask)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// ✅ Maneja `Priority` como `string | object`
const getPriorityClass = (priority: string | Priority) => {
  const priorityValue = typeof priority === 'string' ? priority : priority.value

  const classes: Record<string, string> = {
    alta: 'border-red-500 text-red-500',
    media: 'border-yellow-500 text-yellow-500',
    baja: 'border-green-500 text-green-500'
  }
  return `flex items-center gap-1 px-2 py-1 ${classes[priorityValue] || 'border-gray-500 text-gray-500'}`
}

// ✅ Asegura que `priority` siempre tenga el valor correcto
const getPriorityIcon = (priority: string | Priority) => {
  const priorityValue = typeof priority === 'string' ? priority : priority.value

  const icons: Record<string, any> = {
    alta: ArrowUp,
    media: ArrowRight,
    baja: ArrowDown
  }
  return icons[priorityValue] || TagIcon
}

// ✅ Asegura que `priority.label` siempre sea válido
const getPriorityLabel = (priority: string | Priority) => {
  if (typeof priority === 'string') {
    const labels: Record<string, string> = {
      alta: 'Alta',
      media: 'Media',
      baja: 'Baja'
    }
    return labels[priority] || 'Desconocida'
  }
  return priority.label || 'Desconocida'
}

// ✅ Maneja `task.tag` correctamente como `Tag | string`
const getTag = (tag: Tag | string) => {
  if (typeof tag === 'object' && tag !== null) {
    return tag
  }
  return tags.find(t => t.value === tag) || null
}

// ✅ Evita error si `tag` es `null`
const getTagClass = (color?: string) => {
  return `flex items-center gap-1 px-2 py-1 ${color || 'border-gray-500 text-gray-500'}`
}

const getTagIcon = (tag?: Tag) => {
  return tag?.icon || TagIcon
}
</script>
