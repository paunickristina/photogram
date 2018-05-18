<template>
  <section class="c-footer">
		<router-link to="/homepage" class="c-footer__homepage" :class="{active: homepage}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="3117 1920 29 29">
				<g id="Group_179" data-name="Group 179" transform="translate(150 926)">
					<ellipse id="Ellipse_37" data-name="Ellipse 37" class="cls-1" cx="14.5" cy="14.5" rx="14.5" ry="14.5" transform="translate(2967 994)"/>
					<rect id="Rectangle_168" data-name="Rectangle 168" class="cls-2" width="13" height="11" transform="translate(2975 1003)"/>
					<rect id="Rectangle_169" data-name="Rectangle 169" class="cls-1" width="3" height="5" transform="translate(2980 1010)"/>
				</g>
			</svg>
		</router-link>
		<div class="c-footer__upload">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="2837.992 1487.592 14.439 14.439">
				<path id="Union_49" data-name="Union 49" class="cls-1" d="M6.353,13.573V8.086H.867a.866.866,0,1,1,0-1.732H6.353V.867a.866.866,0,1,1,1.732,0V6.353h5.487a.866.866,0,0,1,0,1.732H8.086v5.487a.866.866,0,0,1-1.732,0Z" transform="translate(2837.992 1487.592)"/>
			</svg>
		</div>
		<router-link class="c-footer__profile" :to="{ name: 'user', params: {user_id: userId}}">
			<img :src="userImage" alt="">
		</router-link>
  </section>
</template>

<script>
  import axios from 'axios';

	export default {
		computed: {
			token() {
				return this.$store.getters.isAuthenticated
			},
			homepage() {
				return this.$route.path === '/homepage'
			},
			userId() {
				return this.$store.getters.authenticatedUser
			},
			userImage() {
				return this.$store.getters.authUserImage
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";
    
	.c-footer {
		display: flex;
		justify-content: space-around;
		padding: 0.6rem 0;
		border-top: 0.1rem solid rgba(149, 152, 154, 0.5);
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: $white;

		@include breakpoint(desktop) {
			display: none;
		}

		&__homepage {
			width: 2.9rem;
			height: 2.9rem;
			position: relative;
			margin-right: 6.7rem;
			position: relative;

			& svg {
				.cls-1 {
					fill: $gray;
				}
				.cls-2 {
					fill: $white;
				}
			}

			&.active {
				.cls-2 {
					fill: $green;
				}
			}
		}

		&__upload {
			width: 2.9rem;
			height: 2.9rem;
			border-radius: 2.9rem;
			border: 0.2rem solid $gray;
			position: relative;
			margin-right: 6.7rem;

			& svg {
				width: 1.7rem;
				height: 1.7rem;
				margin-top: 0.4rem;
				margin-left: 0.4rem;

				.cls-1 {
					fill: $gray;
				}
			}
		}
			
		&__profile {
			width: 2.9rem;
			height: 2.9rem;

			& img {
					border-radius: 2.9rem;
			}
		}
	} 
</style>