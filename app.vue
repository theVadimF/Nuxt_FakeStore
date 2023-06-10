<template>
  <div>
    <CartMenu v-if="openCart" @closeCart="(state) => openCart = state" :cart="cart"/>
    <PageHeader @openCart="(state) => openCart = state"/>
    <NuxtPage class="mt-[60px]" :cart="cart" @openCart="(state) => openCart = state"/>
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
  /* TODO(vf) set header height here and edit the sticky on browser */
</style>