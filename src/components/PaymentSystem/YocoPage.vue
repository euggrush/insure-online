<template>
  <section class="container-fluid"></section>
</template>

<script>
import { store } from "../../store/index.js";
export default {
  data() {
    return {
      currentOrderId: ``,
    };
  },
  computed: {
    amountCharge() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentOrderId = this.$store.state.orders.orders[0].orderId;
      return (
        this.$store.state.orders.orders[0].allEstimationsTotalCostCalculated *
        100
      );
    },
  },
  mounted() {
    this.payByYoco();
  },
  methods: {
    payByYoco() {
      var yoco = new window.YocoSDK({
        publicKey: "pk_test_ed3c54a6gOol69qa7f45",
      });
      yoco.showPopup({
        amountInCents: this.amountCharge,
        currency: "ZAR",
        name: "Your Store or Product",
        description: "Awesome description",
        orderId: this.currentOrderId,
        callback: function (result) {
          if (result.error) {
            const errorMessage = result.error.message;
            alert("error occured: " + errorMessage);
          } else {
            const payload = {
              token: result.id,
              amountInCents: this.amountInCents,
              currency: `ZAR`,
              orderId: this.orderId,
            };
            store.dispatch(`CREATE_PAYMENT`, payload).then(() => {
              history.back();
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  min-height: 100vh;
  padding-top: 10em;
}
</style>