<script>
import AppReviewed from "../components/AppReviewed.vue";
export default {
  components: {
    AppReviewed,
  },
  computed: {
    getProduct() {
      return this.$store.state.cart;
    },
  },
  methods: {
    countMinus(product) {
      this.$store.commit("DECREASE_COUNT", product.id);
    },
    countPlus(product) {
      this.$store.commit("INCREASE_COUNT", product.id);
    },
    removeItem(productId) {
      this.$store.commit("removeFromCart", productId);
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
    <div class="container__main-cart-container">
      <div class="container__main-cart-container-lside">
        <div
          class="container__main-cart-container-lside-if"
          v-if="getProduct == 0"
        >
          <div>
            {{ $t("emptyCart") }} 🛒<br />
            {{ $t("emptyCart2") }} 🤔<br />
            {{ $t("emptyCart3") }} 😊<br />
            <i class="fa-solid fa-arrow-right" style="color: #000000"></i>
            <nuxt-link
              class="container__main-favorites-container-if-link"
              to="/"
              >{{ $t("toCatalog") }} 🛍️</nuxt-link
            >
          </div>
        </div>
        <div class="container__main-cart-container-lside-else-blocks" v-else>
          <div
            class="container__main-cart-container-lside-else-block"
            v-for="(product, index) in getProduct"
            :key="index"
          >
            <div
              class="container__main-cart-container-lside-else-block-about"
              @click="showAboutProduct(product)"
            >
              <div class="container__main-cart-container-lside-else-block-img">
                <img :src="product.image" :alt="product.title" />
              </div>
              <div
                class="container__main-cart-container-lside-else-block-title"
              >
                {{ product.title }}
              </div>
            </div>
            <div
              class="container__main-cart-container-lside-else-block-counter"
            >
              <button @click="countMinus(product)">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span>
                {{ product.count }}
              </span>
              <button @click="countPlus(product)">
                <i class="fa-solid fa-plus"></i>
              </button>
              <div>{{ product.total }} $</div>
            </div>
            <div class="container__main-cart-container-lside-else-block-delete">
              <button @click="removeItem(product.id)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container__main-cart-container-rside">
        <div class="container__main-cart-container-rside-form">
          <div class="container__main-cart-container-rside-form-name">
            <label for="name">{{ $t("name") }}</label>
            <input
              type="text"
              id="name"
              :placeholder="$t('specify') + ': ' + $t('name')"
            />
          </div>
          <div class="container__main-cart-container-rside-form-surname">
            <label for="surname">{{ $t("surname") }}</label>
            <input
              type="text"
              id="surname"
              :placeholder="$t('specify') + ': ' + $t('surname')"
            />
          </div>
          <div class="container__main-cart-container-rside-form-address">
            <label for="address">{{ $t("address") }}</label>
            <input
              type="text"
              id="address"
              :placeholder="$t('specify') + ': ' + $t('address')"
            />
          </div>
          <div class="container__main-cart-container-rside-form-build">
            <label for="build">{{ $t("build") }}</label>
            <input
              type="text"
              id="build"
              :placeholder="$t('specify') + ': ' + $t('build')"
            />
          </div>
        </div>
        <div class="container__main-cart-container-rside-total">
          {{ $t("total") }}: {{ $store.getters.cartTotalSum }} $
        </div>
        <div class="container__main-cart-container-rside-buy">
          <button>{{ $t("pay") }}</button>
        </div>
      </div>
    </div>
    <app-reviewed></app-reviewed>
  </div>
</template>
