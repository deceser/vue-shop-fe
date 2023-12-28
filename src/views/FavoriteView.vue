<template>
  <div>
    <product-card-list v-if="favoriteItems.length">
      <product-card-item
        v-for="product in favoriteItems"
        :product="product"
      ></product-card-item>
    </product-card-list>

    <EmptyState
      v-else
      :has-action="true"
      type="shop"
      heading="No product found!"
      message="You haven't saved any favorites yet. Start exploring and add products to your favorites!"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";

  import { useFavoriteStore } from "@/stores/FavoriteStore";

  import ProductCardList from "@/components/ProductCardList.vue";
  import ProductCardItem from "@/components/ProductCardItem.vue";
  import EmptyState from "@/components/EmptyState.vue";

  const favorite = useFavoriteStore();
  const { items } = storeToRefs(favorite);

  const favoriteItems = items.value;
</script>
