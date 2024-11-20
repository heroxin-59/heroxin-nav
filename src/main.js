import Vue from 'vue'
import ElementUI  from 'element-ui'
import VueRouter from 'vue-router'
import App from './App.vue'
import Index from './views/index.vue'
import About from './views/about.vue'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/fonts/linecons/css/linecons.css'
import './assets/css/fonts/fontawesome/css/font-awesome.min.css'
import './assets/css/bootstrap.css'
import './assets/css/xenon-core.css'
import './assets/css/xenon-components.css'
import './assets/css/xenon-skins.css'
import './assets/css/nav.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
