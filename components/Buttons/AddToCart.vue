<template>
  <div>
    <button
    class="addToCart"
      @click="addToCart(product)"
    >
      {{ $t("addToCart") }} <i class="fa-solid fa-cart-shopping"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.addToCart {
  cursor: pointer;
  font-size: 14px;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
}
</style>
<script>
export default {
  props: {
    product: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
};
</script>
