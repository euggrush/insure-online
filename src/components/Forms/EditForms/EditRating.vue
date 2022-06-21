<template>
  <form @submit.prevent="editRating">
    <div class="mb-3">
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="selectedKey"
        required
      >
        <option selected disabled value="">Open this select menu</option>
        <option v-for="[key, value] in raitingsList" :key="key" :value="key">
          Age: {{ value.ageRange }}, Vehicle Value:
          {{ value.carValueRange }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Rating, %</label>
      <input
        type="number"
        step="0.01"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="0.00"
        v-model="ratingAmount"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary btn-lg">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      selectedKey: ``,
      ratingAmount: ``,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    raitingsList() {
      return this.myProps.ratingData;
    },
  },
  methods: {
    editRating() {
      const payload = {
        resourceKey: this.selectedKey,
        resourceValue: this.ratingAmount / 100,
      };
      this.$store.dispatch(`MODIFY_RATING`, payload).then(() => {
        this.selectedKey = ``;
        this.ratingAmount = ``;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>