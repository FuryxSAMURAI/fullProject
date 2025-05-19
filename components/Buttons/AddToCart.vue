<template>
  <div>
    <button :class="[sizeClass]" @click="addToCart(product)">
      <span :class="[displayText]">{{ $t("addToCart") }}</span> <i class="fa-solid fa-cart-shopping"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped>
button {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: transparent;

}

.size-small {
  font-size: 10px;
  padding: 4px 8px;
}

.size-medium {
  font-size: 12px;
  padding: 8px 10px;
}

.size-large {
  font-size: 14px;
  padding: 10px 14px;
}

.block{
  display: block;
}
.none{
  display: none;
}

</style>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    sizeBtn: {
      type: String,
      required: true,
    },
    display:{
      type: String,
      required: true,
    }
  },
  computed: {
    sizeClass() {
      return {
        sm: "size-small",
        md: "size-medium",
        lg: "size-large",
      }[this.sizeBtn] || "size-medium";
    },
    displayText(){
      return{
        no:"none",
        yes:"block",
      }[this.display] || "yes"
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
};
</script>
