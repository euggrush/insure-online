<template>
  <div class="msg-popup position-absolute top-0 start-50 translate-middle-x" tabindex="-1" v-if="modalInfo.isModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Message:</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-black text-capitalize">{{ modalInfo.msg }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal">
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    modalInfo() {
      return this.$store.state.modal_popup || {};
    },
  },
  methods: {
    closeModal() {
      this.$store.commit(`SET_MODAL`, { msg: ``, isModal: false });
    },
  },
};
</script>

<style lang="scss" scoped>
.msg-popup {
  z-index: 3;
}
.btn {
  min-width: 10em;
}
</style>