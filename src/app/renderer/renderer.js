import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import App from './App'

// github.com/electron/electron/issues/7300#issuecomment-285885725
const { ipcRenderer } = window.require('electron')

// register global components
Vue.component('Debug', require('./components/Debug').default)


Vue.use(Vuetify)
Vue.use(VueRouter)

new Vue({
	el: '#app',
	render(h) {
		return h(App)
	}
})


console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.dir(event)
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
