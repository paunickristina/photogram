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
        <p class="c-search__people-results">{{ noPeople }}</p>
			</div>
			<div class="c-search__tags">
				<div v-for="(tag, index) in tags" :key="index" class="c-search__tags-one">
					<p>{{ tag }}</p>
				</div>
        <p class="c-search__tags-results">{{ noTags }}</p>
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
        tags: [],
        noPeople: '',
        noTags: ''
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
      })
		},
		watch: {
			query(val) {
				if(val == '') {
          this.followers = []
          this.noPeople = ''
				}
			},
			query_tags(val) {
				if(val == '') {
          this.tags = []
          this.noTags = ''
				}
			}
		},
		methods: {
			getPeople() {
				axios.get('/search/users', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {q: this.query}})
					.then(response => {
            console.log(response)
            this.followers = response.data.data
            if(response.data.data.length == 0) {
              this.noPeople = 'No results'
            }
            else {
              this.noPeople = ''
            }
					})
					.catch(error => console.log(error))
			},
			getTags() {
				axios.get('/search/hashtags', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {q: this.query_tags}})
					.then(response => {
            console.log(response)
            this.tags = response.data.data
            if(response.data.data.length == 0) {
              this.noTags =  'No results'
            }
            else {
              this.noTags = ''
            }
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
		margin-top: 4.1rem;

		@include breakpoint(desktop) {
			margin-top: 8.2rem;
		}

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

      &-results {
        color: red;
        @include fontSizeRem(14, 20);
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

      &-results {
        color: red;
        @include fontSizeRem(14, 20);
      }
		}
	}
</style>