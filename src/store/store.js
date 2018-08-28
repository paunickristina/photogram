import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../routes.js';
import authentication from './modules/authentication.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    post: {},
    comments: [],
    likes: []
  },
  mutations: {
    getPosts(state, allPosts) {
      state.posts = allPosts
    },
    getPost(state, onePost) {
      state.post = onePost
    },
    getComments(state, allComments) {
      state.comments = allComments
    },
    getLikes(state, allLikes) {
      state.likes = allLikes
    },
    changePost(state, newPost) {
      state.post = newPost
    },
    editPostLikes(state, newLikes) {
      state.post.auth_like_id = newLikes.auth_like_id
      state.post.likes_count = newLikes.likes_count
    },
    editComments(state, newComments) {
      state.post.comments = newComments
    }
  },
  actions: {
    getAllPosts({commit}, allPosts) {
      commit('getPosts', allPosts)
    },
    getOnePost({commit}, onePost) {
      commit('getPost', onePost)
    },
    getAllComments({commit}, allComments) {
      commit('getComments', allComments)
    },
    getAllLikes({commit}, allLikes) {
      commit('getLikes', allLikes)
    },
    changeOnePost({commit}, newPost) {
      commit('changePost', newPost)
    },
    changePostLikes({commit}, newLikes) {
      commit('editPostLikes', newLikes)
    },
    changeComments({commit}, newComments) {
      commit('editComments', newComments)
    }
  }, 
  getters: {
    
  },
  modules: {
    authentication
  }
})