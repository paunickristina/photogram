<template>
  <div class="c-follower__wrapper">
    <div v-if="followers.length == 0  && likesPage" class="c-follower__no-follower">
      <p>This post has no likes</p>
    </div>
    <div v-for="(follower, index) in followers" :key="index" class="c-follower__one-follower u-clearfix">
      <router-link tag="div" :to="{ name: 'user', params: {user_id: followerId(index)}}" class="c-follower__one-follower-img">
        <img :src="storage + follower.image.avatar" alt="">
      </router-link>
      <div class="c-follower__one-follower-body">
        <p><router-link tag="span" :to="{ name: 'user', params: {user_id: followerId(index)}}" :class="{ bold: likesPage }">{{ follower.username}}</router-link><span v-if="likesPage"> liked this post</span></p>
      </div>
      <div class="c-follower__btn" :class="{ left: likesPage }">
        <button @click="unfollowUser(index); replaceBtn($event)" v-show="authFollow(index) && !authUser(index)" class="c-btn c-btn--small">Unfollow</button>
        <button @click="followUser(index); replaceBtn($event);" v-show="!authFollow(index) && !authUser(index)" class="c-btn c-btn--small c-btn--gray">Follow</button>
      </div>
    </div>
  </div> <!-- end .c-follower__wrapper -->
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { storage } from '../../functions.js'

  export default {
    props: ['followers'],
    computed: {
      ...mapState({
        token: state => state.authentication.token,
        userId: state => state.authentication.userId
      }),
      likesPage() {
        return this.$route.name === 'likes' || this.$route.name === 'userLikes'
      },
      storage
    },
    methods: {
      authFollow(index) {
        return this.followers[index].auth_follow
      },
      authUser(index) {
        return this.followers[index].id == this.userId
      },
      followerId(index) {
        return this.followers[index].id
      },
      followUser(index) {
        const user_id = this.followers[index].id
        axios.post('/followers', 
          {user_id: user_id},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          // console.log(response)
        })
        .catch(error => console.log(error))
      },
      unfollowUser(index) {
        const user_id = this.followers[index].id
        axios.delete('/followers/' + user_id, {headers:{ 'Authorization': 'Bearer '+ this.token}})
        .then(response => {
          // console.log(response)
        })
        .catch(error => console.log(error))
      },
      replaceBtn(e) {
        const $removeBtn = $(e.target)
        const $showBtn = $removeBtn.siblings()
        $removeBtn.css({'display':'none'})
        $showBtn.css({'display':'block'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";
  
.c-follower {

  &__no-follower {
    @include fontSizeRem(14, 20)
  }

  &__one-follower {
    margin-bottom: 2.4rem;

    @include breakpoint(desktop) {
      margin-bottom: 3.8rem;
    }

    &-img { 
      width: 3.9rem; 
      height: 3.8rem;
      float: left;
      margin-right: 2.7%;

      @include breakpoint(desktop) {
        width: 4.5rem; 
        height: 4.5rem;
        margin-right: 2%;
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

        & span {

          &:nth-of-type(1) {
            cursor: pointer;
          }

          &.bold {
            font-family: 'Roboto-Bold';
          }
        }
      }
    }
  }

  &__btn {
    width: 7rem;
    float: right;
    margin-top: 0.8rem;

    @include breakpoint(desktop) {
      width: 9rem;
    }

    & .c-btn {
      width: 100%;
      @include fontSizeRem(10, 15);
      padding: 0;

      @include breakpoint(desktop) {
        height: 2.8rem;
        line-height: 2.8rem;
      }
    }

    &.left {
      float: left;
    }
  }
}
</style>