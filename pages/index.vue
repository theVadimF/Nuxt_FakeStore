<template>
  <div class="">
    <ItemGrid :products="products" :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  setup () {
    // TODO(vf) Handle fetch fail
    const {data: products} = useFetch('https://fakestoreapi.com/products');
    return {products}
  },
  emits: ['openCart']
})


</script>

<style>
  .content {
    max-width: 1024px;
  }
</style>