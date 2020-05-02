<template>
    <div>
        <v-app-bar
                app
                clipped-left
                class="primary"
        >
            <v-navigation-drawer
                    v-model="drawer"
                    temporary
                    absolute
                    :mini-variant="mini"

                    style="margin-top: 65px; height: 100vh"
            >
                <v-list dense>
                    <v-list-item link @click="$router.push('/savegames/')">
                        <v-list-item-action>
                            <v-icon>fa-save</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Savegames</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>fa-user</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Users</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>fa-globe-europe</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Countries</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

            <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">EU IV Management</v-toolbar-title>

            <img @click="$router.push('/')" src="../../assets/euiv.png" width="50px" height="50px" style="margin-left: 15px; cursor: pointer" alt="Logo">
            <v-spacer></v-spacer>
            <UserCircularNav/>

        </v-app-bar>
    </div>
</template>

<script>
    import UserCircularNav from "@/components/layout/UserCircularNav";

    export default {
        name: "NavigationDrawer",
        data: () => ({
            drawer: null,
            mini: false
        }),
        components: {
            UserCircularNav
        },

    }
</script>

<style scoped>

</style>
