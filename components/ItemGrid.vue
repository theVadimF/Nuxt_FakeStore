<template>
  <div class="">
    <div class="gap-3 m-3" :class="grid_view ? 'card-grid' : 'card-list'">
      <div class="" v-for="product in filteredProducts">
        <div class="p-3 bg-white rounded-xl shadow-xl" :class="grid_view ? 'item-grid' : 'item-list'" :key="product.id">
          <img class="flex-shrink-0" :src="product.image" alt="Product thumbnail">
          <div class="flex flex-col gap-1 h-full">
            <p class="font-medium text-lg">{{ product.title }}</p>
            <p class="flex gap-[1px] mt-auto">Rating: {{ product.rating.rate }}/5 <Icon class="self-center text-2xl text-yellow-500" name="ic:round-star"/> ({{ product.rating.count }})</p>
            <div class="flex gap-2 items-center mt-1">
              <button v-if="isInCart(product.id)" class="bg-green-800 text-white px-3 py-1 flex gap-1 rounded-xl shadow-md" @click="addToCart(product.id, product.price)"><Icon class="self-center text-xl" name="la:cart-plus"/>Add to cart</button>
              <button v-else class="bg-white text-green-800 outline outline-green-800 px-3 py-1 flex gap-1 rounded-xl shadow-md" @click="$emit('openCart', true)"><Icon class="self-center text-xl" name="la:cart-arrow-down"/>In cart</button>
              <p class="text-xl font-light">${{ product.price.toFixed(2) }}</p>
            </div>
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
    cart: { type: Array, required: true },
    category_filter: { type: Array, required: true},  // TODO(vf) Check if I can make this optional
    min_price: { type: String },
    max_price: { type: String },
    min_rating: { type: String },
    grid_view: { type: Boolean }
  },
  data() {
    return {
      // grid_view: false,
    }
  },
  methods: {
    addToCart(id: number, price: number) {
      this.cart.push(
        {
          productId: id,
          quantity: 1,
          cachedPrice: price,
        })
    },
    isInCart(id: number) {
      const cartElement = this.cart.find(e => e.productId == id);
      return cartElement === undefined;
    },
    numericFilters(products: any) {  // TODO(vf) fix type
      let min_price = 0;
      let max_price = Infinity;
      let min_rating = 0;
      if (this.min_price != '') {
        min_price = +this.min_price
      }
      if (this.max_price != '') {
        max_price = +this.max_price;
      }
      if (this.min_rating != '') {
        min_rating = +this.min_rating;
      }
      return products.filter(product => product.price >= min_price && product.price <= max_price && product.rating.rate >= min_rating);
    }
  },
  computed: {
    filteredProducts() {
      if (this.category_filter.length == 0) {
        return this.numericFilters(this.products)
      }
      return this.numericFilters(this.products.filter(product => this.category_filter.includes(product.category)))
    }
  },
  emits: ['openCart']
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