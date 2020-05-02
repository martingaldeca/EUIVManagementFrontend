<template>
    <div>
        <a>
            <v-avatar style="margin-right: 75px" @click.stop="drawer = !drawer">
                <img :src="userAvatar" alt="User">
            </v-avatar>
        </a>
        <v-navigation-drawer
                v-model="drawer"
                temporary
                absolute
                :right=true
                :mini-variant="mini"
                style="margin-top: 65px; height: 160px"
        >
            <v-list dense>
                <v-list-item class="primary mt-n2">
                    <v-list-item-action>
                        <v-icon>fa-user</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title><strong>{{$store.getters.username}}</strong></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-on:click="logout">
                    <v-list-item-action>
                        <v-icon>fa-sign-out-alt</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link >
                    <v-list-item-action>
                        <v-icon>fa-address-card</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        name: "UserCircularNav",
        data() {
            return {
                drawer: false,
                items: [
                    {title: 'Home', icon: 'mdi-home-city'},
                    {title: 'My Account', icon: 'mdi-account'},
                    {title: 'Users', icon: 'mdi-account-group-outline'},
                ],
                mini: false,
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                this.$router.push('/')
            }
        },
        computed: {
            userAvatar() {
                return this.$store.getters.userAvatar
            }
        }
    }
</script>

<style scoped>

</style>
