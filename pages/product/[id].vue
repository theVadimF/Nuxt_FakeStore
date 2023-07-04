<template>
  <div class="p-4 box-border max-w-4xl ml-auto mr-auto">
    <div class="flex gap-3 layout">
      <div class="flex max-w-xs min-w-[300px] flex-shrink-0 justify-center ml-auto mr-auto">
        <img class="max-h-96 object-contain" :src="product.image" alt="">
      </div>
      <div class="p-3 box-border">
        <h1 class="font-medium text-xl">{{ product.title }}</h1>
        <p class="mt-3">{{ product.description }}</p>
        <div class="flex text-xl gap-3 font-light mb-3">
          <p class="">${{ product.price.toFixed(2) }}</p>
          <p class="flex gap-[1px] mt-auto">{{ product.rating.rate }}/5 <Icon class="self-center text-2xl text-yellow-500" name="ic:round-star"/> ({{ product.rating.count }})</p>
        </div>
        <button v-if="isInCart(product.id)" class="bg-green-800 text-white px-3 py-1 flex gap-1 rounded-xl shadow-md" @click="addToCart(product.id, product.price)"><Icon class="self-center text-xl" name="la:cart-plus"/>Add to cart</button>
        <button v-else class="bg-white text-green-800 outline outline-green-800 px-3 py-1 flex gap-1 rounded-xl shadow-md" @click="$emit('openCart', true)"><Icon class="self-center text-xl" name="la:cart-arrow-down"/>In cart</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  async setup () {
    const route = useRoute();
    const {data: product} = await useFetch(`https://fakestoreapi.com/products/${route.params.id}`)
    return {product}
  },
  props: {
    cart: { type: Array, required: true },
  },
  methods: {
    addToCart(id: number, price: number) {
      this.cart.push(
        {
          productId: id,
          quantity: 1,
          cachedPrice: price,
        })
    },
    isInCart(id: number) {
      const cartElement = this.cart.find(e => e.productId == id);
      return cartElement === undefined;
    },
  }
})
</script>

<style scoped>
  @media (max-width: 700px) {
    .layout {
      flex-direction: column;
    }
  }
</style>