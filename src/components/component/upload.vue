<template>
  <div class="p-upload">
    <app-header :title="title" v-if="breakpoint"></app-header>
    <div class="p-upload__file">
			<div class="p-upload__file-wrap">
				<div class="p-upload__file-close" @click="$router.go(-1)">
					<icon name="times"></icon>
				</div>
				<h3>Upload Photo</h3>
				<div class="p-upload__file-dropbox">
					<input type="file" accept="video/*,image/*" id="file" ref="file" @change="fileUpload">
          <div class="p-upload__file-dropbox-preview">
            <div v-if="showImgPreview" class="p-upload__file-dropbox-preview-img">
              <img :src="filePreview"/>
            </div>
            <div v-if="showVideoPreview" class="p-upload__file-dropbox-preview-video">
              <video controls>
                <source :src="filePreview" type="video/mp4">
                <source :src="filePreview" type="video/webm">
                <source :src="filePreview" type="video/ogg">
              </video>
            </div>
          </div>
					<div class="p-upload__file-dropbox-mark">
						<svg viewBox="0 0 395.104 395.104">
							<g id="Layer_5_85_">
								<path d="M360.693,198.729c1.373-6.779,2.1-13.794,2.1-20.979c0-58.085-47.088-105.173-105.174-105.173
									c-43.075,0-80.082,25.91-96.342,62.984c-12.494-8.139-27.381-12.912-43.403-12.912c-42.125,0-76.526,32.714-79.396,74.109
									C15.79,207.169,0,230.028,0,256.626c0,36.396,29.506,65.902,65.902,65.902c0,0,71.396,0,95.194,0
									c4.667,0,4.894-5.179,4.894-5.179v-42.28c0-3.612-2.955-6.567-6.568-6.567h-18.007c-3.612,0-4.809-2.375-2.658-5.276
									l54.887-74.094c2.15-2.902,5.668-2.902,7.818,0l54.886,74.094c2.148,2.901,0.953,5.276-2.657,5.276h-18.009
									c-3.61,0-6.567,2.955-6.567,6.567v42.364c0,0,0.274,5.095,5.108,5.095c23.746,0,94.979,0,94.979,0
									c36.396,0,65.902-29.506,65.902-65.902C395.104,231.639,381.191,209.901,360.693,198.729z"/>
							</g>
						</svg>
					</div>
					<p>drag and drop</p>
				</div>
				<div class="p-upload__file-btn">
					<button class="c-btn c-btn--small" @click="submitFile()">Upload</button>
				</div>
				<div class="p-upload__file-field">
					<input type="text" v-model="description" placeholder="Add Description">
				</div>
			</div>
    </div> <!-- end .p-upload__file -->
  </div> <!--  end .p-upload -->
</template>

