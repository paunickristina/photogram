<template>
  <section class="log-in">
    <div class="main-wrapper main-wrapper--v1 u-clearfix">
      <div class="log-in__content">
        <h1>photo<span>gram</span></h1>
        <div class="log-in__content-form">
          <form @submit.prevent="logInFormSubmit">
            <div class="c-input">
              <icon name="envelope-o"></icon>
              <input type="text" placeholder="Email" @blur="$v.email.$touch()" v-model="email">
              <p v-if="$v.email.$error" class="invalid">incorrect email</p>
            </div>
            <div class="c-input">
              <icon name="lock"></icon>
              <input type="password" placeholder="Password" @blur="$v.password.$touch()" v-model="password">
              <p class="invalid" v-if="$v.password.$error">incorrect password</p>
            </div>
            <!-- <p class="invalid">email/username or password are incorrect</p> -->
            <div class="log-in__content-form-pass">
              <router-link to="/recovery">Forgot Password?</router-link>
            </div>
            <div>
                <button class="c-btn" type="submit">Log in</button>
            </div>
              <div class="log-in__content-form-signup">
              <p>Don't have an account?
                <router-link to="/signup">SIGN UP</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        email: 'kristina.paunic@diwanee.com',
        password: 'kristina'
      }
    },
    validations: {
      email: {
        required,
        email,
        exists: value => {
          if(value === '') return false
          return axios.get('/users/exists?email=' + value)
            .then(response => {
              console.log(response);
              console.log(response.data.data.exists);
              return response.data.data.exists === true;
            })
        }
      },
      password: {
        required
        //check if exists
      }
    },
    methods: {
      logInFormSubmit() {
        const logInData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('logIn', logInData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";

  .log-in {
    padding-top: 6.7rem;
    background: url(../../assets/images/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100vh;

    @include breakpoint(desktop) {
      padding-top: 11.8rem;
    }

    & h1 {
      color: $white;
      @include fontSizeRem(44, 80);
      margin-bottom: 10.4rem;
      font-family: 'HelveticaNeue', sans-serif;

      @include breakpoint(desktop) {
        margin-bottom: 26.2rem;
      }

      & span {
        font-family: 'HelveticaNeue-Thin', sans-serif;
      }
    }
    &__content {
      margin: 0 auto;
      width: 20.6rem;

      @include breakpoint(desktop) {
        width: 35.7rem;
      }
      &-form {
        & .c-input {
          & input {
            color: $white;
            border-bottom: 1px solid $white;

            &::-webkit-input-placeholder { 
                color: $white;
            }
            &::-moz-placeholder { 
                color: $white;
                opacity: 1; 
            }
            &:-moz-placeholder { 
                color: $white;
                opacity: 1;
            }
            &:-ms-input-placeholder { 
                color: $white;
            }
          }
          & svg {
            fill: $white;
          }
        }
        &-pass {
          @include fontSizeRem(10, 16);
          margin-top: -1.5rem;
          margin-bottom: 10.6rem;

          @include breakpoint(desktop) {
            margin-top: -5.3rem;
            margin-bottom: 25.2rem;
          }
          & a {
            color: $white;
          }
        }
        & .c-btn {
          padding-left: 7.9rem;
          padding-right: 7.9rem;

          @include breakpoint(desktop) {
            padding-left: 14rem;
            padding-right: 14rem;
          }
        }
        &-signup {
          color: $white;
          text-align: center;
          @include fontSizeRem(10, 20);
          margin-top: 2rem;

          @include breakpoint(desktop) {
            margin-top: 3.8rem;
          }
          & a {
            color: $green;
          }
        }
      }
    }
  } 
</style>