<template>
  <div>
    <p v-if="pending" class="w-full h-24 rounded-xl shadow-xl flex items-center justify-center bg-white text-3xl oswald text-gray-500">
      Loading...
    </p>
    <div v-else v-if="product !== null" class="p-3 bg-white rounded-xl shadow-xl item-list grid gap-5">
      <img class="flex-shrink-0 row-span-2 max-h-[100px] justify-self-center self-center image-location" :src="product.image" alt="Product thumbnail">
      <p class="font-medium text-base sm:text-lg row-start-1 col-start-2">{{ product.title }}</p>
      <div class="flex col-end-3 gap-2 items-center mt-auto bottom-location">
        <SpinBox :value="item.quantity" @increase="increase" @decrease="decrease" />
        <p class="text-base sm:text-lg font-light flex">${{ (product.price * item.quantity).toFixed(2) }}</p>
        <button class="text-2xl flex items-center ml-auto" @click="$emit('removeItem', item)"><Icon name="la:trash-alt"/></button>
      </div>
    </div>
    <p v-if="product === null && !pending" class="w-full h-24 rounded-xl shadow-xl flex items-center bg-white text-xl text-red-600 pl-4 box-border">
      Failed load to product data<br/>Check your internet connection
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    }
  })

  const emit = defineEmits();
  const {pending, data: product} = useLazyFetch<ProductType>('https://fakestoreapi.com/products/' + props.item.productId);

  // Update cached price if it differs
  watch(product, (data) => {
    if (data !== undefined && data !== null && props.item.cachedPrice != data.price) {
      props.item.cachedPrice = data.price;
    }
  })

  function increase() {
    let tmp = props.item.quantity + 1
    if (tmp <= 99) {
      props.item.quantity = tmp;
    }
  }

  function decrease() {
    let tmp = props.item.quantity - 1
    if (tmp > 0) {
      props.item.quantity = tmp;
    } else {
      emit('removeItem', props.item);
    }
  }
</script>

<style scoped>
  .item-list {
    grid-template-columns: 100px 1fr;
  }

  .oswald {
    font-family: Oswald;
  }

  .bottom-location {
    grid-row-start: 2;
    grid-column-start: 2;
  }

  @media (max-width: 380px) {
    .item-list {
      grid-template-columns: 50px 1fr;
    }

    .bottom-location {
      grid-row-start: 2;
      grid-column-start: 1;
    }

    .image-location {
      grid-row: span 1
    }
  }
</style>