<template>
  <div>
    <PageHeader/>
    <NuxtPage class="mt-[60px]" :cart="cart" @eventName="test" />
  </div>
</template>

<script setup lang="ts">
  type cartItem = {
    productId: number,
    quantity: number
  }

  let cart: cartItem[] = reactive([]);

  function test() {
    console.log('test')
  }

  // TODO(vf) May not be needed
  function editCart(id: number, qty: number) {
    let cartElement = cart.find(e => e.productId == id);

    // Remove the entry if quantity is set to 0
    if (qty <= 0) {
      if (cartElement === undefined) {
        // TODO(vf) catch
        throw new Error('Attempted to remove a non existing element from cart');
      }
      cart = cart.filter(obj => obj != cartElement);
    }

    if (cartElement === undefined) {
      cart.push({productId: id, quantity: qty});
    } else {
      cartElement.quantity = qty;
    }
    console.log(cart);
  }
</script>

<style scoped>

</style>