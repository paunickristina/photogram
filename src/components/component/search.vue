<template>
	<div class="c-search">
		<app-header :title="title"></app-header>
		<div class="c-search__wrapper">
			<div class="c-search__form c-search__form--people">
				<form @submit.prevent="getPeople(); $v.query.$touch()">
					<input type="text" placeholder="Search" v-model="query">
					<p v-show="$v.query.$error">minimum 3 characters</p>
				</form>
			</div>
			<div class="c-search__form c-search__form--tags">
				<form @submit.prevent="getTags(); $v.query_tags.$touch()">
					<input type="text" placeholder="Search" v-model="query_tags">
					<p v-show="$v.query_tags.$error">minimum 3 characters</p>
				</form>
			</div>
			<div class="c-search__header">
				<ul>
					<li @click="toggleBtnClass($event); removeTags();" class="c-search__header-people active">people</li><li @click="toggleBtnClass($event); removePeople();" class="c-search__header-tags">tags</li>
				</ul>
			</div>
			<div class="c-search__people">
				<app-follower :followers="followers"></app-follower>
			</div>
			<div class="c-search__tags">
				<div v-for="(tag, index) in tags" :key="index" class="c-search__tags-one">
					<p>{{ tag }}</p>
				</div>
			</div>
		</div>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Header from './header.vue'
	import Footer from './footer.vue'
	import Follower from './follower.vue'
	import axios from 'axios'
	import { minLength } from 'vuelidate/lib/validators'
  import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: 'Search',
				query: '',
				query_tags: '',
				followers: [],
				tags: []
			}
		},
		validations: {
			query: {
				minLen: minLength(3)
			},
			query_tags: {
				minLen: minLength(3)
			}
		},
		computed: {
			...mapState({
        token: state => state.authentication.token
      }),
			// storage() {
			// 	return 'http://54.37.227.57/storage/'
			// }
		},
		watch: {
			query(val) {
				if(val == '') {
					this.followers = []
				}
			},
			query_tags(val) {
				if(val == '') {
					this.tags = []
				}
			}
		},
		methods: {
			getPeople() {
				axios.get('/search/users', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {q: this.query}})
					.then(response => {
								console.log(response)
								// for(let i = 0; i < response.data.data.length; i++) {
								// 	this.followers.push(response.data.data[i])
								// }
								this.followers = response.data.data
					})
					.catch(error => console.log(error))
			},
			getTags() {
				axios.get('/search/hashtags', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {q: this.query_tags}})
					.then(response => {
								console.log(response)
								// for(let i = 0; i < response.data.data.length; i++) {
								// 	this.tags.push(response.data.data[i])
								// }
								this.tags = response.data.data
								console.log(this.tags)
					})
					.catch(error => console.log(error))
			},
			toggleBtnClass(e) {
				const $actBtn = $(e.target)
				const $inactBtn = $actBtn.siblings()
				$actBtn.addClass('active')
				$inactBtn.removeClass('active')
			},
			removePeople() {
				const $people = $('.c-search__people')
				const $tags = $('.c-search__tags')
				const $formPeople = $('.c-search__form--people')
				const $formTags = $('.c-search__form--tags')
				$people.css({'display':'none'})
				$tags.css({'display':'block'})
				$formPeople.css({'display':'none'})
				$formTags.css({'display':'block'}) 
			},
			removeTags() {
				const $people = $('.c-search__people')
				const $tags = $('.c-search__tags')
				const $formPeople = $('.c-search__form--people')
				const $formTags = $('.c-search__form--tags')
				$people.css({'display':'block'})
				$tags.css({'display':'none'})
				$formPeople.css({'display':'block'})
				$formTags.css({'display':'none'})
			}
		},
		components: {
			appHeader: Header,
			appFooter: Footer,
			appFollower: Follower
		}
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";
	
	.c-search {

		&__wrapper {
			@include breakpoint(desktop) {
				width: 57.6rem;
				margin: 0 auto;
			}
		}
		
		&__form {
			margin: 1rem auto;;
			width: 86%;

			@include breakpoint(desktop) {
				width: 100%;
				margin: 4.8rem auto;
			}

			& input {
				-webkit-appearance: none; 
        -moz-appearance: none;
				background: transparent;
				border: none;
				border-bottom: 0.1rem solid rgba(149, 152, 154, 0.5);
				outline: 0;
				width: 100%;
				@include fontSizeRem(16, 20);
				color: $lightGray;
				padding: 1rem 2rem;

				@include breakpoint(desktop) {
					padding: 1.1rem 0;
					border-bottom: 0.1rem solid $gray;
				}

				&::-webkit-input-placeholder { 
					color: $lightGray;
				}
				&::-moz-placeholder { 
					color: $lightGray;
					opacity: 1; 
				}
				&:-moz-placeholder { 
					color: $lightGray;
					opacity: 1;
				}
				&:-ms-input-placeholder { 
					color: $lightGray;
				}
			}

			&--tags {
				display: none;
			}

			& p {
				color: $red;
				@include fontSizeRem(10, 16);
				margin-top: 0.6rem;
			}
		}

		&__header {
			padding: 0 5.9rem;
			border-bottom: 0.1rem solid rgba(149, 152, 154, 0.2);

			@include breakpoint(desktop) {
				padding: 0 15rem;
			}

			ul {
				li {
					display: inline-block;
					@include fontSizeRem(14, 20);
					text-transform: uppercase;
					padding: 1rem 0;
					margin-right: 2.5rem;
					cursor: pointer;

					@include breakpoint(desktop) {
						margin-right: 5.4rem;
					}

					&:nth-of-type(2) {
						margin-right: 0;
					}

					&.active {
						border-bottom: 0.2rem solid $gray;
					}
				}
			}
		}

		&__people {
			margin-top: 4.5rem;
			padding: 0 1.8rem 0 1.7rem;

			@include breakpoint(desktop) {
				margin-top: 5.7rem;
				padding: 0;
			}
		}
		
		&__btn {
			width: 25.3%;
			float: left;
			margin-top: 0.8rem;

			@include breakpoint(desktop) {
				width: 23.3%;
			}

			& .c-btn {
				width: 100%;
				@include fontSizeRem(10, 15);
				padding: 0;

				@include breakpoint(desktop) {
					height: 2.8rem;
					line-height: 2.8rem;
				}
			}
		}

		&__tags {
			margin-top: 4.5rem;
			padding: 0 1.8rem;
			display: none;
			
			&-one {
				& p {
					@include fontSizeRem(14, 16);
					color: $gray;
				}
			}
		}
	}
</style>