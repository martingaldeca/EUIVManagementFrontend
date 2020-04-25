<template>
    <v-data-table
            v-model="selected"
            :headers="headers"
            :items="simpleSaveGames"
            :single-select=false
            class="elevation-2"
            style="margin-top: 30px; margin-bottom: 20px"
            multi-sort

    >
        <template v-slot:body="{ items }">
            <tr v-for="item in items" :key="item.savegame_name" style="text-align: left">
                <td><a href="#" style="text-decoration: none">{{ item.savegame_name }}</a></td>
                <td>{{ item.savegame_date }}</td>
                <v-chip :color="getColor(item.savegame_lines)" class="mt-2">{{ item.savegame_lines }}</v-chip>

                <td>
                    <v-icon v-if="item.savegame_is_multi_player" color="green">fa-check</v-icon>
                    <v-icon v-else color="red">fa-times</v-icon>
                </td>
                <td>
                    <v-icon v-if="item.active" color="green">fa-check</v-icon>
                    <v-icon v-else color="red">fa-times</v-icon>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "SaveGames",
        data() {
            return {
                selected: [],
                headers: [
                    {text: 'Save Name', value: 'savegame_name'},
                    {text: 'Date', value: 'savegame_date'},
                    {text: 'Lines', value: 'savegame_lines'},
                    {text: 'Multiplayer', value: 'savegame_is_multi_player'},
                    {text: 'Active', value: 'active'}
                ]
            }
        },
        mounted() {
            this.getSimpleSaveGames()

            // The call each N seconds
            setInterval(function () {
                // Check the token, just in case we reload it
                this.refreshToken()
                this.getSimpleSaveGames()
            }.bind(this), 15000)
        },
        methods: {
            getSimpleSaveGames() {
                this.$store.dispatch('getSimpleSaveGames')
            },
            refreshToken() {
                this.$store.dispatch('refreshToken')
            },
            getColor(lines) {
                if (lines > 2000000) return 'red'
                else if (lines > 1500000) return 'orange'
                else return 'green'
            }
        },
        computed: {
            simpleSaveGames() {
                return this.$store.getters.simpleSaveGames
            }
        }
    }
</script>

<style scoped>

</style>
