import axios from 'axios'

export const state = {
    platformUsers: [],
    postConfig: {
        headers: {Authorization: "JWT " + localStorage.getItem('token')},
    }
}

export const mutations = {
    setPlatformUsers(state, platformUsers) {
        state.platformUsers = platformUsers
    }
}

export const actions = {
    getPlatformUsers(context) {
        axios.get('http://localhost:1444/api/platform_users/', context.state.postConfig).then(
            (response) => {
                context.commit('setPlatformUsers', response.data.results)
            }
        )
    }
}

export const getters = {
    platformUsers(state) {
        return state.platformUsers
    }
}
