<script setup>
import { ref, computed, watch, provide } from 'vue'
import moment from 'moment'
import Posts from './components/Posts.vue'
import CreatePost from './components/CreatePost.vue';
import LayoutContent from './components/LayoutContent.vue';
import { useStore } from 'vuex';

const store = useStore();

// const posts = ref(store.state.posts);
const posts = ref(store.getters.getPosts);

const firstName = 'John'
const lastName = 'Doe'

const userName = computed(() => {
  return firstName + ' ' + lastName
})
// const userName = ref('Asif Mallik');

function increaseLikeCount(index) {
  posts.value[index].likes++
}

function deletePost(index) {
  posts.value.splice(index, 1)
}

// function postCreate(event) {
//   event.preventDefault();
function postCreate(post) {
  posts.value.push(post);
}

function addComment(index) {
  posts.value[index].comments.push({
    id: posts.value[index].comments.length + 1,
    userName: userName.value,
    content: posts.value[index].commentFormData,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  })

  posts.value[index].commentFormData = ''
  posts.value[index].showCommentSection = true
}

function deleteComment(postIndex, commentIndex) {
  posts.value[postIndex].comments.splice(commentIndex, 1)
}

watch(
  () => posts.value.length,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      alert('A new post has been created!')
    }
  },
  { immediate: true }
)

watch(
  () => posts.value,
  () => {
    posts.value.forEach((post) => {
      if (post.likes === 10 && !post.likeConfirmation) {
        post.likeConfirmation = true
        alert('A post has reached 10 likes!')
      }
    })
  },
  { deep: true }
)

provide('posts', posts);

const currentComp = ref('posts');
</script>

<template>
  <LayoutContent :userName="userName" @changeComp="(comp) => currentComp = comp" :currentComp="currentComp">
    <CreatePost v-if="currentComp == 'create-post'" @postCreate="postCreate" :postCount="posts.length"
      class="bg-light p-4" style="border-radius: 5px;" />
    <Posts v-else-if="currentComp == 'posts'" @increaseLikeCount="increaseLikeCount" @deletePost="deletePost"
      @addComment="addComment" @deleteComment="deleteComment" />
  </LayoutContent>
</template>

<style>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>
