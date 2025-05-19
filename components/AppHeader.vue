<template>
  <header class="container__header">
    <div class="container__header-logo">
      <nuxt-link to="/">STORE</nuxt-link>
    </div>
    <nav class="container__header-nav">
      <ul class="container__header-nav-container-links">
        <li><nuxt-link to="/about">{{ $t("about") }}</nuxt-link></li>
        <li><nuxt-link to="/delivery">{{ $t("delivery") }}</nuxt-link></li>
        <li><nuxt-link to="/contacts">{{ $t("contacts") }}</nuxt-link></li>
        <li><nuxt-link to="/admin">ADMIN</nuxt-link></li>
      </ul>
    </nav>
    <div style="display: flex;align-items: center;">
      <nuxt-link to="/cart" style="margin-right: 10px;text-decoration: none;color: #000;">
        <i class="fa-solid fa-cart-shopping fa-xl" style="color: #000"></i>
        {{ getCartCount }}
      </nuxt-link>
      <nuxt-link to="/favorites" style="margin-right: 30px;text-decoration: none;color: #000;">
        <i class="fa-solid fa-heart fa-xl" style="color: #000"></i>
        {{ getFavoritesCount }}
      </nuxt-link>
      <AppLanguageSwitcher />
    </div>
  </header>
</template>

<script>
import AppLanguageSwitcher from './AppLanguageSwitcher.vue';
export default {
  components: {
    AppLanguageSwitcher,
  },
  mounted() {
    this.$store.dispatch("loadCartFromStorage");
    this.$store.dispatch("loadFavFromStorage");
  },
  computed: {
    getCartCount() {
      return this.$store.getters.getCartCounter;
    },
    getFavoritesCount() {
      return this.$store.getters.getFavCounter;
    },
  },
};
</script>
