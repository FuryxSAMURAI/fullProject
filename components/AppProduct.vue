<template>
  <div>
    <div class="container__main-product-blocks">
      <div v-if="Array.isArray(products) && products.length === 0">
        {{ $t("noProducts") }} 😕<br />
        {{ $t("tipForProduct") }} 🔁<br />
      </div>
      <div v-else class="container__main-product-block" v-for="(product, index) in paginatedProducts" :key="index">
        <div @click="handleProductClick(product)">
          <div class="container__main-product-block-image">
            <img v-if="product.image" :src="product.image" :alt="product.title" />
          </div>
          <div class="container__main-product-block-title">
            {{ product.title }}
          </div>
        </div>
        <div class="container__main-product-block-price">
          <div class="container__main-product-block-price-cost">
            {{ product.price }}$
          </div>
          <div class="container__main-product-block-price-footer">
            <div class="container__main-product-block-price-footer-addToFav">
              <add-to-fav :product="product" :sizeIcon="'2xl'"></add-to-fav>
            </div>
            <div class="container__main-product-block-price-footer-addToCart">
              <add-to-cart :product="product" :sizeBtn="'md'"></add-to-cart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" style="border: none;background-color: transparent;">
        <i class="fa-solid fa-arrow-left" style="color: #000000"></i> {{ $t("prev") }}
      </button>
      <span>
        {{ $t("pages") }} {{ currentPage }} {{ $t("of") }} {{ totalPages }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        style="border: none;background-color: transparent;">
        {{ $t("next") }} <i class="fa-solid fa-arrow-right" style="color: #000000"></i>
      </button>
    </div>
  </div>
</template>

<script>
import AddToCart from "~/components/Buttons/AddToCart.vue"
import AddToFav from '~/components/Buttons/AddToFav.vue';
export default {
  props: {
    products: {
      type: Array,
      required: false,
    },
  },
  components: {
    AddToCart,
    AddToFav,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 9,
    };
  },
  computed: {
    paginatedProducts() {
      if (!Array.isArray(this.products)) return [];
      const start = (this.currentPage - 1) * this.perPage;
      return this.products.slice(start, start + this.perPage);
    },
    totalPages() {
      if (!Array.isArray(this.products) || this.products.length === 0) {
        return 1;
      }
      return Math.ceil(this.products.length / this.perPage);
    },

  },
  mounted() {
    const saved = this.$localStorage.get("reviewedProducts");
    if (saved) {
      this.reviewedProducts = saved;
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
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

<style lang="scss" scoped>
.container__main {
  &-product-blocks {
    margin: 0 auto;
    width: 80vw;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }

  &-product-block {
    margin: 0 0 40px 0;
    width: 350px;

    &-image {
      margin: 0 auto;
      object-fit: contain;
      height: 350px;
      width: 260px;

      img {
        height: 100%;
        width: 100%;
      }
    }

    &-title {
      margin: 20px 0;
      font-size: 22px;
      height: 140px;
    }

    &-price {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-cost {
        font-size: 24px;
        font-weight: 600;
      }

      &-footer {
        display: flex;
        align-items: center;
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}
</style>
