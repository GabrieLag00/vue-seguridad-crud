import { AlertTriangle, Clock, BookMarked, Briefcase, User } from 'lucide-vue-next'
import profileImage from '@/assets/fotoperfil.jpg'
// Prioridades
export const priorities = [
  { value: 'alta', label: 'Alta', color: 'bg-red-500', icon: AlertTriangle },
  { value: 'media', label: 'Media', color: 'bg-yellow-500', icon: Clock },
  { value: 'baja', label: 'Baja', color: 'bg-green-500', icon: BookMarked },
]

// Etiquetas
export const tags = [
  { value: 'trabajo', label: 'Trabajo', icon: Briefcase, color: 'bg-blue-500' },
  { value: 'personal', label: 'Personal', icon: User, color: 'bg-purple-500' },
  { value: 'urgente', label: 'Urgente', icon: AlertTriangle, color: 'bg-red-500' },
]

// Fotos de Perfil
// Ruta de la Foto de Perfil
export const profilePhoto = 'assets/fotodeperfil.jpg'

// Usuario Ficticio
export const fictitiousUser = {
  name: 'Gabriel David',
  profilePhoto: profileImage,
}