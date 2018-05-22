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

  export default {
    props: ['post_id'],
    data() {
      return {
        title: 'Likes',
        followers: [],
        amount: 12,
        page: 1
      }
    },
    computed: {
      token() {
        return this.$store.getters.isAuthenticated
      }
    },
    beforeMount() {
      axios.get('/likes', {headers:{ 'Authorization': 'Bearer '+ this.token}, params: {likable_id: this.post_id, likable_type: 1, page: this.page, amount: this.amount}})
        .then(response => {
          console.log(response)
          for(let i = 0; i < response.data.data.length; i++) {
            this.followers.push(response.data.data[i])
          }
          this.$store.dispatch('getAllLikes', this.followers)
        })
        .catch(error => console.log(error))
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
        background: rgba(35, 36, 41, 0.95);
      }

      &-wrapper {
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
    }
  }
</style>
