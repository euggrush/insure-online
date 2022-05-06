<template>
  <form @submit.prevent="setInceptionDate" class="p-3">
    <label class="fw-bold" for="startDate">Set Inception Date Of Cover</label>
    <input
      id="startDate"
      class="form-control mt-3"
      type="date"
      v-model="inceptionDate"
      required
    />
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inceptionDate: ``,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setInceptionDate() {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: this.myProps.orderId,
          inceptionDateOfCover: this.getTimeStamp(this.inceptionDate),
        })
        .then(() => {
          this.$store.dispatch(`GET_ORDERS`, ``);
          setTimeout(() => {
            this.$router.push(`/my-payment`);
          }, 1000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>