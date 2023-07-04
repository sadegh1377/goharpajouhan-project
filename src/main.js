import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";

axios.defaults.headers.common['Authorization'] = "sadegh-hadipoor-7701112f-dd47-4673-9f89-1335ea926d51";

const base = axios.create({
    baseURL: "https://goharp-task1.iran.liara.run/"
});
Vue.prototype.$https = base;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
