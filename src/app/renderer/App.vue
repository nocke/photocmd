<template>
	<div id='app'>

		<v-app dark>
			<v-navigation-drawer app>
				Navigation Drawer
			</v-navigation-drawer>
			<v-toolbar app>
				<v-toolbar-side-icon></v-toolbar-side-icon>
				<v-toolbar-title class="white--text">Toolbar</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon>
					<v-icon>more_vert</v-icon>
				</v-btn>
			</v-toolbar>
			<v-content>
				<v-container fluid>

					<v-layout row wrap>
						<v-flex xs6>
							Howdy, partner!

							<h1>Muster<i>knabe6</i> <a href='#'>mit Link</a> ONE<br>ä¼ß³</h1>
							<h2>Hamb<i>urg</i> <a href='#'>mit Link</a> TWO<br>ä¼ß³</h2>
							<h3>Hamb<i>urg</i> <a href='#'>mit Link</a> THREE<br>ä¼ß³</h3>
							<h4>Hamb<i>urg</i> <a href='#'>mit Link</a> FOUR<br>ä¼ß³</h4>
							<p> Paragraph Absatz Gallia est omnis divisa in partes tres, quarum unam <a href='#'>
									incolunt Belgae</a>, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra
								Galli appellantur. Hi omnes lingua, institutis, legibus inter se differunt.
							</p>
							Direct Text Gallos <a href='#'>ab Aquitanis Garumna</a> flumen, a Belgis Matrona et Sequana dividit. Horum omnium fortissimi sunt Belgae,
							propterea quod a cultu atque humanitate provinciae longissime absunt.
							<h5>Hamb<i>urg</i> <a href='#'>mit Link</a> FIVE<br>ä¼ß³</h5>
							<h6>Hamb<i>urg</i> <a href='#'>mit Link</a> SIX<br>ä¼ß³</h6>
							<hr>
						</v-flex>
						<v-flex xs6>
							<div style='font-size:2em'>
								<div style='font-weight: 100'>
									Hamb<i>urg</i> <u>was</u> <a href='#'>here</a></i>
								</div>
								<div style='font-weight: 300'>
									Hamb<i>urg</i> <u>was</u> <a href='#'>here</a></i>
								</div>
								<div style='font-weight: 400'>
									Hamb<i>urg</i> <u>was</u> <a href='#'>here</a></i>
								</div>
								<div style='font-weight: 500'>
									Hamb<i>urg</i> <u>was</u> <a href='#'>here</a></i>
								</div>
								<div style='font-weight: 700'>
									Hamb<i>urg</i> <u>was</u> <a href='#'>here</a></i>
								</div>
								<div style='font-weight: 900'>
									Hamb<i>urg</i> <u>was</u> <a href='#'>here</a></i>
								</div>
							</div>

							<v-alert :value="true" type="success">
								Good boy!
							</v-alert>

						</v-flex>
					</v-layout>

				</v-container>
			</v-content>
			<v-footer app>
				<v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute shift>

					<!-- more details: see here https://codepen.io/fnocke/pen/XyVNOx?&editors=101 -->
					<v-btn dark>
						<span>Video</span>
						<v-icon>ondemand_video</v-icon>
					</v-btn>

					<v-btn dark>
						<span>Music</span>
						<v-icon>music_note</v-icon>
					</v-btn>

					<v-btn dark>
						<span>Book</span>
						<v-icon>book</v-icon>
					</v-btn>

					<v-btn dark>
						<span>Image</span>
						<v-icon>image</v-icon>
					</v-btn>

				</v-bottom-nav>
			</v-footer>
		</v-app>

		<Debug></Debug>
		<input class='helper_reload' type="button" value="Reload Page" onClick="document.location.reload(true)">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				drawer: null,

				hello: "Hello Application",
				debugMode: parseInt(window.process.env.ELECTRON_IS_DEV, 10) === 1
			};
		},
		props: {
			source: String
		}
	};

</script>
