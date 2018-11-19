import Vue from 'vue/dist/vue.min'
import App from './App'

// register global components
Vue.component('Debug', require('./components/Debug').default)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

new Vue({
	el: '#app',
	render(h) {
		return h(App)
	}
})
