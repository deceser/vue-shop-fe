import { defineStore, acceptHMRUpdate } from "pinia";
import { notify } from "@kyvg/vue3-notification";

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

interface State {
  products: Product[];
  isLoading: boolean;
}

export const fetchingProducts = defineStore("products", {
  state: (): State => ({
    products: [],
    isLoading: false,
  }),

  actions: {
    async fetchProducts() {
      try {
        this.isLoading = true;

        const response = await fetch("https://shop-gold-json.vercel.app/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching products ${response.status}`);
        }

        this.products = data;
      } catch (error: any) {
        console.error("Error fetching products:", error);
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

  getters: {
    allProducts: state => state.products,
    singleProduct: state => {
      return (productSlug: string) => state.products.find(product => product.slug === productSlug);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(fetchingProducts, import.meta.hot));
}
