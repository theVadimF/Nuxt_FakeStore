<template>
  <div class="flex justify-between flex-row items-center p-3 ml-auto mr-auto fixed top-0 bg-white w-full z-10">
    <p class="font-normal text-3xl site-name flex items-center"><Icon class="self-center text-4xl" name="la:shopping-bag"/>FakeStore</p>
    <button @click="$emit('openCart', true)"><Icon class="text-3xl" name="la:shopping-cart"/></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  emits: ['openCart']
})
</script>

<style scoped>
  .site-name {
    font-family: Oswald;
  }
</style>