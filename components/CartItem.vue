<template>
  <div>
    <p v-if="pending">Loading...</p>
    <div v-else class="p-3 bg-white rounded-xl shadow-xl item-list grid gap-5">
      <img class="flex-shrink-0 max-h-[100px] justify-self-center" :src="product.image" alt="Product thumbnail">
      <p class="font-medium text-base sm:text-lg row-start-1 col-start-2">{{ product.title }}</p>
      <div class="flex col-end-3 gap-2 items-center mt-auto bottom-location">
        <SpinBox :value="item.quantity" @increase="increase" @decrease="decrease" />
        <p class="text-base sm:text-lg font-light flex">${{ (product.price * item.quantity).toFixed(2) }}</p>
        <Button class="text-2xl flex items-center ml-auto"><Icon name="la:trash-alt"/></Button>
      </div>
    </div>
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

  const {pending, data: product} = useLazyFetch('https://fakestoreapi.com/products/' + props.item.productId);

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
      emit('removeId', props.item.productId);
    }
  }

</script>

<style scoped>
  .item-list {
    grid-template-columns: 100px 1fr;
  }

  .bottom-location {
    grid-row-start: 1;
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
  }
</style>