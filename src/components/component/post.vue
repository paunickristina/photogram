<template>
  <article class="c-post">
    <div v-for="(post, index) in allPosts" :key="index" class="c-post__wrapper">
      <router-link :to="{ name: 'user', params: {user_id: post.user_id}}" v-if="!userPage" class="c-post__header">
        <div class="c-post__header-img">
          <img :src="storage + post.user_image.profile" alt="">
        </div>
        <p>{{ post.username }}</p>
      </router-link>
      <router-link tag="div" :to="{ name: photoRoute, params: {post_id: post.id, index: index, posts: posts} }" class="c-post__media">
        <div class="c-post__media-video" v-if="post.type_id === 2">
          <video controls>
            <source :src="storage + post.media" type="video/mp4">
            <source :src="storage + post.media" type="video/webm">
            <source :src="storage + post.media" type="video/ogg">
          </video>
        </div>
        <div class="c-post__media-img" v-else>
          <img :src="storage + post.media.large" alt="">
        </div>
        <div @click="showRemoveWarning" v-if="authUserPage" class="c-post__remove">
          <svg viewBox="0 0 512 512">
            <path d="M320.887,56.21V0H191.114v56.21H45.495v95.344H77.64V512h356.72V151.554h32.145V56.21H320.887z M221.114,30h69.773v26.21
              h-69.773V30z M404.36,482H107.64V151.554h296.72V482z M436.505,121.554H75.495V86.21h361.01V121.554z"/>
            <rect x="169.09" y="220.19" width="30" height="193.17"/>
            <rect x="241" y="220.19" width="30" height="193.17"/>
            <rect x="312.91" y="220.19" width="30" height="193.17"/>
          </svg>
        </div>
        <div class="c-post__warning">
          <div class="c-post__warning-content">
            <p>You want to delete this post?</p>
            <button @click="hideRemoveWarning" class="c-btn c-btn--small">Cancel</button>
            <button @click="deletePost(index, $event);" class="c-btn c-btn--small">Delete</button>
          </div>
        </div>
      </router-link>
      <div class="c-post__form" :class="{ userPage: userPage }">
        <form @submit.prevent="postComment(index)">
          <div class="c-post__form-field">
            <svg viewBox="6284.636 -477 25.678 23.277">
              <path id="Union_7" data-name="Union 7" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(6287 -476)"/>
            </svg>
            <input type="text" placeholder="Comment" v-model="comment_body">
            <button class="c-post__form-btn">
              <icon name="check"></icon>
            </button>
          </div>
        </form>
      </div>
      <div class="c-post__likes u-clearfix">
        <div class="c-post__likes-left">
          <svg @click="postLike(index);" v-if="authLike(index)" viewBox="6248.998 -476.065 22.901 23.092">
            <path id="Path_32" data-name="Path 32" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(6250.004 -474.795)"/>
          </svg>
          <svg @click="deleteLike(index);" v-else xmlns="http://www.w3.org/2000/svg" viewBox="4631 1443.165 20.669 20.141">
            <path id="Path_111" data-name="Path 111" class="cls-2" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(4631.004 1443.205)"/>
          </svg>
          <svg @click="showCommentForm" viewBox="6284.636 -477 25.678 23.277">
            <path id="Union_7" data-name="Union 7" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(6287 -476)"/>
          </svg>
        </div>
        <router-link tag="div" :to="{ name: likesRoute, params: {post_id: post.id, likes_count: post.likes_count} }" class="c-post__likes-right">
          <img src="../../assets/images/heart.png" alt="">
          <p>{{ post.likes_count }} likes</p>
        </router-link>
      </div>
      <div class="c-post__comments">
        <div class="c-post__comments-comment u-clearfix" v-if="post.description">
          <router-link :to="{ name: 'user', params: {user_id: post.user_id}}">
              <img :src="storage + post.user_image.profile" alt="">
          </router-link>
          <p>{{ post.description }}</p>
        </div>
        <div v-for="(comment, index) in post.comments" v-if="index === 0" :key="index"  class="c-post__comments-comment u-clearfix">
          <router-link :to="{ name: 'user', params: {user_id: comment.user_id}}">
              <img :src="storage + comment.user_image.profile" alt="">
          </router-link>
          <p>{{ comment.body }}</p>
        </div>
        <div class="c-post__comments-comments">
          <router-link tag="p" :to="{ name: commentsRoute, params: {post_id: post.id, comments_count: post.comments_count} }" v-if="post.comments.length > 0">view all comments</router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint, storage } from '../../functions.js'

  export default {
    props: ['posts', 'posts_count'],
    data() {
      return {
        reply_username: '',
        comment_body: '',
        allPosts: this.posts,
        // allPosts: [],
        decrementCount: 0,
        test: this.posts_count
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token,
        userId: state => state.authentication.userId
      }),
      userPage() {
        return this.$route.name === 'user' || this.$route.name === 'userPhoto' || this.$route.name === 'userLikes' || this.$route.name === 'userComments' || this.$route.name === 'userEditPost'
      },
      authUserPage() {
        return this.$route.path === '/user/' + this.userId
      },
      photoRoute() {
        if(this.userPage === true) {
          return 'userPhoto'
        }
        else {
          return 'photo'
        }
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
    methods: {
      postComment(index) {
        const post_id = this.allPosts[index].id
        axios.post('/comments', 
          {post_id: post_id, reply_username: this.reply_username, body: this.comment_body},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          // console.log(response)
          this.allPosts[index].comments.unshift(response.data.data)
          const payload = {
            i: index,
            comments: this.allPosts[index].comments
          }
          this.$store.dispatch('changePostsComments', payload)
          this.comment_body = ''
        })
        .catch(error => console.log(error))

        $('.c-post__wrapper').find('.c-post__form').removeClass('active')
      },
      showCommentForm(e) {
        const $comment = $(e.target);
        const $inputField = $comment.parents('.c-post__wrapper').find('.c-post__form').find('input');
        $comment.parents('.c-post__wrapper').find('.c-post__form').toggleClass('active');
        if($comment.parents('.c-post__wrapper').siblings().find('.c-post__form').hasClass('active')) {
          $comment.parents('.c-post__wrapper').siblings().find('.c-post__form').removeClass('active')
        };
        $inputField.focus();
      },
      showRemoveWarning(e) {
        e.stopPropagation()
        const $remove = $(e.target)
        const $warning = $remove.parents('.c-post__media').find('.c-post__warning')
        $warning.addClass('active')
      },
      hideRemoveWarning(e) {
        e.stopPropagation()
        const $removeWarning = $(e.target)
        const $warning = $removeWarning.parents('.c-post__warning')
        $warning.removeClass('active')
      },
      deletePost(index, e) {
        e.stopPropagation()
        const post_id = this.allPosts[index].id
        axios.delete('/posts/' + post_id, {headers: {'Authorization': 'Bearer '+ this.token}} )
        .then(response => {
          console.log(response)
          this.allPosts.splice(index, 1)
          const payload = {
            posts: this.allPosts
          }
          this.$store.dispatch('deleteOnePost', payload)
          this.hideRemoveWarning(e)

          // this.test--
          // this.$emit('deletedPost', this.test)

          // this.decrementCount++
        })
        .catch(error => console.log(error))
      },
      postLike(index) {
        const post_id = this.allPosts[index].id
        axios.post('/likes', 
          {likable_id: post_id, likable_type: 1},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          // console.log(response)
          const payload = {
            i: index,
            auth_like_id: response.data.data.id,
            likes_count: this.allPosts[index].likes_count + 1
          }
          this.$store.dispatch('changePostsLikes', payload)
        })
        .catch(error => console.log(error))
      },
      deleteLike(index) {
        const like_id = this.allPosts[index].auth_like_id
        axios.delete('/likes/' + like_id, {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          // console.log(response)
          const payload = {
            i: index,
            auth_like_id: null,
            likes_count: this.allPosts[index].likes_count - 1
          }
          this.$store.dispatch('changePostsLikes', payload)
        })
        .catch(error => console.log(error))
      },
      authLike(index) {
        return this.allPosts[index].auth_like_id == null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

  .c-post {
    @include breakpoint(desktop) {
      display: flex;
      flex-wrap: wrap;
    }
    &.single {
      @include breakpoint(desktop) {
        display: block;
        width: 32rem;
        margin: 0 auto;
      }
      & .c-post__wrapper {
        @include breakpoint(desktop) {
          width: 100%;
        }
      }
    }
    &.multiMobile {
      @include breakpoint(mobile) {
        display: flex;
        flex-wrap: wrap;
      }
      & .c-post__wrapper {
        @include breakpoint(mobile) {
          width: 33.33%;
          padding-bottom: 0;

          &:nth-of-type(3n) {
            & .c-post__media {
              padding-right: 0;
            }
          }
        }
      }
      & .c-post__media {
        @include breakpoint(mobile) {
          width: 100%;
          height: auto;
          margin-bottom: 0;
          padding-bottom: 0.1rem;
          padding-right: 0.1rem;

          &-video {
            & video {
              width: 100%;
              height: 10.6rem;
              bottom: 0;
            }
          }
        }
      }
      & .c-post__likes {
        @include breakpoint(mobile) {
          display: none;
        }
      }
      & .c-post__comments {
        @include breakpoint(mobile) {
          display: none;
        }
      }
    }
  
    &__wrapper {
      width: 100%;
      padding-bottom: 0.3rem;
      position: relative;

      @include breakpoint(desktop) {
        margin-right: 4.53%;
        width: 21.6%;
        padding-bottom: 7.1rem;
      }

      &:nth-of-type(4n) {
        @include breakpoint(desktop) {
            margin-right: 0;
        }
      }
    }

    &__header {
      display: flex;
      margin: 2.3rem 0 1.4rem 1.8rem;

      @include breakpoint(desktop) {
        margin: 2.3rem 0 1.7rem 0;
      }

      &-img {
        width: 4.4rem;
        height: 4.4rem;

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
        }
      }
    }

    &__remove {
      position: absolute;
      top: 1rem;
      right: 0.6rem;
      width: 2.6rem;
      padding: 0.3rem 0.2rem;
      background: $gray;

      @include breakpoint(desktop) {
        width: 3rem;
        padding: 0.3rem 0.2rem;
        cursor: pointer;
        -webkit-transition: 0.3s all ease-in;
        -moz-transition: 0.3s all ease-in;
        -o-transition: 0.3s all ease-in;
        transition: 0.3s all ease-in;
        visibility: hidden;
        opacity: 0;
      }

      & svg {
        fill: $white;
      }
    }

    &__warning {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      @include fontSizeRem(20, 24);
      color: $white;
      background: $gray;
      height: 32rem;
      // -webkit-transition: 0s all ease-in;
      // -moz-transition: 0s all ease-in;
      // -o-transition: 0s all ease-in;
      // transition: 0s all ease-in;
      // height: 0;
      // width: 0;
      // overflow: hidden;
      display: none;

      &.active {
        // height: 32rem;
        // width: 100%;
        display: block;

        // & .c-post__warning-content {
          // -webkit-transition: 0.3s all ease-in;
          // -moz-transition: 0.3s all ease-in;
          // -o-transition: 0.3s all ease-in;
          // transition: 0.3s all ease-in;
          // opacity: 1;
        // }
      }

      &-content {
        width: 50%;
        margin: 11rem auto 0;
        text-align: center;
        // opacity: 0;
        // -webkit-transition: 0s all ease-in;
        // -moz-transition: 0s all ease-in;
        // -o-transition: 0s all ease-in;
        // transition: 0s all ease-in;

        @include breakpoint(desktop) {
          width: 73%;
          margin: 10rem auto 0;
        }

        & p {
          margin-bottom: 3rem;

          @include breakpoint(desktop) {
            margin-bottom: 4rem;
          }
        }
      }
    }

    &__media {
      width: 32rem;
      height: 32rem;
      margin-bottom: 0.9rem;

      @include breakpoint(desktop) {
        width: 100%;
      }

      &-img {
        cursor: pointer;

        & img {
          width: 100%;
        }
      }

      &-video {
        & video {
          width: 100%;
          height: 33rem;
          position: relative;
          bottom: 3rem;
          display: block;
        }
      }

      &:hover {
        & .c-post__remove {
          @include breakpoint(desktop) {
            visibility: visible;
            opacity: 0.8;
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
          
          .cls-1 {
            fill: none;
            stroke: #232429;
            stroke-width: 0.2rem;
          }

          .cls-2 {
            fill: #09f3a2;
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
        margin-top: 0.9rem;
        margin-right: 2rem;
        cursor: pointer;

        @include breakpoint(desktop) {
          margin-top: 0.3rem;
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
          }
        }
      }
      
      &-comments {
        & p {
          @include fontSizeRem(10, 14);
          color: $gray;
          opacity: 0.5;
          cursor: pointer;
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
      top: 33.5rem;
      z-index: 1;
      background: $white;
      display: none;

      @include breakpoint(desktop) {
        border-bottom: none;
        margin: 0 auto;
        background: $white;
        padding-top: 0.4rem;
        top: 36rem;
      }

      &.active {
        display: block;
      }

      &.userPage {
        top: 27.7rem;
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

            @include breakpoint(desktop) {
              margin-top: 0.2rem;
              margin-left: 0.2rem;
            }
          }
        }
      }
    }
  }
</style>