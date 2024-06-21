<template>
  <button
    :class="buttonClass"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary"].includes(value);
    },
  },
});

const buttonClass = computed(() => {
  return {
    [props.type]: true,
  };
});
</script>

<style scoped>
button {
  padding: 5px 10px;
  font-weight: 500;
}

.primary {
  border: 1px solid rgb(114, 113, 113);
  background-color: white;
  border-radius: 30px;
}

.primary:hover {
  background-color: black;
  color: white;
}

.secondary {
  border: 0;
  background: transparent;
  color: orange;
}

.secondary:hover {
  color: white;
  background: orange;
}
</style>
