<template>
	<section class="p-user" :key="$route.params.user_id">
    <div class="main-wrapper">
      <app-header :title="user.username" v-if="(!commentsPage || !breakpoint) && (!photoPage || !breakpoint) && (!likesPage || !breakpoint) && (!editPostPage || !breakpoint)"></app-header>
      <div v-if="loading">
        <div class="p-user__about" v-if="(!commentsPage && !photoPage && !likesPage && !editPostPage) || !breakpoint">
          <div class="p-user__about-img">
            <p>{{ user.username }}</p>
            <img :src="storage + user.image.profile" alt="">
          </div>
          <div class="p-user__about-count">
            <p>{{ user.posts_count }}</p>
            <p>{{ user.followers_count }}</p>
            <p>{{ user.following_count }}</p>
          </div>
          <div class="p-user__about-post">
            <p>posts</p>
            <p>followers</p>
            <p>following</p>
          </div>
          <div class="p-user__about-text">
            <!-- <p>Animals are friends, be happy.</p> -->
            <p>{{ user.about }}</p>
          </div>
          <div class="p-user__about-btn" v-if="buttonShow">
            <router-link to="/edit-profile">
              <button class="c-btn c-btn--small">Edit profile</button>
            </router-link>
            <button class="c-btn c-btn--small" @click="logOut">Log out</button>
          </div>
          <div class="p-user__about-btn p-user__about-btn--single" v-else>
            <button class="c-btn c-btn--small c-btn--gray">Following</button>
          </div>
        </div>
      </div>
      <div class="p-user__posts" v-if="(!commentsPage && !photoPage && !likesPage && !editPostPage) || !breakpoint">
        <div class="p-user__posts-header u-clearfix">
          <div class="p-user__posts-header-single" @click="single"></div>
          <div class="p-user__posts-header-multi" @click="multi">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="3142 923 17 17.111">
              <g id="Group_304" data-name="Group 304" class="cls-1" transform="translate(3094 656)">
                <path id="Path_99" data-name="Path 99" class="cls-2" d="M.5.5h16v16H.5Z" transform="translate(48 267)"/>
                <path id="Path_100" data-name="Path 100" class="cls-2" d="M0,0V16" transform="translate(56.5 267.5)"/>
                <line id="Line_144" data-name="Line 144" class="cls-2" x2="16" transform="translate(48.5 275.5)"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="p-user__posts-scroll">
          <!-- <app-post :posts='posts' :posts_count="posts_count" @newPosts="posts = $event"></app-post> -->
          <app-post v-if="posts.length > 0" :posts='posts' :posts_count="posts_count" @deletedPost="posts_count = $event"></app-post>
          <!-- <app-post v-if="posts.length > 0" :posts='posts' :posts_count="posts_count"></app-post> -->
          <div class="p-user__posts-scroll-spinner"  v-if="spinner">
            <icon name="sync" spin></icon>
          </div>
        </div>
      </div>
      <transition name="fade-fast" mode="out-in">
        <router-view></router-view>
      </transition>
      <app-footer></app-footer>
    </div>
	</section>
</template>

