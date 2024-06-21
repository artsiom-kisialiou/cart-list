<template>
  <div style="width: 100%">
    <div
      v-for="(category, index) in categories"
      :key="index"
    >
      <CollapsableAccordion :header="category">
        <fieldset style="border: 0">
          <div
            v-for="(item, idx) in items"
            :key="idx"
          >
            <ul
              v-if="item.G === category && item.P > 0"
              style="height: 50px; padding: 0"
            >
              <div class="item-info">
                <div>
                  <ActionButton
                    text="Add"
                    @click="selectValue(item)"
                  ></ActionButton>
                  <span
                    style="margin-left: 5px"
                    :for="idx"
                    >{{ `${item.T} (${item.P})` }}</span
                  >
                </div>
                <div
                  style="text-align: right; width: 100px"
                  :style="updatedPrice ? 'color:red' : 'color:green'"
                  :for="idx"
                >
                  {{ item.convertedPrice }}
                </div>
              </div>
            </ul>
          </div>
        </fieldset>
      </CollapsableAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from "./../data.json";
import names from "./../names.json";

import ActionButton from "./../shared/ActionButton.vue";
import CollapsableAccordion from "./../shared/CollapsableAccordion.vue";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useCartStore } from "../store/cart";
import { storeToRefs } from "pinia";
import type { ShopItem } from "../types";

const cartStore = useCartStore();
const { addSelectedItems } = cartStore;
const { items, selectedItems } = storeToRefs(cartStore);

const categories = ref<string[]>([]);
const currencyRate = ref<number>(50);
const checkInterval = ref(0);
const updatedPrice = ref<boolean>(false);
const itemNames = JSON.parse(JSON.stringify(names));

const checkData = () => {
  checkInterval.value = setInterval(() => {
    mergeData();
    checkDataInStore();
    updateCosts();
  }, 15000);
  return checkInterval;
};

const mergeData = () => {
  const jsonData = JSON.parse(JSON.stringify(data.Value.Goods));
  jsonData.map((item: ShopItem) => {
    return findAndMergeGroupName(item);
  });

  items.value = jsonData;
  categories.value = Object.values(itemNames).map((name: any) => name.G);
};

const checkDataInStore = () => {
  items.value = items.value.map(
    (item: ShopItem) =>
      selectedItems.value.find((selected: ShopItem) => selected.T === item.T) ||
      item
  );
};

const findAndMergeGroupName = (item: ShopItem) => {
  return Object.keys(itemNames).forEach((group) => {
    const groupName = itemNames[group].G;
    const itemsIds = itemNames[group].B;

    item.G == group
      ? ((item.G = groupName), (item.inCart = 0), (item.convertedPrice = 0))
      : null;
    findAndMergeItemName(itemsIds, item);
  });
};

const findAndMergeItemName = (
  itemsIds: Array<{ N: string; T: number }>,
  item: ShopItem
) => {
  return Object.keys(itemsIds).forEach((id: string) => {
    const itemId = itemsIds[<any>id].N;
    item.T == id ? (item.T = itemId) : null;
  });
};

const updateCosts = () => {
  currencyRate.value = Math.floor(Math.random() * 61) + 20;
  items.value.forEach((item: ShopItem) => {
    item.convertedPrice = Number((item.C * currencyRate.value).toFixed(2));
  });
};

const selectValue = (item: any) => {
  if (item.P >= 1) {
    item.P -= 1;
    item.inCart += 1;
    addSelectedItems(item);
    checkDataInStore();
  }
};

watch(currencyRate, (newVal: number, oldValue: number) => {
  newVal > oldValue
    ? (updatedPrice.value = true)
    : (updatedPrice.value = false);
});

onMounted(() => {
  mergeData();
  checkData();
  updateCosts();
});

onUnmounted(() => {
  clearInterval(checkInterval.value);
});
</script>

<style scoped>
.item-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
