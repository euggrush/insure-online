<template>
  <section>
    <p class="fw-lighter fst-italic">{{ privacyPolicyData }}</p>
    <form @submit.prevent="createPolicy" class="mt-3">
      <div class="form-floating">
        <textarea
          class="form-control"
          :placeholder="privacyPolicyData"
          id="floatingTextarea2"
          style="height: 100px"
          v-model="policyText"
        ></textarea>
        <label for="floatingTextarea2">Privacy Policy</label>
      </div>
      <button type="submit" class="btn btn-secondary mt-3">Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      policyText: ``,
    };
  },
  computed: {
    privacyPolicyData() {
      return this.getPrivacyPolicy();
    },
  },
  mounted() {
    this.$store.dispatch(`GET_RATING`, ``);
  },
  methods: {
    getPrivacyPolicy() {
      let privacyPolicy = ``;
      this.$store.state.rating.resources.map((item) => {
        if (item.resourceKey == `Policy`) {
          privacyPolicy = item.resourceValue;
        }
      });
      return privacyPolicy;
    },
    createPolicy() {
      const payload = {
        resourceKey: `Policy`,
        resourceValue: this.policyText,
      };
      this.$store.dispatch(`MODIFY_RATING`, payload).then(() => {
        this.policyText = ``;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>