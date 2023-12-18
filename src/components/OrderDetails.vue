<template>
  <div class="order-details">
    <h4 class="order-section__title">Order Details</h4>
    <div class="order-details__wrapper">
      <div
        v-for="item in orderData"
        :key="item.type"
        class="order-details__item"
      >
        <h6 class="order-details__item--type heading-5">{{ item.type }}</h6>
        <p
          class="order-details__item--value heading-5"
          :class="[{ address: item.type === 'delivery address' }]"
        >
          {{ item.value }}
        </p>
      </div>
    </div>
  </div>
</template>
w

<script setup lang="ts">
  import { orderDetails } from "../utils/data/orderDetails";

  interface OrderData {
    type: string;
    value: string;
  }

  const orderData: OrderData[] = orderDetails;
</script>

<style lang="scss" scoped>
  .order-details {
    &__wrapper {
      display: grid;

      @media screen and (min-width: 500px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    &__item {
      &:not(:last-child) {
        margin-bottom: 2.2rem;

        @media screen and (min-width: 768px) {
          margin-bottom: 3.9rem;
        }
      }

      &--type {
        text-transform: uppercase;
        margin-bottom: 0.6rem;
      }

      &--value {
        color: var(--dark-gray);

        &.address {
          max-width: 11.9rem;
        }
      }

      &:nth-child(4) {
        grid-row: span 2;
      }
    }
  }
</style>
