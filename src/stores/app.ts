import { MaybeRefOrGetter, useLocalStorage } from "@vueuse/core";
import { defineStore, acceptHMRUpdate } from "pinia";

type locationPermissionState = "rejected" | "accepted" | "pending";

export interface IAppState {
  location: MaybeRefOrGetter<locationPermissionState>;
}

export const useAppStore = defineStore("app", {
  state: (): IAppState => ({
    location: useLocalStorage<locationPermissionState>("location", "pending"),
  }),
  getters: {
    locationRequestAccepted(): boolean {
      return this.location !== "pending";
    },
  },
  actions: {
    saveLocationPermission(state: boolean) {
      this.location = !!state ? "accepted" : "rejected";
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
