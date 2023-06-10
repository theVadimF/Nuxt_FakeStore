<template>
  <div class="">
    <ItemBrowser :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)"/>
    <!-- <ItemGrid :products="products" :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)"/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {},
  emits: ['openCart']
})


</script>

<style>
  .content {
    max-width: 1024px;
  }
</style>