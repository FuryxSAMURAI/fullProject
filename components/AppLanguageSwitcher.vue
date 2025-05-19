<template>
  <div class="language-switcher">
    <select :value="$i18n.locale" @change="changeLanguage">
      <option value="ua">🇺🇦 Українська</option>
      <option value="en">🇬🇧 English</option>
    </select>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage(event) {
      const lang = event.target.value;
      this.$i18n.setLocale(lang);
      localStorage.setItem("i18n_redirected", lang);
    },
  },
};
</script>


<style scoped>
.language-switcher select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switcher select:hover {
  border-color: #000;
}
</style>