<script>
  import Header from './header.vue'
  import Footer from './footer.vue' 
  import Post from './post.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { storage, breakpoint } from '../../functions.js'
  
	export default {
    props: ['user_id'],
    data() {
      return {
        loading: false,
        busy: false,
        spinner: false,
        user: {},
        title: '',
        posts: [],
        amount: 12,
        page: 1,
        posts_count: null
      }
    },
    created() {
      this.getUser()
      this.getUsersPosts()
      window.addEventListener('scroll', this.infiniteScroll)
    },
    // updated() {
    //   console.log(this.posts_count)
    // },
    watch: {
      '$route.params.user_id'() {
        this.page = 1
        this.posts = []
        this.posts_count = null
        this.getUser()
        this.getUsersPosts()
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token,
        userId: state => state.authentication.userId,
        statePosts: state => state.posts
      }),
      userPage() {
        return this.$route.name === 'user'
      },
      buttonShow() {
        return this.userId == this.user_id
      },
      photoPage() {
        return this.$route.name === 'userPhoto'
      },
      commentsPage() {
        return this.$route.name === 'userComments'
      },
      likesPage() {
        return this.$route.name === 'userLikes'
      },
      editPostPage() {
        return this.$route.name === 'userEditPost'
      },
      storage,
      breakpoint
    },
    methods: {
      infiniteScroll() {
        if(this.userPage === true) {
          if($(window).scrollTop() === $(document).height() - $(window).height()) {
            window.removeEventListener('scroll', this.infiniteScroll)
            if(this.posts_count > this.posts.length) {
              this.getUsersPosts()
            }
          }
        }
      },
      getUser() {
        axios.get('/users/find', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, id: this.user_id}})
        .then(response => {
          this.user = response.data.data
          this.title = response.data.data.username
          this.posts_count = response.data.data.posts_count
          this.loading = true
        })
        .catch(error => console.log(error))
      },
      getUsersPosts() {
        this.spinner = true
        axios.get('/posts', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, user_id: this.user_id}})
        .then(response => {
          console.log(response)
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
      },
      logOut() {
        this.$store.dispatch('logOut')
      },
      single() {
        const post = $('.c-post')
        if(this.breakpoint === true) {
          post.removeClass('multiMobile')
        }
        else {
          post.addClass('single')
        }
      },
      multi() {
        const post = $('.c-post')
        if(this.breakpoint === true) {
          post.addClass('multiMobile')
        }
        else {
          post.removeClass('single')
        }
      }
    },
    components: {
      appHeader: Header,
      appFooter: Footer,
      appPost: Post
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
  
  .p-user {
    padding-bottom: 8rem;
    margin-top: 4.1rem;

    @include breakpoint(desktop) {
      margin-top: 8.2rem;
      padding-bottom: 10rem;
    }

    &__about {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 2rem 2rem 2.2rem 2.7rem;
      border-bottom: 0.1rem solid $opacityGray;

      @include breakpoint(desktop) {
        padding: 3rem 77rem 2.2rem 77rem;
        border-bottom: none;
      }

      &-img {
        width: 8.7rem;
        margin-left: 2.1rem;
        margin-bottom: 2.3rem;

        @include breakpoint(desktop) {
          width: auto;
          margin-left: 3.9rem;
          margin-bottom: 4.6rem;
        }

        & p {
          display: none;

          @include breakpoint(desktop) {
            display: block;
            @include fontSizeRem(0, 20);
            font-family: 'HelveticaNeue-Thin', sans-serif;
            text-align: center;
            margin-bottom: 1.4rem;
          }
        }

        & img {
          height: 8.7rem;
          border-radius: 50%;
          width: 100%;

          @include breakpoint(desktop) {
            width: 12.5rem;
            height: 12.5rem;
          }
        }
      }

      &-count {
        margin-left: 2.8rem;
        margin-top: 1rem;

        @include breakpoint(desktop) {
          margin-left: 1.9rem;
          margin-top: 6rem;
        }

        & p {
          @include fontSizeRem(14, 20);
          color: $green;
          margin-bottom: 1.6rem;

          @include breakpoint(desktop) {
            margin-bottom: 1.7rem; 
          }
        }
      }

      &-post {
        margin-right: 4.2rem;
        margin-top: 1rem;

        @include breakpoint(desktop) {
          margin-right: 5.2rem;
          margin-top: 6rem;
        }

        & p {
          @include fontSizeRem(14, 20);
          color: $gray;
          margin-bottom: 1.6rem;
        }
      }

      &-text {
        @include fontSizeRem(14, 20);
        @include lineHeightRem(16, 24);
        color: $gray;
        margin-bottom: 2.2rem;

        @include breakpoint(desktop) {
          margin-bottom: 4.6rem;
        }
      }

      &-btn {
        padding: 0 0 0 2.4rem;

        & .c-btn {
          margin-right: 3.4rem;

          @include breakpoint(desktop) {
            margin-right: 1.6rem;
          }
        }

        &--single {
          text-align: center;
          padding-left: 0;
          width: 100%;

          & .c-btn {
            margin-right: 0;
          }
        }
      }
    }

    &__posts {
      @include breakpoint(desktop) {
        padding: 1rem 22rem 1.2rem 22rem;
      }

      &-header {
        padding: 1rem 0 1.2rem 1.7rem;

        @include breakpoint(desktop) {
          padding: 0.2rem 0rem 6rem 0rem;
          width: 5.4rem;
          margin: 0 auto;
        }

        &-single {
          width: 1.6rem;
          height: 1.6rem;
          background: $gray;
          margin-right: 0.7rem;
          float: left;
          cursor: pointer;

          @include breakpoint(desktop) {
            width: 2.28rem;
            height: 2.28rem;
          }
        }

        &-multi {
          width: 1.6rem;
          height: 1.6rem;
          float: left;
          cursor: pointer;

          @include breakpoint(desktop) {
            width: 2.28rem;
            height: 2.28rem;
          }
          
          & svg {
            width: 100%;
            height: 100%;

            .cls-1 {
              opacity: 0.5;
            }

            .cls-2 {
              fill: none;
              stroke: #232429;
            }
          }

          &.active {
            & svg {
              .cls-2 {
                stroke: red;
              }
            }
          }
        }
      }

      &-scroll {
        &-spinner {
          text-align: center;
          margin-top: 4rem;

          @include breakpoint(desktop) {
            margin-top: 0;
          }

          & .fa-icon {
            width: 5rem;
            height: 5rem;
          }
        }
      }
    }
  }
</style>