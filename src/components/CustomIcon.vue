<script setup>
import { defineProps } from 'vue';
const { icon, bgColor, borderColor } = defineProps(['icon', 'bg-color', 'border-color']);
</script>
<template>
  <v-icon class="customIcon-style" :style="`border: 1px solid ${borderColor}; background-color:${bgColor};`">
    <img :src="icon" alt="">
  </v-icon>
</template>

<style scoped>
.customIcon-style {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0px;
  margin: 0px;
}
</style>
