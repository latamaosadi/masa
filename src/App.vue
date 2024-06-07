<script setup lang="ts">
import {
  useDateFormat,
  useFullscreen,
  useNow,
  useScreenOrientation,
  useWakeLock,
} from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { clsx } from "clsx";
import ClockScreen from "./components/ClockScreen.vue";

const isLandscape = computed(() => orientation.value?.includes("landscape"));
const isRailwayMode = ref(false);

const containerClassnames = computed(() =>
  clsx("clock-container", {
    landscape: isLandscape.value,
  })
);

const { toggle } = useFullscreen();

const counter = useNow();
const clockTimeFormat = computed(() => {
  const separator = counter.value.getSeconds() % 2 ? ":" : " ";
  return `${!isRailwayMode.value ? "HH" : "hh"}${separator}mm`;
});

const mainClock = useDateFormat(useNow(), clockTimeFormat);
const seconds = useDateFormat(useNow(), "ss");
const railway = useDateFormat(useNow(), "AA");
const { orientation } = useScreenOrientation();
const { request } = useWakeLock();

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
      <div
        class="clock relative flex items-center"
        @click="isRailwayMode = !isRailwayMode"
      >
        <div class="relative">
          <div class="absolute inset-0 opacity-10">
            88:88
            <span class="clock-seconds">88</span>
          </div>
          <div class="relative">
            {{ mainClock }}
            <span class="clock-seconds">{{ seconds }}</span>
          </div>
        </div>
        <div v-if="isRailwayMode" class="absolute -translate-x-full">
          <div class="relative font-SS14C clock-railway mr-4">
            <div class="absolute inset-0 opacity-10">~~</div>
            <div>{{ railway }}</div>
          </div>
        </div>
      </div>
    </div>
  </ClockScreen>
</template>

<style scoped>
.clock-container {
  @apply relative;
}
.clock-container.landscape {
  @apply h-screen grid;
}
.clock-container .clock {
  font-size: 12vw;
  @apply m-auto select-none;
}
.clock-container .clock-seconds {
  font-size: 6vw;
}
.clock-container .clock-railway {
  font-size: 4vw;
}
</style>
