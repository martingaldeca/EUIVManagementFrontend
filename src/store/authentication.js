import axios from 'axios'


export const state = {
    token: window.localStorage.getItem('token'),
    invalidPassword: false,
    authenticated: window.localStorage.getItem('authenticated'),
    passwordsDoesNotMatch: false,
    userAvatar: window.localStorage.getItem('userAvatar'),
    userId: window.localStorage.getItem('userId'),
    firstLogin: window.localStorage.getItem('firstLogin'),
    username: window.localStorage.getItem('username'),
    superUser: window.localStorage.getItem('superUser')
}

export const mutations = {
    setToken(state, token) {
        localStorage.setItem('token', token)
        state.token = token
    },
    setUserId(state, userId) {
        localStorage.setItem('userId', userId)
        state.userId = userId
    },
    setFirstLogin(state, firstLogin) {
        localStorage.setItem('firstLogin', firstLogin)
        state.firstLogin = firstLogin
    },
    setUsername(state, username) {
        localStorage.setItem('username', username)
        state.username = username
    },
    setSuperUser(state, superUser) {
        localStorage.setItem('superUser', superUser)
        state.superUser = superUser
    },
    setInvalidPassword(state, invalidPassword) {
        state.invalidPassword = invalidPassword
    },
    setAuthenticated(state, authenticated) {
        state.authenticated = authenticated
    },
    setPasswordsDoesNotMatch(state, passwordsDoesNotMatch) {
        state.passwordsDoesNotMatch = passwordsDoesNotMatch
    },
    setUserAvatar(state, userAvatar) {
        localStorage.setItem('userAvatar', userAvatar)
        state.userAvatar = userAvatar
    }
}

export const actions = {
    login(context, userInfo) {
        return new Promise((resolve) =>
            axios.post('http://localhost:1444/api/auth/token/', {
                password: userInfo.password,
                username: userInfo.user,
            }).then(
                (response) => {
                    context.commit('setToken', response.data.token)
                    context.commit('setInvalidPassword', false)
                    context.commit('setAuthenticated', true)

                    // Get the user information
                    axios.get('http://localhost:1444/api/users', {
                        headers: {Authorization: "JWT " + localStorage.getItem('token')}, params: {'user__username': userInfo.user}
                    }).then((userResponse) => {
                            context.commit('setUserId', userResponse.data.results[0].user.id)
                            context.commit('setUserAvatar', userResponse.data.results[0].user_avatar)
                            context.commit('setFirstLogin', userResponse.data.results[0].first_login)
                            context.commit('setUsername', userResponse.data.results[0].user.username)
                            context.commit('setSuperUser', userResponse.data.results[0].user.is_superuser)
                            resolve(false)
                        }
                    )
                }
            ).catch((() => {
                    context.commit('setInvalidPassword', true)
                    resolve(true)
                }
            ))
        )
    },
    refreshToken(context) {
        axios.post('http://localhost:1444/api/auth/refresh_token/', {
            token: state.token
        }).then((response) => {
            context.commit('setToken', response.data.token)
        }).catch((error) => {
            console.log(error)
        })
    },
    logout(context) {
        context.commit('setToken', '')
        context.commit('setInvalidPassword', false)
        context.commit('setAuthenticated', false)
        localStorage.clear()
    },
    resetPassword(context, newPasswordInfo) {
        return new Promise((resolve => {
            if (newPasswordInfo.password1 === newPasswordInfo.password2) {
                axios.put(
                    'http://localhost:1444/api/reset_password/' + localStorage.getItem('userId') + '/',
                    {
                        newPassword: newPasswordInfo.password1,
                        oldPassword: newPasswordInfo.oldPassword,
                        firstLogin: localStorage.getItem('firstLogin')
                    },
                    {
                        headers: {Authorization: "JWT " + localStorage.getItem('token')}
                    }
                ).then(() => {
                    context.commit('setInvalidPassword', false)
                    localStorage.setItem('firstLogin', 'false')
                    resolve(true)
                }).catch(() => {
                    context.commit('setInvalidPassword', true)
                    context.commit('setPasswordsDoesNotMatch', false)
                })
            } else {
                resolve('Passwords does not match.')
                context.commit('setPasswordsDoesNotMatch', true)
                context.commit('setInvalidPassword', false)

            }
        }))
    }
}

export const getters = {
    token(state) {
        return state.token
    },
    invalidPassword(state) {
        return state.invalidPassword
    },
    authenticated(state) {
        return state.authenticated
    },
    passwordsDoesNotMatch(state) {
        return state.passwordsDoesNotMatch
    },
    userAvatar(state) {
        return state.userAvatar
    },
    userId(state) {
        return state.userId
    },
    firstLogin(state) {
        return state.firstLogin
    },
    username(state) {
        return state.username
    },
    superUser(state) {
        return state.superUser
    }
}
