<template>
    <div style="width: 100%; margin-top: 15px">
        <v-container class="lighten-5">
            <v-row no-gutters>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-save</v-icon>
                        Total Save Games: {{totalSaveGames}}
                    </v-card>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-shield-alt</v-icon>
                        Total Multiplayer Save Games: {{totalMultiplayerSaveGames}}
                    </v-card>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        Multi Player vs Single Player
                        <pie-chart :chart-data="multiPlayerVsSinglePlayer" :options="pieChartOptions" style="height: 300px; position: relative"/>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-database</v-icon>
                        Database size: {{databaseSize}}
                    </v-card>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-users</v-icon>
                        Total users: {{totalUsers}}
                    </v-card>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        Best Players
                        <bar-chart :chart-data="bestPlayers" :options="bestPlayersCharOptions" style="height: 300px; position: relative"/>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>
    import PieChart from "@/plugins/charts/PieChart";
    import BarChart from "@/plugins/charts/BarChart";

    export default {
        name: "PlatformStats",
        components: {
            PieChart,
            BarChart
        },
        data() {
            return {
                pieChartOptions: {
                    hoverBorderWidth: 20,
                    responsive: true,
                    maintainAspectRatio: false
                },
                bestPlayersCharOptions: {
                    hoverBorderWidth: 20,
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Development'
                                }
                            }
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Players'
                                }
                            }
                        ],
                    }
                },
            }
        },
        mounted() {
            // Call first time
            // Check the token, just in case we reload it
            this.getPlatformInfo()

            // The call each N seconds
            setInterval(function () {
                this.getPlatformInfo()
                this.refreshToken()
            }.bind(this), 15000)
        },
        methods: {
            getPlatformInfo() {
                this.$store.dispatch('getPlatformInfo', this.$store.getters.token)
            },
            refreshToken() {
                this.$store.dispatch('refreshToken')
            },
        },
        computed: {

            // Simple numbers
            totalSaveGames() {
                return this.$store.getters.totalSaveGames
            },
            totalMultiplayerSaveGames() {
                return this.$store.getters.totalMultiplayerSaveGames
            },
            databaseSize() {
                return this.$store.getters.databaseSize
            },
            totalUsers() {
                return this.$store.getters.totalUsers
            },
            // Chart values
            bestPlayers() {
                return this.$store.getters.bestPlayers
            },
            multiPlayerVsSinglePlayer() {
                return this.$store.getters.multiPlayerVsSinglePlayer
            }

        }
    }
</script>

<style scoped>

</style>
