import { defineStore, acceptHMRUpdate } from "pinia";

interface Slug {
  slug: string;
}

interface State {
  productSlug: Slug[];
  isLoading: boolean;
}

export const fetchingProductSlug = defineStore("productSlug", {
  state: (): State => ({
    productSlug: [],
    isLoading: false,
  }),

  actions: {
    async fetchProductBySlug(productSlug: string) {
      try {
        this.isLoading = true;

        const response = await fetch(`https://shop-gold-json.vercel.app/products?slug=${productSlug}`);
        const data = await response.json();

        this.productSlug = data;
      } catch (error) {
        console.error(`Error fetching product with slug ${productSlug}:`, error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(fetchingProductSlug, import.meta.hot));
}
