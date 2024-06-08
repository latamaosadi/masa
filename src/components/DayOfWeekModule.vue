<script setup lang="ts">
import { useDateFormat, useNow } from "@vueuse/core";

const dayOfWeek = useDateFormat(useNow(), "ddd");
</script>

<template>
  <div class="relative font-SS14C">
    {{ dayOfWeek }}
    <div class="absolute inset-0 opacity-10">~~~</div>
  </div>
</template>

<style scoped></style>
