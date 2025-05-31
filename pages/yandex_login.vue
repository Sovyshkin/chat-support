<script setup>
const route = useRoute();

const code = route.query.code; //получаем временный код доступа

const authStore = useAuthStore()

if (code) {
    authStore.setEncodeData(code)
    await authStore.getAccessTokenYa()
    let f = await authStore.getInfoYa()
    if (f) {
        authStore.$patch({
            isAuthenticated: true
        })
        await navigateTo('/chat')
    }
}
</script>
<template></template>