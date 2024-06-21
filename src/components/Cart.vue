<template>
  <div style="margin-top: 20px">
    <table>
      <thead>
        <tr>
          <th>Наименование товара и описание</th>
          <th>Количество</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in selectedItems"
          :key="idx"
        >
          <td>{{ item.T }}</td>
          <td>{{ item.inCart }}</td>
          <td>{{ item.convertedPrice * item.inCart }}</td>
          <td>
            <ActionButton
              text="Delete"
              type="secondary"
              @click="removeItem(item)"
            ></ActionButton>
          </td>
        </tr>
        <tr
          v-if="selectedItems.length > 0"
          style="background-color: white"
        >
          <td>Итого</td>
          <td></td>
          <td></td>
          <td>{{ totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "./../shared/ActionButton.vue";
import { useCartStore } from "./../store/cart";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { ShopItem } from "../types";

const cartStore = useCartStore();
const { removeSelectedItem } = cartStore;
const { selectedItems } = storeToRefs(cartStore);

const totalPrice = computed(() => {
  return selectedItems.value.reduce((acc: number, item: ShopItem) => {
    return acc + Number(item.convertedPrice * item.inCart);
  }, 0);
});

const removeItem = (item: any) => {
  if (item.inCart >= 1) {
    item.P += item.inCart;
    item.inCart = 0;
    removeSelectedItem(item);
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  width: 100%;
}

thead tr {
  border-bottom: 2px solid #ff9100;
  color: #000000;
  text-align: left;
}

td,
th {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #cccccc;
}
</style>
