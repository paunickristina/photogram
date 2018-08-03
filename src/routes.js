import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store.js'

//lazy loading
const LogInPage = resolve => {
	require.ensure(['./components/auth/login.vue'], () => {
		resolve(require('./components/auth/login.vue'))
	})
}
const SignUpPage = resolve => {
	require.ensure(['./components/auth/signup.vue'], () => {
		resolve(require('./components/auth/signup.vue'))
	})
}
const RecoveryPage = resolve => {
	require.ensure(['./components/auth/recovery.vue'], () => {
		resolve(require('./components/auth/recovery.vue'))
	})
}
const ResetPage = resolve => {
	require.ensure(['./components/auth/reset.vue'], () => {
		resolve(require('./components/auth/reset.vue'))
	})
}
const Homepage = resolve => {
	require.ensure(['./components/pages/homepage.vue'], () => {
		resolve(require('./components/pages/homepage.vue'))
	})
}
const Terms = resolve => {
	require.ensure(['./components/pages/terms.vue'], () => {
		resolve(require('./components/pages/terms.vue'))
	})
}
const User = resolve => {
	require.ensure(['./components/component/user.vue'], () => {
		resolve(require('./components/component/user.vue'))
	})
}
const EditProfile = resolve => {
	require.ensure(['./components/pages/editProfile.vue'], () => {
		resolve(require('./components/pages/editProfile.vue'))
	})
}
const EditPost = resolve => {
	require.ensure(['./components/component/editPost.vue'], () => {
		resolve(require('./components/component/editPost.vue'))
	})
}
const Photo = resolve => {
	require.ensure(['./components/component/photo.vue'], () => {
		resolve(require('./components/component/photo.vue'))
	})
}
const Comments = resolve => {
	require.ensure(['./components/component/comments.vue'], () => {
		resolve(require('./components/component/comments.vue'))
	})
}
const Likes = resolve => {
	require.ensure(['./components/component/likes.vue'], () => {
		resolve(require('./components/component/likes.vue'))
	})
}
const Search = resolve => {
	require.ensure(['./components/component/search.vue'], () => {
		resolve(require('./components/component/search.vue'))
	})
}
const Notification = resolve => {
	require.ensure(['./components/component/notification.vue'], () => {
		resolve(require('./components/component/notification.vue'))
	})
}


Vue.use(VueRouter)

const routes = [
	{path: '*', redirect: '/homepage'},
	{path: '/', redirect: '/homepage'},
	{path: '/login', component: LogInPage, name: 'logIn',
		beforeEnter(to, from, next) {
			if(!store.getters.isAuthenticated && !localStorage.getItem('token')) {
				next()
			}
			else {
				next('/homepage')
			}
		},
	},
	{path: '/signup', component: SignUpPage, name: 'signUp',
		beforeEnter(to, from, next) {
			if(!store.getters.isAuthenticated && !localStorage.getItem('token')) {
				next()
			}
			else {
				next('/homepage')
			}
		},
	},
	{path: '/recovery', component: RecoveryPage, name: 'recovery'},
	{path: '/reset', component: ResetPage, name: 'reset'},
	{path: '/terms', component: Terms, name: 'terms'},
	{path: '/homepage', component: Homepage, name: 'homepage',
		beforeEnter(to, from, next) {
			if(store.getters.isAuthenticated || localStorage.getItem('token')) {
				next()
			}
			else {
				next('/login')
			}
		},
		children: [
			{path: '/photo/:post_id', component: Photo, name: 'photo', props: true},
			{path: '/comments/:post_id', component: Comments, name: 'comments', props: true},
			{path: '/likes/:post_id', component: Likes, name: 'likes', props: true},
			{path: '/edit-post/:post_id', component: EditPost, name: 'editPost', props: true}
		]
	},
	{path: '/user/:user_id', component: User, name: 'user', props: true,
		beforeEnter(to, from, next) {
			if(store.getters.isAuthenticated || localStorage.getItem('token')) {
				next()
			}
			else {
				next('/login')
			}
		},
	},
	{path: '/edit-profile', component: EditProfile, name: 'editProfile',
		beforeEnter(to, from, next) {
			if(store.getters.isAuthenticated || localStorage.getItem('token')) {
				next()
			}
			else {
				next('/login')
			}
		},
	},
	{path: '/search', component: Search, name: 'search',
		beforeEnter(to, from, next) {
			if(store.getters.isAuthenticated || localStorage.getItem('token')) {
				next()
			}
			else {
				next('/login')
			}
		},
	},
	{path: '/notification', component: Notification, name: 'notification',
		beforeEnter(to, from, next) {
			if(store.getters.isAuthenticated || localStorage.getItem('token')) {
				next()
			}
			else {
				next('/login')
			}
		},
	}
]

export default new VueRouter({
	routes,
	mode: 'history'
})