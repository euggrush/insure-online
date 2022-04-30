<template>
  <section>
    <p class="fw-lighter fst-italic">{{ termsAndConditionsData }}</p>
    <form @submit.prevent="createTermsAndConditions" class="mt-3">
      <div class="form-floating">
        <textarea
          class="form-control"
          :placeholder="termsAndConditionsData"
          id="floatingTextarea2"
          style="height: 100px"
          v-model="termsAndConditionsText"
        ></textarea>
        <label for="floatingTextarea2">Terms And Conditions</label>
      </div>
      <button type="submit" class="btn btn-secondary mt-3">Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      termsAndConditionsText: ``,
    };
  },
  computed: {
    termsAndConditionsData() {
      return this.getTermsAndConditions();
    },
  },
  mounted() {
    this.$store.dispatch(`GET_RATING`, ``);
  },
  methods: {
    getTermsAndConditions() {
      let termsAndConditions = ``;
      this.$store.state.rating.resources.map((item) => {
        if (item.resourceKey == `termsAndConditions`) {
          termsAndConditions = item.resourceValue;
        }
      });
      return termsAndConditions;
    },
    createTermsAndConditions() {
      const payload = {
        resourceKey: `termsAndConditions`,
        resourceValue: this.termsAndConditionsText,
      };
      this.$store.dispatch(`MODIFY_RATING`, payload).then(() => {
        this.termsAndConditionsText = ``;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>