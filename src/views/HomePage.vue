<script setup lang="ts">
import { onMounted } from 'vue';
import { useCoffeeStore } from '@/store/coffeeStore';

const coffeeStore = useCoffeeStore();

onMounted(async () => {
  await coffeeStore.fetchCoffeeBeans();
});
</script>

<template>
  <div>
    <h1>All The Beans</h1>
    <div v-for="bean in coffeeStore.coffeeBeans" :key="bean._id">
      <h2>{{ bean.Name }}</h2>
      <p>{{ bean.Description }}</p>
      <img :src="bean.Image" alt="Coffee Bean" />
      <p><strong>Cost:</strong> {{ bean.Cost }}</p>
      <p><strong>Country:</strong> {{ bean.Country }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
}
</script>
