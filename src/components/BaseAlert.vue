<template>
  <div class="alert">
    <div class="alert__text flex items-center">
      <CircleCheckIcon />
      <h6 class="heading-5">{{ text }}</h6>
    </div>
    <div class="alert__link"></div>
  </div>
</template>

<script setup lang="ts">
  import CircleCheckIcon from "./icons/IconCircleCheck.vue";

  interface Props {
    text: string;
  }

  defineProps<Props>();
</script>

<style lang="scss" scoped>
  .alert {
    padding: 2rem 2.9rem;
    background-color: var(--light-gray);
    border-top: 2px solid var(--accent-color);

    &__text {
      line-height: 0;
      gap: 1.6rem;
    }
  }
</style>
