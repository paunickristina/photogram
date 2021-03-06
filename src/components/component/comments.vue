<template>
  <div class="p-comments">
    <app-header :title="title" v-if="breakpoint"></app-header>
    <div class="p-comments__comment">
      <div class="p-comments__comment-scroll">
        <app-comment :comments="comments" :post_id="post_id" :comment_body="comment_body" :id_comment="id_comment" :reply_username="reply_username" :postIndex="postIndex" :spinner="spinner" @event="id_comment = $event; reply_username = $event;"></app-comment>
      </div>
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
       </div>
     </div>
  </div>
</template>

<script>
  import Header from './header.vue'
  import Comment from './comment.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint } from '../../functions.js'
  
	export default {
    props: ['post_id', 'comments_count'],
    data() {
      return {
        spinner: false,
        title: 'Comments',
        comments: [],
        reply_username: '',
        comment_body: '',
        amount: 12,
        page: 1,
        id_comment: ''
      }
    },
    created() {
      this.getComments()
      if(this.breakpoint === false) {
        $('body').css({'overflow':'hidden', 'padding-right':'15px'})
      }
    },
    mounted() {
      if(this.breakpoint === true) {
        window.addEventListener('load', () => {
          window.addEventListener('scroll', this.infiniteScroll)
        })
      }
      else {
        let $overflow = document.querySelector('.c-comment__overflow-auto')
        $overflow.addEventListener('scroll', this.infiniteScroll)
      }
    },
    destroyed() {
      if(this.breakpoint === true) {
        window.removeEventListener('scroll', this.infiniteScroll)
      }
      else {
        let $overflow = document.querySelector('.c-comment__overflow-auto')
        $overflow.removeEventListener('scroll', this.infiniteScroll)
        $('body').css({'overflow':'visible', 'padding-right':'0'})
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token,
        statePosts: state => state.posts
      }),
      postIndex() {
        let idPost = this.statePosts.map(function(current){
          return current.id
        })
        let indexPost = idPost.indexOf(this.post_id)
        return indexPost
      },
      breakpoint
    },
    methods: {
      infiniteScroll() {
        if(this.breakpoint === true) {
          if($(window).scrollTop() === $(document).height() - $(window).height()) {
            window.removeEventListener('scroll', this.infiniteScroll)
            if(this.comments_count > this.comments.length) {
              this.getComments()
            }
          }
        }
        else {
          let $overflow = document.querySelector('.c-comment__overflow-auto')
          if($overflow.scrollTop === $overflow.scrollHeight - $overflow.clientHeight) {
            $overflow.removeEventListener('scroll', this.infiniteScroll)
            if(this.comments_count > this.comments.length) {
              this.getComments()
            }
          }
        }
      },
      getComments() {
        this.spinner = true
        axios.get('/comments', {headers: {'Authorization': 'Bearer '+ this.token}, params: {amount: this.amount, page: this.page, post_id: this.post_id}})
          .then(response => {
            console.log(response)
            for(let i = 0; i < response.data.data.length; i++) {
              this.comments.push(response.data.data[i])
            }
            if(response.data.data.length > 0) {
              this.page++
            }
            if(this.breakpoint === true) {
              window.addEventListener('scroll', this.infiniteScroll)
            }
            else {
              if(this.page > 1) {
                let $overflow = document.querySelector('.c-comment__overflow-auto')
                $overflow.addEventListener('scroll', this.infiniteScroll)
              }
            }
            this.spinner = false
            this.$store.dispatch('getAllComments', this.comments)
          })
          .catch(error => console.log(error))
      },
      postComment() {
        if(this.id_comment == '') {
          axios.post('/comments', {post_id: this.post_id, reply_username: this.reply_username, body: this.comment_body}, {headers: {'Authorization': 'Bearer '+ this.token}})
          .then(response => {
            console.log(response)
            //check this
            this.comments.unshift(response.data.data)
            const payload = {
              i: this.postIndex,
              comments: this.comments,
              comment: response.data.data
            }
            this.$store.dispatch('changeComments', payload)
            this.comment_body = ''
          })
          .catch(error => console.log(error))
          const $input = $('.p-comments__comment-form').find('input');
          $input.blur().val('');
        }
        else {
          axios.patch('/comments/' + this.id_comment, 
            {body: this.comment_body},
            {headers: {'Authorization': 'Bearer '+ this.token}}
          )
          .then(response => {
            // this.$store.dispatch('',)
          })
          .catch(error => console.log(error))
        }
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
        background: $white;

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