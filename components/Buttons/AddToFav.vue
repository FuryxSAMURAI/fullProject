<template>
  <div>
    <button @click="addFavorite(product)" style="border: none; background-color: transparent; margin-right: 10px">
      <i class="fa-solid fa-heart" :class="[iconSizeClass]" style="color: #000"></i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    sizeIcon: {
      type: String,
      required: true,
    }
  },
  computed: {
    iconSizeClass() {
      return {
        sm: "fa-sm",
        md: "fa-lg",
        xl: "fa-xl",
        "2xl": "fa-2xl"
      }[this.sizeIcon] || "fa-lg";
    },
  },
  methods: {
    addFavorite(product) {
      this.$store.dispatch("addToFav", product);
    },
  },
};
</script>
