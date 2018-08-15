<template>
  <div class="c-photo" v-if="loading">
    <app-header :title='title' v-if="breakpoint"></app-header>
    <article class="c-photo__single">
      <div class="c-photo__wrapper">
        <router-link :to="{ name: 'user', params: {user_id: post.user_id}}"  class="c-photo__header" v-if="!buttonShow">
          <div class="c-photo__header-img">
					  <img :src="storage + post.user_image.profile" alt="">
          </div>
          <p>{{ post.username }}</p>
        </router-link>
        <router-link tag="button" :to="{ name: 'editPost', params: {post_id: post_id} }" class="c-btn c-btn--small" v-if="buttonShow">Edit Post</router-link>
        <div class="c-photo__close" @click="$router.go(-1)">
          <icon name="times"></icon>
        </div>
        <div class="c-photo__media">
          <div class="c-photo__media-video" v-if="post.type_id === 2">
              <video controls>
                  <source :src="storage + post.media" type="video/mp4">
                  <source :src="storage + post.media" type="video/webm">
                  <source :src="storage + post.media" type="video/ogg">
              </video>
          </div>
          <div class="c-photo__media-img" v-else>
            <img :src="storage + post.media.large" alt="">
          </div>
        </div>
        <div :class="{ userPage: buttonShow }" class="c-photo__form">
          <form @submit.prevent="postComment">
            <div class="c-photo__form-field">
              <svg viewBox="6284.636 -477 25.678 23.277">
                <path id="Union_7" data-name="Union 7" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(6287 -476)"/>
              </svg>
              <input type="text" placeholder="Comment" v-model="comment_body">
              <button class="c-photo__form-btn">
                <icon name="check"></icon>
              </button>
            </div>
          </form>
        </div>
        <div class="c-photo__likes u-clearfix">
          <div class="c-photo__likes-left">
            <svg @click="postLike" v-if="authLike()" viewBox="6248.998 -476.065 22.901 23.092">
              <path id="Path_32" data-name="Path 32" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(6250.004 -474.795)"/>
            </svg>
            <svg @click="deleteLike" v-else xmlns="http://www.w3.org/2000/svg" viewBox="4631 1443.165 20.669 20.141">
              <path id="Path_111" data-name="Path 111" class="cls-2" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(4631.004 1443.205)"/>
            </svg>
            <svg @click="showCommentForm" viewBox="6284.636 -477 25.678 23.277">
              <path id="Union_7" data-name="Union 7" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(6287 -476)"/>
            </svg>
          </div>
          <router-link  :to="{ name: likesRoute, params: {post_id: post_id} }" class="c-photo__likes-right">
            <img src="../../assets/images/heart.png" alt="">
            <p>{{ post.likes_count}} likes</p>
          </router-link>
        </div>
        <div class="c-photo__comments">
          <div class="c-photo__comments-comment u-clearfix" v-if="post.description">
            <router-link :to="{ name: 'user', params: {user_id: post.user_id}}">
                <img :src="storage + post.user_image.profile" alt="">
            </router-link>
            <p>{{ post.description }}</p>
          </div>
          <div v-for="(comment, index) in post.comments" v-if="index === 0" :key="index"  class="c-photo__comments-comment u-clearfix">
            <router-link :to="{ name: 'user', params: {user_id: comment.user_id}}">
                <img :src="storage + comment.user_image.profile" alt="">
            </router-link>
            <p>{{ comment.body }}</p>
          </div>
          <div class="c-photo__comments-comments">
            <router-link tag="p" :to="{ name: commentsRoute, params: {post_id: post.id} }" v-if="post.comments.length > 0">view all comments</router-link>
          </div>
        </div>
        <div class="c-photo__arrow c-photo__arrow--left"></div>
        <div class="c-photo__arrow c-photo__arrow--right"></div>
      </div>
    </article> 
  </div>
</template>

