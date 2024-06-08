<script setup lang="ts">
import { useDateFormat, useNow } from "@vueuse/core";

const dayOfWeek = useDateFormat(useNow(), "ddd");
</script>

<template>
  <div class="clock">
    {{ dayOfWeek }}
  </div>
</template>

<style scoped></style>
