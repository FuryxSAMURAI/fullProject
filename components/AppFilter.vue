<template>
  <div class="container__main-filter-block">
    <div class="container__main-filter-block-price">
      <label>
        {{ $t('from') }}:
        <input type="number" :min="getMinCost" :max="getMaxCost" v-model.number="priceMin" />
      </label>

      <label>
        {{ $t('to') }}:
        <input type="number" :min="getMinCost" :max="getMaxCost" v-model.number="priceMax" />
      </label>

      <button @click="applyPriceFilter">Застосувати</button>
    </div>

    <div class="container__main-filter-block-categories">
      <p>{{ $t("category") }}:</p>
      <div v-for="category in categoryProducts" :key="category">
        <label :for="category" style="text-transform:capitalize;">{{ category }}</label>
        <input type="checkbox" :id="category" :value="category" v-model="selectedCategories"
          @change="handleCategoryChange" />
      </div>
    </div>

    <div class="container__main-filter-block-sort">
      <p>{{ $t("sortBy") }}:</p>
      <button @click="sortProducts('asc')">{{ $t("lowToHigh") }}</button>
      <button @click="sortProducts('desc')">{{ $t("highToLow") }}</button>

    </div>

    <div class="container__main-filter-block-clear">
      <button @click="clearFilters">{{ $t("clearFilters") }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container__main {

  &-filter-block {
    width: 10vw;
    margin: 0 20px;

    &-categories {
      margin-top: 40px;

      div {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
      }
    }

    &-sort {
      margin-top: 40px;

      button {
        width: 100%;
        border: 1px solid #000;
        border-radius: 5px;
        margin: 10px 0;
        padding: 10px 0;
        background-color: transparent;
        transition: all 0.3s ease;

        &:hover {
          cursor: pointer;
          color: #fff;
          background-color: #000;
        }
      }
    }

    &-clear {
      margin-top: 40px;

      button {
        width: 100%;
        border: 1px solid #000;
        border-radius: 5px;
        margin: 10px 0;
        padding: 10px 0;
        background-color: transparent;
        transition: all 0.3s ease;

        &:hover {
          cursor: pointer;
          color: #fff;
          background-color: #000;
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      value: 0,
      categoryProducts: [
        "men's clothing",
        "women's clothing",
        "jewelery",
        "electronics",
      ],
      selectedCategories: [],
      products: [],
      priceMin: this.getMinCost,
      priceMax: this.getMaxCost,
    };
  },
  computed: {
    getMaxCost() {
      return this.$store.getters.getMaxCost;
    },
    getMinCost() {
      return this.$store.getters.getMinCost;
    },
  },
  methods: {
    applyPriceFilter() {
      const min = parseFloat(this.priceMin);
      const max = parseFloat(this.priceMax);

      if (min > max) {
        alert("Мінімальна ціна не може бути більшою за максимальну.");
        return;
      } else if (max == min || min == max) {
        alert("Товари за цією ціної не знайдено.");
      }
      this.$store.commit("setPriceRange", { min, max });
      this.$store.commit("setFilteredProducts");
    },
    getPriceValue(value) {
      this.value = value;

      this.$store.commit("setPriceRange", {
        min: this.getMinCost,
        max: parseFloat(value),
      });

      this.$store.commit("setFilteredProducts");
    },

    getSortedProducts(isChecked, category) {
      if (isChecked) {
        this.selectedCategories.push(category);
      } else {
        this.selectedCategories = this.selectedCategories.filter(
          (item) => item !== category
        );
      }
      this.$store.commit("setCategoryFilter", this.selectedCategories);
      this.$store.commit("setFilteredProducts");
    },
    sortProducts(order) {
      this.$store.commit("setSortOrder", order);
      this.$store.commit("setFilteredProducts");
    },
    clearFilters() {
      this.selectedCategories = [];
      this.$store.commit("clearFilters");
      this.$store.commit("setFilteredProducts");
    },
    handleCategoryChange() {
      if (this.selectedCategories.length === 0) {
        this.$store.commit("clearFilters");
      } else {
        this.$store.commit("setCategoryFilter", this.selectedCategories);
        this.$store.commit("setFilteredProducts");
      }
    },
  },
};
</script>
