<template>
  <div class="shop-page page-layout-margin">
    <div class="shop-page__heading flex items-start space-between">
      <h1 class="heading-1 shop-page__title">Shop The Latest</h1>
      <button
        class="shop-page__filter-button button"
        @click="toggleFilterContainer"
      >
        <FilterIcon />
      </button>
    </div>

    <div class="shop-page__wrapper">
      <!-- FILTER -->
      <div
        class="shop-page__filter flex flex-column text-center"
        :class="{ 'shop-page__filter--mobile': showFilterContainer }"
      >
        <p class="heading-1 flex space-between title">
          Filter Products
          <button
            class="button"
            @click="toggleFilterContainer"
          >
            <CloseIcon />
          </button>
        </p>
        <div class="shop-page__search position-relative">
          <BaseInput
            v-model="searchValue"
            id="search"
            type="search"
            placeholder="Search..."
          />
          <div class="shop-page__search-icon position-absolute">
            <SearchIcon />
          </div>
        </div>
        <div class="shop-page__shop-by">
          <BaseSelect
            name="shop-by"
            v-model="shopByOption"
            :options="shopByOptions"
            placeholder="Shop By"
            :has-border="true"
            size="large"
          />
        </div>
        <div class="shop-page__sort-by">
          <BaseSelect
            name="shop-by"
            v-model="sortByOption"
            :options="sortByOptions"
            placeholder="Sort By"
            :has-border="true"
            size="large"
          />
        </div>
        <div class="shop-page__slider">
          <Slider
            v-model="priceRange"
            :min="0"
            :max="100"
            :lazy="false"
            :tooltips="false"
          />
          <p class="body-medium dark-gray-text shop-page__prices text-left">
            Price: ${{ priceRange[0] }} - ${{ priceRange[1] }}
          </p>
        </div>
        <div class="shop-page__on-sale flex items-center space-between">
          <span class="heading-5">On Sale</span>
          <BaseCheckbox
            v-model="onSale"
            type="switch"
            id="on-sale"
          />
        </div>
        <div class="shop-page__in-stock flex items-center space-between">
          <span class="heading-5">In Stock</span>
          <BaseCheckbox
            v-model="inStock"
            type="switch"
            id="in-stock"
          />
        </div>

        <div class="shop-page__apply-filter">
          <BaseButton
            size="large"
            variant="solid-accent"
            text="Apply Filters"
            @click.native="toggleFilterContainer"
          />
        </div>
      </div>
      <!-- PRODUCTS -->
      <div class="shop-page__products">
        <product-card-list v-if="ProductStore.isLoading">
          <ProductCardItemSkeleton
            v-for="_ in [...Array(6)]"
            :key="Math.random()"
          >
          </ProductCardItemSkeleton>
        </product-card-list>

        <product-card-list v-else-if="filteredProducts.length">
          <product-card-item
            v-for="product in filteredProducts"
            :product="product"
            :key="product.slug"
          ></product-card-item>
        </product-card-list>

        <EmptyState
          v-else
          type="shop"
          heading="No product found!"
          message="We could not find any product matching the selected filters. Kindly try out other filters to check out some of our other amazing products."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from "vue";
  import Slider from "@vueform/slider";

  import { fetchingProducts } from "@/stores/FetchingProductStore";

  import { shopByOptions } from "../utils/data/shopByOptions";
  import { sortByOptions } from "../utils/data/sortByOptions";

  import ProductCardList from "@/components/ProductCardList.vue";
  import ProductCardItem from "@/components/ProductCardItem.vue";
  import SearchIcon from "../components/icons/IconSearch.vue";
  import EmptyState from "../components/EmptyState.vue";
  import FilterIcon from "../components/icons/IconFilter.vue";
  import CloseIcon from "../components/icons/IconClose.vue";
  import ProductCardItemSkeleton from "@/components/ProductCardItemSkeleton.vue";

  const ProductStore = fetchingProducts();

  onMounted(async () => {
    await ProductStore.fetchProducts();
  });

  interface Product {
    image: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    discountValue: number;
    variant: string;
    slug: string;
  }

  const searchValue = ref("");
  const shopByOption = ref("");
  const sortByOption = ref("");
  const onSale = ref(false);
  const inStock = ref(false);
  const priceRange = ref([0, 100]);
  const showFilterContainer = ref(false);

  const filterProductsByName = (products: Product[]): Product[] => {
    if (searchValue.value) {
      return [...products].filter(product => product.name.toLowerCase().includes(searchValue.value.toLowerCase()));
    }
    return products;
  };

  const filterProductsByCategory = (products: Product[]): Product[] => {
    if (shopByOption.value) {
      return [...products].filter(product => product.category === shopByOption.value);
    }
    return products;
  };

  const filterProductsByPrice = (products: Product[]): Product[] => {
    return [...products].filter(
      product => product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
    );
  };

  const sortProductsByValue = (products: Product[]): Product[] => {
    if (sortByOption.value) {
      switch (sortByOption.value) {
        case "category":
          return [...products].sort((productOne, productTwo) => (productOne.category > productTwo.category ? 1 : -1));
        case "name":
          return [...products].sort((productOne, productTwo) => (productOne.name > productTwo.name ? 1 : -1));
      }
    }
    return products;
  };

  const productsThatAreInStock = (products: Product[]): Product[] => {
    if (inStock.value) {
      return [...products].filter(product => product.stock > 0);
    }
    return products;
  };

  const productsThatAreOnSale = (products: Product[]): Product[] => {
    if (onSale.value) {
      return [...products].filter(product => product.discountValue > 0);
    }
    return products;
  };

  const filteredProducts = computed(() => {
    return filterProductsByPrice(
      filterProductsByName(
        filterProductsByCategory(
          sortProductsByValue(productsThatAreInStock(productsThatAreOnSale(ProductStore.products)))
        )
      )
    );
  });

  const toggleFilterContainer = () => {
    showFilterContainer.value = !showFilterContainer.value;
  };

  const checkScreenWidth = () => {
    if (window.innerWidth >= 992) {
      showFilterContainer.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener("resize", checkScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenWidth);
  });
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss" scoped>
  .shop-page {
    &__title {
      margin-bottom: 3.9rem;
    }

    &__wrapper {
      display: grid;
      gap: 3.5rem;

      @media screen and (min-width: 992px) {
        grid-template-columns: 26.2rem auto;
      }
    }

    &__filter {
      // background-color: #fff;

      border-radius: 15px;
      box-shadow: -7px 7px 14px #b5b5b5ae, 7px -7px 14px #ffffff;

      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      z-index: 1;
      left: -100%;
      transition: all 0.3s linear;
      padding: 15px;

      @media screen and (min-width: 992px) {
        display: flex;
        flex-direction: column;
        justify-content: center;

        position: sticky;
        height: 60rem;
      }

      &--mobile {
        left: 0;
        background-color: #ffffff;
      }

      .title {
        margin-bottom: 3.9rem;

        @media screen and (min-width: 992px) {
          display: none;
        }
      }
    }

    &__filter-button {
      @media screen and (min-width: 992px) {
        display: none;
      }
    }

    &__search {
      margin-bottom: 3.9rem;

      &-icon {
        top: 0.4rem;
        right: 0;
      }
    }

    &__shop-by {
      margin-bottom: 1.6rem;
    }

    &__sort-by {
      margin-bottom: 3.9rem;
    }

    &__slider {
      margin-bottom: 3.9rem;
    }

    &__on-sale {
      margin-bottom: 4.2rem;
    }

    &__prices {
      margin-top: 2rem;
    }

    &__apply-filter {
      margin-top: auto;

      @media screen and (min-width: 992px) {
        display: none;
      }
    }
  }
</style>
