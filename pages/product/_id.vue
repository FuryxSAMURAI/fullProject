<style lang="scss" scoped>
.container__main {
  &-about-block {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 40px;
    margin: 40px auto;

    &-img {
      height: 500px;
      margin: 0 60px;
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
          align-items: center;
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
            {{ $t("rate") }}: {{ productRating }}
          </div>
          <div class="container__main-about-block-desc-rating-count">
            {{ $t("count") }}: {{ productRatingCount }}
          </div>
        </div>
        <div class="container__main-about-block-desc-price">
          <div class="container__main-about-block-desc-price-block">
            {{ aboutProduct.price }}$
          </div>
          <div class="container__main-about-block-desc-price-footer">
            <div class="container__main-about-block-desc-price-footer-addToFav">
              <add-to-fav :product="aboutProduct" :sizeIcon="'2xl'"></add-to-fav>
            </div>
            <div class="container__main-about-block-desc-price-footer-addToCart">
              <add-to-cart :product="aboutProduct" :sizeBtn="'lg'"></add-to-cart>
            </div>
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
import AddToCart from "~/components/Buttons/AddToCart.vue"
import AddToFav from "~/components/Buttons/AddToFav.vue"
export default {
  components: {
    AppHistory,
    AppReviewed,
    AddToCart,
    AddToFav
  },
  data() {
    return {
      aboutProduct: [],
    };
  },
  mounted() {
    const about = this.$localStorage.get("setAboutProduct");
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
  computed: {
    productRating() {
      return this.aboutProduct?.rating?.rate ?? '—';
    },
    productRatingCount() {
      return this.aboutProduct?.rating?.count ?? 0;
    },
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
    addFavorite(product) {
      this.$store.dispatch("addToFav", product);
    },
  },
};
</script>
