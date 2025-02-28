<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { computed } from 'vue';
import { LogOut, Mail, UserCircle } from 'lucide-vue-next';
import { fictitiousUser } from '@/data/constant'


// Importar componentes de shadcn-vue
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';

const authStore = useAuthStore();
const router = useRouter();

const userInitial = computed(() => {
  return authStore.user?.email.charAt(0).toUpperCase() || '?';
});

const logout = async () => {
  await authStore.logout();
  router.push("/login"); // Redirigir al login después de cerrar sesión
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-background">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Perfil de Usuario</CardTitle>
        <CardDescription class="text-center">
          Información de tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6">
        <div v-if="authStore.user" class="flex flex-col items-center space-y-4">
          <Avatar class="h-24 w-24">
            <AvatarImage :src="fictitiousUser.profilePhoto" alt="User" />
            <AvatarFallback class="text-2xl font-bold">{{ userInitial }}</AvatarFallback>
          </Avatar>

          <div class="text-center">
            <h2 class="text-xl font-semibold">Bienvenido</h2>
            <p class="text-muted-foreground">{{ authStore.user.email }}</p>
          </div>

          <div class="w-full space-y-2">
            <div class="flex items-center space-x-2 p-2 bg-secondary rounded-md">
              <Mail class="h-5 w-5 text-primary" />
              <span class="text-sm">{{ authStore.user.email }}</span>
            </div>
            <div class="flex items-center space-x-2 p-2 bg-secondary rounded-md">
              <UserCircle class="h-5 w-5 text-primary" />
              <span class="text-sm capitalize">{{ authStore.user.role }}</span>
            </div>
          </div>
        </div>
        <p v-else class="text-center text-muted-foreground">No estás logeado</p>
      </CardContent>

      <CardFooter>
        <Button v-if="authStore.token" @click="logout" variant="destructive" class="w-full">
          <LogOut class="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>