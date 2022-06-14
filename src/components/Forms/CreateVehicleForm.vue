<template>
  <form
    class="
      shadow-lg
      p-5
      rounded
      d-flex
      justify-content-between
      align-items-center
      flex-wrap
    "
    @submit.prevent="createVehicle"
  >
    <div class="mb-3">
      <label for="exampleInputEmail0" class="form-label">Make</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail0"
        v-model="vehicleInfo.make"
        placeholder="make"
        minlength="5"
        maxlength="30"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Model</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="vehicleInfo.model"
        placeholder="model"
        minlength="5"
        maxlength="30"
        required
      />
    </div>
    <div class="mb-3">
      <label for="carType" class="form-label">Vehicle Type:</label>
      <select
        id="carType"
        class="form-select"
        aria-label="Default select example"
        v-model="vehicleInfo.type"
        required
      >
        <option selected disabled value="">Select vehicle type</option>
        <option v-for="carType in carTypes" :key="carType" :value="carType">
          {{ carType }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail2" class="form-label">Year:</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputEmail2"
        v-model="vehicleInfo.year"
        placeholder="Year"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Registration license plate</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleInputPassword1"
        v-model="vehicleInfo.regNumber"
        minlength="2"
        maxlength="10"
        placeholder="Registration License Plate"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword2" class="form-label">VIN</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputPassword2"
        v-model="vehicleInfo.vin"
        minlength="17"
        maxlength="17"
        placeholder="VIN"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword3" class="form-label">Engine size</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputPassword3"
        v-model="vehicleInfo.engine"
        step="0.1"
        placeholder="Engine Size"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword4" class="form-label">Retail value</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputPassword4"
        v-model="vehicleInfo.retailValue"
        placeholder="Retail Value"
        required
      />
    </div>
    <div class="mb-3">
      <span>Tracking device</span>
      <br />
      <label class="mt-3">
        <input
          type="radio"
          name="tracking"
          value="Yes"
          v-model="vehicleInfo.trackingDevice"
          required
        />
        Yes
      </label>
      <label class="ms-3">
        <input
          type="radio"
          name="tracking"
          value="No"
          v-model="vehicleInfo.trackingDevice"
        />
        No
      </label>
    </div>
    <div class="mb-3">
      <span>Use</span>
      <br />
      <label class="mt-3">
        <input
          type="radio"
          name="use"
          value="Private"
          v-model="vehicleInfo.useCase"
          required
        />
        Private
      </label>
      <label class="ms-3">
        <input
          type="radio"
          name="use"
          value="Business"
          v-model="vehicleInfo.useCase"
        />
        Business
      </label>
      <label class="ms-3">
        <input
          type="radio"
          name="use"
          value="Private And Business"
          v-model="vehicleInfo.useCase"
        />
        Private And Business
      </label>
    </div>
    <div
      v-if="
        vehicleInfo.useCase == 'Business' ||
        vehicleInfo.useCase == 'Private And Business'
      "
      class="mb-3"
    >
      <label for="floatingTextarea" class="form-label"
        >Explanation Of the Business Use
      </label>
      <textarea
        class="form-control"
        placeholder="Explanation Of the Business Use"
        id="floatingTextarea"
        v-model="vehicleInfo.businessDescription"
        :required="
          vehicleInfo.useCase == 'Business' ||
          vehicleInfo.useCase == 'Private And Business'
        "
      ></textarea>
    </div>
    <div class="mb-3">
      <span>Financed vehicle</span>
      <br />
      <label class="mt-3">
        <input
          type="radio"
          name="financed"
          value="1"
          v-model="vehicleInfo.financed"
          required
        />
        Yes
      </label>
      <label class="ms-3">
        <input
          type="radio"
          name="financed"
          value="0"
          v-model="vehicleInfo.financed"
        />
        No
      </label>
      <div v-if="vehicleInfo.financed == '1'">
        <textarea
          class="form-control"
          placeholder="Name f the finance house"
          :required="vehicleInfo.financed == '1'"
          v-model="vehicleInfo.financeHouse"
        ></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-outline-danger mt-5">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      accountId: ``,
      vehicleInfo: {
        accountId: ``,
        details: ``,
        make: ``,
        model: ``,
        type: ``,
        year: ``,
        regNumber: ``,
        vin: ``,
        engine: ``,
        retailValue: ``,
        trackingDevice: ``,
        useCase: ``,
        accessories: ``,
        businessDescription: ``,
        financed: false,
        financeHouse: ``,
        overnightParkingVehicle: ``,
        isTrackingDeviceRequired: ``,
        insuranceTypeRecommended: ``,
      },
      fetchedVahiclesData: [],
      vehicleType: ``,
      carTypes: [
        `PICKUP TRUCK`,
        `AWD`,
        `SUV`,
        `4WD`,
        `SEDAN`,
        `COUPE`,
        `SPORTS CAR`,
        `STATION WAGON`,
        `HATCHBACK`,
        `CONVERTIBLE`,
        `MINIVAN`,
      ],
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$store.dispatch(`GET_VEHICLES`, ``);
    this.fetchData();
  },
  methods: {
    createVehicle() {
      this.accountId = this.myProps.accountId;
      this.vehicleInfo.accountId = this.myProps.accountId;
      this.vehicleInfo.details = `${this.vehicleInfo.make} ${this.vehicleInfo.model}`;
      this.getVehicleInsuranceType();
      setTimeout(() => {
        this.$store
          .dispatch(`CREATE_VEHICLE`, this.vehicleInfo)
          .then(() => {
            this.$store.dispatch(`GET_VEHICLES`, ``);
            this.vehicleInfo = {};
            this.$emit(`closeForm`, {});
          })
          .catch((error) => alert(error));
      }, 1000);
    },
    fetchData() {
      this.$store.dispatch(`GET_VEHICLES_DATA`, ``).then(() => {
        setTimeout(() => {
          if (this.$store.state.vehicles_data.vehiclesData) {
            this.fetchedVahiclesData =
              this.$store.state.vehicles_data.vehiclesData;
          }
        }, 5000);
      });
    },
    getVehicleInsuranceType() {
      switch (this.vehicleInfo.type) {
        case `PICKUP TRUCK`:
          this.vehicleInfo.insuranceTypeRecommended = `tuffstuff`;
          break;
        case `AWD`:
          this.vehicleInfo.insuranceTypeRecommended = `tuffstuff`;
          break;
        case `SUV`:
          this.vehicleInfo.insuranceTypeRecommended = `tuffstuff`;
          break;
        case `4WD`:
          this.vehicleInfo.insuranceTypeRecommended = `tuffstuff`;
          break;
        default:
          this.vehicleInfo.insuranceTypeRecommended = `topmarq`;
      }
    },
    checkVehiclesData() {
      this.vehicleInfo.isTrackingDeviceRequired = ``;
      this.fetchedVahiclesData.map((item) => {
        if (
          this.vehicleInfo.make
            .toLowerCase()
            .includes(item.make.toLowerCase()) &&
          this.vehicleInfo.model
            .toLowerCase()
            .includes(item.model.toLowerCase())
        ) {
          this.vehicleInfo.isTrackingDeviceRequired =
            item.trackingDeviceIsRequired;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-outline-danger {
  width: 100%;
  height: 40px;
}
</style>