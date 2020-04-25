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
                <v-row no-gutters class="mt-4">
                    <v-col>
                        <v-card class="pa-2 mt-2 ml-2 mr-2">
                            <v-row>
                                <v-col class="col-8 text-center mt-2">
                                    <v-card-text>
                                        <v-icon>fa-sync-alt</v-icon>
                                        Auto refresh on streaming:
                                    </v-card-text>
                                </v-col>
                                <v-col class="mr-6">
                                    <v-text-field
                                            hint="Minutes to wait until the next savegame process while streaming."
                                            v-model="autoRefreshStreaming"
                                            label="Minutes"
                                            class="text-center"
                                            clearable
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
                                            class="text-center"
                                            clearable
                                    />
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row no-gutters class="mt-8">
                    <v-col>
                        <div style="width: 100%" class="primary v-text-field--rounded">
                            <strong>Users Permissions</strong>
                        </div>
                        <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="userTypePermissions"
                                :single-select=false
                                class="elevation-2"
                                style="margin-top: 30px; margin-bottom: 20px"
                                multi-sort
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
                autoRefreshStreaming: 0,
                hitsUntilEndOfStreaming: 0,
                errorMessage: '',
                processingPath: false,
                okMessage: '',
                selected: [],
                headers: [
                    {text: 'Permission', value: 'permission'},
                    {text: 'Player', value: 'player_permission'},
                    {text: 'Host', value: 'host_permission'},
                    {text: 'Viewer', value: 'viewer_permission'},
                ],


                userTypePermissions: [
                    {
                        permission: 'Can view other player countries stats',
                        player_permissions: false,
                        host_permissions: false,
                        viewer_permission: true
                    },
                    {
                        permission: 'Can view other player province stats',
                        player_permissions: false,
                        host_permissions: false,
                        viewer_permission: true
                    },
                ]

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
