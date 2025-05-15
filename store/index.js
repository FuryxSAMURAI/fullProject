export const state = () => ({
  products: [],
  aboutProduct: [],
  filteredProducts: [],
  selectedCategories: [],
  priceFilter: 0,
  sortOrder: "asc",
  cart: [],
  favorites: [],
  favoritesCount: 0,
  cartCount: 0,
});

export const mutations = {
  SET_CART(state, items) {
    state.cart = items;
  },
  ADD_TO_CART(state, product) {
    const existing = state.cart.find((p) => p.id === product.id);

    if (existing) {
      existing.count += 1;
      existing.total = existing.price * existing.count;
    } else {
      state.cart.push({
        ...product,
        count: 1,
        total: product.price,
      });
    }
  },
  SET_COUNTER_CART(state, value) {
    state.cartCount = value;
    if (process.client) {
      localStorage.setItem("counterCart", value);
    }
  },
  SET_FAV(state, items) {
    state.favorites = items;
  },
  ADD_TO_FAV(state, product){
    const existingFav = state.favorites.find((fav) => fav.id == product.id);
    if (!existingFav) {
      state.favorites.push(product);
    }
  },
  SET_COUNTER_FAV(state, value) {
    state.favoritesCount = value;
    if (process.client) {
      localStorage.setItem("counterFav", value);
    }
  },
  setAboutProduct(state, product) {
    state.aboutProduct = [product];
  },
  setProducts(state, products) {
    state.products = products || [];
    state.filteredProducts = products || [];
  },
  setFilteredProducts(state) {
    let filtered = state.products;

    if (state.selectedCategories.length) {
      filtered = filtered.filter((product) =>
        state.selectedCategories.includes(product.category)
      );
    }

    if (state.priceFilter > 0) {
      filtered = filtered.filter(
        (product) => product.price <= state.priceFilter
      );
    }

    if (state.sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    state.filteredProducts = filtered;
  },
  setCategoryFilter(state, categories) {
    state.selectedCategories = categories;
  },
  setPriceFilter(state, price) {
    state.priceFilter = price;
  },
  setSortOrder(state, order) {
    state.sortOrder = order;
  },
  clearFilters(state) {
    state.selectedCategories = [];
    state.priceFilter = 0;
    state.sortOrder = "asc";
    state.filteredProducts = [...state.products];
  },
  removeFromCart(state, productId) {
    state.cart = state.cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
    state.cartCount = state.cart.length;
    localStorage.setItem("counterCart", state.cartCount);
  },
  removeFromFav(state, productId) {
    state.favorites = state.favorites.filter((item) => item.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
    state.favoritesCount = state.favorites.length;
    localStorage.setItem("counterFav", state.favoritesCount);
  },
  INCREASE_COUNT(state, productId) {
    const item = state.cart.find((p) => p.id === productId);
    if (item) {
      item.count += 1;
      item.total = parseFloat((item.price * item.count).toFixed(2));
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  DECREASE_COUNT(state, productId) {
    const item = state.cart.find((p) => p.id === productId);
    if (item && item.count > 1) {
      item.count -= 1;
      item.total = parseFloat((item.price * item.count).toFixed(2));
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
};

export const actions = {
  async getAPI({ commit }) {
    try {
      const products = await this.$axios.$get(
        "https://fakestoreapi.com/products"
      );
      commit("setProducts", products);
    } catch (error) {
      console.error("Помилка при завантаженні товарів:", error);
    }
  },
  async loadCartFromStorage({ commit }) {
    if (process.client) {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        commit("SET_CART", parsed);
        commit("SET_COUNTER_CART", parsed.length);
      }
    }
  },
  async loadFavFromStorage({ commit }) {
    if (process.client) {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        const parsed = JSON.parse(saved);
        commit("SET_FAV", parsed);
        commit("SET_COUNTER_FAV", parsed.length);
      }
    }
  },
  async loadCartCounter({ commit }) {
    if (process.client) {
      const saved = localStorage.getItem("counterCart");
      if (saved !== null) {
        commit("SET_COUNTER_CART", parseInt(saved));
      }
    }
  },
  async loadFavCounter({ commit }) {
    if (process.client) {
      const saved = localStorage.getItem("counterFav");
      if (saved !== null) {
        commit("SET_COUNTER_FAV", parseInt(saved));
      }
    }
  },
  addToCart({ commit, state }, product) {
    commit("ADD_TO_CART", product);

    if (process.client) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      commit("SET_COUNTER_CART", state.cart.length);
    }
  },
  addToFav({ commit, state }, product) {
    commit("ADD_TO_FAV", product);
    if (process.client) {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      commit("SET_COUNTER_FAV", state.favorites.length);
    }
  },
};

export const getters = {
  products: (state) =>
    state.filteredProducts.length ? state.filteredProducts : state.products,
  getCartCounter: (state) => {
    return state.cartCount;
  },
  getFavCounter: (state) => {
    return state.favoritesCount;
  },
  getMaxCost: (state) => {
    if (state.products.length === 0) return 0;
    return Math.max(...state.products.map((product) => product.price));
  },
  getMinCost: (state) => {
    if (state.products.length === 0) return 0;
    return Math.min(...state.products.map((product) => product.price));
  },
  getAboutProduct: (state) => state.aboutProduct,
  cartTotalSum(state) {
    const value = state.cart.reduce((sum, item) => sum + item.total, 0);
    return value.toFixed(2);
  },
};
