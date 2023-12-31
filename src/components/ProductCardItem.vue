<template>
  <div class="product">
    <div class="product__image position-relative">
      <img
        :src="product.image"
        :alt="product.name"
      />
      <div class="product__badges position-absolute">
        <base-badge v-if="product.discountValue > 0"> -{{ product.discountValue }}% </base-badge>
      </div>
      <div class="product__image--overlay position-absolute flex items-center content-center">
        <base-badge v-if="product.stock === 0">Sold out</base-badge>
        <ul
          v-else
          class="product__icons flex items-center flex-center"
        >
          <li class="product__icon">
            <base-button @click="addProductToCart">
              <CartIcon />
            </base-button>
          </li>
          <li class="product__icon">
            <base-button @click="viewProduct(product.slug)">
              <EyeIcon />
            </base-button>
          </li>
          <li class="product__icon">
            <base-button @click="addProductToFavorite()">
              <HeartIcon
                v-if="isFavorite(product.slug)"
                type="filled"
              />
              <HeartIcon
                v-else
                type="no-filled"
              />
            </base-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="product__details">
      <h3 class="product__name heading-3">{{ product.name }}</h3>
      <p class="product__price heading-4 accent-text">$ {{ product.price }}, 00</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";

  import useCartStore from "../stores/CartStore";
  import { useFavoriteStore } from "@/stores/FavoriteStore";

  import EyeIcon from "./icons/IconEye.vue";
  import CartIcon from "./icons/IconCart.vue";
  import HeartIcon from "./icons/IconHeart.vue";

  interface Product {
    image: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    discountValue: number;
    variant: string;
    slug: string;
    isFavorite?: boolean;
  }

  interface Props {
    product: Product;
  }

  const CartStore = useCartStore();
  const FavoriteStore = useFavoriteStore();

  const { addItemToFavorite, isFavorite } = FavoriteStore;

  const addProductToFavorite = () => {
    addItemToFavorite(props.product);
  };

  const props = defineProps<Props>();
  const router = useRouter();

  const viewProduct = (slug: string) => {
    router.push({ name: "product-slug", params: { slug } });
  };

  const addProductToCart = () => {
    CartStore.addItemToCart(props.product.slug, 1);
  };
</script>

<style lang="scss" scoped>
  .product {
    width: 100%;

    &__image {
      margin-bottom: 0.6rem;
      position: relative;

      @media screen and (min-width: 600px) {
        margin-bottom: 2.4rem;
      }

      img {
        height: auto;
        width: 100%;

        object-fit: cover;

        border-radius: 20px;
        background: #e0e0e0;
        box-shadow: -7px 7px 14px #b5b5b5, 7px -7px 14px #ffffff;
      }

      &--overlay {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
        height: 99%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        transform: translateY(2rem);
        transition: all 0.2s;
      }
    }

    &:hover {
      .product__image--overlay {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__icons {
      gap: 3rem;
    }

    &__name {
      margin-bottom: 0.4rem;

      @media screen and (min-width: 600px) {
        margin-bottom: 1.6rem;
      }
    }

    &__badges {
      top: 1rem;
      left: 1rem;
    }
  }
</style>
