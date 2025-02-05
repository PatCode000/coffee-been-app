<script setup lang="ts">
import HomePage from '@/views/HomePage.vue'

// import CoffeeList from './components/CoffeeList.vue';
</script>

<template>
  <router-view :key="$route.path"></router-view>
</template>
