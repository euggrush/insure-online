<template>
    <div class="conteiner">
        <div v-for="(category, index) in categoriesList" :key="index">
            {{ category.categoryName }}
        </div>
    </div>
</template>

<script>
    export default {
        name: `InsurancePage`,
        computed: {
            categoriesList() {
                return this.$store.state.product_categories.categories;
            }
        },
        mounted() {
            this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
        }
    }
</script>

<style lang="scss" scoped>

</style>