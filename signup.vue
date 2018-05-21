<template>
  <section class="sign-up">
    <div class="main-wrapper main-wrapper--v1 u-clearfix">
      <div class="sign-up__content">
        <h1>photo<span>gram</span></h1>
        <div class="sign-up__content-form">
          <form @submit.prevent="signUpFormSubmit">
              <div class="c-input">
                <icon name="envelope-o"></icon>
                <input type="text" placeholder="Email" v-model.lazy="email" @blur="$v.email.$touch()">
                <!-- won't work don't know why? -->
                <p class="invalid" v-if="!$v.email.email">incorrect email</p>
                <p class="invalid" v-if="!$v.email.unique">email already exist</p>
              </div>
              <div class="c-input">
                <icon name="lock"></icon>
                <input type="password" placeholder="Password" v-model="password" @blur="$v.password.$touch()">
                <p class="invalid" v-if="$v.password.$error">must be between 6 and 60 characters</p>
              </div>
              <div class="c-input">
                <icon name="lock"></icon>
                <input type="password" placeholder="Confirm Password"  @blur="$v.password_confirmation.$touch()" v-model="password_confirmation">
                <p class="invalid" v-if="$v.password_confirmation.$error">not match</p>
              </div>
              <div class="c-input">
                <icon name="user-o"></icon>
                <input type="text" placeholder="Fullname" v-model="name">
              </div>
              <div class="c-input">
                <icon name="user-o"></icon>
                <input type="text" placeholder="Username" v-model="username">
              </div>
              <p class="sign-up__content-form-terms">I accept to the 
                <!-- put it in router link -->
                <router-link to="/terms">Terms &#38; Privacy Policy</router-link>
              </p>
              <div>
                <p class="invalid" v-if="$v.$error">incorrect input/some field are missing</p>
                <!-- disable this button -->
                <button class="c-btn" :disabled="$v.$invalid" @click="check" type="submit">Sign up</button>
              </div>
              <!-- <p @click="proba">proba</p> -->
              <div class="sign-up__content-form-login">
                <p>Already have an Account?
                  <router-link to="/">LOG IN</router-link>
                </p>
              </div>
              <div class="sign-up__content-form-robot">
                <label>
                  <input type="checkbox" @change="$v.robot.$touch()" v-model="robot">
                  I'm not a robot
                </label>
              </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        username: '',
        robot: false, 
        disabled: true
      }
    },
    validations: {
      email: {
        required,
        email,
        unique: value => {
          if(value === '') return true
          return axios.get('/users/exists?email=' + value)
            .then(response => {
              console.log(response);
              console.log(response.data.data.exists);
              return response.data.data.exists === false;
            })
        }
      },
      password: {
        required,
        minLen: minLength(6),
        maxLen: maxLength(60)
      },
      password_confirmation: {
        sameAs: sameAs(vm => {
          return vm.password
        })
      },
      name: {
        required
      },
      username: {
        required
      },
      robot: {
       required
      }
    },
    methods: {
      signUpFormSubmit() {
        const signUpData = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          name: this.name,
          username: this.username
        }
        console.log(signUpData)
        this.$store.dispatch('signUp', signUpData)

        // axios.post('/auth/signup', signUpData)
        //   .then(response => console.log(response))
        //   .catch(error => console.log(error))
      },
      check() {
        // if($(this).hasClass('c-btn')) {
        //   console.log('proba1');
        // }
        console.log('proba')
      },
      //remove this from html
      // noCopy(e) {
      //   e.preventDefault()
      // }, 
      // //not defined?
      // noPaste(e) {
      //   e.preventDefault()
      // }, 
      proba() {
        // return axios.get('/users/exists?email=' + 'kristina.paunic@diwanee.com')
        // .then(response => console.log(response))
        // .catch(error => console.log(error))
        // var $proba=$('.proba');
        // $proba.click(function(){
        //     console.log('proba')
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/settings/_module-settings.scss";
  
  // .proba {
  //   border: 1px solid red;
  // }
  .sign-up {
    margin-top: 6.4rem;
    color: $gray;

    @include breakpoint(desktop) {
      margin-top: 12rem;
    }
    & h1 {
      font-family: 'HelveticaNeue', sans-serif;
      color: $gray;
      @include fontSizeRem(44, 80);
      margin-bottom: 3.45rem;

      @include breakpoint(desktop) {
        margin-bottom: 15.2rem;
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
        &-terms {
          @include fontSizeRem(10, 16);
          margin-top: -3.3rem;
          margin-bottom: 5rem;
          position: relative;
          z-index: 1;

          @include breakpoint(desktop) {
            margin-top: -3.7rem;
            margin-bottom: 11.5rem;
          }
          & a {
            color: $green;
          }
        }
        &-login {
          text-align: center;
          @include fontSizeRem(10, 20);
          margin-top: 1.7rem;
          margin-bottom: 1.2rem;

          @include breakpoint(desktop) {
            margin-top: 3.6rem;
            margin-bottom: 3.4rem;
          }
          & a {
            color: $green;
          }
        }
        &-robot {
          text-align: center;
          @include fontSizeRem(10, 16);

          & input {
            // -webkit-appearance: none; 
            // -moz-appearance: none;
            height: 1.1rem;
            width: 1.1rem;
            outline: 0;
            border-radius: 0;
            background: none;
            border: 1px solid $gray;
            vertical-align: middle;

            @include breakpoint(desktop) {
              width: 1.4rem;
              height: 1.4rem;
            }
          }
        }
      }
    }
  }
</style>