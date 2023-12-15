import { defineStore, acceptHMRUpdate } from "pinia";

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

        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
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
