<template>
  <b-navbar toggleable="lg" variant="dark" class="bg-brown">
    <div class="container d-flex justify-content-between align-items-center w-100">
      <div class="d-flex align-items-center">
        <b-nav-item @click="goBack" class="d-flex align-items-center">
          <i class="bi bi-cup-straw" style="font-size: 1.5rem"></i>
        </b-nav-item>
      </div>
      <div class="d-flex align-items-center">
        <b-nav-item @click="redirectToBasket" class="d-flex align-items-center">
          <i class="bi bi-cart3" style="font-size: 1.5rem"></i>
          <span v-if="basketItems.length" class="badge bg-light text-dark ms-2">
            {{ basketItems.length }}
          </span>
        </b-nav-item>
      </div>
    </div>
  </b-navbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const basketStore = useBasketStore()
const basketItems = computed(() => basketStore.getBasketItems())

const redirectToBasket = () => {
  router.push('/basket').catch((err) => {
    console.error('Navigation error to basket:', err)
  })
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.bg-brown {
  background-color: #6c4f3d !important; /* Coffee brown background color */
}
</style>
