<template>
  <section class="p-edit-profile">
      <div class="main-wrapper">
          <app-header :title='title'></app-header>
          <div class="p-edit-profile__img">
            <p>Edit Profile</p>
            <div class="p-edit-profile__img-img">
              <input type="file" ref="file" @change="imageUpload">
              <p>drag and drop</p>
              <img :src="userImage" alt="">
            </div>
            <button @click="submitImage()" class="c-btn c-btn--small c-btn--gray">Change Photo</button>
          </div>
          <div class="p-edit-profile__form">
            <div class="c-input">
              <input type="text" v-model="name" placeholder="Full Name">
            </div>
            <div class="c-input">
              <input type="text" v-model="username" placeholder="User Name">
            </div>
            <div class="c-input">
              <input type="text" v-model="about" placeholder="Something about you">
            </div>
            <div class="c-input">
              <input type="text" v-model="phone" placeholder="Phone number">
            </div>
            <div class="p-edit-profile__form-select">
              <label>Please select one:</label>
              <select v-model="gender_id">
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
            </div>
            <div class="p-edit-profile__form-submit">
              <button class="c-btn c-btn--small" @click="submitForm()">Save</button>
            </div>
          </div>
      </div>
      <app-footer></app-footer>
  </section>
</template>

<script>
    import Header from '../component/header.vue'
    import Footer from '../component/footer.vue'
    import axios from 'axios'
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                title: 'Edit Profile',
                file: '',
                name: '',
                gender_id: null,
                phone: null,
                about: '',
                username: ''
            }
        },
        computed: {
          ...mapState({
            token: state => state.authentication.token,
				    userImage: state => state.authentication.userImage
          }),
        },
        methods: {
          imageUpload() {
            this.file = this.$refs.file.files[0]
          },
          submitImage() {
            let formData = new FormData()
            formData.append('image', this.file)
            axios.post('/users/auth/image', formData,
              {headers: {
                'Authorization': 'Bearer '+ this.token,
                'Content-Type': 'multipart/form-data'
              }}
            )
            .then(response => {
              //console.log(response)
              if (response.status === 200) {
                this.$router.go(-1)
              }
            })
            .catch(error => console.log(error))
          },
          submitForm() {
            let formData = {
              name: this.name,
              gender_id: this.gender_id,
              phone: this.phone,
              about: this.about,
              username: this.username
            }
            axios.patch('/users/auth/update', formData,
              {headers: {'Authorization': 'Bearer '+ this.token}}
            )
            .then(response => {
              //console.log(response)
              if (response.status === 200) {
                this.$router.go(-1)
              }
            })
            .catch(error => console.log(error))
          }
        },
        components: {
            appHeader: Header,
            appFooter: Footer
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/settings/_module-settings.scss";

    .p-edit-profile {

        &__img {
            margin-top: 2rem;
            margin-bottom: 4.4rem;
            text-align: center;

            @include breakpoint(desktop) {
              margin-bottom: 10rem;
            }

            & > p {
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
                border-radius: 50%;
                margin: 2rem auto 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                @include breakpoint(desktop) {
                  width: 22.1rem;
                  height: 22.1rem;
                }

                & input {
                  position: absolute;
                  top: 0%;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  opacity: 0;
                }

                & img {
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }

                & p {
                  @include fontSizeRem(14, 22);
                  color: $gray;
                }
            }
        }

        &__form {
          width: 20.5rem;
          margin: 0 auto;

          @include breakpoint(desktop) {
            width: 58.7rem;
          }

          & .c-input {
            & input {
              padding-left: 0;

              &::-webkit-input-placeholder {
                color: $gray;
                opacity: 0.5;
              }
              &::-moz-placeholder { 
                color: $gray;
                opacity: 0.5;
              }
              &:-moz-placeholder { 
                color: $gray;
                opacity: 0.5;
              }
              &:-ms-input-placeholder { 
                color: $gray;
                opacity: 0.5;
              }
            }
          }

          &-select {
            & label {
              @include fontSizeRem(14, 20);
              color: $lightGray;
              display: block;
              margin-bottom: 1.6rem;

              @include breakpoint(desktop) {
                margin-bottom: 2rem;
              }
            }

            & select {
               width: 100%;
               margin-bottom: 4.75rem;
               border-radius: 0;
               border-color: $gray;
               background: transparent;
               color: $lightGray;

               @include breakpoint(desktop) {
                 margin-bottom: 7.1rem;
                 border-radius: 0;
               }
            }
          }

          &-submit {
            text-align: right;

            & .c-btn {
              background: $gray;
            }
          }
        }
    }
</style>
