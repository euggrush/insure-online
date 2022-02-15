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
        <option
          v-for="(item, index) in raitingsList"
          :key="index"
          :value="item.key"
        >
          Age: {{ item.data.ageRange }}, Vehicle Value:
          {{ item.data.carValueRange }}
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
    <button type="submit" class="btn btn-primary">Submit</button>
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
      type: Array,
      default: () => [],
    },
  },
  computed: {
    raitingsList() {
      return this.myProps;
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
        this.$store.dispatch(`GET_RATING`, ``);
      });
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit(`closeForm`, {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>