<template>
  <PageHeader/>
  <ItemGrid :products="products"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  setup () {
    // TODO(vf) Handle fetch fail
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