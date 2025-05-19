<script>
import AppFooter from "../components/AppFooter.vue";
import AppHeader from "../components/AppHeader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  watch: {
    '$route.path'() {
      const lang = localStorage.getItem('i18n_redirected');
      if (lang && lang !== this.$i18n.locale) {
        this.$i18n.setLocale(lang);
      }
    },
  },
  mounted() {
    const lang = localStorage.getItem('i18n_redirected');
    if (lang && lang !== this.$i18n.locale) {
      this.$i18n.setLocale(lang);
    }
  }
};
</script>

<template>
  <div class="layout">
    <app-header />

    <main class="main-content">
      <nuxt />
    </main>

    <app-footer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}
</style>
