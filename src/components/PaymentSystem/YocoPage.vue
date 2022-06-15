<template>
  <section></section>
</template>

<script>
import { store } from "../../store/index.js";
export default {
  data() {
    return {
      currentOrderId: ``,
      orderReferenceNumber: ``,
    };
  },
  computed: {
    amountCharge() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentOrderId = this.$store.state.orders.orders[0].orderId;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.orderReferenceNumber =
        this.$store.state.orders.orders[0].referenceNumber;
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
        name: `_Order #${this.orderReferenceNumber}`,
        description: "description",
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
              store.dispatch(`CREATE_ORDER`, {
                orderId: this.orderId,
                paidBy: `online`,
              });
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
</style>