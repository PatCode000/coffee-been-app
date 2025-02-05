import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CoffeeDetailPage from '../views/CoffeeDetailPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const routes = [
  { path: '/', component: HomePage },
  {
    path: '/coffee/:id',
    name: 'coffee', // Add the name here
    component: CoffeeDetailPage,
    props: true,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
