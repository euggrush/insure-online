<template>
  <section class="container accounts-list-wrapper">
    <p>Users</p>
    <ul>
      <li v-for="(user, index) in usersList" :key="index">
        {{ user }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: `AccountsList`,
  computed: {
    usersList() {
      return this.$store.state.users_array.accounts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`);
  },
};
</script>

<style lang="scss" scoped>
.accounts-list-wrapper {
  outline: solid 4px red;
}
</style>