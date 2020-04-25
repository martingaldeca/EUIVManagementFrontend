<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
                    @keyup.enter="updatePassword"
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
                                <v-toolbar-title class="ml-3">New password for <strong>{{username}}</strong></v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            id="password"
                                            label="Old password"
                                            name="oldPassword"
                                            prepend-icon="fa-lock"
                                            type="password"
                                            v-model="oldPassword"
                                    />
                                    <v-text-field
                                            id="password"
                                            label="New password"
                                            name="password1"
                                            prepend-icon="fa-lock"
                                            type="password"
                                            v-model="password1"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Repeat new password"
                                            name="password2"
                                            prepend-icon="fa-lock"
                                            type="password"
                                            v-model="password2"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="primary" @click="updatePassword">Update password</v-btn>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                        <v-card v-if="invalidPassword" class="red">
                            <v-card-text>The old password is incorrect</v-card-text>
                        </v-card>
                        <v-card v-if="passwordsDoesNotMatch" class="red">
                            <v-card-text>The passwords does not match</v-card-text>
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
                password1: '',
                password2: '',
                oldPassword: ''
            }
        },
        methods: {
            updatePassword() {
                let newPasswordInfo = {password1: this.password1, password2: this.password2, oldPassword: this.oldPassword}
                this.$store.dispatch('resetPassword', newPasswordInfo).then((response) => {
                    if(response) {
                        this.$router.push('/')
                    }
                })
            }
        },
        computed: {
            invalidPassword() {
                return this.$store.getters.invalidPassword
            },
            passwordsDoesNotMatch() {
                return this.$store.getters.passwordsDoesNotMatch
            },
            username() {
                return localStorage.getItem('username')
            }
        }
    }
</script>
