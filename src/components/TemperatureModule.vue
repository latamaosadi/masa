<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
import { getWeather } from "../services/weather";
import { computed, onMounted, ref, watch } from "vue";
import { useAppStore } from "../stores/app";

const appStore = useAppStore();
const { coords, pause, resume } = useGeolocation({ immediate: false });
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

onMounted(() => {
  if (appStore.locationRequestAccepted) {
    resume();
  }
});

const showPermissionRequest = computed(() => !appStore.locationRequestAccepted);

const temperaturePlaceholder = computed(() =>
  new Array(temperature.value.toString().length + 1).join("0")
);

async function getCurrentWeather(lat: number, lon: number) {
  const weatherResponse = await getWeather(lat, lon);
  weatherIcon.value = weatherResponse.icon;
  temperature.value = weatherResponse.temperature;
  loaded.value = true;
}

function acceptLocationRequest() {
  appStore.saveLocationPermission(true);
  resume();
}

function rejectLocationRequest() {
  appStore.saveLocationPermission(false);
}
</script>

<template>
  <div>
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
    <Teleport to="body">
      <div v-if="showPermissionRequest" class="location-request__container">
        <div class="location-request__inner-container">
          <div class="space-y-1">
            <h3>Get weather in your location</h3>
            <p class="text-sm text-neutral-400">
              Allow access to your permission location for accurate reading
            </p>
          </div>
          <div class="flex gap-2 items-end justify-end">
            <button
              class="btn btn--secondary"
              @click.prevent="rejectLocationRequest"
            >
              Not Now
            </button>
            <button class="btn" @click.prevent="acceptLocationRequest">
              Enable
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.location-request__container {
  @apply fixed bottom-0 inset-x-0 z-30 font-sans px-4;
}
.location-request__inner-container {
  @apply bg-zinc-800 max-w-xl mx-auto py-2 px-4 mb-4 rounded-md text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-2;
}
.btn {
  @apply py-2 px-4 text-sm bg-blue-600 text-white whitespace-nowrap font-bold rounded transition-all duration-200;
}
.btn:active {
  @apply bg-white/10;
}
.btn--secondary {
  @apply bg-transparent;
}
</style>
