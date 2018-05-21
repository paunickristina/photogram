<template>
  <div class="c-likes__wrapper">
    <div class="c-likes__overflow-hidden">
      <div class="c-likes__overflow-auto">
        <div class="c-likes__close" @click="$router.go(-1)">
          <icon name="times"></icon>
        </div>
        <div v-if="likes.length == 0" class="c-likes__no-likes">
          <p>This post has no likes</p>
        </div>
        <div v-for="(like, index) in likes" :key="index" class="c-likes__one-like u-clearfix">
          <router-link tag="div" :to="{ name: 'user', params: {user_id: userLikeId(index)}}" class="c-likes__one-like-img">
            <img :src="storage + like.image.avatar" alt="">
          </router-link>
          <div class="c-likes__one-like-body">
            <p><router-link tag="span" :to="{ name: 'user', params: {user_id: userLikeId(index)}}">{{ like.username}}</router-link> liked this post</p>
          </div>
          <div class="c-likes__btn">
            <button @click="unfollowUser(index); replaceBtn($event)" v-show="authFollow(index) && !authenticatedUserLike(index)" class="c-btn c-btn--small c-likes__btn--unfol">Unfollow</button>
            <button @click="followUser(index); replaceBtn($event);" v-show="!authFollow(index) && !authenticatedUserLike(index)" class="c-btn c-btn--small c-btn--gray c-likes__btn--fol">Follow</button>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- end .c-likes__wrapper -->
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['likes'],
    data() {
      return {

      }
    },
    computed: {
      token() {
        return this.$store.getters.isAuthenticated
      },
      storage() {
        return 'http://54.37.227.57/storage/'
      }
    },
    methods: {
      authFollow(index) {
        return this.likes[index].auth_follow
      },
      authenticatedUserLike(index) {
        return this.likes[index].id == this.$store.getters.authenticatedUser
      },
      userLikeId(index) {
        return this.likes[index].id
      },
      followUser(index) {
        const user_id = this.likes[index].id
        axios.post('/followers', 
          {user_id: user_id},
          {headers: {'Authorization': 'Bearer '+ this.token}}
        )
        .then(response => {
          console.log(response)
          // this.$store.dispatch('getAllComments', this.comments)
        })
        .catch(error => console.log(error))
      },
      unfollowUser(index) {
        const user_id = this.likes[index].id
        axios.delete('/followers/' + user_id, {headers:{ 'Authorization': 'Bearer '+ this.token}})
        .then(response => {
          console.log(response)
          // this.$store.dispatch('getAllComments', this.comments)
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
  
.c-likes {

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

  &__no-likes {
    @include fontSizeRem(14, 20)
  }

  &__one-like {
    margin-bottom: 2.4rem;

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
            font-family: 'Roboto-Bold';
            cursor: pointer;
          }
        }
      }
    }
  }

  &__btn {
    width: 25.3%;
    float: left;
    margin-top: 0.8rem;

    @include breakpoint(desktop) {
      width: 23.3%;
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
  }
}
</style>