<script setup lang="ts">
import http from './utils/request';
http.post('playlist/hot').then((res) => {
    console.log('res', res);
});
</script>

<template>
    <router-view></router-view>
</template>
