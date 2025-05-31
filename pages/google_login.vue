<script setup>
import { useAuthStore } from '../stores/auth.ts'
const authStore = useAuthStore()

// Принимаем код из параметра запроса
const route = useRoute();
authStore.code = route.query.code;
if (authStore.code) {
    console.log('Это код', authStore.code);
    authStore.token = await authStore.getAccessToken();
    console.log('Я получил токен', authStore.token);
    if (authStore.token) {
        authStore.dataUser = await authStore.getUserInformationFromGoogle();
        authStore.$patch({
            isAuthenticated: true
        })
        await navigateTo('/chat')
    }
}

</script>
<template></template>
