<script setup>
import { ref, computed, watch } from 'vue';
import moment from 'moment';
import Posts from './components/Posts.vue';

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

const formData = ref({
  title: '',
  content: ''
})

function submitData(){
  posts.value.push({
    id: posts.value.length + 1,
    title: formData.value.title,
    content: formData.value.content,
    likes: 0,
    comments: [],
    showing: false,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  });
 
  formData.value.title = '';
  formData.value.content = '';
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

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">BAT Blog</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{userName}}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create a New Post</h5>
            <form @submit.prevent="submitData()">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" placeholder="Enter the title" v-model="formData.title">
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea class="form-control" id="content" rows="3" placeholder="Enter the content" v-model="formData.content"></textarea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Posts :posts="posts"
    :commentInputs="commentInputs"
    @likeCount="likeCount"
    @submitComment="submitComment"
    @deleteComment="deleteComment"
    @deleteC="deleteC"
    @showingComments="showingComments"
   />
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
</style>
