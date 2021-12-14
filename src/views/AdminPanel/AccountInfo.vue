<template>
  <section class="container p-3">
    <h3>Account Details:</h3>
    <span class="fw-bold text-decoration-underline">Client ID: </span>
    <span>&nbsp;{{ accountInfo.clientIdNumber }}</span> <br />
    <span class="fw-bold text-decoration-underline">Account username: </span>
    <span>&nbsp;{{ accountInfo.username }}</span> <br />
    <span class="fw-bold text-decoration-underline">First: </span>
    <span>&nbsp;{{ accountInfo.firstName }}</span> <br />
    <span class="fw-bold text-decoration-underline">Last: </span>
    <span>&nbsp;{{ accountInfo.lastName }}</span> <br />
    <span class="fw-bold text-decoration-underline">Date of birth: </span>
    <span>&nbsp;{{ accountInfo.age }}</span> <br />
    <span class="fw-bold text-decoration-underline">Address: </span>
    <span>&nbsp;{{ accountInfo.address }}</span> <br />
    <span class="fw-bold text-decoration-underline">Email: </span>
    <span>&nbsp;{{ accountInfo.email }}</span> <br />
    <span class="fw-bold text-decoration-underline">Cellphone: </span>
    <span>&nbsp;{{ accountInfo.cellphone }}</span> <br />
    <span class="fw-bold text-decoration-underline">Home phone: </span>
    <span>&nbsp;{{ accountInfo.phoneNumber }}</span> <br />
    <span class="fw-bold text-decoration-underline">Marital Status: </span>
    <span>&nbsp;{{ accountInfo.maritalStatus }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Country Of Residence:
    </span>
    <span>&nbsp;{{ accountInfo.countryOfResidence }}</span> <br />
    <span class="fw-bold text-decoration-underline">Previous Insurer: </span>
    <span>&nbsp;{{ accountInfo.previousInsurer }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Year of issue driver license:
    </span>
    <span>&nbsp;{{ accountInfo.yearOfIssueDriverLicense }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Overnight parking vehicle:
    </span>
    <span>&nbsp;{{ accountInfo.overnightParkingVehicle }}</span> <br />
    <span class="fw-bold text-decoration-underline">Claims history: </span>
    <span>&nbsp;{{ accountInfo.claimsHistory }}</span> <br />
    <span class="fw-bold text-decoration-underline">Rating: </span>
    <span>&nbsp;{{ accountInfo.rating }}</span>
    <h4 class="mt-3">Vehicles information:</h4>
    <button class="btn btn-primary">
      <span>Add new vehicle</span>
    </button>
    <ul v-for="(vehicle, index) in accountInfo.vehicles" :key="index" class="list-group mt-3">
      <li class="list-group-item">
        <span class="fw-bold text-decoration-underline">Vehicle make and model:</span>
        <span>&nbsp;{{ vehicle.details }}</span> <br>
        <span class="fw-bold text-decoration-underline">Vehicle license plate nunber:</span>
        <span>&nbsp;{{ vehicle.reg_number }}</span> <br>
        <span class="fw-bold text-decoration-underline">Vehicle VIN:</span>
        <span>&nbsp;{{ vehicle.vin }}</span> <br>
        <span class="fw-bold text-decoration-underline">Vehicle engine:</span>
        <span>&nbsp;{{ vehicle.engine }}</span> <br>
        <span class="fw-bold text-decoration-underline">Vehicle retail value:</span>
        <span>&nbsp;{{ vehicle.retail_value }}</span> <br>
        <span class="fw-bold text-decoration-underline">Tracking device:</span>
        <span>&nbsp;{{ vehicle.tracking_device }}</span> <br>
        <span class="fw-bold text-decoration-underline">Use case:</span>
        <span>&nbsp;{{ vehicle.use_case }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    accountInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>