<style lang="scss">
button {
  border: none;
  background-color: transparent;
  font-size: 16px;
}
</style>

<template>
  <div style="display: flex;gap: 20px;align-items: center;">
    <button @click="goBack" v-t="'back'"></button>
    <button @click="goHome" v-t="'home'"></button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      if (window.history.state && window.history.state.back) {
        this.$router.back();
      } else {
        this.$router.push("/");
      }
    },
    goHome() {
      this.$router.push("/");
    },
  }
}
</script>
