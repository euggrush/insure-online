<template>
  <form
    class="inseption-date p-3 rounded shadow-lg"
    :class="{ border: !datePicked, 'border-danger': !datePicked }"
  >
    <label class="fw-bold" for="startDate">Set Inception Date Of Cover</label>
    <input
      id="startDate"
      class="form-control mt-3"
      type="date"
      v-model="inceptionDate"
      required
      @change="setInceptionDate"
      :min="today"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      datePicked: false,
      inceptionDate: ``,
      today: new Date().toISOString().split("T")[0],
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
      this.$store.commit(`SET_INSEPTION_DATE_OF_COVER`, {
        date: this.getTimeStamp(this.inceptionDate),
        isSet: true,
      });
      this.$nextTick(() => {
        this.datePicked = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.inseption-date {
  @include media-breakpoint-up(md) {
    width: 300px;
  }
  @include media-breakpoint-up(lg) {
    width: 400px;
  }
  @include media-breakpoint-up(xl) {
    width: 300px;
  }
  @include media-breakpoint-up(xxl) {
    width: 300px;
  }
}
</style>