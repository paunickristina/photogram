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
    }
  }, 
  getters: {

  },
  modules: {
    authentication
  }
})