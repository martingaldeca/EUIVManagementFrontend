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
    postConfig: {
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
    }
}

export const actions = {
    getPlatformInfo(context) {
        axios.get('http://localhost:1444/api/platform_info', context.state.postConfig).then(
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
    getSimpleSaveGames(context) {
        axios.get('http://localhost:1444/api/simple_save_games', context.state.postConfig).then(
            (response) => {
                context.commit('setSimpleSaveGames', response.data.results)
            }
        )
    },
    processSavegamesPath(context, path) {
        return new Promise((resolve) => {
            console.log('Will process path ', path)
            axios.post(
                'http://localhost:1444/api/process_path/',
                {path: path},
                context.state.postConfig,
            ).then((response) => {
                    console.log(response)
                    resolve(response)
                }
            ).catch((error) => {
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
    }
}
