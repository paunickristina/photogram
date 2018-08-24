<template>
  <div class="p-likes">
    <app-header :title="title" ></app-header>
    <div class="p-likes__like">
      <div class="p-likes__like-wrapper">
        <div class="p-likes__like-overflow-hidden">
          <div class="p-likes__like-overflow-auto">
            <div class="p-likes__like-close" @click="$router.go(-1)">
              <icon name="times"></icon>
            </div>
            <app-follower :followers="followers"></app-follower>
            <div class="p-likes__like-spinner" v-if="spinner">
              <icon name="sync" spin></icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './header.vue'
  import Follower from './follower.vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint } from '../../functions.js'

  export default {
    props: ['post_id', 'likes_count'],
    data() {
      return {
        spinner: false,
        title: 'Likes',
        followers: [],
        amount: 12,
        page: 1
      }
    },
    created() {
      this.getLikes()
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
        let $overflow = document.querySelector('.p-likes__like-overflow-auto')
        $overflow.addEventListener('scroll', this.infiniteScroll)
      }
    },
    destroyed() {
      if(this.breakpoint === true) {
        window.removeEventListener('scroll', this.infiniteScroll)
      }
      else {
        let $overflow = document.querySelector('.p-likes__like-overflow-auto')
        $overflow.removeEventListener('scroll', this.infiniteScroll)
        $('body').css({'overflow':'visible', 'padding-right':'0'})
      }
    },
    computed: {
      ...mapState({
        token: state => state.authentication.token
      }),
      breakpoint
    },
    methods: {
      infiniteScroll() {
        if(this.breakpoint === true) {
          if($(window).scrollTop() === $(document).height() - $(window).height()) {
            window.removeEventListener('scroll', this.infiniteScroll)
            if(this.likes_count > this.followers.length) {
              this.getLikes()
            }
          }
        }
        else {
          let $overflow = document.querySelector('.p-likes__like-overflow-auto')
          if($overflow.scrollTop === $overflow.scrollHeight - $overflow.clientHeight) {
            $overflow.removeEventListener('scroll', this.infiniteScroll)
            if(this.likes_count > this.followers.length) {
              this.getLikes()
            }
          }
        }
      },
      getLikes() {
        this.spinner = true
        axios.get('/likes', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {likable_id: this.post_id, likable_type: 1, page: this.page, amount: this.amount}})
          .then(response => {
            // console.log(response)
            for(let i = 0; i < response.data.data.length; i++) {
              this.followers.push(response.data.data[i])
            }
            if(response.data.data.length > 0) {
              this.page++
            }
            if(this.breakpoint === true) {
              window.addEventListener('scroll', this.infiniteScroll)
            }
            else {
              if(this.page > 1) {
                let $overflow = document.querySelector('.p-likes__like-overflow-auto')
                $overflow.addEventListener('scroll', this.infiniteScroll)
              }
            }
            this.spinner = false
            this.$store.dispatch('getAllLikes', this.followers)
          })
          .catch(error => console.log(error))
      }
    },
    components: {
      appHeader: Header,
      appFollower: Follower
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

  .p-likes {

    &__like {
      @include breakpoint(desktop) {
        position: fixed;
        top: 8rem;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: 0;
        background: rgba(35, 36, 41, 0.95);
        z-index: 1;
      }

      &-wrapper {
        padding: 1.2rem 1.8rem 0;

        @include breakpoint(desktop) {
          width: 43.4rem;
          height: 74.6rem;
          margin: 8.3rem auto 0;
          background: $white;
          padding: 4.2rem 3.4rem 0;
          position: relative;
        }
      }

      &-overflow-hidden {
        @include breakpoint(desktop) {
          height: 100%;
          overflow: hidden;
        }
      }

      &-overflow-auto {
        @include breakpoint(desktop) {
          height: 100%;
          overflow-y: auto;
          width: 105%;
        }
      }

      &-close {
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

      &-spinner {
        text-align: center;
        margin-top: 4rem;
        margin-bottom: 2rem;

        @include breakpoint(desktop) {
          margin-top: 5rem;
          margin-bottom: 4rem;
        }

        & .fa-icon {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    }
  }
</style>