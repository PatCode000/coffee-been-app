// store/coffeeStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

interface CoffeeBean {
  _id: string
  index: number
  isBOTD: boolean
  Cost: string
  Image: string
  colour: string
  Name: string
  Description: string
  Country: string
}

export const useCoffeeStore = defineStore('coffeeStore', {
  state: () => ({
    coffeeBeans: [] as CoffeeBean[],
  }),

  actions: {
    async fetchCoffeeBeans() {
      try {
        const response = await axios.get('/data/AllTheBeans.json');
        this.coffeeBeans = response.data;
      } catch (error) {
        console.error('Error fetching coffee beans:', error);
      }
    },
  },
});
