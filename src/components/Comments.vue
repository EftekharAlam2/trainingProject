<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import moment from 'moment';

const props = defineProps(['post', 'commentInputs', 'index']);
const post = ref(props.post);
const commentInputs = ref(props.commentInputs);
const index = ref(props.index);

const emit = defineEmits({
    'submitComment': null,
    'deleteComment': null,
})

</script>

<template>
    <div class="comments mb-3">
        <div class="comments-input d-flex mb-3">
        <input type="text" class="form-control form-control-sm me-2" placeholder="Write Comment" v-model="commentInputs[index]">
        <button class="btn btn-sm btn-success" @click="emit('submitComment', index)"><i class="bi bi-send"></i></button>
        </div>

        <div v-if="post.showing">
        <div class="comment mb-3 ms-3" v-for="(comment, count) in [...post.comments].reverse()" :key="comment.id">
            <h6 class="card-title small"> {{comment.user}} <span class="text-danger float-end cursor-pointer" @click="emit('deleteComment', index, post.comments.length - 1 - count)">X</span></h6>
            <p class="card-subtitle mb-1 text-body-secondary small"> {{moment(comment.date).fromNow()}} </p>
            <p class="card-text small"> {{comment.comment}} </p>
        </div>
        </div>
    </div>
</template>
