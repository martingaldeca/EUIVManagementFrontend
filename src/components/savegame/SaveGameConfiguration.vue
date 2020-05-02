<template>
    <div style="width: 100%; margin-top: 15px">
        <v-row no-gutters class="mt-4">
            <v-col>
                <v-card class="pa-2 mt-2 ml-2 mr-2">
                    <v-row>
                        <v-col class="col-8 text-center mt-2">
                            <v-card-text>
                                <v-icon>fa-sync-alt</v-icon>
                                Check time on streaming:
                            </v-card-text>
                        </v-col>
                        <v-col class="mr-6">
                            <v-text-field
                                    hint="Minutes to wait until the next savegame process while streaming."
                                    v-model="checkTimeStreaming"
                                    label="Minutes"
                                    class="input-c"
                                    @change="setCheckTimeOnStreaming"
                                    :error-messages="checkTimeErrorMessage"
                                    :messages="checkTimeOkMessage"
                            />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="pa-2 mt-2 ml-2 mr-2">
                    <v-row>
                        <v-col class="col-8 text-center mt-2">
                            <v-card-text>
                                <v-icon>fa-bell-slash</v-icon>
                                Hits until end of streaming:
                            </v-card-text>
                        </v-col>
                        <v-col class="mr-6">
                            <v-text-field
                                    hint="The number of times the savegame has any change until stream ends."
                                    v-model="hitsUntilEndOfStreaming"
                                    label="Total hits"
                                    class="input-c"
                                    @change="setHitsUntilEndOfStreaming"
                                    :error-messages="hitsUntilEndOfStreamingErrorMessage"
                                    :messages="hitsUntilEndOfStreamingOkMessage"
                            />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-8">
            <v-col>
                <v-card>
                    <div style="width: 100%" class="primary v-text-field--rounded">
                        <strong>Users Permissions</strong>
                    </div>
                </v-card>
                <v-card>
                    <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="userTypePermissions"
                            :single-select=false
                            class="elevation-2 mt-0"
                            style="margin-top: 30px; margin-bottom: 20px"
                            multi-sort
                            :hide-default-footer="true"
                    >
                        <template v-slot:body="{ items }">
                            <tr v-for="item in items" :key="item.permission" style="text-align: left">
                                <td>{{ item.permission }}</td>
                                <td>
                                    <v-checkbox v-model="item.player_permission"/>
                                </td>
                                <td>
                                    <v-checkbox v-model="item.host_permission"/>
                                </td>
                                <td>
                                    <v-checkbox v-model="item.viewer_permission"/>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters class="mt-8">
            <v-col>
                <v-card>
                    <div style="width: 100%" class="primary v-text-field--rounded">
                        <strong>Record session</strong>
                    </div>
                </v-card>
                <v-card>
                    <v-card-text>
                        <p>The action of "Record session" will set this savegame as the current active savegame, and will start the record of the stats.</p>
                        <p>It means that the platform will check for the autosave.eu file in your EU IV path if it is a single-player game and for the mp_autosave.eu if it is multiplayer.</p>
                        <p>The file will be processed every <strong>{{checkTimeStreaming}}</strong> minutes, and the record will stop if there is no change in the savegame
                            <strong>{{hitsUntilEndOfStreaming}}</strong> consecutive times. You can change these 2 parameters of the savegame configuration.</p>
                        <p>Record sessions will automatically stop the record of other sessions, so make sure that this is the savegame you want to record in the platform.</p>
                    </v-card-text>

                    <v-btn
                            rounded
                            class="primary mb-6"
                            style="color: black"
                            @click="startRecordSession"
                    >
                        Start record session
                    </v-btn>
                    <v-card-text v-if="recordSessionMessageOk !== ''" class="success">{{recordSessionMessageOk}}</v-card-text>
                    <v-card-text v-if="recordSessionMessageNoOk !== ''" class="error">{{recordSessionMessageNoOk}}</v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "SaveGameConfiguration",
        props: ['savegameName'],
        data() {
            return {
                headers: [
                    {text: 'Permission', value: 'permission'},
                    {text: 'Player', value: 'player_permission'},
                    {text: 'Host', value: 'host_permission'},
                    {text: 'Viewer', value: 'viewer_permission'},
                ],
                checkTimeOkMessage: '',
                hitsUntilEndOfStreamingOkMessage: '',
                selected: [],
                checkTimeErrorMessage: '',
                hitsUntilEndOfStreamingErrorMessage: '',
                userTypePermissions: [
                    // {
                    //     permission: 'Can view other player countries stats',
                    //     player_permissions: false,
                    //     host_permissions: false,
                    //     viewer_permission: true
                    // },
                    // {
                    //     permission: 'Can view other player province stats',
                    //     player_permissions: false,
                    //     host_permissions: false,
                    //     viewer_permission: true
                    // },
                ],
                checkTimeStreamingProxy: 0,
                hitsUntilEndOfStreamingProxy: 0,
                recordSessionMessageOk: '',
                recordSessionMessageNoOk: '',
            }
        },
        methods: {
            setCheckTimeOnStreaming() {
                this.checkTimeOkMessage = ''
                this.checkTimeErrorMessage = ''
                if (typeof this.checkTimeStreamingProxy === "string") {
                    this.checkTimeStreamingProxy = this.checkTimeStreamingProxy.replace(',', '.')
                }

                this.$store.dispatch('setCheckTimeOnStreaming', {checkTimeStreaming: this.checkTimeStreamingProxy, savegameName: this.savegameName}).then((response) => {
                    // Check if there is any error
                    if (response.response) {
                        this.checkTimeErrorMessage = response.response.data
                    } else {
                        this.checkTimeOkMessage = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                    this.errorMessage = 'Internal program error. See logs for more info and please report it.'
                })
            },
            getCheckTimeStreaming() {
                this.$store.dispatch('getCheckTimeStreaming', this.savegameName)
            },
            setHitsUntilEndOfStreaming() {
                this.hitsUntilEndOfStreamingOkMessage = ''
                this.hitsUntilEndOfStreamingErrorMessage = ''
                if (typeof this.hitsUntilEndOfStreamingProxy === "string") {
                    this.hitsUntilEndOfStreamingProxy = this.hitsUntilEndOfStreamingProxy.replace(',', '.')
                }

                this.$store.dispatch('setHitsUntilEndOfStreaming', {hitsUntilEndOfStreaming: this.hitsUntilEndOfStreamingProxy, savegameName: this.savegameName}).then((response) => {
                    // Check if there is any error
                    if (response.response) {
                        this.hitsUntilEndOfStreamingErrorMessage = response.response.data
                    } else {
                        this.hitsUntilEndOfStreamingOkMessage = response.data
                    }
                }).catch((error) => {
                    console.log(error)
                    this.errorMessage = 'Internal program error. See logs for more info and please report it.'
                })
            },
            getHitsUntilEndOfStreaming() {
                this.$store.dispatch('getHitsUntilEndOfStreaming', this.savegameName)
            },
            startRecordSession() {
                this.recordSessionMessageOk = ''
                this.recordSessionMessageNoOk = ''
                this.$store.dispatch('startRecordSession', this.savegameName).then((response) => {
                    if (response.response) {
                        this.recordSessionMessageNoOk = response.response.data
                    } else {
                        this.recordSessionMessageOk = response.data
                    }
                })
            }
        },
        mounted() {
            this.getCheckTimeStreaming()
            this.getHitsUntilEndOfStreaming()
        },
        computed: {
            checkTimeStreaming: {
                get() {
                    return this.$store.getters.checkTimeStreaming
                },
                set(newValue) {
                    this.checkTimeStreamingProxy = newValue
                }
            },
            hitsUntilEndOfStreaming: {
                get() {
                    return this.$store.getters.hitsUntilEndOfStreaming
                },
                set(newValue) {
                    this.hitsUntilEndOfStreamingProxy = newValue
                }
            },
        }

    }
</script>

<style scoped>
</style>
