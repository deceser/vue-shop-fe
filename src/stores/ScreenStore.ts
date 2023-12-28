import { ref } from "vue";
import { defineStore } from "pinia";

type Platform = "desktop" | "tablet" | "mobile";

export const useScreenStore = defineStore("screen", () => {
  const platform = ref<Platform>("desktop");

  const setPlatform = (width: number) => {
    if (width >= 1208) return (platform.value = "desktop");
    if (width >= 768) return (platform.value = "tablet");
    return (platform.value = "mobile");
  };

  return { setPlatform, platform };
});
