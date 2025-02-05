<template>
  <div v-if="coffee" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg">
          <img :src="coffee.Image" class="card-img-top" alt="Coffee Image" />
          <div class="card-body">
            <h1 class="card-title text-center">{{ coffee.Name }}</h1>
            <p class="card-text">{{ coffee.Description }}</p>
            <ul class="list-unstyled">
              <li><strong>Cost:</strong> {{ coffee.Cost }}</li>
            </ul>
            <div class="d-flex justify-content-center mt-4">
              <button @click="addToBasket" class="btn btn-primary btn-lg">
                <i class="bi bi-cart-plus"></i> Add to Basket
              </button>
            </div>
            <div class="d-flex justify-content-center mt-2">
              <button @click="goBack" class="btn btn-secondary btn-lg">
                <i class="bi bi-arrow-left-circle"></i> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoffeeStore } from '../store/coffeeStore';
import { useBasketStore } from '../stores/basketStore';

export default defineComponent({
  setup() {
    const store = useCoffeeStore();
    const basketStore = useBasketStore();
    const route = useRoute();
    const router = useRouter();

    const coffee = computed(() =>
      store.coffeeBeans.find(c => c._id === route.params.id)
    );

    const addToBasket = () => {
      if (coffee.value) {
        basketStore.addToBasket(coffee.value);
        alert(`${coffee.value.Name} added to the basket!`);
      }
    };

    const goBack = () => {
      router.push('/');
    };

    return { coffee, addToBasket, goBack };
  }
});
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 400px;
}

.card-title {
  color: #6c4f3d;
  font-weight: 700;
}

.card-body {
  background-color: #f9f9f9;
}

.btn {
  font-size: 1.1rem;
}
</style>
