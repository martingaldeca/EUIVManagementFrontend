<template>
    <div
            style="width: 80%; margin: auto; margin-top: 20px; margin-bottom: 20px"
    >
        <v-card style="margin-top: 20px">
            <v-expansion-panels
                    :focusable=true
                    multiple
                    v-model="panel"
            >
                <v-expansion-panel
                        expand
                        readonly
                >
                    <v-expansion-panel-header disable-icon-rotate expand-icon="" color="primary"><h1 class="text-center">Platform Configuration</h1></v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <PlatformConfiguration/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel
                        expand
                        readonly
                >
                    <v-expansion-panel-header disable-icon-rotate expand-icon="" color="primary"><h1 class="text-center">Platform Stats</h1></v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <PlatformStats/>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel style="margin-top: 20px">
                    <v-expansion-panel-header color="primary"><h1 class="text-center">Save Games</h1></v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <SaveGames/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel style="margin-top: 20px">
                    <v-expansion-panel-header color="primary"><h1 class="text-center">Users</h1></v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <PlatformUsers/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>
    import PlatformStats from "@/components/main/PlatformStats";
    import SaveGames from "@/components/main/SaveGames";
    import PlatformUsers from "@/components/main/PlatformUsers";
    import PlatformConfiguration from "@/components/main/PlatformConfiguration";

    export default {
        name: "MainPlatform",
        components: {
            PlatformConfiguration,
            PlatformStats,
            SaveGames,
            PlatformUsers
        },
        data() {
            return {
                panel: [0, 1],
            }
        },
    }
</script>

<style scoped>

</style>
