<template>
  <div class="fixed bg-black z-10 h-full w-full top-0 bg-opacity-25" @click="$emit('closeCart', false)"></div>
  <div class="fixed bg-white z-20 w-full max-w-xl h-full right-0 top-0 flex flex-col box-border">
    <div class="flex justify-between items-center text-3xl p-3">
      <h1 class="headtext">Cart</h1>
      <button @click="$emit('closeCart', false)"><Icon alt="Close cart" name="material-symbols:close"/></button>
    </div>
    <div class="flex flex-col gap-3 h-full overflow-y-auto box-border p-3">
      <p class="w-full h-full flex justify-center items-center headtext text-5xl text-gray-600" v-if="cart.length === 0">Empty</p>
      <CartItem v-for="product in cart" :item="product" @removeItem="(item) => removeItem(item)" :key="product.productId"/>
    </div>
    <div class="flex items-center gap-2 p-3">
      <button :disabled="cart.length === 0" class="flex items-center px-3 py-1 gap-1 rounded-xl shadow-md" :class="cart.length === 0 ? 'cursor-not-allowed bg-gray-600 text-gray-200' : 'bg-green-800 text-white'"><Icon class="self-center text-xl" name="la:shopping-bag"/>Checkout</button>
      <p class="text-xl font-light">${{ calcTotal() }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { remove } from '@vue/shared';
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  props: {
    cart: {
      type: Object,
      required: true,
    }
  },
  emits: ['closeCart'],
  methods: {
    calcTotal(): string {
      let total = 0;
      this.cart.forEach(element => {
        total += element.cachedPrice * element.quantity;
      });
      return total.toFixed(2);
    },
    removeItem(obj: object) {
      this.cart.splice(this.cart.indexOf(obj), 1);
    } 
  }
})
</script>

<style scoped>
  .headtext {
    font-family: Oswald;
  }
</style>