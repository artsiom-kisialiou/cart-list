<template>
  <div class="main-container">
    <div style="width: 60vw">
      <ItemList></ItemList>
    </div>
    <div style="width: 40vw">
      <Cart></Cart>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cart from "./components/Cart.vue";
import ItemList from "./components/ItemList.vue";
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
  justify-content: space-around;
  align-items: start;
  align-content: center;
}
</style>
