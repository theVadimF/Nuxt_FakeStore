<template>
  <div v-if="!product_error && product != null" class="p-4 box-border max-w-4xl mx-auto">
    <div class="flex gap-3 layout">
      <div class="flex max-w-xs min-w-[300px] flex-shrink-0 justify-center mx-auto">
        <img class="max-h-96 object-contain" :src="product.image" alt="">
      </div>
      <div class="p-3 box-border">
        <h1 class="font-medium text-xl">{{ product.title }}</h1>
        <div class="flex gap-3 font-light mb-3 items-center">
          <p class="text-xl">${{ product.price.toFixed(2) }}</p>
          <p class="flex gap-[1px] text-xl">{{ product.rating.rate }}/5 <Icon class="self-center text-2xl text-yellow-500" name="ic:round-star"/> ({{ product.rating.count }})</p>
        </div>
        <button v-if="isInCart(product.id)" class="bg-green-800 text-white px-3 py-1 flex gap-1 rounded-xl shadow-md" @click="addToCart(product.id, product.price)"><Icon class="self-center text-xl" name="la:cart-plus"/>Add to cart</button>
          <button v-else class="bg-white text-green-800 outline outline-green-800 px-3 py-1 flex gap-1 rounded-xl shadow-md" @click="$emit('openCart', true)"><Icon class="self-center text-xl" name="la:cart-arrow-down"/>In cart</button>
        <p class="mt-3">{{ product.description }}</p>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center">
    <p class="text-lg p-3 m-4 rounded-xl shadow-xl flex items-center bg-gray-300 text-red-500 box-border">Unable to load product info. Check your internet connection</p>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const {data: product, error: product_error} = await useFetch<ProductType>(`https://fakestoreapi.com/products/${route.params.id}`)

  const props = defineProps({
    cart: { type: Array as ()=> CartType[], required: true },
  })

  function addToCart(id: number, price: number) {
    props.cart.push(
      {
        productId: id,
        quantity: '1',
        cachedPrice: price,
      })
  }

  function isInCart(id: number) {
    const cartElement = props.cart.find(e => e.productId == id);
    return cartElement === undefined;
  }
</script>

<style scoped>
  @media (max-width: 700px) {
    .layout {
      flex-direction: column;
    }
  }
</style>