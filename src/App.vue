<script setup lang="ts">
import { useFullscreen, useScreenOrientation, useWakeLock } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { clsx } from "clsx";
import ClockScreen from "./components/ClockScreen.vue";
import ClockModule from "./components/ClockModule.vue";
import DateModule from "./components/DateModule.vue";
import DayOfWeekModule from "./components/DayOfWeekModule.vue";
import TemperatureModule from "./components/TemperatureModule.vue";

const isLandscape = computed(() => orientation.value?.includes("landscape"));

const containerClassnames = computed(() =>
  clsx("clock-container", {
    landscape: isLandscape.value,
  })
);

const { toggle } = useFullscreen();

const { request } = useWakeLock();
const { orientation } = useScreenOrientation();

onMounted(() => {
  request("screen");
});
</script>

<template>
  <ClockScreen>
    <div :class="containerClassnames">
      <div class="absolute top-0 right-0">
        <div class="flex gap-4 p-4">
          <!-- <button>
            <img src="./assets/config.svg" alt="" class="size-8" />
          </button> -->
          <button @click="toggle">
            <img src="./assets/maximize.svg" alt="" class="size-8" />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-3 m-auto">
        <ClockModule class="col-span-3" />
        <DateModule class="sub-module" />
        <DayOfWeekModule class="sub-module" />
        <TemperatureModule class="sub-module" />
      </div>
    </div>
  </ClockScreen>
</template>

<style scoped>
.clock-container {
  @apply relative text-zinc-800;
}
.clock-container {
  @apply h-screen grid;
}
.clock-container .sub-module {
  font-size: 6vw;
  @apply text-center;
}
</style>
