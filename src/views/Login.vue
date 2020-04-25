<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
                    @keyup.enter="login"
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-spacer/>
                                <img src="../assets/euiv.png" width="50px" height="50px">
                                <v-toolbar-title class="ml-3">EUIV Management platform</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Login"
                                            name="login"
                                            prepend-icon="fa-user"
                                            type="text"
                                            v-model="user"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="fa-lock"
                                            type="password"
                                            v-model="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="primary" @click="login">Login</v-btn>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                        <v-card v-if="invalidPassword" class="red">
                            <v-card-text>The user or password for <strong>{{wrongUser}}</strong> is incorrect</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data() {
            return {
                password: '',
                user: '',
                wrongUser: ''
            }
        },
        methods: {
            login() {
                let userInfo = {password: this.password, user: this.user}
                this.$store.dispatch('login', userInfo).then((invalidPassword) => {
                    if (!invalidPassword) {
                        localStorage.setItem('authenticated', true)
                        localStorage.setItem('token', this.$store.getters.token)
                        this.wrongUser = ''
                        if (localStorage.getItem('firstLogin') !== 'false') {
                            this.$router.push('/first_login')
                        }
                    } else {
                        this.wrongUser = this.user
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        computed: {
            invalidPassword() {
                return this.$store.getters.invalidPassword
            }
        }
    }
</script>
