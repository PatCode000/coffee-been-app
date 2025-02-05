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

export default defineComponent({
  setup() {
    const store = useCoffeeStore();
    const route = useRoute();
    const router = useRouter();

    const coffee = computed(() =>
      store.coffeeBeans.find(c => c._id === route.params.id)
    );

    const goBack = () => {
      router.push('/');
    };

    return { coffee, goBack };
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
