<template>
  <div class="p-comments" v-if="loading">
    <app-header :title="title" v-if="breakpoint"></app-header>
    <div class="p-comments__comment">
      <app-comment :comments="comments" :comment_body="comment_body" :reply_username="reply_username" @event="reply_username = $event"></app-comment>
      <!-- <app-comment :comments="comments" :comment_body="comment_body"></app-comment> -->
      <div class="p-comments__comment-form">
        <form @submit.prevent="postComment">
          <div class="p-comments__comment-form-field">
            <svg viewBox="6284.636 -477 25.678 23.277">
              <path id="Union_7" data-name="Union 7" class="cls-1" d="M4.028,13.662a9.6,9.6,0,1,1,3.278,3.861L0,20.306Z" transform="translate(6287 -476)"/>
            </svg>
            <input type="text" placeholder="Comment" v-model="comment_body">
            <button class="p-comments__comment-form-btn">
              <icon name="check"></icon>
            </button>
          </div>
        </form>
       </div> <!-- end .c-comment__form -->
     </div> <!-- end .c-comment -->
  </div> <!--  end .p-comments -->
</template>

<script>
  import Header from './header.vue'
  import Comment from './comment.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint } from '../../functions.js'
  
	export default {
    props: ['post_id'],
    data() {
      return {
        loading: false,
        title: 'Comments',
        comments: [],
        reply_username: '',
        comment_body: '',
        amount: 8,
        page: 1
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token
      }),
      breakpoint,
      // reply() {
      // }
    },
    methods: {
      getComments() {
        axios.get('/comments', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, post_id: this.post_id}})
          .then(response => {
            console.log(response)
            for(let i = 0; i < response.data.data.length; i++) {
              this.comments.push(response.data.data[i])
            }
            this.$store.dispatch('getAllComments', this.comments)
            console.log(this.comments)
            this.loading = true
          })
          .catch(error => console.log(error))
      },
      postComment() {
        axios.post('/comments', 
          {post_id: this.post_id, reply_username: this.reply_username, body: this.comment_body},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
          // this.$store.dispatch('getAllComments', this.comments)
        })
        .catch(error => console.log(error))

        const $input = $('.p-comments__comment-form').find('input');
        $input.blur().val('');
      }
    },
    created() {
      this.getComments()
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
      appHeader: Header,
      appComment: Comment
    }
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

  .p-comments {

    &__comment {
      @include breakpoint(desktop) {
        position: fixed;
        top: 8rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(35, 36, 41, 0.95);
        z-index: 1;
      }

      &-form {
        height: 4.3rem;
        padding-top: 0.5rem;
        padding-bottom: 1rem;
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 4.2rem;
        border-top: 0.1rem solid rgba(149, 152, 154, 0.5);

        @include breakpoint(desktop) {
          position: static;
          width: 43.4rem;
          height: 5.4rem;
          margin: 0 auto;
          background: $white;
          padding-top: 0.7rem;
        }

        &-field {
          padding: 0 1.6rem;
          display: flex;
          justify-content: space-between;

          @include breakpoint(desktop) {
            padding: 0 3.4rem;
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
              width: 29rem;
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
            width: 3.3rem;
            height: 3.3rem;
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
  }
</style>