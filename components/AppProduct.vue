<template>
  <div>
    <div class="container__main-product-blocks">
      <div v-if="products.length === 0">
        {{ $t("noProducts") }} 😕<br />
        {{ $t("tipForProduct") }} 🔁<br />
      </div>
      <div
        v-else
        class="container__main-product-block"
        v-for="(product, index) in paginatedProducts"
        :key="index"
        @click="showAboutProduct(product), setToReviewed(product)"
      >
        <div>
          <img
            class="container__main-product-block-image"
            v-if="product.image"
            :src="product.image"
            alt="product.title"
          />
          <div class="container__main-product-block-title">
            {{ product.title }}
          </div>
        </div>
        <div class="container__main-product-block-price">
          <div class="container__main-product-block-price-cost">
            {{ product.price }}$
          </div>
          <div class="container__main-product-block-price-footer">
            <button
              class="container__main-product-block-price-footer-addToFav"
              @click="addFavorite(product)"
            >
              <i class="fa-solid fa-heart fa-2xl" style="color: #000"></i>
            </button>
            <button
              class="container__main-product-block-price-footer-addToCart"
              @click="addToCart(product)"
            >
              {{ $t("addToCart") }} <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        « {{ $t("prev") }}
      </button>
      <span
        >{{ $t("pages") }} {{ currentPage }} {{ $t("of") }}
        {{ totalPages }}</span
      >
      <button @click="nextPage" :disabled="currentPage === totalPages">
        {{ $t("next") }} »
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 8,
      countCart: 0,
      reviewedProducts: [],
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.products.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    },
    getProducts() {
      return this.$store.state.products;
    },
    showCart() {
      return this.$store.state.cart;
    },
    showFav() {
      return this.$store.state.favorites;
    },
    cartLength() {
      return this.$store.state.cartCount;
    },
    getLike() {
      return this.$store.state.addLike;
    },
  },
  mounted() {
    const saved = this.$localStorage.get("reviewedProducts");
    if (saved) {
      this.reviewedProducts = saved;
    }
  },
  methods: {
    setToReviewed(product) {
      this.reviewedProducts = this.reviewedProducts.filter(
        (p) => p.id !== product.id
      );
      this.reviewedProducts = [product, ...this.reviewedProducts];
      this.$localStorage.set("reviewedProducts", this.reviewedProducts);
    },
    showAboutProduct(product) {
      this.$router.push("/about");
      this.$localStorage.set("setAboutProduct", product);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    addFavorite(product) {
      this.$store.commit("addToFav", product);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}
</style>
