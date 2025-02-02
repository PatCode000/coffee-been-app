import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
