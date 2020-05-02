<template>
    <div>
        <div style="width: 100%; margin-top: 15px">
            <v-container class="lighten-5">
                <v-row no-gutters>
                    <v-col>
                        <div style="width: 100%" class="primary v-text-field--rounded">
                            <strong>Savegames Path</strong>
                        </div>
                        <v-text-field
                                hint="This field should be the complete path to the savegames folder"
                                v-model="savegamesPath"
                                label="Copy here your local savegames path."
                                class="text-center"
                                clearable
                                prepend-icon="fa-save"
                                :error-messages="errorMessage"
                                :messages="okMessage"
                        />

                        <v-btn
                                rounded
                                class="primary"
                                style="color: black"
                                @click="processSavegamesPath"
                                :loading="processingPath"
                        >
                            Process savegames
                        </v-btn>
                    </v-col>
                </v-row>


            </v-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlatformConfiguration",
        data() {
            return {
                savegamesPath: '',
                errorMessage: '',
                processingPath: false,
                okMessage: '',

            }
        },
        methods: {
            processSavegamesPath() {
                this.errorMessage = ''
                this.processingPath = true
                this.$store.dispatch(
                    'processSavegamesPath',
                    this.savegamesPath
                ).then((response) => {
                    this.processingPath = false

                    // Check if there is any error
                    if (response.response) {
                        this.errorMessage = response.response.data
                    } else {
                        this.okMessage = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                    this.errorMessage = 'Internal program error. See logs for more info and please report it.'
                })
            }
        }
    }

</script>

<style scoped>

</style>