<script>
  import Header from './header.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint, storage } from '../../functions.js'
  
  export default {
    props: ['post_id', 'index'],
    data() {
      return {
        loading: false,
        title: 'Photo',
        post: {},
        reply_username: '',
        comment_body: ''
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token,
        userId: state => state.authentication.userId
      }),
      buttonShow() {
        return this.userId == this.post.user_id
      },
      userPage() {
        return this.$route.name === 'user' || this.$route.name === 'userPhoto' || this.$route.name === 'userComments' || this.$route.name === 'userLikes' || this.$route.name === 'userEditPost'
      },
      likesRoute() {
        if(this.userPage === true) {
          return 'userLikes'
        }
        else {
          return 'likes'
        }
      },
      commentsRoute() {
        if(this.userPage === true) {
          return 'userComments'
        }
        else {
          return 'comments'
        }
      },
      breakpoint,
      storage
    },
    // mounted() {
    //   console.log(this.index)
    // },
    methods: {
      getPost() {
        // this.post = {}
        // this.loading = false
        axios.get('/posts/' + this.post_id, {headers:{ 'Authorization': 'Bearer '+ this.token}})
          .then(response => {
            console.log(response)
            this.post = response.data.data
            //console.log(this.post)
            this.$store.dispatch('getOnePost', this.post)
            this.loading = true
          })
          .catch(error => console.log(error))
          console.log(this.post_id)
      },
      showCommentForm(e) {
        const $comment = $(e.target);
        const $inputField = $comment.parents('.c-photo__wrapper').find('.c-photo__form').find('input');
        $comment.parents('.c-photo__wrapper').find('.c-photo__form').toggleClass('active');
        if($comment.parents('.c-photo__wrapper').siblings().find('.c-photo__form').hasClass('active')) {
          $comment.parents('.c-photo__wrapper').siblings().find('.c-photo__form').removeClass('active')
        };
        $inputField.focus();
      },
      postComment() {
        axios.post('/comments', 
          {post_id: this.post_id, reply_username: this.reply_username, body: this.comment_body},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))

        $('.c-photo__wrapper').find('.c-photo__form').removeClass('active')
      },
      postLike() {
        axios.post('/likes', 
          {likable_id: this.post_id, likable_type: 1},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
      },
      deleteLike() {
        const like_id = this.post.auth_like_id
        axios.delete('/likes/' + like_id, {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
      },
      authLike() {
        return this.post.auth_like_id == null
      }
    },
    watch: {
      // '$route':'fetchData'
    },
    created() {
      this.getPost()
      if(this.breakpoint === false) {
        $('body').css({'overflow':'hidden'})
      }
    },
    destroyed() {
      if(this.breakpoint === false) {
        $('body').css({'overflow':'visible'})
      }
    },
    components: {
      appHeader: Header
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

  .c-photo {

    @include breakpoint(desktop) {
      position: fixed;
      top: 8rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(35, 36, 41, 0.95);
      z-index: 1;
    }

    &__wrapper {
      width: 100%;
      padding-bottom: 0.3rem;
      position: relative;

      @include breakpoint(desktop) {
        width: 50rem;
        margin: 12rem auto 0;
        position: relative;
      }
    }
    &__header {
      display: flex;
      margin: 0.8rem 0 1rem 1.8rem;

      @include breakpoint(desktop) {
        margin: 2.3rem 0 2.5rem 0;
      }

      &-img {
        width: 4.2rem;
        height: 4.2rem;

        & img {
            border-radius: 4.4rem;
        }
      }

      & p {
        margin-top: 1.5rem;
        margin-left: 0.9rem;
        @include fontSizeRem(14, 20);

        @include breakpoint(desktop) {
          margin-top: 1.2rem;
          margin-left: 1.1rem;
          color: #fff;
        }
      }
    }

    & .c-btn {
      margin: 2.7rem 0 1.2rem 24.4rem;
      padding-left: 1.1rem;
      padding-right: 1.1rem;

      @include breakpoint(desktop) {
        color: $gray;
        background: #fff;
        margin: 0 0 2.2rem 37rem;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    &__close {
      display: none;

      @include breakpoint(desktop) {
        display: block;
        position: absolute;
        right: -3rem;
        top: -3rem;
        cursor: pointer;

        & .fa-icon {
          fill: #fff;
          width: 3rem;
          height: 3rem;
        } 
      }
      
    }

    &__media {
      width: 32rem;
      height: 32rem;
      margin-bottom: 0.9rem;

      @include breakpoint(desktop) {
        width: 100%;
        height: 50rem;
        margin-bottom: 1.4rem;
      }

      &-img {
        width: 100%;

        & img {
            width: 100%;
        }
      }

      &-video {
        & video {
            width: 32rem;
            height: 33rem;
            position: relative;
            bottom: 1rem;
            display: block;

            @include breakpoint(desktop) {
              width: 50rem;
              height: 50rem;
              bottom: 3rem;
            }
        }
      }
    }

    &__likes {
      padding-left: 1.6rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid $opacityGray;

      @include breakpoint(desktop) {
        padding-left: 0;
        padding-bottom: 0.8rem;
        border-bottom: 0.1rem solid #fff;
      }

      &-left {
        width: 50%;
        float: left;

        @include breakpoint(desktop) {
            width: 36.5%;
        }

        & svg {
          width: 2.3rem;
          height: 2.3rem;
          cursor: pointer;

          &:last-of-type {
              width: 2.6rem;
              height: 2.4rem;
              margin-left: 1rem;
          }
          
          & .cls-1 {
              fill: none;
              stroke: $gray;
              stroke-width: 0.2rem;

              @include breakpoint(desktop) {
                stroke: #eee;
              }
          }

          & .cls-2 {
            fill: $green;
          }
        }

        & img {
          display: inline-block;
          cursor: pointer;

          &:first-of-type {
              margin-right: 1rem;
              width: 2.3rem;
          }

          &:last-of-type {
              width: 2.6rem;
          }
        }
      }

      &-right {
        float: right;
        padding-top: 0.9rem;
        margin-right: 2rem;
        cursor: pointer;

        @include breakpoint(desktop) {
            padding-top: 0.3rem;
            margin-right: 0;
        }

        & img {
            display: inline-block;
            width: 1.3rem;
            vertical-align: middle;
            margin-top: -0.1rem;

            @include breakpoint(desktop) {
              width: 1.5rem;
              margin-top: -0.6rem;
            }
        }
        & p {
            display: inline-block;
            @include fontSizeRem(10, 16);
            margin-left: 0.4rem;
            color: $gray;
            opacity: 0.5;

            @include breakpoint(desktop) {
              color: #fff;
            }
        }
      }
    }
    &__comments {
      padding: 0.9rem 0 1.2rem 1.7rem;

      @include breakpoint(desktop) {
        padding: 1.8rem 0 1.2rem 0;
      }

      &-comment {
        margin-bottom: 1.8rem;

        & img {
          float: left;
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 1.8rem;
          vertical-align: middle;
          margin-right: 0.8rem;

          @include breakpoint(desktop) {
            width: 2.8rem;
            height: 2.8rem;
          }
        }
        & p {
          float: left;
          @include fontSizeRem(10, 16);
          width: 80%;
          color: $gray;
          margin-top: 0.4rem;

          @include breakpoint(desktop) {
            margin-top: 0.7rem;
            color: #fff;
          }
        }
      }
      
      &-comments {
        & p {
          @include fontSizeRem(10, 16);
          color: $gray;
          opacity: 0.5;
          cursor: pointer;

          @include breakpoint(desktop) {
            color: #fff;
          }
        }
      }
    }

    &__arrow {
      display: none;

      @include breakpoint(desktop) {
        cursor: pointer;
        display: block;
        position: absolute;
      }

      &::before {
        content: "";
        display: block;
        width: 0.5rem;
        height: 2.4rem;
        background: #fff;
        position: absolute;
      }

      &::after {
        content: "";
        display: block;
        width: 0.5rem;
        height: 2.4rem;
        background: #fff;
        position: absolute;
      }

      &--left {
        @include breakpoint(desktop) {
          left: -4rem;
          top: 44%;
        }

        &::before {
          transform: rotate(45deg);
          left: 0.3rem;
        }
        &::after {
          transform: rotate(-45deg);
          left: 0.3rem;
          top: 1.4rem;
        }
      }

      &--right {
        @include breakpoint(desktop) {
          right: -4rem;
          top: 44%;
        }

        &::before {
          transform: rotate(-45deg);
          left: 0.3rem;
        }
        &::after {
          transform: rotate(45deg);
          left: 0.3rem;
          top: 1.4rem;
        }
      }
    }

    &__form {
      height: 4.3rem;
      padding-top: 0.5rem;
      padding-bottom: 1rem;
      width: 100%;
      border-top: 0.1rem solid rgba(149, 152, 154, 0.5);
      -webkit-box-shadow: 0px 11px 24px -10px rgba(0,0,0,0.26);
      -moz-box-shadow: 0px 11px 24px -10px rgba(0,0,0,0.26);
      box-shadow: 0px 11px 24px -10px rgba(0,0,0,0.26);
      position: absolute;
      top: 32.9rem;
      z-index: 1;
      background: $white;
      -webkit-transition: 0.3s all ease-in;
  		-moz-transition: 0.3s all ease-in;
  		-o-transition: 0.3s all ease-in;
		  transition: 0.3s all ease-in;
      visibility: hidden;
      opacity: 0;

      @include breakpoint(desktop) {
        border-bottom: none;
        margin: 0 auto;
        background: $white;
        padding-top: 0.4rem;
        top: 52.4rem;
      }

      &.active {
        visibility: visible;
        opacity: 1;
      }

      &.userPage {
        top: 33.7rem;

        @include breakpoint(desktop) {
          top: 51rem;
        }
      }

      &-field {
        padding: 0 1.6rem;
        display: flex;
        justify-content: space-between;

        @include breakpoint(desktop) {
          padding: 0 1rem;
        }

        & > svg {
          width: 2.8rem;
          height: 3rem;

          @include breakpoint(desktop) {
            width: 3.2rem;
            height: 3.4rem;
          }
          
          .cls-1 {
            fill: none;
            stroke: #232429;
            stroke-width: 0.2rem;
          }
        }

        & input {
          width: 22rem;
          padding-left: 0.5rem;
          @include fontSizeRem(16, 16);
          -webkit-appearance: none; 
          -moz-appearance: none;
          border: none;
          background: transparent;

          @include breakpoint(desktop) {
            width: 40rem;
          }

          &::-webkit-input-placeholder {
            color: $gray;
            opacity: 0.5;
          }
          &::-moz-placeholder { 
            color: $gray;
            opacity: 0.5;
          }
          &:-moz-placeholder { 
            color: $gray;
            opacity: 0.5;
          }
          &:-ms-input-placeholder { 
            color: $gray;
            opacity: 0.5;
          }
        }
      }

      &-btn {
        width: 3rem;
        height: 3rem;
        background: $gray;
        border-radius: 50%;

        @include breakpoint(desktop) {
          width: 3rem;
          height: 3rem;
          margin-top: 0.2rem;
        }

        & svg {
          &.fa-icon {
            fill: $white;
            width: 2.1rem;
            height: 2.1rem;
          }
        }
      }
    }
  }
</style>