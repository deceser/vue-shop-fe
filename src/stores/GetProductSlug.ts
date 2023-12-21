import { defineStore, acceptHMRUpdate } from "pinia";
import { notify } from "@kyvg/vue3-notification";

interface ProductSlug {
  image: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  discountValue: number;
  variant: string;
  slug: string;
}

interface State {
  productSlug: ProductSlug | null;
  isLoading: boolean;
}

export const fetchingProductSlug = defineStore("productSlug", {
  state: (): State => ({
    productSlug: null,
    isLoading: false,
  }),

  actions: {
    async fetchProductBySlug(productSlug: string) {
      try {
        this.isLoading = true;

        const response = await fetch(`https://shop-gold-json.vercel.app/products?slug=${productSlug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching product ${response.status}`);
        }

        this.productSlug = data.length > 0 ? data[0] : null;
      } catch (error: any) {
        console.error(`Error fetching product with slug ${productSlug}:`, error);
        notify({
          type: "error",
          text: error.message,
          duration: 2000,
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(fetchingProductSlug, import.meta.hot));
}