<script>
	import Header from './header.vue'
	import axios from 'axios'
	import { mapState } from 'vuex'
	import { breakpoint } from '../../functions.js'

	export default {
		data() {
			return {
				title: 'Upload',
				file: '',
        description: '',
        showImgPreview: false,
        showVideoPreview: false,
        filePreview: ''
			}
		},
		computed: {
			...mapState({
        token: state => state.authentication.token
      }),
			breakpoint
		},
		methods: {
			fileUpload() {
        this.file = this.$refs.file.files[0]
        let fileType = this.file.type
        let imgTypes = ['image/jpeg', 'image/jpg', 'image/bmp', 'image/gif', 'image/png']
        let videoTypes = ['video/mp4', 'video/webm', 'video/ogg']
        let reader = new FileReader()

        reader.addEventListener('load', function(){
          if($.inArray(fileType, imgTypes) !== -1) {
            this.showImgPreview = true
          }
          else if($.inArray(fileType, videoTypes) !== -1) {
            this.showVideoPreview = true
          }
          this.filePreview = reader.result
        }.bind(this), false)
        
        if(this.file) {
          if($.inArray(fileType, imgTypes) !== -1) {
            reader.readAsDataURL(this.file)
          }
          else if($.inArray(fileType, videoTypes) !== -1) {
            reader.readAsDataURL(this.file)
          }
        }
			},
			submitFile() {
        let fileType = this.file.type
        let imgTypes = ['image/jpeg', 'image/jpg', 'image/bmp', 'image/gif', 'image/png']
        let videoTypes = ['video/mp4', 'video/webm', 'video/ogg']
        let formData = new FormData()

				if(this.file){
          if($.inArray(fileType, imgTypes) !== -1) {
            formData.append('image', this.file)
				    formData.append('video', '')
          }
          else if($.inArray(fileType, videoTypes) !== -1) {
            formData.append('image', '')
				    formData.append('video', this.file)
          }
				}
				formData.append('thumbnail', '')
        formData.append('description', this.description)
        
        axios.post('/posts', formData,
          {headers: {
						'Authorization': 'Bearer '+ this.token,
						'Content-Type': 'multipart/form-data'
					}}
        )
        .then(response => {
          console.log(response)
					if (response.status === 201) {
						this.$router.go(-1)
					}
        })
        .catch(error => console.log(error))
			}
		},
		created() {
			if(this.breakpoint === false) {
				$('body').css({'overflow':'hidden', 'padding-right':'15px'})
			}
		},
		destroyed() {
			if(this.breakpoint === false) {
				$('body').css({'overflow':'visible', 'padding-right':'0'})
			}
		},
		components: {
			appHeader: Header
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/settings/_module-settings.scss";

	.p-upload {
		@include breakpoint(desktop) {
			position: fixed;
			top: 8rem;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(35, 36, 41, 0.95);
			z-index: 1;
		}

		&__file {
			margin-top: 2.8rem;

			@include breakpoint(desktop) {
				margin-top: 9.5rem;
			}

			&-wrap {
				@include breakpoint(desktop) {
					width: 50rem;
					margin: 0 auto;
					position: relative;
				}
			}

			&-close {
				display: none;

				@include breakpoint(desktop) {
					display: block;
					position: absolute;
					top: -2rem;
					right: -2rem;
					cursor: pointer;
				}

				& .fa-icon {
					fill: $white;
				}
			}

			& h3 {
				display: none;

				@include breakpoint(desktop) {
					display: block;
					text-align: center;
					color: $white;
					@include fontSizeRem(0, 26);
					font-family: 'HelveticaNeue-Thin', sans-serif;
					margin-bottom: 5.7rem;
				}
			}

			&-dropbox {
				position: relative;
				background: $gray;
				height: 32rem;
				margin-bottom: 1.8rem;
				display: flex;
				justify-content: center;
				align-items: center;

				@include breakpoint(desktop) {
					background: $white;
					height: 50rem;
					margin-bottom: 3.5rem;
					display: block;
					text-align: center;
				}

				& input {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					cursor: pointer;
				}

        &-preview {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;

          &-img {
            pointer-events: auto;

            & img {
              width: 32rem;
              height: 32rem;
              object-fit: cover;
              
              @include breakpoint(desktop) {
                width: 50rem;
                height: 50rem;
              }
            }
          }

          &-video {
            display: flex;
            align-items: center;
            height: 100%;
            pointer-events: auto;

            & video {
              width: 100%;
            }
          }
        }

				&-mark {
					width: 4.4rem;

					@include breakpoint(desktop) {
						width: 7rem;
						margin: 0 auto;
						padding-top: 22.2rem;
					}

					& svg {
						width: 100%;
						fill: $white;

						@include breakpoint(desktop) {
							fill: $black;
						}
					}
				}

				& p {
					display: none;

					@include breakpoint(desktop) {
						display: block;
						font-family: 'HelveticaNeue', sans-serif;
						@include fontSizeRem(0, 16);
						color: $gray;
						opacity: 0.5;
						cursor: pointer;
						pointer-events: none;
					}
				}
			}

			&-btn {
				text-align: center;

				@include breakpoint(desktop) {
					margin-bottom: 3rem;
				}

				& .c-btn {
					background: $gray;
					padding-left: 1.1rem;
					padding-right: 1.1rem;
					
					@include breakpoint(desktop) {
						background: $white;
						color: $gray;
					}
				}
			}

			&-field {
        width: 100%;
				height: 4.3rem;
				padding: 1rem;
        position: fixed;
        left: 0;
        bottom: 4.2rem;
				border-top: 0.1rem solid rgba(149, 152, 154, 0.5);
				background: $white;

				@include breakpoint(desktop) {
					position: static;
					height: 4.5rem;
					padding: 1rem 0.6rem;
				}
				
				& input {
					width: 100%;
					padding-left: 0.5rem;
					@include fontSizeRem(16, 16);
					-webkit-appearance: none; 
					-moz-appearance: none;
					border: none;
					background: transparent;
					
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
		}
	}
</style>