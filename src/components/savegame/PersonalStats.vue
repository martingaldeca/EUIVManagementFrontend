<template>
    <div style="width: 100%; margin-top: 15px">
        <v-container class="lighten-5">
            <v-row no-gutters>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-cog</v-icon>
                        Development
                        <line-chart
                                :chart-data="ownDevelopment"
                                :options="lineChartOptions"
                                style="height: 300px; position: relative"
                        />
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-university</v-icon>
                        Total Owned Home Cores
                        <line-chart
                                :chart-data="ownedHomeCores"
                                :options="lineChartOptions"
                                style="height: 300px; position: relative"
                        />
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-coins</v-icon>
                        Treasury
                        <line-chart
                                :chart-data="ownTreasury"
                                :options="lineChartOptions"
                                style="height: 300px; position: relative"
                        />
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pa-2 mt-2 ml-2 mr-2">
                        <v-icon>fa-fist-raised</v-icon>
                        Total Manpower
                        <line-chart
                                :chart-data="ownManpower"
                                :options="lineChartOptions"
                                style="height: 300px; position: relative"
                        />
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>
    import LineChart from "@/plugins/charts/LineChart";

    export default {
        name: "PersonalStats",
        props: ['savegameName'],
        components: {
            LineChart
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
                timeFormat: 'YYYY-MM-DD',
                ownDevelopment: {},
                ownedHomeCores: {},
                ownTreasury: {},
                ownManpower: {},
                userId: this.$store.getters.userId
            }
        },
        mounted() {
            this.getOwnCountryDevelopment(this.savegameName, this.userId)
            this.getOwnedProvinces(this.savegameName, this.userId)
            this.getOwnTreasury(this.savegameName, this.userId)
            this.getOwnManpower(this.savegameName, this.userId)

            // The call each N seconds
            setInterval(function () {
                // Check the token, just in case we reload it
                this.refreshToken()
                this.getOwnCountryDevelopment(this.savegameName, this.userId)
                this.getOwnedProvinces(this.savegameName, this.userId)
                this.getOwnTreasury(this.savegameName, this.userId)
                this.getOwnManpower(this.savegameName, this.userId)
            }.bind(this), 15000)
        },
        methods: {
            getOwnCountryDevelopment(savegameName, userId) {
                let stat = 'development'
                this.$store.dispatch(
                    'getUserCountryStat',
                    {stat, savegameName, userId}
                ).then((response) => {
                        this.ownDevelopment = response.data
                    }
                )
            },
            getOwnedProvinces(savegameName, userId) {
                let stat = 'num_owned_home_cores'
                this.$store.dispatch(
                    'getUserCountryStat',
                    {stat, savegameName, userId}
                ).then((response) => {
                        this.ownedHomeCores = response.data
                    }
                )
            },
            getOwnTreasury(savegameName, userId) {
                let stat = 'treasury'
                this.$store.dispatch(
                    'getUserCountryStat',
                    {stat, savegameName, userId}
                ).then((response) => {
                        this.ownTreasury = response.data
                    }
                )
            },
            getOwnManpower(savegameName, userId) {
                let stat = 'manpower'
                this.$store.dispatch(
                    'getUserCountryStat',
                    {stat, savegameName, userId}
                ).then((response) => {
                        this.ownManpower = response.data
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
