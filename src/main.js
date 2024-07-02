import 'bootstrap/dist/css/bootstrap.css'
import '@popperjs/core'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createStore } from 'vuex'

const app = createApp(App)

app.use(router)

const store = createStore({
    // state() {
    //     return {
    //         userName: 'Eftekhar'
    //     }
    // },
    state: {
        userName: 'Eftekhar',
        posts: [
            {
                id: 1,
                title: 'Post 1',
                content:
                    'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
                likes: 0,
                comments: [],
                date: '2024-05-24 11:00:00',
                commentFormData: '',
                showCommentSection: false
            },
            {
                id: 2,
                title: 'Post 2',
                content:
                    'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
                likes: 0,
                comments: [],
                date: '2024-05-24 11:00:00',
                commentFormData: '',
                showCommentSection: false
            },
            {
                id: 3,
                title: 'Post 3',
                content:
                    'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
                likes: 0,
                comments: [],
                date: '2024-05-24 11:00:00',
                commentFormData: '',
                showCommentSection: false
            }
        ]
    },
    getters: {
        getPosts(state){
            return state.posts;
        }
    }
})

app.use(store);
app.provide('userName', 'Eftekhar Alam')

app.mount('#app')
