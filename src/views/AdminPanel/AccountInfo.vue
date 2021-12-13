<template>
  <div class="container p-3">
    <h3>Account Details:</h3>
    <span>{{ accountInfo.username }}</span>
    <table class="table table-light">
      <thead>
        <tr>
          <th scope="col">Client Id</th>
          <th scope="col">Username</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">D.O.B.</th>
          <th scope="col">Address</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Marital Status</th>
          <th scope="col">Country Of Residence</th>
          <th scope="col">Previous Insurer</th>
          <th scope="col">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>{{ accountInfo.clientIdNumber }}</td>
          <td>{{ accountInfo.username }}</td>
          <td>{{ accountInfo.firstName }}</td>
          <td>{{ accountInfo.lastName }}</td>
          <td>{{ accountInfo.age }}</td>
          <td>{{ accountInfo.address }}</td>
          <td>{{ accountInfo.email }}</td>
          <td>{{ accountInfo.cellphone }}</td>
          <td>{{ accountInfo.maritalStatus }}</td>
          <td>{{ accountInfo.countryOfResidence }}</td>
          <td>{{ accountInfo.previousInsurer }}</td>
          <td>{{ accountInfo.rating }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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