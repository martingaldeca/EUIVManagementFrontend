<template>
    <v-app id="inspire">
        <NavigationDrawer/>
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
                            v-if="(superUser === 'true' || superUser === true)"
                    >
                        <v-expansion-panel-header color="primary"><h1 class="text-center">Savegame Configuration</h1></v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <SaveGameConfiguration :savegame-name="$route.params.savegame_name"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel
                            expand
                    >
                        <v-expansion-panel-header color="primary"><h1 class="text-center">Personal Stats</h1></v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <PersonalStats :savegame-name="$route.params.savegame_name"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel
                            expand
                            class="mt-4"
                    >
                        <v-expansion-panel-header color="primary"><h1 class="text-center">General Savegame Stats</h1></v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <GeneralSavegameStats :savegame-name="$route.params.savegame_name"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </div>
        <Footer/>
    </v-app>
</template>

<script>
    import Footer from "@/components/layout/Footer"
    import NavigationDrawer from "@/components/layout/NavigationDrawer";
    import PersonalStats from "@/components/savegame/PersonalStats";
    import GeneralSavegameStats from "@/components/savegame/GeneralSavegameStats";
    import SaveGameConfiguration from "@/components/savegame/SaveGameConfiguration";


    export default {
        name: "SaveGameStatsView",
        components: {
            Footer,
            NavigationDrawer,
            PersonalStats,
            GeneralSavegameStats,
            SaveGameConfiguration
        },
        data() {
            return {
                panel: [0, 1, 2]
            }
        },
        computed: {
            superUser() {
                return this.$store.getters.superUser
            }
        }
    }
</script>

<style scoped>

</style>
