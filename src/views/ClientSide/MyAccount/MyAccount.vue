<template>
  <section class="my-account position-relative">
    <div
      class="mt-3 my-account_info d-flex flex-wrap justify-content-lg-between"
    >
      <div class="my-account_one d-flex flex-column align-items-center">
        <MyAvatar />
        <h2 class="text-center">
          {{ myAccountInfo.firstName }} {{ myAccountInfo.lastName }}
        </h2>
        <p class="text-center fw-light">
          {{ myAccountInfo.email }}
        </p>
        <p class="fw-light fst-italic text-center">
          Age&nbsp;{{ myAccountInfo.age }}
        </p>
        <hr />
      </div>
      <div class="my-account_two p-5">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Cell</th>
              <td>{{ myAccountInfo.cellphone }}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{{ myAccountInfo.address }}</td>
            </tr>
            <tr>
              <th scope="row">Client ID</th>
              <td colspan="2">{{ myAccountInfo.clientIdNumber }}</td>
            </tr>
            <tr>
              <th scope="row">Marital Status</th>
              <td>{{ myAccountInfo.maritalStatus }}</td>
            </tr>
            <tr>
              <th scope="row">Country Of Residence</th>
              <td>{{ myAccountInfo.countryOfResidence }}</td>
            </tr>
            <tr>
              <th scope="row">Year Of Issue Driver License</th>
              <td>{{ myAccountInfo.yearOfIssueDriverLicense }}</td>
            </tr>
            <tr>
              <th scope="row">Claims History</th>
              <td>{{ myAccountInfo.claimsHistory }}</td>
            </tr>
            <tr>
              <th scope="row">Previous Insurer</th>
              <td>{{ myAccountInfo.previousInsurer }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button
      class="btn btn-dark"
      type="button"
      @click="showAccountEdit = !showAccountEdit"
    >
      Edit my account details
    </button>
    <Transition>
      <EditAccountForm
        v-if="showAccountEdit"
        :myProps="{ myAccountInfo: myAccountInfo }"
      />
    </Transition>

    <ModalMessage />
  </section>
</template>

<script>
import ModalMessage from "../../../components/Modals/ModalMessage.vue";
import EditAccountForm from "../../../components/Forms/EditForms/EditAccountForm.vue";
import MyAvatar from "./MyAvatar.vue";

export default {
  components: {
    ModalMessage,
    EditAccountForm,
    MyAvatar,
  },
  data() {
    return {
      showAccountEdit: false,
    };
  },
  computed: {
    myAccountInfo() {
      if (this.$store.state.users_array.accounts) {
        return this.$store.state.users_array.accounts[0];
      }
      return [];
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`, ``);
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 10em;
}
.my-account_info {
  outline: solid 6px red;
}
.my-account_one {
  width: 100%;
  @include media-breakpoint-up(lg) {
    width: 45%;
  }

  outline: solid 6px blue;
}
.my-account_two {
  width: 100%;
    outline: solid 6px green;
  @include media-breakpoint-up(lg) {
    width: 45%;
  }
}
.details li {
  list-style: none;
}
li {
  margin-bottom: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>