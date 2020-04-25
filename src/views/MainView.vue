<template>
    <v-app id="inspire">
        <div v-if="authenticated">
            <NavigationDrawer/>
            <MainPlatform/>
            <Footer/>
        </div>
        <div v-else>
            <Login/>
        </div>
    </v-app>
</template>

<script>
    import Footer from "@/components/layout/Footer"
    import NavigationDrawer from "@/components/layout/NavigationDrawer";
    import Login from "@/views/Login";
    import MainPlatform from "@/views/MainPlatform";

    export default {
        name: "MainView",
        data() {
            return {
                panel: [0],
            }
        },
        components: {
            MainPlatform,
            Footer,
            NavigationDrawer,
            Login,
        },
        computed: {
            authenticated() {
                return this.$store.getters.authenticated
            },
            token() {
                return this.$store.getters.token
            },
            firstLogin() {
                return localStorage.getItem('firstLogin')
            }
        }
    }
</script>

<style scoped>

</style>
