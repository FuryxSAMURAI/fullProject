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
  SET_COUNTER(state, value) {
    state.cartCount = value;
    if (process.client) {
      localStorage.setItem("counter", value);
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
  addToFav(state, product) {
    const existingFav = state.favorites.find((fav) => fav.id == product.id);
    if (!existingFav) {
      state.favorites.push(product);
    }
    state.favoritesCount = state.favorites.length;
  },
  removeFromCart(state, productId) {
    state.cart = state.cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
    state.cartCount = state.cart.length;
    localStorage.setItem("counter", state.cartCount);
  },
  removeFromFav(state, productId) {
    state.favorites = state.favorites.filter((item) => item.id !== productId);
    state.favoritesCount = state.favorites.length;
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
        commit("SET_COUNTER", parsed.length);
      }
    }
  },
  async loadCounter({ commit }) {
    if (process.client) {
      const saved = localStorage.getItem("counter");
      if (saved !== null) {
        commit("SET_COUNTER", parseInt(saved));
      }
    }
  },
  addToCart({ commit, state }, product) {
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

    localStorage.setItem("cart", JSON.stringify(state.cart));
    commit("SET_COUNTER", state.cart.length);
  }
};

export const getters = {
  products: (state) =>
    state.filteredProducts.length ? state.filteredProducts : state.products,
  getCounter: (state) => state.cartCount,
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
