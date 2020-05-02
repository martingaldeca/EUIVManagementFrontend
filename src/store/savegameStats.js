import axios from 'axios'

export const state = {
    axiosConfig: {
        headers: {Authorization: "JWT " + localStorage.getItem('token')},
    },
}

export const mutations = {}

export const actions = {
    getUserCountryStat(context, {savegameName, userId, stat}) {
        return new Promise((resolve) => {
            axios.get(
                'http://localhost:1444/api/country_stat/' + stat + '/' + savegameName + '/' + userId,
                context.state.axiosConfig
            ).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error)
            })
        })
    },
    getSavegameBestPlayers(context, {savegameName}) {
        return new Promise((resolve) => {
            let stat = 'development'
            axios.get(
                'http://localhost:1444/api/best_savegame_players' + '/' + stat + '/' + savegameName + '/',
                context.state.axiosConfig
            ).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error)
            })
        })
    }
}

export const getters = {}
