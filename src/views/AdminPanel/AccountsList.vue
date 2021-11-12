<template>
  <section class="container categories-list-wrapper">
    <h3>Accounts:</h3>
    <ul class="list-group">
      <li
        v-for="(account, index) in accountsList"
        :key="index"
        class="list-group-item"
      >
        {{ account.username }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    accountsList() {
      return this.$store.state.users_array.accounts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`);
  },
};
</script>

<style lang="scss" scoped>
.categories-list-wrapper {
  outline: solid 4px red;
}
</style>