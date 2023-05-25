<template>
  <div class="">
    <ItemGrid :products="products" :cart="$attrs.cart"/>
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
  methods: {
    test(e) {
      console.log(e)
    }
  }
})


</script>

<style>
  .content {
    max-width: 1024px;
  }
</style>