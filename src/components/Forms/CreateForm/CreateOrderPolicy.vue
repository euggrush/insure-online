<template>
  <section>
    <p class="fw-lighter fst-italic">{{ orderPoliceData }}</p>
    <form @submit.prevent="createOrderPolice" class="mt-3">
      <div class="form-floating">
        <textarea
          class="form-control"
          :placeholder="orderPoliceData"
          id="floatingTextarea2"
          style="height: 100px"
          v-model="orderPoliceText"
        ></textarea>
        <label for="floatingTextarea2">Type here</label>
      </div>
      <button type="submit" class="btn btn-secondary mt-3">Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      orderPoliceText: ``,
    };
  },
  computed: {
    orderPoliceData() {
      return this.getOrderPolice();
    },
  },
  mounted() {
    this.$store.dispatch(`GET_RATING`, ``);
  },
  methods: {
    getOrderPolice() {
      let orderPolice = ``;
      this.$store.state.rating.resources.map((item) => {
        if (item.resourceKey == `orderPolicy`) {
          orderPolice = item.resourceValue;
        }
      });
      return orderPolice;
    },
    createOrderPolice() {
      const payload = {
        resourceKey: `orderPolicy`,
        resourceValue: this.orderPoliceText,
      };
      this.$store.dispatch(`MODIFY_RATING`, payload).then(() => {
        this.orderPoliceText = ``;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>