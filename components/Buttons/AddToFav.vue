<template>
  <div>
    <button
      @click="addFavorite(product)"
      style="border: none; background-color: transparent; margin-right: 10px"
    >
      <i class="fa-solid fa-heart fa-2xl" style="color: #000"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.container_main{
    
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
    addFavorite(product) {
      this.$store.dispatch("addToFav", product);
    },
  },
};
</script>
