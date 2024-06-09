<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
import { getWeather } from "../services/weather";
import { computed, ref, watch } from "vue";

const { coords, pause, resume } = useGeolocation();
const loaded = ref(false);
const weatherIcon = ref("0");
const temperature = ref(26);

watch(
  () => coords.value,
  (value) => {
    getCurrentWeather(value.latitude, value.longitude);
    pause();
    setTimeout(() => {
      resume();
    }, 10 * 1000);
  }
);

const temperaturePlaceholder = computed(() =>
  new Array(temperature.value.toString().length + 1).join("0")
);

async function getCurrentWeather(lat: number, lon: number) {
  const weatherResponse = await getWeather(lat, lon);
  weatherIcon.value = weatherResponse.icon;
  temperature.value = weatherResponse.temperature;
  loaded.value = true;
}
</script>

<template>
  <div v-if="loaded" class="flex items-center justify-center gap-2">
    <div class="relative">
      <div class="font-SSWeather">{{ weatherIcon }}</div>
      <div class="absolute inset-0 font-SSWeather opacity-10">0</div>
    </div>
    <div class="flex">
      <div class="relative font-SS7C">
        <span>{{ temperature }}</span>
        <div class="absolute inset-0 opacity-10">
          {{ temperaturePlaceholder }}
        </div>
      </div>
      <div class="relative font-SS14C">
        <span>°c</span>
        <div class="absolute inset-0 opacity-10">~~</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
