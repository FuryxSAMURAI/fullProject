<template>
  <div>
    <div class="container__main-history">
      <i class="fa-solid fa-arrow-left fa-sm" style="color: #000000"></i>
      <app-history></app-history>
    </div>
    <div class="container__main-about-block">
      <div class="container__main-about-block-img">
        <img :src="aboutProduct.image" :alt="aboutProduct.title" />
      </div>
      <div class="container__main-about-block-desc">
        <div class="container__main-about-block-desc-title">
          {{ aboutProduct.title }}
        </div>
        <div class="container__main-about-block-desc-description">
          {{ $t("description") }}: {{ aboutProduct.description }}
        </div>
        <div class="container__main-about-block-desc-category">
          {{ $t("category") }}: {{ aboutProduct.category }}
        </div>
        <div class="container__main-about-block-desc-rating">
          <div class="container__main-about-block-desc-rating-rate">
            {{ $t("rate") }}: {{ aboutProduct.rating }}
          </div>
          <div class="container__main-about-block-desc-rating-count">
            {{ $t("count") }}: {{ aboutProduct.rating }}
          </div>
        </div>
        <div class="container__main-about-block-desc-price">
          <div class="container__main-about-block-desc-price-block">
            {{ aboutProduct.price }}$
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
    <app-reviewed></app-reviewed>
  </div>
</template>

<script>
import AppHistory from "../components/AppHistory.vue";
import AppReviewed from "../components/AppReviewed.vue";
export default {
  components: {
    AppHistory,
    AppReviewed,
  },
  data() {
    return {
      aboutProduct: [],
    };
  },
  mounted() {
    console.log("mounted запущено");
    const about = this.$localStorage.get("setAboutProduct");
    console.log("отримано з localStorage:", about);
    if (about) {
      this.aboutProduct = about;
    }
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
