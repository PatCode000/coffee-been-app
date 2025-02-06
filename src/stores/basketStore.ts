import { reactive, watchEffect } from 'vue'
import type { CoffeeBean } from '@/stores/coffeeStore'

interface BasketItem {
  id: string
  name: string
  price: string
  quantity: number
  image: string
}

const state = reactive({
  basket: [] as BasketItem[],
})

const saveBasketToLocalStorage = () => {
  localStorage.setItem('basket', JSON.stringify(state.basket))
}

const loadBasketFromLocalStorage = () => {
  const basketData = localStorage.getItem('basket')
  if (basketData) {
    state.basket = JSON.parse(basketData)
  }
}

loadBasketFromLocalStorage()

export const useBasketStore = () => {
  watchEffect(() => {
    saveBasketToLocalStorage()
  })

  const addToBasket = (coffee: CoffeeBean) => {
    const existingItem = state.basket.find((item) => item.id === coffee._id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.basket.push({
        id: coffee._id,
        name: coffee.Name,
        price: coffee.Cost,
        quantity: 1,
        image: coffee.Image,
      })
    }
  }

  const removeFromBasket = (coffeeId: string) => {
    const index = state.basket.findIndex((item) => item.id === coffeeId)
    if (index !== -1) {
      state.basket.splice(index, 1)
    }
  }

  const updateQuantity = (coffeeId: string, amount: number) => {
    const item = state.basket.find((item) => item.id === coffeeId)
    if (item) {
      item.quantity += amount

      if (item.quantity <= 0) {
        removeFromBasket(coffeeId)
      }
    }
  }

  const getBasketItems = () => {
    return state.basket
  }

  const getItemTotalPrice = (itemId: string) => {
    console.log('Searching for itemId:', itemId)
    console.log('Basket:', state.basket)

    const item = state.basket.find((item) => item.id === itemId)

    console.log('Found item:', item)

    if (item) {
      const trimmedPrice = item.price.replace(/[£,]/g, '')
      const price = parseFloat(trimmedPrice)
      if (isNaN(price)) {
        return '0.00'
      }
      return (price * item.quantity).toFixed(2)
    }
    return '0.00'
  }

  const getTotalPrice = () => {
    const total = state.basket.reduce((total, item) => {
      const itemTotal = parseFloat(getItemTotalPrice(item.id))
      return total + (isNaN(itemTotal) ? 0 : itemTotal)
    }, 0)

    return total.toFixed(2)
  }

  return {
    addToBasket,
    removeFromBasket,
    updateQuantity,
    getBasketItems,
    getTotalPrice,
    getItemTotalPrice,
  }
}
