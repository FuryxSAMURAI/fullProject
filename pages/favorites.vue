<script>
import AppHistory from "../components/AppHistory.vue";
import AppReviewed from "../components/AppReviewed.vue";
export default {
  components: {
    AppReviewed,
    AppHistory
  },
  data() {
    return {};
  },
  computed: {
    getFavorite() {
      return this.$store.state.favorites;
    },
  },
  mounted() {
    this.$store.dispatch("loadFavFromStorage")
  },
  methods: {
    removeItem(productId) {
      this.$store.commit("removeFromFav", productId);
    },
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
    addFavorite(product) {
      this.$store.dispatch("addToFav", product);
    },
    handleProductClick(product) {
      this.setToReviewed(product);
      this.showAboutProduct(product);
    },
    setToReviewed(product) {
      this.$store.commit("setToReviewed", product)
    },
    showAboutProduct(product) {
      this.$localStorage.set("setAboutProduct", product);
      this.$router.push(`/product/${product.id}`);
    },
  },
};
</script>

<template>
  <div>
    <div class="container__main-history">
      <i class="fa-solid fa-arrow-left fa-sm" style="color: #000000"></i>
      <app-history></app-history>
    </div>
    <div class="container__main-favorites-container">
      <div class="container__main-favorites-container-if" v-if="getFavorite == 0">
        <p>
          {{ $t("emptyFav") }} 💔<br />
          {{ $t("emptyFav2") }} 💫 🛍️<br />
          <i class="fa-solid fa-arrow-right" style="color: #000000"></i>
          <nuxt-link class="container__main-favorites-container-if-link" to="/">
            {{ $t("toCatalog") }} 🛍️</nuxt-link>
        </p>
      </div>
      <div class="container__main-favorites-container-else-blocks" v-else>
        <div class="container__main-favorites-container-else-block" v-for="(product, index) in getFavorite"
          :key="index">
          <div class="container__main-favorites-container-else-block-about" @click="handleProductClick(product)">
            <img class="container__main-favorites-container-else-block-img" :src="product.image" :alt="product.title" />
            <div class="container__main-favorites-container-else-block-title">
              {{ product.title }}
            </div>
          </div>
          <div class="container__main-favorites-container-else-block-price">
            {{ product.price }} $
          </div>
          <div class="container__main-favorites-container-else-block-remove">
            <button @click="addToCart(product)" style="
                margin-right: 20px;
                background-color: transparent;
                border: none;
              ">
              <i class="fa-solid fa-cart-shopping fa-2xl"></i>
            </button>
            <button @click="removeItem(product.id)" style="background-color: transparent; border: none">
              <i class="fa-solid fa-trash fa-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <app-reviewed></app-reviewed>
  </div>
</template>
