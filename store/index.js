export const state = () => ({
  products: [],
  aboutProduct: [],
  filteredProducts: [],
  selectedCategories: [],
  priceFilter: 0,
  sortOrder: "asc",
  cart:[],
  favorites:[],
  favoritesCount: 0,
  cartCount: 0 
});

export const mutations = {
  setAboutProduct(state, product) {
    if (state.aboutProduct.length >= 0 || state.aboutProduct.length == 0) {
      state.aboutProduct = [];
      state.aboutProduct.push(product);
    } else {
      state.aboutProduct.push({
        id: "error",
        error: "Товар не зміг під'єднатися :(",
      });
    }
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
  addToCart(state, product) {
    const existingCart = state.cart.find(item => item.id === product.id);
  
    if (!existingCart) {
      state.cart.push({
        ...product,
        count: 1,
        total: product.price,
      });
    }
    state.cartCount = state.cart.length;
  },  
  addToFav(state, product) {
    const existingFav = state.favorites.find(fav => fav.id == product.id)
    let favoriteLike = state.favorites.find(like => like.likes == product.id);
    favoriteLike++
    if(existingFav){
      existingFav.count += 1
    }else{
      state.favorites.push(product)
    }
    state.favoritesCount = state.favorites.length
  },
  removeFromCart(state, productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    state.cartCount -= 1
  },
  removeFromFav(state, productId) {
    state.favorites = state.favorites.filter(item => item.id !== productId);
    state.favoritesCount -= 1
  },
  INCREASE_COUNT(state, productId) {
    const item = state.cart.find(p => p.id === productId);
    if (item) {
      item.count += 1;
      item.total = parseFloat((item.price * item.count).toFixed(2));
    }
  },  
  DECREASE_COUNT(state, productId) {
    const item = state.cart.find(p => p.id === productId);
    if (item && item.count > 1) {
      item.count -= 1;
      item.total = parseFloat((item.price * item.count).toFixed(2));
    }
  }
};

export const actions = {
  async getAPI({ commit }) {
    try {
      const products = await this.$axios.$get(
        "https://fakestoreapi.com/products"
      );
      commit("setProducts", products);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  },
};

export const getters = {
  products: (state) =>
    state.filteredProducts.length ? state.filteredProducts : state.products,
  getMaxCost: (state) => {
    if (state.products.length === 0) return 0;

    const max = Math.max(...state.products.map((product) => product.price));
    return max;
  },
  getMinCost: (state) => {
    if (state.products.length === 0) return 0;

    const min = Math.min(...state.products.map((product) => product.price));
    return min;
  },
  getAboutProduct: (state) => {
    return state.aboutProduct;
  },
  cartTotalSum(state) {
    let value = state.cart.reduce((sum, item) => sum + item.total, 0);
    let rounded = value.toFixed(2);
    return rounded
  }
};
