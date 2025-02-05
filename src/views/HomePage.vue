<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4 custom-title">All The Beans</h1>
    <div class="mb-4">
      <b-form-input
        v-model="searchTerm"
        placeholder="Search coffee beans..."
      />
    </div>
    <div class="mb-4">
      <b-form-select v-model="filterCountry" class="w-100" :options="countryOptions">
        <option :value="''">All Countries</option>
      </b-form-select>
    </div>
    <b-row class="g-4">
      <b-col
        v-for="bean in filteredBeans"
        :key="bean._id"
        cols="12"
        md="6"
        lg="4"
        class="d-flex align-items-stretch justify-content-center"
      >
        <div class="bean-card">
          <b-card class="h-100 d-flex flex-column shadow-lg">
            <b-img :src="bean.Image" alt="Coffee Bean" class="card-img-top fixed-image" />
            <b-card-body class="d-flex flex-column flex-grow-1">
              <h5 class="card-title">{{ bean.Name }}</h5>
              <ul class="list-unstyled mb-3">
                <li><strong>Cost:</strong> {{ bean.Cost }}</li>
                <li><strong>Country:</strong> {{ bean.Country }}</li>
              </ul>
            </b-card-body>
            <b-button variant="primary" class="mt-auto w-100" @click="redirectToCoffeeDetail(bean)">
              Show Details
            </b-button>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCoffeeStore } from '@/store/coffeeStore'
import type { CoffeeBean } from '@/store/coffeeStore'
import { useRouter } from 'vue-router'

const coffeeStore = useCoffeeStore()
const router = useRouter()

onMounted(async () => {
  await coffeeStore.fetchCoffeeBeans()
})

const searchTerm = ref('')
const filterCountry = ref('')

const countryOptions = computed(() => {
  const countries = new Set<string>()
  coffeeStore.coffeeBeans.forEach((bean: CoffeeBean) => {
    if (bean.Country) countries.add(bean.Country)
  })
  return Array.from(countries).map(country => ({ value: country, text: country }))
})

const filteredBeans = computed(() => {
  let beans = coffeeStore.coffeeBeans

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    beans = beans.filter((bean: CoffeeBean) =>
      bean.Name.toLowerCase().includes(term) ||
      bean.Country.toLowerCase().includes(term) ||
      bean.Cost.toLowerCase().includes(term)
    )
  }

  if (filterCountry.value) {
    beans = beans.filter((bean: CoffeeBean) => bean.Country === filterCountry.value)
  }

  return beans
})

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
  text-transform: uppercase;
  background: linear-gradient(45deg, #f1c27d, #6c4f3d);
  -webkit-background-clip: text;
  color: transparent;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bean-card {
  width: 350px;
}
</style>
