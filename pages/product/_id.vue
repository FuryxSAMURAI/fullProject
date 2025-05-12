<style lang="scss" scoped>
.container__main {
  &-about-block {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 40px;
    margin: 40px auto;
    &-img {
      margin: 0 40px;
      display: flex;
      justify-content: center;
      img {
        object-fit: contain;
        height: 100%;
        width: 100%;
      }
    }
    &-desc {
      margin: 0 40px;
      &-title {
        margin-top: 40px;
        font-size: 36px;
        font-weight: bold;
      }
      &-description {
        margin-top: 40px;
        font-size: 18px;
      }
      &-category {
        font-size: 18px;
        margin-top: 10px;
      }
      &-price {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        &-block {
          font-size: 28px;
          font-weight: bold;
        }
        &-footer {
          display: flex;
          &-addToFav {
            border: none;
            background-color: transparent;
            margin-right: 20px;
          }
          &-addToCart {
            border: 1px solid #000;
            background-color: transparent;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
          }
        }
      }
      &-rating {
        margin-top: 10px;
        display: flex;
        font-size: 18px;
        &-count {
          margin-left: 40px;
        }
      }
    }
  }
}
</style>

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
            >
              <i class="fa-solid fa-heart fa-2xl" style="color: #000"></i>
            </button>
            <button
              class="container__main-product-block-desc-price-footer-addToCart"
              @click="addToCart(product)"
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
import AppHistory from "~/components/AppHistory.vue";
import AppReviewed from "~/components/AppReviewed.vue";
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
  watch: {
    "$route.params.id"() {
      const product = this.$localStorage.get("setAboutProduct");
      if (product) {
        this.aboutProduct = product;
      }
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
