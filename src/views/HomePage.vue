<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4 custom-title">All The Beans</h1>
    <b-row class="g-4">
      <b-col
        v-for="bean in coffeeStore.coffeeBeans"
        :key="bean._id"
        cols="12"
        md="6"
        lg="4"
        class="d-flex align-items-stretch"
      >
        <b-card class="h-100 d-flex flex-column shadow-lg">
          <b-img :src="bean.Image" alt="Coffee Bean" class="card-img-top fixed-image" />

          <b-card-body class="d-flex flex-column flex-grow-1">
            <h5 class="card-title">{{ bean.Name }}</h5>
            <b-card-text class="flex-grow-1">{{ bean.Description }}</b-card-text>
            <ul class="list-unstyled mb-3">
              <li><strong>Cost:</strong> {{ bean.Cost }}</li>
              <li><strong>Country:</strong> {{ bean.Country }}</li>
            </ul>
          </b-card-body>

          <b-button variant="primary" class="mt-auto w-100" @click="redirectToCoffeeDetail(bean)">
            Show Details
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoffeeStore } from '@/store/coffeeStore'
import type { CoffeeBean } from '@/store/coffeeStore'

const coffeeStore = useCoffeeStore()

onMounted(async () => {
  await coffeeStore.fetchCoffeeBeans()
})

import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToCoffeeDetail = (bean: CoffeeBean) => {
  console.log('Navigating to coffee details with bean ID:', bean._id)

  router.push({ name: 'coffee', params: { id: bean._id } }).catch((err) => {
    console.error('Navigation error:', err)
  })
}
</script>

<style scoped>
.fixed-image {
  height: 200px;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
}

.h-100 {
  height: 100%;
}

.custom-title {
  font-size: 3rem;
  font-weight: 700;
  color: #6c4f3d;
  text-transform: uppercase;
  background: linear-gradient(45deg, #f1c27d, #6c4f3d);
  -webkit-background-clip: text;
  color: transparent;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
