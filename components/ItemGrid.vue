<template>
  <div class="card-grid gap-1">
    <div class="flex flex-col gap-1 p-5" v-for="product in products" :key="product.id">
      <img class="h-[200px] object-contain" :src="product.image" alt="">
      <p class="font-medium text-lg">{{ product.title }}</p>
      <p class="mt-auto flex gap-[1px]">Rating: {{ product.rating.rate }}/5 <Icon class="self-center" name="la:star"/> ({{ product.rating.count }})</p>
      <div class="flex gap-2 items-center">
        <button class="bg-green-800 text-white px-2 py-1 flex gap-1"><Icon class="self-center" name="la:cart-plus"/>Add to cart</button>
        <p class="text-lg font-light flex">{{ product.price }}<Icon class="self-center" name="la:dollar-sign"/></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  props: {
    products: Object,
  }
})
</script>

<style scoped>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  }
</style>