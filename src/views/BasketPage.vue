<template>
  <div class="container mt-5">
    <h1 class="text-center">Your Basket</h1>
    <div v-if="basketItems.length === 0" class="alert alert-info text-center">
      Your basket is empty.
    </div>
    <div v-else>
      <div class="list-group">
        <div
          v-for="item in basketItems"
          :key="item.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center">
            <img
              :src="item.image"
              alt="Coffee Bean"
              class="img-thumbnail"
              style="width: 50px; height: 50px; object-fit: cover"
            />
            <span class="ms-3">{{ item.name }} x{{ item.quantity }}</span>
            <button
              @click="increaseQuantity(item.id)"
              class="btn btn-outline-secondary btn-sm ms-2"
            >
              + Add
            </button>
            <button
              @click="decreaseQuantity(item.id)"
              class="btn btn-outline-secondary btn-sm ms-2"
              :disabled="item.quantity <= 1"
            >
              - Remove
            </button>
          </div>
          <div class="d-flex align-items-center">
            <span class="badge bg-primary me-3">{{ getItemTotalPrice(item.id) }}</span>
            <button @click="removeFromBasket(item.id)" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <h3>Total: {{ getTotalBasketPrice() }}</h3>
        <div class="d-flex justify-content-center mt-3">
          <button @click="goBack" class="btn btn-secondary btn-lg me-2">Settle Back</button>
          <button class="btn btn-success btn-lg">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useBasketStore } from '../stores/basketStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const basketStore = useBasketStore()
    const router = useRouter()

    const basketItems = computed(() => basketStore.getBasketItems())
    const totalPrice = computed(() => basketStore.getTotalPrice())

    const removeFromBasket = (itemId: string) => {
      basketStore.removeFromBasket(itemId)
    }

    const increaseQuantity = (itemId: string) => {
      basketStore.updateQuantity(itemId, 1)
    }

    const decreaseQuantity = (itemId: string) => {
      basketStore.updateQuantity(itemId, -1)
    }

    const goBack = () => {
      router.push('/')
    }

    const getItemTotalPrice = (itemId: string) => {
      return '£' + basketStore.getItemTotalPrice(itemId)
    }

    const getTotalBasketPrice = () => {
      return '£' + basketStore.getTotalPrice()
    }

    return {
      basketItems,
      totalPrice,
      removeFromBasket,
      increaseQuantity,
      decreaseQuantity,
      goBack,
      getItemTotalPrice,
      getTotalBasketPrice,
    }
  },
})
</script>

<style scoped>
img {
  max-width: 50px;
  max-height: 50px;
}
</style>
