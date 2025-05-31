<script setup>

</script>
<template>
    <div class="actions">
        <!-- <NuxtLink href="/cabinet">Кабинет</NuxtLink> -->
        <NuxtLink href="/login">Войти</NuxtLink>
        <NuxtLink href="/register">Регистрация</NuxtLink>
        <!-- <NuxtLink href="/gmail">Почта</NuxtLink> -->
    </div>
</template>
<style scoped>
.actions {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    justify-content: center;
}

.actions a {
    min-width: 200px;
    padding: 7px 14px;
    text-align: center;
    border: 2px solid #00dc82;
    border-radius: 10px;
    color: #00dc82;
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
}
</style>