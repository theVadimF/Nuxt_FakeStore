<template>
  <div class="flex">
    <div class="sticky top-[60px] h-fit p-2">
      <h2 class="a text-lg font-medium">Categories</h2>
      <div class="" v-for="cat in categories">
        <input type="checkbox" name="category" v-model="selected_categories" :id="cat" :value="cat">
        <label class="capitalize" for="category">{{ cat }}</label>
      </div>
      <!-- <button @click="filterProducts">Submit</button> -->
    </div>
    <ItemGrid :products="products" :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)" :category_filter="selected_categories"/>
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
    }
  },
  methods: {
    // filterProducts() {
    //   // this.filtered_products = [];
    //   // console.log(this.filtered_products);
    //   console.log(this.products);
    //   // this.products.forEach(element => {
    //   //   console.log(element);
    //   // });
    // }
  },
  emits: ['openCart']
})
</script>

<style scoped>

</style>