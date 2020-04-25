import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {state as saveGameState, mutations as saveGameMutations, actions as saveGameActions, getters as saveGameGetters} from './savegames'
import {state as authenticationState, mutations as authenticationMutations, actions as authenticationActions, getters as authenticationGetters} from './authentication'
import {state as usersState, mutations as usersMutations, actions as usersActions, getters as usersGetters} from './users'

Vue.use(Vuex, axios)

export const store = new Vuex.Store(
    {
        state: {
            ...usersState,
            ...authenticationState,
            ...saveGameState
        },
        mutations: {
            ...authenticationMutations,
            ...saveGameMutations,
            ...usersMutations
        },
        actions: {
            ...authenticationActions,
            ...saveGameActions,
            ...usersActions
        },
        getters: {
            ...authenticationGetters,
            ...saveGameGetters,
            ...usersGetters
        }
    }
)
