<template>
    <div id="HomeView" class="mx-auto mt-8">
        <h1 class="mb-2">کارمندان</h1>
        <v-expansion-panels focusable>
            <v-expansion-panel
                v-for="(item,i) in 5"
                :key="i"
            >
                <v-expansion-panel-header>Item</v-expansion-panel-header>
                <v-expansion-panel-content>

                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    name: 'HomeView',

    components: {},
}
</script>
<style scoped>
#HomeView {
    width: 60vw;
}
</style>
