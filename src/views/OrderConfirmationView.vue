<template>
  <div class="order-confirmation">
    <div
      v-if="!!route.query.newOrder"
      class="order-confirmation__alert"
    >
      <BaseAlert text="We've received your order" />
    </div>
    <div class="order-confirmation__content">
      <div class="order-confirmation__details">
        <OrderDetails />
      </div>
      <div class="order-confirmation__summary">
        <OrderSummary
          order-title="Order Summary"
          :can-place-order="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";

  import OrderSummary from "../components/OrderSummary.vue";
  import OrderDetails from "../components/OrderDetails.vue";

  const route = useRoute();
</script>

<style lang="scss" scoped>
  .order-confirmation {
    &__alert {
      margin-top: 5.4rem;

      @media screen and (min-width: 992px) {
        margin-top: 9.6rem;
      }
    }

    &__content {
      margin-top: 7.1rem;
      display: grid;
      gap: 4.4rem 2rem;

      @media screen and (min-width: 992px) {
        margin-top: 9.6rem;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
</style>
