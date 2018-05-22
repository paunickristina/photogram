<template>
    <div class="c-comment__wrapper">
      <div class="c-comment__overflow-hidden">
        <div class="c-comment__overflow-auto">
          <div class="c-comment__close" @click="$router.go(-1)">
            <icon name="times"></icon>
          </div>
          <div v-for="(comment, index) in comments" :key="index" class="c-comment__one-comment u-clearfix">
            <router-link tag="div" :to="{ name: 'user', params: {user_id: userCommentId(index)}}" class="c-comment__one-comment-img">
              <img :src="storage + comment.user_image.avatar" alt="">
            </router-link>
            <div class="c-comment__one-comment-body">
              <p><router-link tag="span" :to="{ name: 'user', params: {user_id: userCommentId(index)}}">{{ comment.username }}</router-link> {{ comment.body }}</p>
              <p>
                <span @click="editComment(index)" v-if="userComment(index)">edit</span>
                <span @click="replyComment(index)">reply</span> 
              </p>
            </div>
            <div class="c-comment__one-comment-like">
              <svg @click="postLike(index)" v-if="authLike(index)" xmlns="http://www.w3.org/2000/svg" viewBox="6248.998 -476.065 22.901 23.092">
                <path id="Path_32" data-name="Path 32" class="cls-1" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(6250.004 -474.795)"/>
              </svg>
              <svg @click="deleteLike(index)" v-else xmlns="http://www.w3.org/2000/svg" viewBox="4631 1443.165 20.669 20.141">
                <path id="Path_111" data-name="Path 111" class="cls-2" d="M19.339,1.1A4.1,4.1,0,0,0,13.823.959h0a5.493,5.493,0,0,1-3.337,1.318A5.225,5.225,0,0,1,6.809.959h0a4.166,4.166,0,0,0-5.448.069,4.366,4.366,0,0,0-.409,5.9h0L10.35,20.1,19.816,6.854A4.416,4.416,0,0,0,19.339,1.1Z" transform="translate(4631.004 1443.205)"/>
              </svg>
              <p @click="deleteComment(index)" v-if="userComment(index) || editPostPage">delete</p>
            </div>
          </div>
        </div> <!-- end .c-comment__overflow-auto -->
      </div> <!-- end .c-comment__overflow-hidden -->
    </div> <!-- end .c-comment__wrapper -->
</template>

<script>
  import axios from 'axios'
  
  export default {
    props: ['comments', 'comment_body', 'reply_username'],
    // props: ['comments', 'comment_body'],
    data() {
      return {
        // user_id: this.userCommentId
        reply_user: this.reply_username
      }
    },
    computed: {
      token() {
        return this.$store.getters.isAuthenticated
      },
      storage() {
        return 'http://54.37.227.57/storage/'
      },
      editPostPage() {
        return this.$route.name === 'editPost'
      }
    },
    methods: {
      deleteComment(index) {
        const comment_id = this.comments[index].id
        axios.delete('/comments/' + comment_id, {headers:{ 'Authorization': 'Bearer '+ this.token}})
        .then(response => {
          console.log(response)
          // this.$store.dispatch('getAllComments', this.comments)
        })
        .catch(error => console.log(error))
      },
      editComment(index) {
        const comment_id = this.comments[index].id
        const $input = $('.p-comments__comment-form').find('input');
        const $value = this.comments[index].body + ' '
        $input.val($value).focus()
        console.log(this.comment_body)

        // axios.patch('/comments/' + comment_id, 
        //   {body: this.comment_body},
        //   {headers:{ 'Authorization': 'Bearer '+ this.token}}
        // )
        // .then(response => {
        //   console.log(response)
        //   // this.$store.dispatch('getAllComments', this.comments)
        // })
        // .catch(error => console.log(error))
      },
      userComment(index) {
        return this.$store.getters.authenticatedUser == this.comments[index].user_id
      },
      userCommentId(index) {
        return this.comments[index].user_id
      },
      replyComment(index) {
        const $input = $('.p-comments__comment-form').find('input')
        const $value = '@' + this.comments[index].username + ' '
        $input.val($value).focus()
        // this.reply_username = this.comments[index].username
        // this.$emit('event', this.reply_username)
        this.reply_user = this.comments[index].username
        this.$emit('event', this.reply_user)
      },
      postLike(index) {
        const comment_id = this.comments[index].id
        axios.post('/likes', 
          {likable_id: comment_id, likable_type: 2},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
          // this.$store.dispatch('getAllComments', this.comments)
        })
        .catch(error => console.log(error))
      },
      deleteLike(index) {
        const like_id = this.comments[index].auth_like_id
        axios.delete('/likes/' + like_id, {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
          // this.$store.dispatch('getAllComments', this.comments)
        })
        .catch(error => console.log(error))
      },
      authLike(index) {
        return this.comments[index].auth_like_id == null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

.c-comment {

  &__wrapper {
    margin-top: 1.2rem;
    padding-left: 1.8rem;
    padding-right: 1.8rem;

    @include breakpoint(desktop) {
      width: 43.4rem;
      height: 74.6rem;
      margin: 8.3rem auto 0;
      background: $white;
      padding: 4.2rem 3.4rem 0;
      position: relative;
    }
  }

  &__overflow-hidden {
    @include breakpoint(desktop) {
      height: 100%;
      overflow: hidden;
    }
  }

  &__overflow-auto {
    @include breakpoint(desktop) {
      height: 100%;
      overflow-y: auto;
      width: 105%;
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

  &__one-comment {
    margin-bottom: 1rem;

    @include breakpoint(desktop) {
      margin-bottom: 3.8rem;
    }

    &-img {
      width: 14%; 
      height: 3.8rem;
      float: left;
      margin-right: 2.7%; 

      @include breakpoint(desktop) {
        width: 12%; 
        height: 4.5rem;
        cursor: pointer;
      }

      & img {
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 50%;

        @include breakpoint(desktop) {
          width: 4.5rem;
          height: 4.5rem;
        }
      }
    }

    &-body {
      margin-top: 1.2rem;
      margin-right: 2%;
      width: 56%;
      float: left;

      @include breakpoint(desktop) {
        padding-right: 3.2rem;
      }

      & p {
        @include fontSizeRem(14, 16);
        color: $gray;
        margin-bottom: 0.8rem;

        &:nth-of-type(2) {
          text-align: right;
          margin-right: 1.4rem;
          margin-bottom: 0;
          @include fontSizeRem(10, 16);
          opacity: 0.5;

          & span {
            font-family: 'Roboto';
            display: inline-block;
            cursor: pointer;

            &:nth-of-type(2) {
              margin-left: 1rem;
            }
          }
        }

        & span {
          font-family: 'Roboto-Bold';
          cursor: pointer;
        }
      }
    }

    &-like {
      margin-top: 1.6rem;
      width: 24%;
      float: left;
      display: flex;

      & svg {
        width: 2.2rem;
        height: 2.2rem;
        margin-right: 1rem;
        cursor: pointer;

        @include breakpoint(desktop) {
          width: 2.6rem;
          height: 2.6rem;
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

      & p {
        @include fontSizeRem(12, 14);
        cursor: pointer;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>