<template>
  <div class="home-page">
    <!-- HEADER SLIDER -->
    <Splide
      class="slider-main"
      :options="sliderOptions"
    >
      <SplideSlide
        v-for="item in 5"
        :key="item"
      >
        <home-slider-item></home-slider-item>
      </SplideSlide>
    </Splide>

    <!-- PRODUCTS LIST -->
    <section class="shop-section">
      <div class="shop-section__heading flex items-center space-between">
        <h2 class="heading-1">Shop The Latest</h2>
        <router-link
          :to="{ name: 'shop' }"
          class="navigation__link navigation__link--accent heading-4"
          >View All
        </router-link>
      </div>
      <product-card-list>
        <ProductCardItemSkeleton
          v-if="products.isLoading"
          v-for="_ in [...Array(6)]"
        >
        </ProductCardItemSkeleton>
        <product-card-item
          v-for="product in products.products"
          :product="product"
        ></product-card-item>
      </product-card-list>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from "vue";
  import { Splide, SplideSlide } from "@splidejs/vue-splide";
  import "@splidejs/vue-splide/css";

  import ProductCardList from "@/components/ProductCardList.vue";
  import ProductCardItem from "@/components/ProductCardItem.vue";
  import HomeSliderItem from "@/components/HomeSliderItem.vue";
  import ProductCardItemSkeleton from "@/components/ProductCardItemSkeleton.vue";

  import { fetchingProducts } from "@/stores/FetchingProductStore";

  const products = fetchingProducts();

  onMounted(async () => {
    await products.fetchProducts();
  });

  const sliderOptions = reactive({
    pauseOnFocus: false,
    arrows: false,
    type: "loop",
    autoplay: true,
    interval: 3000,
    easing: "cubic-bezier(0.42, 0, 0.58, 1)",
    speed: 800,
    classes: {
      pagination: "splide__pagination splide__pagination--home",
    },
  });
</script>

<style lang="scss">
  .shop-section {
    margin-top: 6.4rem;

    &__heading {
      margin-bottom: 3.9rem;
    }
  }

  .slider-main {
    border-radius: 29px;
    background: #e0e0e0;
    box-shadow: -7px 7px 14px #b5b5b5, 7px -7px 14px #ffffff;
  }

  .home-page .splide__pagination--home {
    bottom: 2.6em;
    gap: 1.371rem;

    .splide__pagination__page {
      background: #fff;
      height: 0.91rem;
      width: 0.91rem;
      margin: 0;
      opacity: 1;

      &:hover {
        opacity: 1;
      }

      &.is-active {
        background: none;
        border: 0.1rem solid #fff;
        transform: scale(1.4);
        z-index: 1;
        height: 1.6rem;
        width: 1.6rem;
      }
    }
  }
</style>
