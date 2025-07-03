import { useAuthStore } from '@/stores/auth';
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    console.log('logined', authStore.isAuthenticated);
    if(authStore.isAuthenticated){
        return navigateTo("/chat")
    }
  })