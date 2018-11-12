import VueRouter from 'vue-router'

const Home = { template: `
<div>
	<h1>Home</h1>
    <h2>Vue mounted</h2>
    <h2>Router Demo:</h2>
    <ul>
      <li><router-link to="/foo" id="foo">/foo</router-link></li>
      <li><router-link to="/bar" id="bar">/bar</router-link></li>
    </ul>
	<input type="button" value="Reload Page" onClick="document.location.reload(true)">
  </div>
`}
const Foo = { template: `
  <div>
  	<h1>foo</h1>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/bar">/bar</router-link></li>
    </ul>
	<input type="button" value="reload Page" onClick="document.location.reload(true)">
  </div>
`}
const Bar = { template: `
  <div>
  	<h1>bar</h1>
    <ul>
      <li><router-link to="/foo">/foo</router-link></li>
      <li><router-link to="/">/</router-link></li>
    </ul>
	<input type="button" value="Reload Page" onClick="document.location.reload(true)">
  </div>
`}

const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

export function createRouter() {
  return new VueRouter({
    routes
  })
}
