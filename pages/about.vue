<template>
  <div>
    <div class="container__main-history">
      <i class="fa-solid fa-arrow-left fa-sm" style="color: #000000"></i>
      <app-history></app-history>
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      class="container__main-about-block"
    >
      <div class="container__main-about-block-img">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="container__main-about-block-desc">
        <div class="container__main-about-block-desc-title">
          {{ product.title }}
        </div>
        <div class="container__main-about-block-desc-description">
          {{ $t("description") }}: {{ product.description }}
        </div>
        <div class="container__main-about-block-desc-category">
          {{ $t("category") }}: {{ product.category }}
        </div>
        <div class="container__main-about-block-desc-rating">
          <div class="container__main-about-block-desc-rating-rate">
            {{ $t("rate") }}: {{ product.rating.rate }}
          </div>
          <div class="container__main-about-block-desc-rating-count">
            {{ $t("count") }}: {{ product.rating.count }}
          </div>
        </div>
        <div class="container__main-about-block-desc-price">
          <div class="container__main-about-block-desc-price-block">
            {{ product.price }}$
          </div>
          <div class="container__main-product-block-desc-price-footer">
            <button
              class="container__main-product-block-desc-price-footer-addToFav"
              @click="addFavorite(product)"
              style="margin-right: 20px"
            >
              <i class="fa-solid fa-heart fa-2xl" style="color: #000"></i>
            </button>
            <button
              class="container__main-product-block-desc-price-footer-addToCart"
              @click="addToCart(product)"
              style="
                background-color: transparent;
                border: 1px solid #000;
                border-radius: 5px;
                width: 10vw;
                padding: 10px 0;
                cursor: pointer;
              "
            >
              {{ $t("addToCart") }}
              <i class="fa-solid fa-cart-shopping" style="color: #000"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHistory from "../components/AppHistory.vue";
export default {
  components: {
    AppHistory,
  },
  computed: {
    products() {
      return this.$store.getters.getAboutProduct;
    },
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    addFavorite(product) {
      this.$store.commit("addToFav", product);
    },
  },
};
</script>
