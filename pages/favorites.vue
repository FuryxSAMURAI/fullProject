<script>
export default {
  data() {
    return {};
  },
  computed: {
    getFavorite() {
      return this.$store.state.favorites;
    },
  },
  methods: {
    removeItem(productId) {
      this.$store.commit("removeFromFav", productId);
    },
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    addFavorite(product) {
      this.$store.commit("addToFav", product);
    },
    showAboutProduct(product) {
      this.$router.push("/about");
      this.$store.commit("setAboutProduct", product);
    },
  },
};
</script>

<template>
  <div>
    <div class="container__main-favorites-container">
      <div
        class="container__main-favorites-container-if"
        v-if="getFavorite == 0"
      >
        <p>
          {{$t("emptyFav") }} 💔<br />
          {{$t("emptyFav2") }} 💫 🛍️<br />
          <i class="fa-solid fa-arrow-right" style="color: #000000"></i>
          <nuxt-link class="container__main-favorites-container-if-link" to="/"
            >{{$t("toCatalog") }} 🛍️</nuxt-link
          >
        </p>
      </div>
      <div class="container__main-favorites-container-else-blocks" v-else>
        <div
          class="container__main-favorites-container-else-block"
          v-for="(product, index) in getFavorite"
          :key="index"
        >
          <div
            class="container__main-favorites-container-else-block-about"
            @click="showAboutProduct(product)"
          >
            <img
              class="container__main-favorites-container-else-block-img"
              :src="product.image"
              :alt="product.title"
            />
            <div class="container__main-favorites-container-else-block-title">
              {{ product.title }}
            </div>
          </div>
          <div class="container__main-favorites-container-else-block-price">
            {{ product.price }} $
          </div>
          <div class="container__main-favorites-container-else-block-remove">
            <button @click="addToCart(product)" style="margin-right: 20px">
              <i class="fa-solid fa-cart-shopping fa-xl"></i>
            </button>
            <button @click="removeItem(product.id)">
              <i class="fa-solid fa-trash fa-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
