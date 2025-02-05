import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CoffeeDetailPage from '../views/CoffeeDetailPage.vue'
import BasketPage from '../views/BasketPage.vue'
import OrderForm from '../views/CoffeeOrderForm.vue';

const routes = [
  { path: '/', component: HomePage },
  {
    path: '/coffee/:id',
    name: 'coffee', // Add the name here
    component: CoffeeDetailPage,
    props: true,
  },
  { path: '/basket', component: BasketPage, name: 'basket' },
  { path: '/order-form', component: OrderForm }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
