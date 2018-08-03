<template>
  <section class="p-homepage" v-if="loading">
    <app-header :title='title' v-if="(!commentsPage || !breakpoint) && (!photoPage || !breakpoint) && (!likesPage || !breakpoint) && (!editPostPage || !breakpoint)"></app-header>
    <section class="main-wrapper u-clearfix news-feed" v-if="(!commentsPage && !photoPage && !likesPage && !editPostPage) || !breakpoint">
      <app-post :posts='posts'></app-post>
    </section>
    <router-view></router-view>
    <app-footer></app-footer>
  </section>
</template>

<script>
  import Footer from '../component/footer.vue'; 
  import Header from '../component/header.vue';
  import Post from '../component/post.vue'; 
  import axios from 'axios';
    
  export default {
    data() {
      return {
        loading: false,
        title: 'photogram',
        posts: [],
        amount: 12,
        page: 1
      }
    },
    computed: {
      token() {
        return this.$store.getters.isAuthenticated
      },
      photoPage() {
        return this.$route.name === 'photo'
      },
      commentsPage() {
        return this.$route.name === 'comments'
      },
      likesPage() {
        return this.$route.name === 'likes'
      },
      editPostPage() {
        return this.$route.name === 'editPost'
      },
      breakpoint() {
        const windowWidth = $(window).width()
        const breakpointValue = 768
        return windowWidth < breakpointValue
      }
    },
    methods: {
      getPosts() {
        axios.get('/posts', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, news_feed: 1}})
          .then(response => {
            console.log(response)
            for(let i = 0; i < response.data.data.length; i++) {
              this.posts.push(response.data.data[i])
            }
            this.$store.dispatch('getAllPosts', this.posts)
            this.loading = true
          })
          .catch(error => console.log(error))
      }
    },
    created() {
      this.getPosts()
    },
    beforeMount() {
      // axios.get('/posts', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, news_feed: 1}})
      //   .then(response => {
      //     // console.log(response)
      //     for(let i = 0; i < response.data.data.length; i++) {
      //       this.posts.push(response.data.data[i])
      //     }
      //     this.$store.dispatch('getAllPosts', this.posts)
      //   })
      //   .catch(error => console.log(error))
    },
    components: {
      appPost: Post,
      appFooter: Footer,
      appHeader: Header
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";
  .p-homepage {

    & .news-feed {
      @include breakpoint(desktop) {
        padding: 4.9rem 22rem 0 22rem;
      }
    }
  }
</style>