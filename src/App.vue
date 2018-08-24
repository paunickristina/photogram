<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('tryAutoLogin')
    }
  }
</script>

<style lang="scss">
 @import "./assets/scss/main.scss";
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1.4s ease;
  }

  .fade-leave-active {
    transition: opacity 0s ease;
    opacity: 0;
  }
</style>
