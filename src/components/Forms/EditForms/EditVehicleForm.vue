<template>
  <!-- EDIT VEHICLE FORM -->
  <form
    class="
      position-absolute
      top-0
      start-0
      w-100
      h-100
      bg-light
      d-flex
      flex-column
      justify-content-between
      align-items-end
      p-3
    "
    @submit.prevent="editVehicle(vehicle, index)"
  >
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="closeEdit()"
    ></button>
    <div class="row row-cols-auto row-cols-md-3 h-100">
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Vehicle make and model </span>
        <input
          class="form-control form-control-sm col"
          type="text"
          :placeholder="changeVehicleObj.details"
          v-model="changeVehicleObj.details"
          minlength="5"
          maxlength="30"
        />
      </label>
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Vehicle year </span>
        <input
          class="form-control form-control-sm col"
          type="number"
          :placeholder="changeVehicleObj.year"
          v-model="changeVehicleObj.year"
        />
      </label>
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Vehicle license plate nunber </span>
        <input
          class="form-control form-control-sm"
          type="text"
          :placeholder="changeVehicleObj.regNumber"
          v-model="changeVehicleObj.regNumber"
          minlength="2"
          maxlength="10"
        />
      </label>
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Vehicle VIN </span>
        <input
          class="form-control form-control-sm"
          type="text"
          :placeholder="changeVehicleObj.vin"
          v-model="changeVehicleObj.vin"
          minlength="17"
          maxlength="17"
        />
      </label>
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Engine size </span>
        <input
          class="form-control form-control-sm"
          type="number"
          :placeholder="changeVehicleObj.engine"
          v-model="changeVehicleObj.engine"
          step="0.1"
        />
      </label>
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Retail value </span>
        <input
          class="form-control form-control-sm"
          type="number"
          :placeholder="changeVehicleObj.retailValue"
          v-model="changeVehicleObj.retailValue"
        />
      </label>
      <label class="col mt-3">
        <span class="fw-bold lh-lg"> Accessories </span><br />
        <span
          v-for="(accessory, i) in accessoriesList"
          :key="accessory.accessoryId"
          ><span
            >{{ accessory.name }}&nbsp;<strong>R{{ accessory.cost }}</strong
            ><span v-if="i !== accessoriesList.length - 1"
              >&nbsp;&#124;&nbsp;</span
            >
          </span></span
        >
        <form @submit.prevent="createAccessory" class="input-group mt-1">
          <input
            type="text"
            class="form-control"
            placeholder="name..."
            aria-label="name"
            aria-describedby="button-addon2"
            v-model="accessoryName"
            required
          />
          <input
            type="number"
            class="form-control"
            placeholder="0"
            aria-label="Accessory cost"
            aria-describedby="button-addon2"
            v-model="accessoryCost"
            required
          />
          <button
            class="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Add
          </button>
        </form>
      </label>
      <div class="col mt-3 form-check">
        <span class="d-block fw-bold lh-lg"> Tracking device </span>
        <label class="form-check-label m-1">
          <input
            type="radio"
            name="trackingDevice"
            value="Yes"
            v-model="changeVehicleObj.trackingDevice"
            required
          />
          Yes
        </label>
        <label class="m-1">
          <input
            type="radio"
            name="trackingDevice"
            value="No"
            v-model="changeVehicleObj.trackingDevice"
          />
          No
        </label>
      </div>
      <div class="col mt-3 form-check">
        <span class="d-block fw-bold lh-lg">Use</span>
        <label class="form-check-label m-1">
          <input
            type="radio"
            name="useCase"
            value="Private"
            v-model="changeVehicleObj.useCase"
            required
          />
          Private
        </label>
        <label class="m-1">
          <input
            type="radio"
            name="useCase"
            value="Business"
            v-model="changeVehicleObj.useCase"
          />
          Business
        </label>
        <label class="m-1">
          <input
            type="radio"
            name="useCase"
            value="Private And Business"
            v-model="changeVehicleObj.useCase"
          />
          Private And Business
        </label>
      </div>
      <div
        v-if="
          changeVehicleObj.useCase == 'Business' ||
          changeVehicleObj.useCase == 'Private And Business'
        "
        class="col mt-3 form-check"
      >
        <label for="floatingTextarea" class="m-1">
          <span class="fw-bold lh-lg">Explanation of the business use</span>
        </label>
        <textarea
          class="form-control"
          placeholder="Explanation Of the Business Use"
          id="floatingTextarea"
          v-model="changeVehicleObj.businessDescription"
          :required="
            changeVehicleObj.useCase == 'Business' ||
            changeVehicleObj.useCase == 'Private And Business'
          "
        ></textarea>
      </div>

      <div class="col mt-3">
        <span class="d-block fw-bold lh-lg">Financed vehicle</span>
        <label class="ms-3">
          <input
            type="radio"
            name="financed"
            value="1"
            v-model="changeVehicleObj.financed"
            required
          />
          Yes
        </label>
        <label class="ms-3">
          <input
            type="radio"
            name="financed"
            value="0"
            v-model="changeVehicleObj.financed"
          />
          No
        </label>
        <div v-if="changeVehicleObj.financed == '1'">
          <textarea
            class="form-control"
            placeholder="Name f the finance house"
            :required="changeVehicleObj.financed == '1'"
            v-model="changeVehicleObj.financeHouse"
          ></textarea>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-outline-danger">Submit</button>
  </form>
  <!-- EDIT VEHICLE FORM END -->
</template>

<script>
export default {
  data() {
    return {
      accountId: ``,
      changeVehicleObj: {},
      accessoryName: ``,
      accessoryCost: 0,
    };
  },
  watch: {
    isChangesNeeded() {
      this.fetchAccessories();
    },
  },
  computed: {
    isChangesNeeded() {
      return this.$store.state.is_changes_needed;
    },
    accessoriesList() {
      return this.$store.state.accessories.accessories;
    },
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.changeVehicleObj = this.myProps.changeVehicleObj;
    this.fetchAccessories();
  },
  methods: {
    fetchAccessories() {
      this.$store.dispatch(
        `GET_ACCESSORIES`,
        `?vehicleId=${this.changeVehicleObj.vehicleId}`
      );
    },
    createAccessory() {
      this.$store
        .dispatch(`CREATE_ACCESSORY`, {
          vehicleId: this.changeVehicleObj.vehicleId,
          name: this.accessoryName,
          cost: this.accessoryCost,
        })
        .then(() => {
          this.accessoryName = ``;
          this.accessoryCost = 0;
          this.$store.dispatch(
            `GET_ACCESSORIES`,
            `?vehicleId=${this.changeVehicleObj.vehicleId}`
          );
        });
    },
    editVehicle(vehicle, index) {
      this.$store
        .dispatch(`CREATE_VEHICLE`, this.changeVehicleObj)
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES`, ``);
          this.$store.dispatch(
            `GET_USERS`,
            `?accountId=${this.changeVehicleObj.accountId}`
          );
          this.closeEdit();
        })
        .catch((err) => console.log(err));
      console.log(index);
    },
    closeEdit() {
      this.$store.commit(`SET_MODALS_TOGGLE`, { isEditVehicleOpen: false });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>