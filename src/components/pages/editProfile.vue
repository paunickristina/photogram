<template>
  <section class="p-edit-profile">
      <div class="main-wrapper">
          <app-header :title='title'></app-header>
          <div class="p-edit-profile__img">
            <p>Edit Profile</p>
            <div class="p-edit-profile__img-img">

            </div>
            <button class="c-btn c-btn--small c-btn--gray">Change Photo</button>
            
            <!-- <img :src="image" alt=""> -->
          </div>
          <div class="p-edit-profile__form">
            <div class="c-input">
              <input type="text" placeholder="Full Name">
            </div>
            <div class="c-input">
              <!-- remove placeholder -->
              <input type="text" placeholder="User Name">
            </div>
            <div class="c-input">
              <input type="text" placeholder="Something about you">
            </div>
            <div class="c-input">
              <input type="text" placeholder="Private Information">
            </div>
            <div class="c-input">
              <!-- remove placeholder -->     
              <input type="text" placeholder="Email">
            </div>
            <div class="c-input">
              <input type="text" placeholder="Phone number">
            </div>
            <div class="c-input">
              <input type="text" placeholder="Gender">
            </div>
            <div>
              <button class="c-btn c-btn--small c-btn--gray">Save</button>
            </div>
          </div>
      </div>
  </section>
</template>

<script>
    import Header from '../component/header.vue'

    export default {
        data() {
            return {
                title: 'Edit Profile'
            }
        },
        components: {
            appHeader: Header
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/settings/_module-settings.scss";

    .p-edit-profile {

        &__img {
            margin-top: 2rem;
            margin-bottom: 2rem;
            text-align: center;

            @include breakpoint(desktop) {
              margin-bottom: 10rem;
            }

            & p {
              display: none;
              @include fontSizeRem(0, 26);
              font-family: 'HelveticaNeue-Thin', sans-serif;

              @include breakpoint(desktop) {
                display: block;
                
              }
            }

            &-img {
                width: 8.7rem;
                height: 8.7rem;
                background: $green;
                border-radius: 50%; //remove
                margin: 2rem auto 2rem;

                @include breakpoint(desktop) {
                  width: 22.1rem;
                  height: 22.1rem;
                }

                & img {
                    border-radius: 50%;
                }
            }
        }

        &__form {
            width: 20.5rem;
            margin: 0 auto;

            @include breakpoint(desktop) {
              width: 58.7rem;
            }
        }
    }
</style>
