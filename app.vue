<template>
  <div>
    <CartMenu v-if="openCart" @closeCart="(state: boolean) => openCart = state" :cart="cart"/>
    <PageHeader @openCart="(state: boolean) => openCart = state"/>
    <NuxtPage class="mt-[60px]" :cart="cart" @openCart="(state: boolean) => openCart = state"/>
  </div>
</template>

<script setup lang="ts">
  type cartItemType = {
    productId: number,
    quantity: number,
    cachedPrice: number,
  }

  let cart: cartItemType[] = reactive([]);
  let openCart = ref(false);
</script>

<style>
  .oswald {
    font-family: Oswald;
  }
</style>