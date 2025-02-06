<template>
  <Teleport to="body">
    <transition name="fade">
      <div class="notification_modal" v-if="visible">
        <transition name="slide">
          <div v-if="randomBean" class="modal-content">
            <h2>Bean of the day</h2>
            <div class="bean-info">
              <img :src="randomBean.Image" :alt="randomBean.Name" class="featured-image" />
              <p>
                Check out our featured bean:
                <strong>{{ randomBean.Name }}</strong>
              </p>
            </div>
            <div class="buttons">
              <button @click="handleAddToBasket" class="basket-btn">Add to Basket</button>
              <button @click="closeModal" class="close-btn">Close</button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
import type { CoffeeBean } from '@/stores/coffeeStore';

const props = defineProps<{
  visible: boolean
  coffeeBeans: Array<CoffeeBean>
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const basketStore = useBasketStore()

const randomBean = computed(() => {
  if (!props.coffeeBeans || props.coffeeBeans.length === 0) return null
  const randomIndex = Math.floor(Math.random() * props.coffeeBeans.length)
  return props.coffeeBeans[randomIndex]
})

const closeModal = () => {
  emit('update:visible', false)
}

const handleAddToBasket = () => {
  if (randomBean.value) {
    basketStore.addToBasket(randomBean.value)
    closeModal()
  }
}
</script>

<style scoped>
.notification_modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.bean-info {
  margin: 20px 0;
}

.featured-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.basket-btn,
.close-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.basket-btn {
  background-color: #4caf50;
  color: #fff;
}

.basket-btn:hover {
  background-color: #45a045;
}

.close-btn {
  background-color: #6c4f3d;
  color: #fff;
}

.close-btn:hover {
  background-color: #8a5a44;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
}
</style>
