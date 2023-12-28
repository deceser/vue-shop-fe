import { reactive } from "vue";
import { defineStore } from "pinia";
import { notify } from "@kyvg/vue3-notification";

/*

composition pinia

*/

interface FavoriteProduct {
  image: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  discountValue: number;
  variant: string;
  slug: string;
}

export const useFavoriteStore = defineStore("FavoriteStore", () => {
  const storedFavoriteItems = localStorage?.getItem("favoriteItems");
  const state = reactive<FavoriteProduct[]>(storedFavoriteItems ? JSON.parse(storedFavoriteItems) : []);
  const items = state;

  const saveToLocalStorage = () => {
    localStorage.setItem("favoriteItems", JSON.stringify(items));
  };

  const addItemToFavorite = (item: FavoriteProduct) => {
    const findItemIndex = items.findIndex(e => e.slug === item.slug);

    if (findItemIndex !== -1) {
      items.splice(findItemIndex, 1);
      notify({
        type: "warn",
        text: "Product have been removed from cart successfully!",
        duration: 500,
      });
      saveToLocalStorage();
    } else {
      items.push(item);
      notify({
        type: "success",
        text: "Product have been added to favorite successfully 🎉!",
        duration: 500,
      });
      saveToLocalStorage();
    }
  };

  const isFavorite = (slug: string): boolean => {
    return items.some(o => o.slug === slug);
  };

  return { addItemToFavorite, isFavorite, items };
});
