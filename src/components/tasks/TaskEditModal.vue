<template>
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="openDialog" variant="outline" size="icon" class="rounded-full bg-gray-700 border-gray-600 hover:bg-blue-600 hover:text-white">
          <Edit2 class="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
          <DialogDescription>Edita los detalles de la tarea y guarda los cambios.</DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleUpdateTask" class="space-y-4">
          <div class="space-y-2">
            <Label for="task-title-edit" class="flex items-center gap-2 text-gray-300">
              <BookMarked class="w-4 h-4 text-blue-400" />
              Título
            </Label>
            <Input 
              id="task-title-edit" 
              v-model="editedTask.title" 
              placeholder="Escribe el título..." 
              class="bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div class="space-y-2">
            <Label for="task-description-edit" class="flex items-center gap-2 text-gray-300">
              <Edit2 class="w-4 h-4 text-blue-400" />
              Contenido
            </Label>
            <Textarea 
              id="task-description-edit" 
              v-model="editedTask.description" 
              placeholder="Añadir contenido" 
              rows="4" 
              class="bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div class="space-y-2">
            <Label for="task-priority-edit" class="flex items-center gap-2 text-gray-300">
              <Tag class="w-4 h-4 text-blue-400" />
              Prioridad
            </Label>
            <Select v-model="editedTask.priority">
              <SelectTrigger class="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona una prioridad" />
              </SelectTrigger>
              <SelectContent class="bg-gray-800 border-gray-700">
                <SelectItem v-for="priority in priorities" :key="priority.value" :value="priority.value">
                  <div class="flex items-center gap-2">
                    <component :is="priority.icon" class="w-4 h-4" :class="priority.color" />
                    {{ priority.label }}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label for="task-tag-edit" class="flex items-center gap-2 text-gray-300">
              <Tag class="w-4 h-4 text-blue-400" />
              Etiqueta
            </Label>
            <Select v-model="editedTask.tag">
              <SelectTrigger class="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona una etiqueta" />
              </SelectTrigger>
              <SelectContent class="bg-gray-800 border-gray-700">
                <SelectItem v-for="tag in tags" :key="tag.value" :value="tag.value">
                  <div class="flex items-center gap-2">
                    <component :is="tag.icon" class="w-4 h-4" :class="tag.color" />
                    {{ tag.label }}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" class="w-full flex items-center justify-center gap-2 text-lg font-semibold py-6 bg-blue-600 hover:bg-blue-700 text-white">
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { Textarea } from '@/components/ui/textarea'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  import { BookMarked, Edit2, Tag } from 'lucide-vue-next'
  import { useTaskStore } from '@/stores/tasks'
  import type { Task } from '@/interfaces/task'
  import { priorities, tags } from '@/data/constant'
  
  const taskStore = useTaskStore()
  
  const props = defineProps<{
    task: Task
  }>()
  
  const isOpen = ref(false)
  const editedTask = reactive({ ...props.task })
  
  const openDialog = () => {
    editedTask.title = props.task.title
    editedTask.description = props.task.description
    editedTask.priority = props.task.priority
    editedTask.tag = props.task.tag
    isOpen.value = true
  }
  
  const handleUpdateTask = () => {
    taskStore.updateTask(editedTask)
    isOpen.value = false
  }
  </script>
  