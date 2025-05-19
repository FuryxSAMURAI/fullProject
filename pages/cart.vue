<script>
import AppHistory from "../components/AppHistory.vue";
import AppReviewed from "../components/AppReviewed.vue";
import AddToFav from "../components/Buttons/AddToFav.vue"
export default {
  data() {
    return {
      reviewedProducts: [],
    }
  },
  components: {
    AppReviewed,
    AddToFav,
    AppHistory
  },
  computed: {
    getProduct() {
      return this.$store.state.cart;
    },
  },
  mounted() {
    this.$store.dispatch("loadCartFromStorage")
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
  &-cart-container {
    display: flex;
    margin: 0 40px;

    &-lside {
      width: 70vw;
      overflow-y: scroll;
      height: calc(100vh / 1.5);

      &-else-block {
        box-shadow: 0 0 10px #e2e2e2;
        border-radius: 10px;
        margin: 40px 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-about {
          display: flex;
          align-items: center;
        }

        &-img {
          img {
            height: 150px;
            width: 130px;
          }
        }

        &-title {
          margin: 0 40px;
          width: 20vw;
          text-align: left;
        }

        &-counter {
          display: flex;
          align-items: center;
          margin: 0 40px;

          span {
            margin: 0 20px;
            font-size: 24px;
          }

          button {
            background-color: transparent;
            border: 1px solid #000;
            border-radius: 5px;
            padding: 5px;
            transition: all 0.3s ease;
          }

          div {
            margin-left: 20px;
            font-size: 24px;
          }
        }

        &-delete {
          button {
            background-color: transparent;
            border: 1px solid #000;
            border-radius: 5px;
            font-size: 16px;
            padding: 10px 30px;
            transition: all 0.3s ease;

            i {
              color: #000;
            }

            &:hover {
              cursor: pointer;
              background-color: #000;

              i {
                color: #fff;
              }
            }
          }
        }
      }

      &-if {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh / 1.5);
        font-size: 28px;

        &-link {
          text-decoration: none;
          color: #000;
        }
      }
    }

    &-rside {
      margin: 40px 0;
      box-shadow: 0 0 10px #e2e2e2;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      width: 30vw;
      padding: 20px;
      height: 450px;

      &-form {

        &-name,
        &-surname,
        &-address,
        &-build {
          position: relative;
          margin-top: 20px;

          label {
            position: absolute;
            top: -5px;
            left: 10px;
            font-size: 8px;
            background-color: #fff;
            padding: 0 5px;
            border: none;
          }

          input {
            border: 1px solid #000;
            border-radius: 5px;
            height: 40px;
            width: 100%;
            padding: 0 10px;
          }
        }
      }

      &-total {
        margin: 40px 0;
      }

      &-buy {
        button {
          border: 1px solid #000;
          background-color: #fff;
          border-radius: 5px;
          height: 50px;
          width: 100%;
          transition: all 0.3s ease;
          font-weight: 600;

          &:hover {
            cursor: pointer;
            color: #fff;
            background-color: #000;
          }
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
    <div class="container__main-cart-container">
      <div class="container__main-cart-container-lside">
        <div class="container__main-cart-container-lside-if" v-if="getProduct == 0">
          <div>
            {{ $t("emptyCart") }} 🛒<br />
            {{ $t("emptyCart2") }} 🤔<br />
            {{ $t("emptyCart3") }} 😊<br />
            <i class="fa-solid fa-arrow-right" style="color: #000000"></i>
            <nuxt-link class="container__main-favorites-container-if-link" to="/">{{ $t("toCatalog") }} 🛍️</nuxt-link>
          </div>
        </div>
        <div class="container__main-cart-container-lside-else-blocks" v-else>
          <div class="container__main-cart-container-lside-else-block" v-for="(product, index) in getProduct"
            :key="index">
            <div class="container__main-cart-container-lside-else-block-about" @click="handleProductClick(product)">
              <div class="container__main-cart-container-lside-else-block-img">
                <img :src="product.image" :alt="product.title" />
              </div>
              <div class="container__main-cart-container-lside-else-block-title">
                {{ product.title }}
              </div>
            </div>
            <div class="container__main-cart-container-lside-else-block-counter">
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
            <add-to-fav :product="product"></add-to-fav>
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
            <input type="text" id="name" :placeholder="$t('specify') + ': ' + $t('name')" />
          </div>
          <div class="container__main-cart-container-rside-form-surname">
            <label for="surname">{{ $t("surname") }}</label>
            <input type="text" id="surname" :placeholder="$t('specify') + ': ' + $t('surname')" />
          </div>
          <div class="container__main-cart-container-rside-form-address">
            <label for="address">{{ $t("address") }}</label>
            <input type="text" id="address" :placeholder="$t('specify') + ': ' + $t('address')" />
          </div>
          <div class="container__main-cart-container-rside-form-build">
            <label for="build">{{ $t("build") }}</label>
            <input type="text" id="build" :placeholder="$t('specify') + ': ' + $t('build')" />
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
