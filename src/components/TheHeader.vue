<template>
  <nav class="navigation flex items-center">
    <div class="navigation__logo">
      <router-link
        :to="{ name: 'index' }"
        class="navigation__link--home"
      >
        <ShoppeLogo />
      </router-link>
    </div>
    <ul class="navigation__links position-relative w-100 items-center space-between">
      <li
        v-for="link in navigationHeader"
        :key="link.path"
        class="navigation__item navigation__item--navbar"
      >
        <router-link
          :to="{ name: link.path }"
          class="navigation__link navigation__link--dark heading-5 text-capitalize"
          >{{ link.name }}</router-link
        >
      </li>
    </ul>
    <ul class="navigation__icons flex items-center space-between w-100">
      <base-button
        @click="goToFavories"
        class="navigation__link flex"
      >
        <IconHeart type="no-filled" />
        <span v-if="favoriteItems.length">
          {{ favoriteItems.length }}
        </span>
      </base-button>
      <base-button>
        <CartIcon @click="toggleCartSideMenu(true)" />
      </base-button>
      <base-button
        class="hide-on-mobile"
        @click="goToDashboard"
      >
        <UserIcon />
      </base-button>
      <base-button class="hide-on-desktop">
        <MenuIcon @click="toggleNavSideMenu(true)" />
      </base-button>
    </ul>
  </nav>
  <teleport to="body">
    <transition
      name="slideIn"
      mode="out-in"
      appear
    >
      <NavigationCartList
        v-if="showCartSideMenu"
        @close-menu="toggleCartSideMenu(false)"
      />
    </transition>

    <transition
      name="slideIn"
      mode="out-in"
      appear
    >
      <NavigationSidebar
        v-if="showNavSideMenu"
        @close-menu="toggleNavSideMenu(false)"
      />
    </transition>
  </teleport>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { storeToRefs } from "pinia";
  import { useRouter, RouterLink } from "vue-router";

  import { useFavoriteStore } from "@/stores/FavoriteStore";

  import { navigationLinks } from "@/utils/data/navigationLinks";

  import CartIcon from "@/components/icons/IconCart.vue";
  import UserIcon from "@/components/icons/IconUser.vue";
  import MenuIcon from "@/components/icons/IconMenu.vue";
  import ShoppeLogo from "@/components/icons/ShoppeLogo.vue";
  import IconHeart from "./icons/IconHeart.vue";

  import NavigationSidebar from "./NavigationSidebar.vue";
  import NavigationCartList from "./NavigationCartList.vue";

  const router = useRouter();
  const FavoriteStore = useFavoriteStore();

  interface Links {
    name?: string;
    path?: string;
  }

  const navigation = ref<Links[]>(navigationLinks);
  const navigationHeader = navigation.value.slice(0, -1);

  const { items } = storeToRefs(FavoriteStore);
  const favoriteItems = items.value;

  const goToDashboard = () => {
    router.push({ name: "auth" });
  };

  const goToFavories = () => {
    router.push({ name: "favorite" });
  };

  const showCartSideMenu = ref(false);
  const showNavSideMenu = ref(false);

  const toggleCartSideMenu = (value: boolean): void => {
    showCartSideMenu.value = value;
  };

  const toggleNavSideMenu = (value: boolean): void => {
    showNavSideMenu.value = value;
  };
</script>

<style lang="scss" scoped>
  .navigation {
    justify-content: space-between;
    padding-bottom: 1.7rem;

    @media screen and (min-width: 768px) {
      justify-content: flex-start;
    }

    &__links {
      max-width: 27rem;
      margin-right: 9.6rem;
      display: none;
      margin-left: auto;

      @media screen and (min-width: 768px) {
        display: flex;
      }

      &::after {
        position: absolute;
        content: "";
        width: 0.1rem;
        height: 1.7rem;
        right: -4.8rem;
        background-color: var(--dark-gray);
      }
    }

    &__icons {
      max-width: 10.4rem;
      gap: 1.6rem;

      @media screen and (min-width: 768px) {
        max-width: 11.8rem;
        gap: 0;
      }

      button {
        line-height: 0;
      }
    }
  }

  .slideIn-enter-active,
  .slideIn-leave-active {
    transition: all 0.2s ease-in;
  }

  .slideIn-enter-from,
  .slideIn-leave-to {
    transform: translate(100%);
  }

  .slideIn-enter-to,
  .slideIn-leave-from {
    transform: translate(0);
  }

  .router-link-exact-active {
    padding-bottom: 0.55rem;
    border-bottom: 2px solid #000;
  }

  .navigation__link--home {
    padding-bottom: 0;
    border: none !important;
  }
</style>
