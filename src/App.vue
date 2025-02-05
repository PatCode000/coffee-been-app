<script setup lang="ts">
import BeansNavbar from '@/components/BeansNavbar.vue'
</script>

<template>
  <div>
    <BeansNavbar />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<style scoped>

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.router-view {
  margin-top: 60px;
}

</style>
