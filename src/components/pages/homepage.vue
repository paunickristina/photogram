<template>
  <div>
    <app-header :title='title' v-if="(!commentsPage || !breakpoint) && (!photoPage || !breakpoint) && (!likesPage || !breakpoint) && (!editPostPage || !breakpoint) && (!uploadPage || !breakpoint)"></app-header>
    <section class="p-homepage">
      <section class="main-wrapper u-clearfix news-feed" v-if="(!commentsPage && !photoPage && !likesPage && !editPostPage && !uploadPage) || !breakpoint">
        <app-post :posts='posts'></app-post>
        <div class="p-homepage__spinner" v-if="spinner">
          <icon name="sync" spin></icon>
        </div>
      </section>
    </section>
    <transition name="fade-fast" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Footer from '../component/footer.vue'
  import Header from '../component/header.vue'
  import Post from '../component/post.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint } from '../../functions.js'
    
  export default {
    data() {
      return {
        spinner: false,
        title: 'photogram',
        posts: [],
        amount: 12,
        page: 1
      }
    },
    created() {
      this.getPosts()
      window.addEventListener('scroll', this.infiniteScroll)
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token
      }),
      homepage() {
        //maybe for header check only this route
        return this.$route.name === 'homepage'
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
      uploadPage() {
        return this.$route.name === 'upload'
      },
      breakpoint
    },
    methods: {
      infiniteScroll() {
        if(this.homepage === true) {
          if($(window).scrollTop() === $(document).height() - $(window).height()) {
            window.removeEventListener('scroll', this.infiniteScroll)
            this.getPosts()
          }
        }
      },
      getPosts() {
        this.spinner = true
        axios.get('/posts', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, news_feed: 1}})
          .then(response => {
            // console.log(response)
            for(let i = 0; i < response.data.data.length; i++) {
              this.posts.push(response.data.data[i])
            }
            if(response.data.data.length > 0) {
              this.page++
            }
            this.spinner = false
            this.$store.dispatch('getAllPosts', this.posts)
            window.addEventListener('scroll', this.infiniteScroll)
          })
          .catch(error => console.log(error))
      }
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

  .fade-fast-enter {
    opacity: 0;
  }

  .fade-fast-enter-active {
    transition: opacity 0.5s ease;
  }

  .fade-fast-leave-active {
    transition: opacity 0.1s ease;
    opacity: 0;
  }
  
  .p-homepage {
    margin-top: 4.1rem;

    @include breakpoint(desktop) {
      margin-top: 8.2rem;
    }

    & .news-feed {
      @include breakpoint(desktop) {
        padding: 4.9rem 22rem 0 22rem;
      }
    }

    &__spinner {
      text-align: center;
      margin-top: 4rem;
      margin-bottom: 12rem;

      @include breakpoint(desktop) {
        margin-top: 0;
        margin-bottom: 12rem;
      }

      & .fa-icon {
        width: 5rem;
        height: 5rem;
      }
    }
  }
</style>