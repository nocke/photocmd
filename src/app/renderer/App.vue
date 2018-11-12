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

			<Debug></Debug>

		</main>
		<aside class='sidebar'>
			sidebar
		</aside>
		<footer>
			footer
		</footer>

	</div>
</template>

<script>
export default {
	data() {
		return {
			hello: 'Hello Application'
		}
	}
}
</script>
