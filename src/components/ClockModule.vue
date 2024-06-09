<script setup lang="ts">
import { useDateFormat, useNow } from "@vueuse/core";
import { computed, ref } from "vue";

const isRailwayMode = ref(false);
const showSeconds = ref(true);

const counter = useNow();
const clockTimeFormat = computed(() => {
  const separator = counter.value.getSeconds() % 2 ? " " : ":";
  return `${!isRailwayMode.value ? "HH" : "hh"}${separator}mm`;
});

const mainClock = useDateFormat(useNow(), clockTimeFormat);
const seconds = useDateFormat(useNow(), "ss");
const railway = useDateFormat(useNow(), "AA");
</script>

<template>
  <div class="clock">
    <div
      class="relative flex items-center justify-center"
      @click="isRailwayMode = !isRailwayMode"
    >
      <div class="relative font-SS14C clock-railway">
        <div v-if="isRailwayMode">
          <div class="absolute inset-0 opacity-10">~~</div>
          <div>{{ railway }}</div>
        </div>
      </div>
      <div class="relative">
        <div class="absolute inset-0 opacity-10">
          88:88<!--
          --><span v-if="showSeconds" class="clock-seconds">88</span>
        </div>
        <div class="relative">
          {{ mainClock
          }}<!--
          --><span v-if="showSeconds" class="clock-seconds">{{ seconds }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clock {
  font-size: 20vw;
  @apply mx-auto select-none mt-24;
}
.clock-container.landscape .clock {
  @apply m-auto;
}
.clock-seconds {
  font-size: 6vw;
}
.clock-railway {
  width: 8vw;
  font-size: 4vw;
}
</style>
