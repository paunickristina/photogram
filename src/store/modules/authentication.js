import router from '../../routes.js';
import axios from 'axios';

const state = {
    token: null,
    userId: null,
    userImage: ''
}
const mutations = {
    authUser(state, userData) {
        state.token = userData.token
        state.userId = userData.userId
        state.userImage = userData.userImage
    },
    clearAuthData(state) {
        state.token = null
        state.userId = null
        state.userImage = ''
    }
}
const actions = {
    signUp({commit}, authData) {
        axios.post('/auth/signup', authData)
            .then(response => {
                console.log(response)
                commit('authUser', {
                    token: response.data.token,
                    userId: response.data.data.id,
                    userImage: 'http://54.37.227.57/storage/' + response.data.data.image.profile
                })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.data.id)
                localStorage.setItem('userImage', 'http://54.37.227.57/storage/' + response.data.data.image.profile)
            })
            .catch(error => console.log(error))
    },
    logIn({commit}, authData) {
        axios.post('/auth/login', authData)
            .then(response => {
                if (response.status === 200){
                    commit('authUser', {
                        token: response.data.token,
                        userId: response.data.data.id,
                        userImage: 'http://54.37.227.57/storage/' + response.data.data.image.profile
                    })
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('userId', response.data.data.id)
                    localStorage.setItem('userImage', 'http://54.37.227.57/storage/' + response.data.data.image.profile)
                    
                    router.replace('/homepage')
                }
            })
            .catch(error => console.log(error))
    },
    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const userImage = localStorage.getItem('userImage')
        if(!token) {
            return
        }
        commit('authUser', {
            token: token,
            userId: userId,
            userImage: userImage
        })
    },
    logOut({commit}) {
        commit('clearAuthData')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userImage')
        router.replace('/login')
    }
}
const getters = {
    // isAuthenticated(state) {
    //     return state.token
    // },
    // authenticatedUser(state) {
    //     return state.userId
    // },
    // authUserImage(state) {
    //     return state.userImage
    // }
}
export default {
    state,
    mutations, 
    actions,
    getters
}