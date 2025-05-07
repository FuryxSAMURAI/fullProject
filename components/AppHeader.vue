<template>
  <header class="container__header">
    <div class="container__header-logo">
      <nuxt-link to="/">STORE</nuxt-link>
    </div>
    <nav class="container__header-nav">
      <ul class="container__header-nav-container-links">
        <li>
          <nuxt-link to="/">{{ $t("about") }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">{{ $t("delivery") }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">{{ $t("contacts") }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="admin">ADMIN</nuxt-link>
        </li>
      </ul>
    </nav>
    <div>
      <nuxt-link style="margin-right: 10px" to="/cart"
        ><i class="fa-solid fa-cart-shopping fa-xl" style="color: #000"></i>
        {{ getCartCount }}</nuxt-link
      >
      <nuxt-link style="margin-right: 30px" to="/favorites"
        ><i class="fa-solid fa-heart fa-xl" style="color: #000"></i>
        {{ getFavoritesCount }}</nuxt-link
      >
      <select :value="$i18n.locale" @change="changeLanguage($event)">
        <option value="ua">🇺🇦 Українська</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>
  </header>
</template>

<script>
export default {
  mounted() {
    const savedLang = this.$cookies.get("i18n_redirected");
    if (savedLang && savedLang !== this.$i18n.locale) {
      this.$i18n.setLocale(savedLang);
    }
  },
  methods: {
    changeLanguage(event) {
      const lang = event.target.value;
      this.$i18n.setLocale(lang);
      this.$cookies.set("i18n_redirected", lang);
    },
  },
  computed: {
    getCartCount() {
      return this.$store.state.cartCount;
    },
    getFavoritesCount() {
      return this.$store.state.favoritesCount;
    },
  },
};
</script>
