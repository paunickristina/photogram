<template>
    <div class="c-header">
      <div class="main-wrapper u-clearfix">
        <div class="c-header__wrap">
          <router-link tag="div" :to="{ name: 'search'}" class="c-header__search" v-if="homepage && breakpoint">
            <svg  viewBox="2709 -156.726 14.085 14.933">
              <g id="Group_130" transform="translate(-23 -576.726)">
                <g id="Ellipse_17" data-name="Ellipse 17" class="cls-1" transform="translate(2732 420)">
                  <circle class="cls-3" cx="5.887" cy="5.887" r="5.887"/>
                  <circle class="cls-4" cx="5.887" cy="5.887" r="4.887"/>
                </g>
                <path id="Path_31" class="cls-2" d="M0,0,4.905,4.905" transform="translate(2740.473 429.32)"/>
              </g>
            </svg>
          </router-link>
          <div class="c-header__back" v-if="!homepage && breakpoint" @click="$router.go(-1)"></div>
          <div class="c-header__left">
            <router-link tag="div" to="/homepage" class="c-header__left-homepage" :class="{active: homepage}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="3117 1920 29 29">
                <g id="Group_179" data-name="Group 179" transform="translate(150 926)">
                  <ellipse id="Ellipse_37" data-name="Ellipse 37" class="cls-1" cx="14.5" cy="14.5" rx="14.5" ry="14.5" transform="translate(2967 994)"/>
                  <rect id="Rectangle_168" data-name="Rectangle 168" class="cls-2" width="13" height="11" transform="translate(2975 1003)"/>
                  <rect id="Rectangle_169" data-name="Rectangle 169" class="cls-1" width="3" height="5" transform="translate(2980 1010)"/>
                </g>
              </svg>
            </router-link>
            <router-link tag="div" class="c-header__left-profile" :to="{ name: 'user', params: {user_id: userId}}">
              <img :src="userImage" alt="">
            </router-link>
            <router-link tag="div" :to="{ name: 'upload'}" class="c-header__left-upload">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="2837.992 1487.592 14.439 14.439">
                <path id="Union_49" data-name="Union 49" class="cls-1" d="M6.353,13.573V8.086H.867a.866.866,0,1,1,0-1.732H6.353V.867a.866.866,0,1,1,1.732,0V6.353h5.487a.866.866,0,0,1,0,1.732H8.086v5.487a.866.866,0,0,1-1.732,0Z" transform="translate(2837.992 1487.592)"/>
              </svg>
            </router-link>
            <router-link tag="div" :to="{ name: 'notification'}" class="c-header__left-notif">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="6304.658 -988.421 18.607 17.74">
                <path id="Path_22" data-name="Path 22" class="cls-1" d="M33.212,19.862a3.731,3.731,0,0,0-4.948-.122h0A4.972,4.972,0,0,1,25.27,20.9a4.733,4.733,0,0,1-3.3-1.161h0a3.789,3.789,0,0,0-4.887.061,3.737,3.737,0,0,0-.428,5.192h0L25.087,36.6l8.491-11.668A3.7,3.7,0,0,0,33.212,19.862Z" transform="translate(6288.853 -1007.282)"/>
              </svg>
            </router-link>
          </div>
          <h1 v-if="breakpoint && !homepage">{{ title }}</h1>
          <h1 v-if="!breakpoint || homepage"><span>photo</span>gram</h1>
          <router-link tag="div" :to="{ name: 'search' }" class="c-header__search" v-if="!breakpoint">
            <svg  viewBox="2709 -156.726 14.085 14.933">
              <g id="Group_130" transform="translate(-23 -576.726)">
                <g id="Ellipse_17" data-name="Ellipse 17" class="cls-1" transform="translate(2732 420)">
                  <circle class="cls-3" cx="5.887" cy="5.887" r="5.887"/>
                  <circle class="cls-4" cx="5.887" cy="5.887" r="4.887"/>
                </g>
                <path id="Path_31" class="cls-2" d="M0,0,4.905,4.905" transform="translate(2740.473 429.32)"/>
              </g>
            </svg>
          </router-link>
          <router-link tag="div" :to="{ name: 'notification'}" class="c-header__notif">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 438.536 438.536" style="enable-background:new 0 0 438.536 438.536;"
                  xml:space="preserve">
              <g>
                <g>
                  <path class="cls-1" d="M352.733,75.226c-8.466-16.271-19.599-29.787-33.394-40.541c-13.801-10.752-29.413-19.223-46.821-25.41
                      C255.1,3.094,237.349,0,219.266,0s-35.832,3.09-53.247,9.276c-17.417,6.187-33.025,14.657-46.826,25.41
                      c-13.796,10.754-24.932,24.267-33.402,40.541c-8.47,16.274-12.703,33.83-12.703,52.677c0,29.502,9.805,55.006,29.409,76.516
                      c8.567,9.324,15.656,17.604,21.271,24.838c5.617,7.228,11.279,16.316,16.989,27.261c5.708,10.944,8.945,21.176,9.707,30.696
                      c-8.947,5.332-13.418,13.135-13.418,23.415c0,7.042,2.378,13.134,7.139,18.274c-4.76,5.14-7.139,11.231-7.139,18.273
                      c0,9.897,4.285,17.604,12.85,23.131c-2.478,4.373-3.715,8.847-3.715,13.415c0,8.754,2.996,15.516,8.992,20.27
                      c5.992,4.757,13.369,7.139,22.126,7.139c3.806,8.374,9.519,15.037,17.13,19.985s15.891,7.419,24.838,7.419
                      c8.949,0,17.227-2.471,24.838-7.419c7.614-4.948,13.329-11.611,17.135-19.985c8.754,0,16.132-2.382,22.124-7.139
                      c5.995-4.754,8.99-11.516,8.99-20.27c0-4.568-1.239-9.042-3.717-13.415c8.562-5.523,12.851-13.233,12.851-23.131
                      c0-7.042-2.382-13.134-7.139-18.273c4.757-5.141,7.139-11.232,7.139-18.274c0-10.28-4.474-18.083-13.422-23.415
                      c0.763-9.521,4-19.752,9.708-30.696c5.719-10.944,11.376-20.033,16.995-27.261c5.619-7.234,12.706-15.515,21.265-24.838
                      c19.605-21.51,29.414-47.014,29.414-76.516C365.447,109.056,361.211,91.5,352.733,75.226z M309.484,179.292
                      c-1.906,2.093-4.808,5.232-8.709,9.421c-3.898,4.187-6.8,7.324-8.703,9.419c-24.362,29.126-37.78,57.482-40.255,85.078h-65.1
                      c-2.474-27.596-15.891-55.952-40.256-85.078c-1.903-2.093-4.805-5.232-8.709-9.419c-3.899-4.189-6.805-7.325-8.708-9.421
                      c-12.941-15.037-19.414-32.168-19.414-51.389c0-13.706,3.284-26.458,9.851-38.262c6.571-11.801,15.136-21.458,25.697-28.979
                      c10.562-7.521,22.266-13.418,35.116-17.701c12.847-4.286,25.837-6.423,38.972-6.423s26.125,2.137,38.971,6.423
                      c12.847,4.283,24.551,10.181,35.115,17.701c10.561,7.52,19.13,17.181,25.693,28.979c6.563,11.803,9.853,24.556,9.853,38.262
                      C328.898,147.124,322.427,164.255,309.484,179.292z"/>
                  <path class="cls-2" d="M247.674,86.795c-9.418-3.046-18.891-4.57-28.404-4.57c-2.474,0-4.615,0.9-6.423,2.712
                      c-1.809,1.809-2.712,3.949-2.712,6.423s0.904,4.615,2.712,6.423c1.809,1.805,3.949,2.712,6.423,2.712
                      c9.9,0,19.985,2.38,30.272,7.135c10.273,4.758,15.406,11.516,15.406,20.273c0,2.473,0.9,4.618,2.711,6.423
                      c1.813,1.804,3.949,2.708,6.42,2.708c2.478,0,4.616-0.901,6.427-2.708c1.811-1.809,2.71-3.951,2.71-6.423
                      c0-9.9-3.572-18.464-10.704-25.693C265.38,94.98,257.095,89.835,247.674,86.795z"/>
                </g>
              </g>
            </svg>
          </router-link>
        </div> <!-- end .c-header__wrap -->
    </div> <!-- end .main-wrapper -->
  </div> <!-- end .c-header -->
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { breakpoint } from '../../functions.js'
  
  export default {
    props: ['title'],
    computed: {
      ...mapState({
        userId: state => state.authentication.userId,
        userImage: state => state.authentication.userImage
      }),
      homepage() {
        return this.$route.name === 'homepage'
      },
      breakpoint
    }
  }
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/settings/_module-settings.scss";
	
  .c-header {

    &__wrap {
      display: flex;
      justify-content: space-between;
      padding: 0.6rem 1.6rem 0.5rem;
      border-bottom: 0.1rem solid rgba(149, 152, 154, 0.5);

      @include breakpoint(desktop) {
        padding: 1rem 1.6rem 1.5rem;
        // position: fixed; //check
        // top: 0;
        // left: 0;
        // width: 100%;
      }
    }

    &__search {
      width: 2.9rem;
      height: 2.9rem;
      background: $gray;
      border-radius: 50%;
      padding-top: 0.7rem;
      text-align: center;
      cursor: pointer;

      @include breakpoint(desktop) {
        width: 3.38rem;
        height: 3.38rem;
        padding-top: 0.9rem;
        margin-top: 1.6rem;
        margin-right: 12.2rem;
      }

      & svg {
        width: 1.34rem;
        height: 1.42rem;

        @include breakpoint(desktop) {
          width: 1.6rem;
          height: 1.7rem;
        }
      }

      & .cls-1, .cls-4 {
        fill: none;
      }
      & .cls-1, .cls-2 {
        stroke: $white;
        stroke-width: 2px;
      }
      & .cls-2 {
        fill: $black;
      }
      & .cls-3 {
        stroke: none;
      }
    }

    &__back {
      padding-top: 0.4rem;
      text-align: center;
      margin-right: -0.2rem;
      width: 2rem;
      height: 3rem;
      position: relative;

      &::before {
        content: "";
        display: block;
        width: 0.2rem;
        height: 1.5rem;
        background: $gray;
        transform: rotate(45deg);
        position: absolute;
        left: 0.3rem;
      }
      &::after {
        content: "";
        display: block;
        width: 0.2rem;
        height: 1.4rem;
        background: $gray;
        transform: rotate(-45deg);
        position: absolute;
        left: 0.3rem;
        top: 1.4rem;
      }
    }

    &__left {
      @include breakpoint(mobile) {
        display: none;
      }

      margin-left: 4.4rem;
      margin-top: 0.8rem;
      display: flex;

      &-homepage {
          width: 3.8rem;
          height: 3.8rem;
          margin-right: 3.7rem;
          position: relative;
          cursor: pointer;

          & svg {
            .cls-1 {
              fill: $gray;
            }
            .cls-2 {
              fill: $white;
            }
          }
          &.active {
            .cls-2 {
              fill: $green;
            }
          }
      }

      &-profile {
          width: 3.8rem;
          height: 3.8rem;
          margin-right: 3.7rem;
          cursor: pointer;

          & img {
              border-radius: 3.8rem;
          }
      }

      &-upload {
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 50%;
        border: 0.2rem solid $gray;
        position: relative;
        margin-right: 3.7rem;
        cursor: pointer;

        & svg {
          width: 2rem;
          height: 2rem;
          margin-top: 0.7rem;
          margin-left: 0.7rem;

          .cls-1 {
            fill: $gray;
          }
        }
      }

      &-notif {
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 50%;
        margin-top: 1.1rem;
        text-align: center;
        background: $gray;
        margin-right: 2rem;
        cursor: pointer;

        @include breakpoint(desktop) {
          margin-top: 0;
          padding-top: 1.1rem;
        }

        & svg {
          width: 1.86rem;
          height: 1.77rem;

          .cls-1 {
            fill: $white;
          }
        }
      }
    }

    & h1 {
      color: $gray;
      @include fontSizeRem(26, 55);
      font-family: 'HelveticaNeue-Thin', sans-serif;
      text-align: center;

      @include breakpoint(desktop) {
        font-family: 'HelveticaNeue-Thin', sans-serif;
        margin-right: 16rem;
      }

      & span {
        font-family: 'HelveticaNeue', sans-serif;
      }
    }

    &__notif {
      width: 2.9rem;
      height: 2.9rem;
      text-align: center;
      padding-top: 0.5rem;
      background: $gray;
      border-radius: 2.9rem;
      
      @include breakpoint(desktop) {
        display: none;
      }
      
      & svg {
        width: 1.9rem;
        height: 1.9rem;

        & .cls-1 {
          fill: $white;
        }
        & .cls-2 {
          fill: $white;
        }
      }
    }
  }
</style>