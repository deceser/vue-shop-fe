<template>
  <div class="navigation-cart flex flex-column">
    <div class="navigation-cart__body position-relation">
      <button
        class="button navigation-cart__close navigation-cart__close--mobile position-absolute"
        @click="emit('close-menu')"
      >
        &#10094;
      </button>
      <button
        class="button navigation-cart__close navigation-cart__close--desktop position-absolute"
        @click="emit('close-menu')"
      >
        &times;
      </button>
      <h5 class="navigation-cart__title heading-5">Shopping bag</h5>
      <p class="navigation-cart__count body-small">{{ CartStore.numberOfProductsInCart }} items</p>
      <div
        v-if="CartStore.productsInCart && CartStore.productsInCart.length > 0"
        class="navigation-cart__products"
      >
        <NavigationCartItem
          v-for="product in CartStore.productsInCart"
          :product="product"
        >
        </NavigationCartItem>
      </div>
      <EmptyState
        v-else
        type="cart"
        heading="Cart is Empty!"
        message="You've added any product to your cart. When You add a product to your cart, they'll show up here."
      />
    </div>

    <div class="navigation-cart__footer">
      <div class="navigation-cart__subtotal flex items-center space-between flex-wrap">
        <p class="heading-5">Subtotal ({{ CartStore.numberOfProductsInCart }} items)</p>
        <p class="heading-5">$ {{ CartStore.totalAmountOfProductsInCart }},00</p>
      </div>
      <div class="navigation-cart__action">
        <router-link
          :to="{ name: 'cart' }"
          class="flex items-center content-center button button--large button--outline-black body-large"
        >
          VIEW CART
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch } from "vue";
  import { useRoute, RouterLink } from "vue-router";

  import EmptyState from "./EmptyState.vue";
  import useCartStore from "@/stores/CartStore";
  import NavigationCartItem from "./NavigationCartItem.vue";

  const route = useRoute();

  const CartStore = useCartStore();

  const emit = defineEmits(["close-menu"]);

  watch(route, () => {
    emit("close-menu");
  });
</script>

<style lang="scss" scoped>
  .navigation-cart {
    background: var(--white-color);

    height: 100vh;
    width: 100%;
    position: fixed;
    right: 0;
    top: 0;
    padding-top: 6rem;
    z-index: 2;

    @media screen and (min-width: 480px) {
      width: 36rem;
      padding-top: 7.2rem;

      margin: 10px;
      height: 98vh;

      border-radius: 15px;
      box-shadow: -7px 7px 14px #b5b5b5ae, 7px -7px 14px #ffffff;
    }

    &__close {
      &--desktop {
        display: none;
        right: 1.6rem;
        top: 1.6rem;
        font-size: 3rem;

        @media screen and (min-width: 480px) {
          display: block;
        }
      }

      &--mobile {
        font-size: 1.8rem;
        top: 2.4rem;

        @media screen and (min-width: 480px) {
          display: none;
        }
      }
    }

    &__body {
      padding: 0 2rem 3.6rem;
      flex: 1 1 calc(100% - 14.9rem);
      overflow-y: scroll;

      @media screen and (min-width: 480px) {
        // padding: 0 3.6rem 3.6rem;
      }
    }

    &__title {
      margin-bottom: 2rem;
      text-align: center;

      @media screen and (min-width: 480px) {
        text-align: left;
        margin-bottom: 1.7rem;
      }
    }

    &__count {
      color: var(--dark-gray);
      margin-bottom: 0.3rem;
    }

    &__footer {
      border-top: 0.1rem solid var(--gray);
      flex: 1 0 14.9rem;
      padding: 1.6rem 2.4rem;

      @media screen and (min-width: 480px) {
        padding: 1.6rem 3.6rem;
      }
    }

    &__subtotal {
      margin-bottom: 2.1rem;
    }
  }
</style>
