<template>
    <div class="p-likes">
      <app-header :title="title" ></app-header>
      <div class="p-likes__like">
        <app-like :likes="likes"></app-like>
      </div>
    </div>
</template>

<script>
  import Header from './header.vue'
  import Like from './like.vue'
  import axios from 'axios'

  export default {
    props: ['post_id'],
    data() {
      return {
        title: 'Likes',
        likes: [],
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
            this.likes.push(response.data.data[i])
          }
          this.$store.dispatch('getAllLikes', this.likes)
        })
        .catch(error => console.log(error))
    },
    components: {
      appHeader: Header,
      appLike: Like
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
    }
  }
</style>
