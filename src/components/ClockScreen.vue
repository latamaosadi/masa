<script setup lang="ts">
import { useTimeoutFn } from "@vueuse/core";
import clsx from "clsx";
import { computed, ref } from "vue";

const isDimmed = ref(false);
const { isPending, start, stop } = useTimeoutFn(() => {
  isDimmed.value = true;
}, 10 * 1000);

const screenContainerClassnames = computed(() =>
  clsx("clock-screen__container", {
    "clock-screen__container--dimmed": isDimmed.value,
  })
);

function wakeUp() {
  isDimmed.value = false;
  stop();
  sleepScreen();
}

function sleepScreen() {
  if (isPending.value) return;
  start();
}
</script>
<template>
  <div :class="screenContainerClassnames" @click="wakeUp">
    <slot />
  </div>
</template>

<style scoped>
.clock-screen__container {
  color: #000;
  overflow: hidden;
  position: relative;
  background-color: #8bac0f;
}
.clock-screen__container::before {
  /* z-index: 2; */
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(/images/grain.svg);
  opacity: 0.7;
  filter: brightness(60%);
  pointer-events: none;
}
.clock-screen__container::after {
  z-index: 3;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-backdrop-filter: blur(0.67px);
  backdrop-filter: blur(0.67px);
  box-shadow: inset 0 0 20px 4px #0000008f;
  pointer-events: none;
  @apply transition-all duration-1000;
}
.clock-screen__container--dimmed::after {
  background: rgba(33, 33, 33, 0.8);
}
</style>
