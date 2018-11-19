import Vue from 'vue/dist/vue.min'
import App from './App'

// import { ipcRenderer } from 'electron'
// BAD? const { ipcRenderer } = require('electron')
// GOOD:
const { ipcRenderer } = window.require('electron')

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


console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.dir(event)
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
