<template>
  <section class="container">
    <h2>Admin Panel</h2>
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
  name: `AdminPanel`,
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
</style>