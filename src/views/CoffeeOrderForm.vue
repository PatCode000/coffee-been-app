<template>
  <div class="container mt-5">
    <h2 class="text-center">Coffee Bean Order Form</h2>
    <form @submit.prevent="submitOrder">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" v-model="order.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="order.email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Address Number</label>
        <input type="text" v-model="order.address.number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Street</label>
        <input type="text" v-model="order.address.street" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Town</label>
        <input type="text" v-model="order.address.town" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Postcode</label>
        <input type="text" v-model="order.address.postcode" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="mobileNumber" class="form-label">Mobile Number</label>
        <input type="tel" v-model="order.mobileNumber" class="form-control" required />
      </div>
      <h4>Total Price: £{{ totalPrice }}</h4>
      <button type="submit" class="btn btn-primary">Place Order</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const coffeeTypes = ref([
      { id: 1, name: 'Arabica', price: 12.99 },
      { id: 2, name: 'Robusta', price: 9.99 },
      { id: 3, name: 'Liberica', price: 14.99 },
    ])

    const order = ref({
      name: '',
      email: '',
      coffeeType: '',
      address: {
        number: '',
        street: '',
        town: '',
        postcode: '',
      },
      mobileNumber: '',
    })

    const totalPrice = computed(() => {
      const selectedCoffee = coffeeTypes.value.find(
        (coffee) => coffee.name === order.value.coffeeType,
      )
      return selectedCoffee ? selectedCoffee.price.toFixed(2) : '0.00'
    })

    const submitOrder = () => {
      alert(`Thank you, ${order.value.name}! Your order for ${order.value.coffeeType} coffee has been placed.

Delivery Address:
${order.value.address.number} ${order.value.address.street},
${order.value.address.town}, ${order.value.address.postcode}

We will contact you shortly on ${order.value.mobileNumber}.`)
    }

    return { order, coffeeTypes, totalPrice, submitOrder }
  },
})
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
