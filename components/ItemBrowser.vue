<template>
  <div class="flex">
    <div class="sticky top-[60px] h-fit p-2">
      <h2 class="a text-lg font-medium">Categories</h2>
      <div v-for="cat in categories">
        <input type="checkbox" :name="cat" v-model="selected_categories" :id="cat" :value="cat">
        <label class="capitalize" :for="cat">{{ cat }}</label>
      </div>
      <h2 class="a text-lg font-medium">Price</h2>
      <div class="flex gap-1">
        <input class="a rounded-sm bg-gray-300 max-w-[70px] p-1" min="0" type="number" v-model="min_price" placeholder="0">
        <p>-</p>
        <input class="a rounded-sm bg-gray-300 max-w-[70px] p-1" min="0" type="number" v-model="max_price" placeholder="max">
      </div>
      <h2 class="a text-lg font-medium">Rating</h2>
      <input class="a rounded-sm bg-gray-300 max-w-[70px] p-1" min="0" max="5" type="number" v-model="min_rating" placeholder="0">
    </div>
    <ItemGrid :products="products" :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)" :category_filter="selected_categories" :min_price="min_price.toString()" :max_price="max_price.toString()" :min_rating="min_rating.toString()"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    // TODO(vf) Handle fetch fail
    const {data: products} = useFetch('https://fakestoreapi.com/products');
    const {data: categories} = useFetch('https://fakestoreapi.com/products/categories')
    return {products, categories}
  },
  data() {
    return {
      selected_categories: reactive([]),
      min_price: ref(''),
      max_price: ref(''),
      min_rating: ref(''),
    }
  },
  emits: ['openCart']
})
</script>

<style scoped>

</style>