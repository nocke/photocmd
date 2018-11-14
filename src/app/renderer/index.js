import Vue from 'vue/dist/vue.min'
import App from './App'

// register global components
// Vue.component('Debug', Debug)
Vue.component('Debug', require('./components/Debug').default)

// import VueRouter from 'vue-router'
// import { createRouter } from './router'
// Vue.use(VueRouter)

// new Vue({
//   el:'#app',
//   router: createRouter(),
//   render(h) {
//     return h('router-view')
//   }
// })

const app = new Vue({
	el: '#app',
	render(h) {
		return h(App)
	}
})
