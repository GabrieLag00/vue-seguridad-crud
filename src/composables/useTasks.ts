import { useTaskStore } from '@/stores/tasks';
import type { Task } from '@/interfaces/task';



export function useTask() {
  const taskStore = useTaskStore();

  const addTask = (newTask: Task) => {
    if (!newTask.title || !newTask.description || !newTask.date) {
      console.error('❌ Por favor completa todos los campos.');
      return;
    }

    taskStore.addTask(newTask);
  };

  return { addTask };
}
