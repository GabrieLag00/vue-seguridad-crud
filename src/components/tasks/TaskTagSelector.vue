<template>
    <div class="space-y-2">
      <Label class="flex items-center gap-2 text-gray-300">
        <Tag class="w-4 h-4 text-blue-400" />
        Etiquetas
      </Label>
  
      <!-- Lista de etiquetas disponibles -->
      <div class="flex flex-wrap gap-2">
        <Badge 
          v-for="tag in tags" 
          :key="tag.value"
          :class="[tag.color, 'text-white cursor-pointer', selectedTag === tag.value ? 'border-2 border-white' : 'border-transparent']"
          variant="outline"
          @click="selectTag(tag.value)"
        >
          <component :is="tag.icon" class="w-3 h-3 mr-1" />
          {{ tag.label }}
        </Badge>
      </div>
  
      <!-- Botón para abrir el diálogo de creación de etiquetas -->
      <Dialog>
        <DialogTrigger as-child>
          <Button class="mt-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
            <Plus class="w-5 h-5" /> Crear Nueva Etiqueta
          </Button>
        </DialogTrigger>
        <DialogContent class="bg-gray-900 border border-gray-700">
          <DialogHeader>
            <DialogTitle class="text-green-400">Nueva Etiqueta</DialogTitle>
            <DialogDescription class="text-gray-400">
              Escribe el nombre de la etiqueta y elige un color.
            </DialogDescription>
          </DialogHeader>
  
          <!-- Input para el nombre de la etiqueta -->
          <Input v-model="newTag.label" placeholder="Nombre de la etiqueta..." class="bg-gray-700 border-gray-600 text-gray-100" />
  
          <!-- Selección de color -->
          <Label class="text-gray-300">Selecciona un color:</Label>
          <div class="flex gap-2">
            <div 
              v-for="color in colors" 
              :key="color" 
              :class="[color, 'w-8 h-8 rounded-full border-2 border-gray-500 cursor-pointer', newTag.color === color ? 'border-white' : 'hover:border-gray-400']"
              @click="newTag.color = color"
            ></div>
          </div>
  
          <DialogFooter>
            <Button @click="addTag" class="bg-green-600 hover:bg-green-700 text-white">
              Guardar Etiqueta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Badge } from '@/components/ui/badge';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { Button } from '@/components/ui/button';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from '@/components/ui/dialog';
  import { Plus, Tag } from 'lucide-vue-next';
  import { ref, defineEmits } from 'vue';
  
  // Importar etiquetas desde constantes
  import { tags } from '@/data/constant';
  
  // Lista de colores disponibles
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500'];
  
  const emit = defineEmits(['tag-selected']);
  
  // Estado para la etiqueta seleccionada
  const selectedTag = ref<string | null>(null);
  
  // Estado para nueva etiqueta creada
  const newTag = ref({ label: '', color: '' });
  
  // Función para seleccionar una etiqueta existente
  const selectTag = (tagValue: string) => {
    selectedTag.value = tagValue;
    emit('tag-selected', tagValue);
  };
  
  // Función para agregar una nueva etiqueta creada por el usuario
  const addTag = () => {
    if (!newTag.value.label || !newTag.value.color) {
      alert('Debes ingresar un nombre y seleccionar un color.');
      return;
    }
  
    const newTagObject = {
      value: newTag.value.label.toLowerCase().replace(/\s+/g, '-'),
      label: newTag.value.label,
      color: newTag.value.color,
      icon: Tag, // Se usa un ícono por defecto
    };
  
    tags.push(newTagObject);
    newTag.value = { label: '', color: '' }; // Resetear inputs
  };
  </script>
  