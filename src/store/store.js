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
      state.post = newPost.post
    },
    editPostLikes(state, newLikes) {
      state.posts[newLikes.i].auth_like_id = newLikes.auth_like_id,
      state.posts[newLikes.i].likes_count = newLikes.likes_count,
      state.post.auth_like_id = newLikes.auth_like_id
      state.post.likes_count = newLikes.likes_count
    },
    editPostComments(state, newComments) {
      state.posts[newComments.i].comments = newComments.comments
      state.post.comments = newComments.comments
    },
    editPostsLikes(state, newLikes) {
      state.posts[newLikes.i].auth_like_id = newLikes.auth_like_id
      state.posts[newLikes.i].likes_count = newLikes.likes_count
    },
    editPostsComments(state, newComments) {
      state.posts[newComments.i].comments = newComments.comments
    },
    deletePost(state, newPosts) {
      state.posts = newPosts.posts
    },
    editComments(state, newComments) {
      state.comments = newComments.comments
      state.posts[newComments.i].comments.unshift(newComments.comment)
      state.posts[newComments.i].comments_count++
    },
    deleteComment(state, newComments) {
      state.comments = newComments.comments
      state.posts[newComments.i].comments = newComments.comments
      state.posts[newComments.i].comments_count--
    },
    editCommentsLikes(state, newLikes) {
      state.comments[newLikes.i].auth_like_id = newLikes.auth_like_id
      state.comments[newLikes.i].likes_count = newLikes.likes_count
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
    changePostComments({commit}, newComments) {
      commit('editPostComments', newComments)
    },
    changePostsLikes({commit}, newLikes) {
      commit('editPostsLikes', newLikes)
    },
    changePostsComments({commit}, newComments) {
      commit('editPostsComments', newComments)
    },
    deleteOnePost({commit}, newPosts) {
      commit('deletePost', newPosts)
    },
    changeComments({commit}, newComments) {
      commit('editComments', newComments)
    },
    deleteOneComment({commit}, newComments) {
      commit('deleteComment', newComments)
    },
    changeCommentLikes({commit}, newLikes) {
      commit('editCommentsLikes', newLikes)
    }
  }, 
  getters: {
    
  },
  modules: {
    authentication
  }
})