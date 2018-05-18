<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <router-view :key="$route.path"></router-view>
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
 
</style>
