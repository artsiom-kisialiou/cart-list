<template>
  <div class="accordion-container">
    <div
      role="button"
      class="collapsable-container"
      @click="openContent"
    >
      <h3>{{ props.header }}</h3>
      <div :class="carrotIcon"></div>
    </div>

    <div
      v-if="isOpen"
      style="margin-top: 10px; border-top: 1px solid"
    >
      <slot> <p>No items yet, please reload page...</p> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from "vue";

const props = defineProps({
  header: { type: String, required: true },
});

const isOpen = ref<boolean>(false);

const openContent = () => {
  isOpen.value = !isOpen.value;
};

const carrotIcon = computed(() => {
  return isOpen.value ? "triangle-up" : "triangle-down";
});
</script>

<style scoped>
.accordion-container {
  border: 1px solid grey;
  padding: 0 20px;
  margin: 20px;
  background-color: white;
}

.collapsable-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
}

.triangle-down {
  position: relative;
  top: -5px;
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  border-right: 0.2em solid black;
  border-top: 0.2em solid black;
  transform: rotate(135deg);
  margin-right: 0.5em;
  margin-left: 1em;
}
.triangle-up {
  position: relative;
  top: -5px;
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  border-right: 0.2em solid black;
  border-top: 0.2em solid black;
  transform: rotate(-45deg);
  margin-right: 0.5em;
  margin-left: 1em;
}
</style>
