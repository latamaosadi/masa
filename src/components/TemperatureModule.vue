<script setup lang="ts">
import { useGeolocation, watchOnce } from "@vueuse/core";
import { getWeather } from "../services/weather";
import { ref } from "vue";

const { coords } = useGeolocation();
const loaded = ref(false);
const weatherIcon = ref("0");
const temperature = ref(26);

watchOnce(
  () => coords.value,
  (value) => {
    getCurrentWeather(value.latitude, value.longitude);
  }
);

async function getCurrentWeather(lat: number, lon: number) {
  const weatherResponse = await getWeather(lat, lon);
  weatherIcon.value = weatherResponse.icon;
  temperature.value = weatherResponse.temperature;
  loaded.value = true;
  setTimeout(() => {
    getCurrentWeather(lat, lon);
  }, 5 * 1000);
}
</script>

<template>
  <div v-if="loaded" class="flex items-center gap-2">
    <div class="relative">
      <div class="font-SSWeather">{{ weatherIcon }}</div>
      <div class="absolute inset-0 font-SSWeather opacity-10">0</div>
    </div>
    <div>
      <span class="font-SS7C">{{ temperature }}</span>
      <span class="font-SS14C">°c</span>
    </div>
  </div>
</template>

<style scoped></style>
