// import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
// import 'typeface-roboto/index.css' // vuetify / material design font

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'fa'
    },
    theme: {
        themes: {
            light: {
                primary: '#a9e1ff',
                secondary: '#b2ebf2',
                accent: '#ff5722',
                error: '#dd2c00',
            }
        }
    }
})
