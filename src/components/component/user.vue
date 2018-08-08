<template>
	<section class="p-user" v-if="loading">
    <div class="main-wrapper">
      <app-header :title="user.username"></app-header>
      <div class="p-user__about">
        <div class="p-user__about-img">
          <p>{{ user.username }}</p>
          <!-- uncomment this -->
          <!-- <img :src="storage + user.image.profile" alt=""> -->
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
          <!-- <p>Photography lover, animals are friends, be happy.</p> -->
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
      <div class="p-user__posts">
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
        <app-post :posts='posts'></app-post>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <app-footer></app-footer>
    </div> <!-- end .main-wrapper -->
	</section> <!-- end .p-user -->
</template>

<script>
  import Header from './header.vue'
  import Footer from './footer.vue' 
  import Post from './post.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { storage } from '../../functions.js'
  
	export default {
		props: ['user_id'],
    data() {
      return {
        loading: false,
        user: {},
        title: '',
        posts: [],
        amount: 12,
        page: 1
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token,
        userId: state => state.authentication.userId
      }),
      buttonShow() {
        return this.userId == this.user_id
      },
      storage
    },
    components: {
      appHeader: Header,
      appFooter: Footer,
      appPost: Post
    },
    methods: {
      getUser() {
        axios.get('/users/find', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, id: this.user_id}})
        .then(response => {
          console.log(response)
          this.user = response.data.data
          this.title = response.data.data.username
          this.loading = true
        })
        .catch(error => console.log(error))
      },
      getUsersPosts() {
        axios.get('/posts', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, user_id: this.user_id}})
        .then(response => {
          console.log(response)
          for(let i = 0; i < response.data.data.length; i++) {
            this.posts.push(response.data.data[i])
          }
          this.$store.dispatch('getAllPosts', this.posts)
          this.loading = true
        })
        .catch(error => console.log(error))
      },
      logOut() {
        this.$store.dispatch('logOut')
      },
      single() {
        const windowWidth = $(window).width()
        const breakpointValue = 768
        const post = $('.c-post')
        if(windowWidth < breakpointValue) {
          post.removeClass('multiMobile')
        }
        else {
          post.addClass('single')
        }
      },
      multi() {
        const windowWidth = $(window).width()
        const breakpointValue = 768
        const post = $('.c-post')
        if(windowWidth < breakpointValue) {
          post.addClass('multiMobile')
        }
        else {
          post.removeClass('single')
        }
      }
    },
    created() {
      this.getUser()
      this.getUsersPosts()
    }
	}
    
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.5s ease;
  }

  .fade-leave-active {
    transition: opacity 0.1s ease;
    opacity: 0;
  }
  
  .p-user {
    padding-bottom: 10rem;

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
          width: 10rem;
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
    }
  }
</style>