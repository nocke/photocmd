<template>
	<div class='Debug'>
		<h2>The Debug Box</h2>
		<h3>paths:</h3>
		URL path (route) {{ URLPath }}<br/>
		Node version {{ NodeVersion }}<br/>
		Chrome version {{ ChromeVersion }}<br/>
		Electron version {{ ElectronVersion }}<br/>
		DebugMode {{ $parent.debugMode? 'DEBUG' : 'RELEASE' }}<br/>

		<h3>images:</h3>
		<img width='64' height='64' src='../img/testimg.png'>
		<img src='data:image/jpeg;base64,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'>

		<h3>router test:</h3>
		<router-view class='router-test'>Router not initialized</router-view>

	</div>
</template>

<script>
import { createRouter } from "../router";

export default {
  name: "Debug",
  router: createRouter(),
  data() {
    return {
      URLPath: window.location.href,
      NodeVersion: window.process.versions.node,
      ChromeVersion: window.process.versions.chrome,
      ElectronVersion: window.process.versions.electron
    };
  },
  mounted() {
    console.log("Debug Box mounted");
    this.$router.push({ path: "subpage" });
  },
  props: {}
};
</script>

<style lang="scss">
@import "./Debug.sass";
</style>