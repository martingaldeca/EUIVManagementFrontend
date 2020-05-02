import Vue from 'vue'
import Router from 'vue-router'
import MainView from "@/views/MainView";
import FirstLogin from "@/views/FirstLogin";
import SaveGameView from "@/views/SaveGameStatsView";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/first_login',
            name: 'firstLogin',
            component: FirstLogin,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/savegame/:savegame_name',
            name: 'saveGame',
            component: SaveGameView,
            meta: {
                requiresAuth: true
            }
        },
    ]
})
