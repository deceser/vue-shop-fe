<template>
  <div class="coupon flex space-between">
    <div class="coupon__input">
      <BaseInput
        type="text"
        v-model="couponCode"
        id="coupon"
        placeholder="Coupon Code"
      />
    </div>
    <BaseButton
      text="APPLY COUPON"
      variant="solid-black"
      size="medium"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const couponCode = ref("");
</script>

<style lang="scss" scoped>
  .coupon {
    gap: 2.4rem 2rem;
    flex-direction: column;

    @media screen and (min-width: 768px) {
      align-items: flex-end;
      flex-direction: row;
    }

    @media screen and (min-width: 992px) {
      gap: 2.4rem 2rem;
    }

    &__input {
      flex: 1;
    }
  }
</style>
