<template>
    <div class="p-edit-post">
			<app-header :title='title' v-if="breakpoint"></app-header>
			<div class="p-edit-post__post">
				<div class="p-edit-post__post-desc">
				</div>
				<div class="p-edit-post__post-comments">
					<app-comment :comments="comments"></app-comment>
				</div>
			</div>
		</div>
</template>

<script>
	import Header from './header.vue'
	import Comment from './comment.vue'
	import axios from 'axios'

	export default {
		props: ['post_id'],
		data() {
			return {
				title: 'Edit Post',
				comments: [],
				amount: 8,
        page: 1
			}
		},
		computed: {
			token() {
        return this.$store.getters.isAuthenticated
      },
			breakpoint() {
				const windowWidth = $(window).width()
				const breakpointValue = 768
				return windowWidth < breakpointValue
			},
			storage() {
        return 'http://54.37.227.57/storage/'
			},
			//check this
			// post() {
			// 	return this.$store.getters.post
			// }
		},
		mounted() {
			console.log(this.proba)
		},
		beforeMount() {
			axios.get('/comments', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, post_id: this.post_id}})
        .then(response => {
          console.log(response)
          for(let i = 0; i < response.data.data.length; i++) {
            this.comments.push(response.data.data[i])
          }
          this.$store.dispatch('getAllComments', this.comments)
          console.log(this.comments)
        })
        .catch(error => console.log(error))
    },
		components: {
			appHeader: Header,
			appComment: Comment
		}
	}
</script>

<style>

</style>
