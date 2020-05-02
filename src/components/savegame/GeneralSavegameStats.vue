<template>
    <div style="width: 100%; margin-top: 15px">
        <v-container class="lighten-5">
            <v-row no-gutters>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-cog</v-icon>
                        More Developed Players
                        <bar-chart
                                :chart-data="bestSavegamePlayers"
                                :options="barChartSaveGameOptions"
                                style="height: 300px; position: relative"
                        />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import BarChart from "@/plugins/charts/BarChart";

    export default {
        name: "GeneralSavegameStats",
        props: ['savegameName'],
        components: {
            BarChart
        },
        data() {
            return {
                lineChartOptions: {
                    hoverBorderWidth: 20,
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                format: this.timeFormat,
                                tooltipFormat: 'll'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Development'
                            }
                        }]
                    }
                },
                barChartSaveGameOptions: {
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
                bestSavegamePlayers: {},
                userId: this.$store.getters.userId
            }
        },
        mounted() {
            this.getSavegameBestPlayers(this.savegameName)

            // The call each N seconds
            setInterval(function () {
                // Check the token, just in case we reload it
                this.refreshToken()
                this.getSavegameBestPlayers(this.savegameName)
            }.bind(this), 15000)
        },
        methods: {
            getSavegameBestPlayers(savegameName) {
                this.$store.dispatch(
                    'getSavegameBestPlayers',
                    {savegameName}
                ).then((response) => {
                        this.bestSavegamePlayers = response.data
                    }
                )
            },
            refreshToken() {
                this.$store.dispatch('refreshToken')
            }
        }
    }
</script>

<style scoped>

</style>
