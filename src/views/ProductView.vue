<template>
  <div
    class="load"
    v-if="ProductSlug.isLoading"
  >
    <TheLoader />
  </div>
  <div
    v-else
    class="single-product"
  >
    <!-- PRODUCT IMAGE GALLERY AND INFORMATION -->
    <div class="single-product__heading">
      <ProductImageGallery :image="ProductSlug.productSlug?.image" />
      <ProductInformation :product="ProductSlug?.productSlug" />
    </div>

    <!-- PRODUCT TAB CHANGER -->
    <ProductChangeSelectedTab
      :selected-tab="selectedTab"
      @change-tab="changeActiveTab"
    />

    <!-- PRODUCT DESCRIPTION SECTION -->
    <div
      v-if="selectedTab === 'description'"
      class="single-product__description"
    >
      <p class="heading-5 dark-gray-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien
        tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu
        felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendum sed.
      </p>
    </div>

    <!-- PRODUCT ADDTIONAL INFORMATION SECTION -->
    <div
      v-if="selectedTab === 'additional-information'"
      class="single-product__additional-information"
    >
      <p class="heading-5 flex"><span class="font-bold">Weight:</span> <span class="dark-gray-text">0.3kg</span></p>
      <p class="heading-5 flex">
        <span class="font-bold">Dimensions:</span> <span class="dark-gray-text">15 x 10 x 1 cm</span>
      </p>
      <p class="heading-5 flex">
        <span class="font-bold">Colours:</span> <span class="dark-gray-text">Black, Brown, White</span>
      </p>
      <p class="heading-5 flex"><span class="font-bold">Materials:</span> <span class="dark-gray-text">Metal</span></p>
    </div>

    <!-- PRODUCT REVIEWS SECTION -->
    <div
      v-if="selectedTab === 'reviews'"
      class="single-product__reviews grid"
    >
      <ProductReviewList />
      <ProductReviewForm />
    </div>

    <!-- SIMILAR ITEMS -->

    <section class="similar-items">
      <h3 class="similar-items__heading heading-2">Similar Items</h3>
      <product-card-list>
        <product-card-item
          v-for="product in products"
          :product="product"
        ></product-card-item>
      </product-card-list>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import { fetchingProducts } from "@/stores/FetchingProductStore";
  import { fetchingProductSlug } from "@/stores/GetProductSlug";

  import TheLoader from "@/components/TheLoader.vue";
  import ProductCardList from "@/components/ProductCardList.vue";
  import ProductCardItem from "@/components/ProductCardItem.vue";
  import ProductReviewForm from "@/components/ProductReviewForm.vue";
  import ProductReviewList from "@/components/ProductReviewList.vue";
  import ProductInformation from "@/components/ProductInformation.vue";
  import ProductImageGallery from "@/components/ProductImageGallery.vue";
  import ProductChangeSelectedTab from "@/components/ProductChangeSelectedTab.vue";

  const ProductStore = fetchingProducts();
  const ProductSlug = fetchingProductSlug();

  const route = useRoute();
  const router = useRouter();

  type TabChoices = "description" | "additional-information" | "reviews";
  const selectedTab = ref<TabChoices>("description");

  const changeActiveTab = (tab: TabChoices) => {
    selectedTab.value = tab;
  };

  const products = ref();

  onMounted(async () => {
    const productSlug = route.params.slug as string;
    await ProductSlug.fetchProductBySlug(productSlug);

    await ProductStore.fetchProducts();
    products.value = ProductStore.products.slice(0, 3);

    if (!ProductSlug.productSlug) {
      router.push("/page-not-found");
    }
  });
</script>

<style lang="scss" scoped>
  .loader {
    width: 150px;
    height: 150px;
  }
  .single-product {
    &__heading {
      display: grid;
      margin-top: 6rem;
      gap: 3.1rem;

      @media screen and (min-width: 992px) {
        grid-template-columns: 60% 40%;
      }

      @media screen and (min-width: 1280px) {
        gap: 6.2rem;
      }
    }

    &__additional-information {
      p {
        &:not(:last-child) {
          margin-bottom: 1.2rem;
        }

        gap: 2rem;
      }
    }

    &__reviews {
      gap: 3.9rem 0;

      @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  .similar-items {
    margin-top: 9.6rem;

    &__heading {
      margin-bottom: 4.7rem;
    }
  }

  .load {
    display: flex;
    height: 50vh;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
