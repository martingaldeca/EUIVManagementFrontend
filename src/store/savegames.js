import axios from 'axios'

export const state = {
    totalSaveGames: 0,
    totalMultiplayerSaveGames: 0,
    databaseSize: '0 MB',
    totalUsers: 0,
    bestPlayers: {},
    multiPlayerVsSinglePlayer: {},
    simpleSaveGames: [],
    savegamesPath: '',
    checkTimeStreaming: 0,
    hitsUntilEndOfStreaming: 0,
    axiosConfig: {
        headers: {Authorization: "JWT " + localStorage.getItem('token')},
    }
}

export const mutations = {
    setTotalSaveGames(state, totalSaveGames) {
        state.totalSaveGames = totalSaveGames
    },
    setTotalMultiplayerSaveGames(state, totalMultiplayerSaveGames) {
        state.totalMultiplayerSaveGames = totalMultiplayerSaveGames
    },
    setDatabaseSize(state, databaseSize) {
        state.databaseSize = databaseSize
    },
    setTotalUsers(state, totalUsers) {
        state.totalUsers = totalUsers
    },
    setBestPlayers(state, bestPlayersData) {
        state.bestPlayers = {
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: bestPlayersData['best_players_names'],
            datasets: [
                {
                    label: 'Best development ingame',
                    backgroundColor: bestPlayersData['best_players_colors'],
                    data: bestPlayersData['best_players_development'],
                }
            ],
        }
    },
    setMultiPlayerVsSinglePlayer(state, multiPlayerVsSinglePlayerData) {
        state.multiPlayerVsSinglePlayer = {
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: ["Single Player", "Multi Player"],
            datasets: [
                {
                    label: "Data One",
                    backgroundColor: ["#4173c8", "#78dc50"],
                    data: multiPlayerVsSinglePlayerData
                }
            ]
        }
    },
    setSimpleSaveGames(state, saveGamesInfo) {
        state.simpleSaveGames = saveGamesInfo
    },
    setCheckTimeStreaming(state, checkTimeStreaming) {
        state.checkTimeStreaming = checkTimeStreaming
    },
    setHitsUntilEndOfStreaming(state, hitsUntilEndOfStreaming) {
        state.hitsUntilEndOfStreaming = hitsUntilEndOfStreaming
    }
}

export const actions = {
    getPlatformInfo(context) {
        axios.get('http://localhost:1444/api/platform_info', context.state.axiosConfig).then(
            (response) => {
                context.commit('setDatabaseSize', response.data.size + ' ' + response.data.units)
                context.commit('setTotalSaveGames', response.data.total_savegames)
                context.commit('setTotalMultiplayerSaveGames', response.data.total_multiplayer)
                context.commit('setTotalUsers', response.data.total_users)
                context.commit('setBestPlayers', response.data.best_players_data)
                context.commit('setMultiPlayerVsSinglePlayer', response.data.multiplayer_vs_singleplayer)
            }
        )
    },
    getSimpleSaveGames(context, user_id) {
        axios.get('http://localhost:1444/api/simple_save_games/' + user_id + '/', context.state.axiosConfig).then(
            (response) => {
                context.commit('setSimpleSaveGames', response.data)
            }
        )
    },
    processSavegamesPath(context, path) {
        return new Promise((resolve) => {
            console.log('Will process path ', path)
            axios.post(
                'http://localhost:1444/api/process_path/',
                {path: path},
                context.state.axiosConfig,
            ).then((response) => {
                    console.log(response)
                    resolve(response)
                }
            ).catch((error) => {
                resolve(error)
            })
        })
    },
    setCheckTimeOnStreaming(context, savegameData) {
        return new Promise((resolve) => {
            axios.post(
                'http://localhost:1444/api/change_check_time/',
                {
                    check_time: savegameData.checkTimeStreaming,
                    savegame_name: savegameData.savegameName
                },
                context.state.axiosConfig,
            ).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error)
            })
        })
    },
    getCheckTimeStreaming(context, savegameName) {
        axios.get(
            'http://localhost:1444/api/get_check_time/' + savegameName + '/',
            context.state.axiosConfig,
        ).then((response) => {
            context.commit('setCheckTimeStreaming', response.data)
        }).catch((error) => {
            console.log(error)
        })
    },
    setHitsUntilEndOfStreaming(context, savegameData) {
        return new Promise((resolve) => {
            axios.post(
                'http://localhost:1444/api/change_hits_until_end_of_streaming/',
                {
                    hits_until_end_of_streaming: savegameData.hitsUntilEndOfStreaming,
                    savegame_name: savegameData.savegameName
                },
                context.state.axiosConfig,
            ).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error)
            })
        })
    },
    getHitsUntilEndOfStreaming(context, savegameName) {
        axios.get(
            'http://localhost:1444/api/get_hits_until_end_of_streaming/' + savegameName + '/',
            context.state.axiosConfig,
        ).then((response) => {
            context.commit('setHitsUntilEndOfStreaming', response.data)
        }).catch((error) => {
            console.log(error)
        })
    },
    startRecordSession(context, savegameName) {
        return new Promise((resolve) => {
            axios.post(
                'http://localhost:1444/api/record_session/',
                {
                    savegame_name: savegameName
                },
                context.state.axiosConfig
            ).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error)
            })
        })
    }
}

export const getters = {
    totalSaveGames(state) {
        return state.totalSaveGames
    },
    totalMultiplayerSaveGames(state) {
        return state.totalMultiplayerSaveGames
    },
    databaseSize(state) {
        return state.databaseSize
    },
    totalUsers(state) {
        return state.totalUsers
    },
    bestPlayers(state) {
        return state.bestPlayers
    },
    multiPlayerVsSinglePlayer(state) {
        return state.multiPlayerVsSinglePlayer
    },
    simpleSaveGames(state) {
        return state.simpleSaveGames
    },
    checkTimeStreaming(state) {
        return state.checkTimeStreaming
    },
    hitsUntilEndOfStreaming(state) {
        return state.hitsUntilEndOfStreaming
    }
}
