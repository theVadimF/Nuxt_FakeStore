<template>
  <div class="">
    <div class="flex items-center gap-0 bg-gray-300 w-fit ml-4 px-3 py-2 rounded-xl text-xl text-gray-500 shadow-md">
      <button class="flex items-center" :class="{'text-black' : !grid_view}" @click="grid_view = false"><Icon name="ph:list-bold"/></button>
      <Icon class="text-black" name="vaadin:line-v"/>
      <button class="flex items-center" :class="{'text-black' : grid_view}" @click="grid_view = true"><Icon name="fluent:grid-24-filled"/></button>
    </div>
    <div class="gap-3 m-3" :class="grid_view ? 'card-grid' : 'card-list'">
      <div class="p-3 bg-white rounded-xl shadow-xl" :class="grid_view ? 'item-grid' : 'item-list'" v-for="product in products" :key="product.id">
        <img class="flex-shrink-0" :src="product.image" alt="Product thumbnail">
        <div class="flex flex-col gap-1 h-full">
          <p class="font-medium text-lg">{{ product.title }}</p>
          <p class="flex gap-[1px] mt-auto">Rating: {{ product.rating.rate }}/5 <Icon class="self-center" name="la:star"/> ({{ product.rating.count }})</p>
          <div class="flex gap-2 items-center mt-1">
            <button class="bg-green-800 text-white px-3 py-1 flex gap-1 rounded-xl shadow-md"><Icon class="self-center" name="la:cart-plus"/>Add to cart</button>
            <p class="text-xl font-light flex">${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  props: {
    products: Object,
  },
  data() {
    return {
      grid_view: false,
    }
  },
  methods: {
    switchView() {
      this.grid_view = !this.grid_view;
    }
  }
})
</script>

<style scoped>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  }

  .card-list {
    display: flex;
    flex-direction: column
  }

  @tailwind components;

  @layer components {
    .item-grid {
      @apply flex flex-col gap-1
    }

    .item-grid img {
      @apply h-[200px] object-contain
    }

    .item-list {
      @apply grid gap-5;
      grid-template-columns: 100px 1fr;
    }

    .item-list img {
      @apply object-contain h-[100px] justify-self-center self-center
    }
  }

</style>