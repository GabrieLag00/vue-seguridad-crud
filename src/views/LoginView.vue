<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-vue-next";

// Importar componentes de shadcn-vue
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import Label from "@/components/ui/label/Label.vue";
import Alert from "@/components/ui/alert/Alert.vue";

const authStore = useAuthStore();
const router = useRouter();
const message = ref("");
const isLoading = ref(false);
const showPassword = ref(false);

// ✅ Esquema de validación con Yup
const schema = yup.object({
  email: yup
    .string()
    .email("El correo no es válido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

// Iniciamos el formulario con VeeValidate
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await authStore.loginUser(values.email, values.password);
    message.value = response.message;

    if (authStore.token) {
      router.push("/profile"); // Redirigir al perfil si el login es exitoso
    }
  } catch (error) {
    console.error("Login error:", error);
    message.value = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
  } finally {
    isLoading.value = false;
  }
});

const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-background">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl text-center">Iniciar sesión</CardTitle>
        <CardDescription class="text-center">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="login" class="space-y-4">
          <!-- ⚠ Mensaje de error o éxito -->
          <Alert v-if="message" :variant="authStore.token ? 'success' : 'destructive'" class="mb-4">
            {{ message }}
          </Alert>

          <!-- 📧 Correo electrónico -->
          <div class="space-y-2">
            <Label for="email">Correo electrónico</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Field name="email" v-slot="{ field, errorMessage }">
                <Input 
                  id="email"
                  v-bind="field"
                  type="email"
                  placeholder="tu@email.com"
                  class="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errorMessage }"
                />
              </Field>
              <p class="text-sm text-red-500"><ErrorMessage name="email" /></p>
            </div>
          </div>

          <!-- 🔒 Contraseña -->
          <div class="space-y-2">
            <Label for="password">Contraseña</Label>
            <div class="relative">
              <Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Field name="password" v-slot="{ field, errorMessage }">
                <Input 
                  id="password"
                  v-bind="field"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••"
                  class="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errorMessage }"
                />
              </Field>
              <button 
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="!showPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
              <p class="text-sm text-red-500"><ErrorMessage name="password" /></p>
            </div>
          </div>

          <!-- 🚀 Botón de login -->
          <Button type="submit" class="w-full flex items-center justify-center gap-2" :disabled="isLoading">
            <LogIn v-if="!isLoading" class="h-5 w-5" />
            <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? "Procesando..." : "Iniciar sesión" }}
          </Button>
        </form>
      </CardContent>

      <!-- 🔗 Enlace a registro -->
      <CardFooter class="flex flex-col">
        <div class="relative my-2 w-full">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-gray-400">
              ¿No tienes una cuenta?
            </span>
          </div>
        </div>
        <Button variant="outline" class="w-full mt-2" @click="goToRegister">
          Registrarse
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
