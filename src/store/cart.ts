import { defineStore } from "pinia";
import { ref } from "vue";
import type { ShopItem } from "../types";

export const useCartStore = defineStore("cart", () => {
  const items = ref<ShopItem[]>([]);
  const selectedItems = ref<ShopItem[]>([]);

  const addSelectedItems = (item: ShopItem) => {
    if (selectedItems.value.includes(item)) {
      return;
    } else {
      if (item.P == 0) {
        items.value.splice(items.value.indexOf(item), 1);
      }
      selectedItems.value.map((data: ShopItem, idx: number) => {
        if (data.T === item.T && data.convertedPrice !== item.convertedPrice) {
          selectedItems.value.splice(idx, 1);
        }
      });
      selectedItems.value.push(item);
    }
  };

  const removeSelectedItem = (item: ShopItem) => {
    if (selectedItems.value.length === 0) return;

    if (selectedItems.value.includes(item)) {
      selectedItems.value.map((data: ShopItem, idx: number) => {
        if (data.T === item.T) {
          selectedItems.value.splice(idx, 1);
        }
      });
    }
  };

  return { items, addSelectedItems, selectedItems, removeSelectedItem };
});
