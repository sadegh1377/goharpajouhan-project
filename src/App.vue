<template>
    <v-app class="app">
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',

    data: () => ({
        //
    }),
};
</script>
<style scoped>
.app {
    background-color: #f5f5f5;
}

</style>