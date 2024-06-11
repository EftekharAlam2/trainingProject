<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import moment from 'moment';

const formData = ref({
    title: '',
    content: ''
})

const props = defineProps(['postCount']);
const postCount = ref(props.postCount);

const emit = defineEmits('submitData');

function submitData(){
  const post = {
    id: postCount.value + 1,
    title: formData.value.title,
    content: formData.value.content,
    likes: 0,
    comments: [],
    showing: false,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  };
 
  formData.value.title = '';
  formData.value.content = '';

  emit('submitData', post);
}
</script>

<template>
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
</template>
