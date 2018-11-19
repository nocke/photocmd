<template>
	<div id='app'>
		<header class='header'>
			header
		</header>
		<aside class='sidebar'>
			sidebar
		</aside>
		<main class='main'>
			<h1>main: {{ hello }}</h1>


		</main>
		<aside class='sidebar'>
			sidebar
		</aside>
		<footer>
			footer
		</footer>

		<Debug></Debug>
		<input class='helper_reload' type="button" value="Reload Page" onClick="document.location.reload(true)">
	</div>
</template>

<script>
export default {
	data() {
		return {
			hello: 'Hello Application',
			debugMode: parseInt(window.process.env.ELECTRON_IS_DEV, 10) === 1
		}
	}
}
</script>
