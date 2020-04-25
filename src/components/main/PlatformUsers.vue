<template>
    <v-data-table
            v-model="selected"
            :headers="headers"
            :items="platformUsers"
            :single-select=false
            class="elevation-2"
            style="margin-top: 30px; margin-bottom: 20px"
            multi-sort

    >
        <template v-slot:body="{ items }">
            <tr v-for="item in items" :key="item.user" style="text-align: left">
                <td><a href="#" style="text-decoration: none">{{ item.user }}</a></td>
                <td>{{ item.username }}</td>
                <td v-if="item.email">{{ item.email }}</td>
                <td v-else>-</td>
                <td>{{ item.total_games }}</td>
                <td>{{ item.user_type }}</td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "PlatformUsers",
        data() {
            return {
                selected: [],
                headers: [
                    {text: 'User Id', value: 'user'},
                    {text: 'Username', value: 'username'},
                    {text: 'Email', value: 'email'},
                    {text: 'Total games', value: 'total_games'},
                    {text: 'User type', value: 'user_type'}
                ]
            }
        },
        mounted() {
            this.getPlatformUsers()

            // The call each N seconds
            setInterval(function () {
                // Check the token, just in case we reload it
                this.refreshToken()
                this.getPlatformUsers()
            }.bind(this), 15000)
        },
        methods: {
            getPlatformUsers() {
                this.$store.dispatch('getPlatformUsers')
            },
            refreshToken() {
                this.$store.dispatch('refreshToken')
            }
        },
        computed: {
            platformUsers() {
                return this.$store.getters.platformUsers
            }
        }
    }
</script>

<style scoped>

</style>
