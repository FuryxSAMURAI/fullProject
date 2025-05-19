<template>
  <div>
    <div v-if="reviewedProducts.length != 0" class="container__main-reviewed-wrapper">
      <div class="container__main-reviewed-wrapper-header">
        <div class="container__main-reviewed-wrapper-header-title">
          {{ $t("reviewedProducts") }}:
        </div>
        <div class="container__main-reviewed-wrapper-header-pages">
          {{ currentPage }} {{ $t("of") }} {{ totalPages }}
        </div>
      </div>
      <div class="container__main-reviewed-wrapper-container">
        <div class="container__main-reviewed-wrapper-container-prev">
          <button @click="prev" :disabled="currentIndex === 0">
            <i class="fa-solid fa-arrow-left" style="color: #000000"></i>
          </button>
        </div>
        <div class="container__main-reviewed-wrapper-blocks">
          <div class="container__main-reviewed-wrapper-block" v-for="product in visibleItems" :key="product.id">
            <div @click="handleProductClick(product)">
              <div class="container__main-reviewed-wrapper-block-img">
                <img :src="product.image" :alt="product.title" />
              </div>
              <div class="container__main-reviewed-wrapper-block-title">
                {{ product.title }}
              </div>
            </div>
            <div class="container__main-reviewed-wrapper-block-price">
              <div class="container__main-reviewed-wrapper-block-price-cost">
                {{ product.price }}$
              </div>
              <div class="container__main-reviewed-wrapper-block-price-footer">
                <div class="container__main-reviewed-wrapper-block-price-footer-addToFav">
                  <add-to-fav :product="product" :sizeIcon="'lg'"></add-to-fav>
                </div>
                <div class="container__main-reviewed-wrapper-block-price-footer-addToCart">
                  <add-to-cart :product="product" :display="'no'" :sizeBtn="'md'"></add-to-cart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container__main-reviewed-wrapper-container-next">
          <button @click="next" :disabled="currentIndex + itemsPerPage >= reviewedProducts.length">
            <i class="fa-solid fa-arrow-right" style="color: #000000"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container__main-reviewed-wrapper {
  margin: 40px;

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 40px 0;
  }

  &-header {
    display: flex;
    justify-content: space-between;

    &-title {
      font-size: 18px;
    }
  }

  &-blocks {
    display: flex;
    gap: 20px;
    overflow: hidden;
  }

  &-block {
    // flex: 1 0 auto;
    width: 200px;

    &-img {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      width: 150px;
      margin: 0 auto;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    &-title {
      margin-top: 10px;
      width: 100%;
      height: 60px;
      font-size: 10px;
    }

    &-price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-cost {
        font-size: 16px;
        font-weight: bold;
      }

      &-footer {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

<script>
import AddToCart from "~/components/Buttons/AddToCart.vue";
import AddToFav from "~/components/Buttons/AddToFav.vue";
export default {
  components: {
    AddToCart,
    AddToFav,
  },
  data() {
    return {
      reviewedProducts: [],
      currentIndex: 0,
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  mounted() {
    this.loadProductFromStorage();
    this.updateItemsPerPage();
    window.addEventListener("resize", this.updateItemsPerPage);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateItemsPerPage);
  },
  methods: {
    setToReviewed(product) {
      this.$store.commit("setToReviewed", product)
    },
    showAboutProduct(product) {
      this.$localStorage.set("setAboutProduct", product);
      this.$router.push(`/product/${product.id}`);
    },
    loadProductFromStorage() {
      const saved = this.$localStorage.get("reviewedProducts");
      if (saved) {
        this.reviewedProducts = saved;
        console.log("оновлено товар:", this.aboutProduct);
      }
    },
    updateItemsPerPage() {
      const width = window.innerWidth;
      if (width >= 1200) {
        this.itemsPerPage = this.itemsPerPage;
      } else if (width >= 1024) {
        this.itemsPerPage = 5;
      } else if (width >= 768) {
        this.itemsPerPage = 3;
      } else {
        this.itemsPerPage = 1;
      }
    },
    removeLocal(key) {
      this.$localStorage.remove(key);
    },
    next() {
      if (
        this.currentIndex + this.itemsPerPage <
        this.reviewedProducts.length
      ) {
        this.currentPage++;
        this.currentIndex += this.itemsPerPage;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentPage--;
        this.currentIndex -= this.itemsPerPage;
      }
    },
    handleProductClick(product) {
      this.setToReviewed(product);
      this.showAboutProduct(product);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reviewedProducts.length / this.itemsPerPage);
    },
    visibleItems() {
      return this.reviewedProducts.slice(
        this.currentIndex,
        this.currentIndex + this.itemsPerPage
      );
    },
  },
};
</script>
