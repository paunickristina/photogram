<template>
    <div class="c-search">
			<app-header :title="title"></app-header>
			<div class="c-search__form">
				<form>
					<input type="text" placeholder="Search">
				</form>
			</div>
			<app-footer></app-footer>
		</div>
</template>

<script>
	import Header from './header.vue'
	import Footer from './footer.vue'

	export default {
		data() {
			return {
				title: 'Search'
			}
		},
		components: {
			appHeader: Header,
			appFooter: Footer
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";
	
	
</style>
