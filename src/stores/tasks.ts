import { defineStore } from 'pinia';
import type { Task, Priority, Tag } from '@/interfaces/task';
import { ArrowDown, ArrowRight, ArrowUp, Tag as TagIcon } from 'lucide-vue-next';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[], // Cargar desde LocalStorage
    newTask: {
      title: '',
      description: '',
      priority: { value: 'low', label: 'Baja', color: 'bg-green-500', icon: ArrowDown },
      tag: { value: 'personal', label: 'Personal', color: 'bg-blue-500', icon: TagIcon },
    } as Omit<Task, 'id' | 'date'>,
    currentTask: {} as Task | null, // Añadir el estado para la tarea actual a editar
    isEditing: false, // Añadir el estado de edición
  }),

  actions: {
    addTask() {
      const taskWithId = {
        ...this.newTask,
        id: Date.now(),
        date: new Date().toISOString(),
      } as Task;

      this.tasks.push(taskWithId);
      console.log('✅ Nueva tarea agregada:', taskWithId);
      this.newTask = {
        title: '',
        description: '',
        priority: { value: 'low', label: 'Baja', color: 'bg-green-500', icon: ArrowDown },
        tag: { value: 'personal', label: 'Personal', color: 'bg-blue-500', icon: TagIcon },
      } as Omit<Task, 'id' | 'date'>;
    },

    deleteTask(id: number) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
      } else {
        console.warn(`⚠ No se encontró la tarea con id ${id}`);
      }
    },

    updateTask(updatedTask: Task) {
      const taskIndex = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
      } else {
        console.warn(`⚠ No se encontró la tarea con id ${updatedTask.id}`);
      }
    },

    setTask(task: Task) {
      this.currentTask = task;
    },

    setEditing(isEditing: boolean) {
      this.isEditing = isEditing;
    },
  },
});
