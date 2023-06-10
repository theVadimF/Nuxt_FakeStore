<template>
  <div class="flex">
    <div class="sticky flex flex-col gap-2 top-[60px] h-fit p-2 max-w-[200px]">
      <div class="">
        <h2 class="text-xl font-medium">Categories</h2>
        <div class="flex items-center gap-1" v-for="cat in categories">
          <input type="checkbox" :name="cat" v-model="selected_categories" :id="cat" :value="cat">
          <label class="capitalize" :for="cat">{{ cat }}</label>
        </div>
      </div>
      <div class="">
        <h2 class="a text-xl font-medium">Price</h2>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="min-price">Minimum Price:</label>
          <input class="a rounded-sm bg-gray-300 p-1" min="0" type="number" v-model="min_price" id="min-price" placeholder="0">
          <label class="text-sm" for="max-price">Maximum Price:</label>
          <input class="a rounded-sm bg-gray-300 p-1" min="0" type="number" v-model="max_price" id="max-price" placeholder="max">
        </div>
      </div>
      <div class="">
        <h2 class="a text-xl font-medium">Rating</h2>
        <div class="gap-1">
          <label class="text-sm" for="min-price">Minimum Rating:</label>
          <input class="a rounded-sm bg-gray-300 p-1 w-full" min="0" max="5" type="number" v-model="min_rating" placeholder="0">
        </div>
      </div>
    </div>
    <ItemGrid class="w-full" :products="products" :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)" :category_filter="selected_categories" :min_price="min_price.toString()" :max_price="max_price.toString()" :min_rating="min_rating.toString()"/>
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

  .minmax-grid {
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
  }

  input[type="checkbox"] {
    background-color: white;
    appearance: none;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    display: grid;
    place-content: center;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: rgb(22 101 52 / 1);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
</style>