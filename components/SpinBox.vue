<template>
  <div class="flex bg-gray-300 rounded-md shadow-md items-center">
    <button class="btn" @click="$emit('decrease')"><Icon name="la:minus"/></button>
    <input type="number" min="0" max="99" class="w-[35px] rounded-md my-1 flex text-center shadow-sm" pattern="^(0|[1-9][0-9]{0,1})$" v-model.number="item.quantity" @input="checkValue" @blur="handleBlur">
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
    item: {type: Object as ()=> CartType, required: true},
  },
  emits: ['increase', 'decrease', 'removeItem'],
  methods: {
    handleBlur() {
      if (this.item?.quantity === '') {
        this.item.quantity = '1';
      } else if (this.item?.quantity == '0') {
        this.$emit('removeItem', this.item);
      }
    },
    // There's probable a better way of doing this (pattern attribute does not seem to have an effect in vue)
    checkValue() {
      if (parseInt(this.item.quantity) < 0) {
        this.item.quantity = '1';
      } else if (parseInt(this.item.quantity) > 99) {
        this.item.quantity = '99';
      } else if (this.item.quantity == '-') {
        this.item.quantity = '';
      } else if (this.item.quantity !== ''){
        this.item.quantity = parseInt(this.item.quantity).toString();
      }
    }
  },
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