<template>
  <div class="navigation-sidebar flex flex-column">
    <div class="navigation-sidebar__header">
      <ShoppeLogo />

      <button
        class="button navigation-sidebar__close navigation-cart__close"
        @click="emit('close-menu')"
      >
        &times;
      </button>
    </div>

    <div class="navigation-sidebar__body position-relation">
      <li
        v-for="link in navigation"
        :key="link.path"
      >
        <router-link
          :to="{ name: link.path }"
          class="navigation__link navigation__link--dark heading-6 text-capitalize"
          >{{ link.name }}</router-link
        >
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch } from "vue";
  import { useRoute, RouterLink } from "vue-router";

  import { navigationLinks } from "../utils/data/navigationLinks";

  import ShoppeLogo from "@/components/icons/ShoppeLogo.vue";

  const route = useRoute();

  interface Links {
    name?: string;
    path?: string;
  }

  const navigation: Links[] = navigationLinks;

  const emit = defineEmits(["close-menu"]);

  watch(route, () => {
    emit("close-menu");
  });
</script>

<style lang="scss" scoped>
  .navigation-sidebar {
    background: var(--white-color);
    border: 0.1rem solid var(--gray);
    height: 100vh;
    width: 100%;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 3rem;
    }

    &__close {
      right: 1.6rem;
      top: 1.6rem;
      font-size: 3rem;

      @media screen and (min-width: 480px) {
        display: block;
      }
    }

    &__body {
      overflow: hidden;
      padding-left: 3rem;

      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
</style>
