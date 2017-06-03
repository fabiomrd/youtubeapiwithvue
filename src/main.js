import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import MaterialDesign from 'material-design-lite';
import VueResource from 'vue-resource';
import Tooltip from 'hsy-vue-tooltip';
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(MaterialDesign);
Vue.use(Tooltip);
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});


new Vue({
    el: '#app',
    router,
    render: h => h(App)
})


Vue.filter('mini', function(value) {
    return value.substring(0, 20) + '...';
})