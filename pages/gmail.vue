<script setup>
const gmail = useGmailStore()
gmail.get_mails()
</script>
<template>
    <h1>Письма</h1>
</template>