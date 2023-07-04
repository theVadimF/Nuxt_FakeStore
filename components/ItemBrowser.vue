<template>
  <div class="flex justify-center min-w-full">
    <div class="flex-col gap-2 filter-wrap" :class="show_filters ? 'flex' : 'hidden'">
      <div class="filter-display justify-between items-center text-3xl p-0 mb-2">
        <h1 class="oswald">Filters</h1>
        <button><Icon alt="Close filters" @click="show_filters = false" name="material-symbols:close"/></button>
      </div>
      <div class="">
        <h2 class="text-xl font-medium">Categories</h2>
        <div class="flex items-center gap-1" v-for="cat in categories">
          <input type="checkbox" :name="cat" v-model="selected_categories" :id="cat" :value="cat">
          <label class="capitalize" :for="cat">{{ cat }}</label>
        </div>
      </div>
      <div class="">
        <h2 class="a text-xl font-medium">Price</h2>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="min-price">Minimum Price:</label>
          <input class="a rounded-sm bg-gray-300 p-1" min="0" type="number" v-model="min_price" id="min-price" placeholder="0">
          <label class="text-sm" for="max-price">Maximum Price:</label>
          <input class="a rounded-sm bg-gray-300 p-1" min="0" type="number" v-model="max_price" id="max-price" placeholder="max">
        </div>
      </div>
      <div class="">
        <h2 class="a text-xl font-medium">Rating</h2>
        <div class="gap-1">
          <label class="text-sm" for="min-price">Minimum Rating:</label>
          <input class="a rounded-sm bg-gray-300 p-1 w-full" min="0" max="5" type="number" v-model="min_rating" placeholder="0">
        </div>
      </div>
    </div>
    <div class="">
      <div class="ml-4 flex gap-2">
        <button class="filter-display items-center bg-gray-300 w-fit px-3 py-2 rounded-xl text-md shadow-md ml-3" @click="show_filters = true"><Icon class="text-xl" name="la:filter"/> Filters</button>
        <div class="flex items-center gap-0 bg-gray-300 w-fit px-3 py-2 rounded-xl text-xl text-gray-500 shadow-md">
          <button class="flex items-center" :class="{'text-black' : !grid_view}" @click="grid_view = false"><Icon name="ph:list-bold"/></button>
          <Icon class="text-black" name="vaadin:line-v"/>
          <button class="flex items-center" :class="{'text-black' : grid_view}" @click="grid_view = true"><Icon name="fluent:grid-24-filled"/></button>
        </div>
      </div>
      <ItemGrid class="w-full" :products="products" :cart="$attrs.cart" @openCart="(state) => $emit('openCart', state)" :category_filter="selected_categories" :min_price="min_price.toString()" :max_price="max_price.toString()" :min_rating="min_rating.toString()" :grid_view="grid_view"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  // TODO(vf) Handle fetch fail
  const {data: products} = await useFetch('https://fakestoreapi.com/products');
  const {data: categories} = await useFetch('https://fakestoreapi.com/products/categories')

  let selected_categories = ref([]);
  let min_price = ref('');
  let max_price = ref('');
  let min_rating = ref('');
  let grid_view = ref(false);
  let show_filters = ref(false);
</script>

<style scoped>

  .minmax-grid {
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
  }

  input[type="checkbox"] {
    background-color: white;
    appearance: none;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    display: grid;
    place-content: center;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: rgb(22 101 52 / 1);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  .filter-wrap {
    /* display: none; */
    position: fixed;
    background-color: white;
    z-index: 30;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 1rem;
  }

  .filter-display {
    display: flex;
  }

  @media (min-width: 600px) {
    .filter-wrap {
      z-index: 10;
      display: flex;
      position: sticky;
      top: 60px;
      height: fit-content;
      padding: 0.5rem;
      max-width: 200px;
    }

    .filter-display {
      display: none;
    }
  }
</style>