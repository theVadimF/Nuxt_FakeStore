<template>
  <MainHeader/>
  <ItemGrid :products="products"/>
  <div>
    hello
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  setup () {
    const {data: products} = useFetch('https://fakestoreapi.com/products');
    return {products}
  }
})


</script>

<style>
  .content {
    max-width: 1024px;
  }
</style>