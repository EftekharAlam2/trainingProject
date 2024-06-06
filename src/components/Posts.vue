<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue';
import moment from 'moment';
import Comments from './Comments.vue'

const props = defineProps(['posts', 'commentInputs']);
const posts = ref(props.posts);
const commentInputs = ref(props.commentInputs);

const reversePosts = computed(() => {
  return [...posts.value].reverse();
})

const emit = defineEmits({
    'likeCount': null,
    'submitComment': null,
    'deleteComment': null,
    'deleteC': null,
    'showingComments': null
})

</script>

<template>
    <div class="posts mt-4">
        <div class="container">
        <div class="nav nav-tabs mb-4">
            <h3>Posts <span :class="{ 'text-danger' :  posts.length <= 0 }">{{ posts.length }}</span></h3>
        </div>

        <div class="row">
            <div class="col-md-4" v-for="(post, index) in reversePosts" :key="post.id">
            <div class="card mb-4">
                <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ moment(post.date).fromNow() }}</h6>
                <p class="card-text"> {{post.content}} </p>
                <p class="card-text">
                    <span :style="{ color: post.likes >= 10 ? 'green' : 'black' }">
                    <small v-if="post.likes>1"> {{post.likes}} likes</small>
                    <small v-else-if="post.likes==1">{{post.likes}} like</small>
                    <small v-else>No Like</small>
                    </span>
                    <span @click="emit('showingComments', (reversePosts.length - (index+1)))">
                    <small v-if="post.comments.length>1">, {{ post.comments.length }} comments</small>
                    <small v-else-if="post.comments.length==1">, {{ post.comments.length }} comment</small>
                    <small v-else>, No Comment</small>
                    </span>
                </p>

                <Comments 
                    :post="post"
                    :index="reversePosts.length - (index + 1)"
                    :commentInputs="commentInputs"
                    @submitComment="(...args) => emit('submitComment', ...args)"
  @deleteComment="(...args) => emit('deleteComment', ...args)"
                />

                <button class="btn btn-sm btn-primary" @click="emit('likeCount', (reversePosts.length - (index+1)))">Like</button>
                <button class="btn btn-sm btn-danger float-end" @click="emit('deleteC', (reversePosts.length - (index+1)))"><i class="bi bi-trash"></i></button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>