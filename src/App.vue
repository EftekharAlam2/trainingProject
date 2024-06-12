<script setup>
import { ref, computed, watch } from 'vue';
import moment from 'moment';
import Posts from './components/Posts.vue';
import CreatePost from './components/CreatePost.vue';
import LayoutContent from './components/LayoutContent.vue';

const posts = ref([
  {
    id: 1,
    title: 'Post 1',
    content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    likes: 0,
    comments: [],
    showing: true,
    date: '2024-05-24 11:00:00'
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    likes: 0,
    comments: [],
    showing: true,
    date: '2024-05-24 11:00:00'
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    likes: 0,
    comments: [],
    showing: true,
    date: '2024-05-24 11:00:00'
  }
]);

const firstName = "Eftekhar";
const lastName = "Alam";
const userName = computed(() => {
  return firstName + " " + lastName;
})
// const userName = ref('Eftekhar Alam');

function likeCount(index){
  posts.value[index].likes++;
}

function deleteC(index){
  posts.value.splice(index, 1);
}

function submitData(post){
  posts.value.push(post);
}

const commentInputs = ref(posts.value.map(() => ''));

function submitComment(index){
  posts.value[index].comments.push({
    id: posts.value[index].comments.length + 1,
    user: userName.value,
    comment: commentInputs.value[index],
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  });

  commentInputs.value[index] = '';
}

function deleteComment(index, count){
  posts.value[index].comments.splice(count, 1);
}

function showingComments(index){
  posts.value[index].showing = !posts.value[index].showing;
}

watch(
  () => posts.value.length,
  (newValue, oldValue) => {
    if(newValue > oldValue){
      alert('A new post has been created');
    }
  },
  { immediate: true }
)

watch(
  () => posts.value,
  () => {
    posts.value.forEach(post => {
      if(post.likes === 10 && !post.likeConfirmation){
        post.likeConfirmation = true;
        alert('This post has been reached 10 likes');
      }
    })
  },
  { deep: true}
)

watch(
  () => posts.value.map(post => post.comments.length),
  (newComments, oldComments) => {
    posts.value.forEach((post, index) => {
      if (newComments[index] === 3 && !post.commentsConfirmation) {
        post.commentsConfirmation = true;
        alert('Congratulations!! You have got three comments.');
      }
    });
  },
  { deep: true }
);
``

</script>

<template>
  <LayoutContent :userName="userName">
    <CreatePost @submitData="submitData" :postCount="posts.length" />

    <Posts :posts="posts"
      :commentInputs="commentInputs"
      @likeCount="likeCount"
      @submitComment="submitComment"
      @deleteComment="deleteComment"
      @deleteC="deleteC"
      @showingComments="showingComments"
    />
  </LayoutContent>  
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>
