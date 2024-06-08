<script setup lang="ts">
import { useDateFormat, useNow } from "@vueuse/core";

const dateOfMonth = useDateFormat(useNow(), "DD/MM");
</script>

<template>
  <div class="relative">
    <div>{{ dateOfMonth }}</div>
    <div class="absolute inset-0 opacity-10">00/00</div>
  </div>
</template>

<style scoped></style>
