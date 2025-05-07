<style lang="scss">
    button{
        border: none;
        background-color: transparent;
        font-size: 16px;
    }
</style>

<template>
  <button @click="goBack" v-t="'back'"></button>
</template>

<script>
export default {
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
