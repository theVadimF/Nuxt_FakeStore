<template>
  <div class="flex bg-gray-300 rounded-md items-center shadow-md">
    <button class="btn" @click="$emit('decrease')"><Icon name="la:minus"/></button>
    <input type="number" class="w-[35px] rounded-md my-1 flex text-center shadow-sm" v-model="value">
    <button class="btn" @click="$emit('increase')"><Icon name="la:plus"/></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  props: {
    value: Number,
  },
  emits: ['increase', 'decrease']
})
</script>

<style scoped>

  .btn {
    padding: 2px 8px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>