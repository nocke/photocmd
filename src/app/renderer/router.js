import VueRouter from 'vue-router'

const Home = { template: `<div style="color: #f22;">router not working...?</div>`}
const Subpage = { template: `<div style="color: #2c2;">router working!</div>`}

const routes = [
  { path: '/', component: Home },
  { path: '/subpage', component: Subpage }
]

export function createRouter() {
  return new VueRouter({
    routes
  })
}
