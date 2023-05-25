<template>
  <div class="content flex justify-between flex-row items-center p-3 ml-auto mr-auto fixed top-0 bg-white w-full">
    <p class="font-normal text-3xl site-name">FakeStore</p>
    <button @click="test"><Icon class="text-3xl" name="la:shopping-cart"/></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  },
  methods: {
    test() {
      console.log('test');
    }
  }
})
</script>

<style scoped>
  .site-name {
    font-family: Oswald;
  }
</style>