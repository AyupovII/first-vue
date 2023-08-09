<template>
  <div v-if="posts.length > 0" >
    <h3>Список пользователей</h3>
    <post-item @remove="$emit('remove', post)" v-for="post in posts" :post="post" :key="post.id" />
  </div>
  <h3 v-else style="color: red">Список пуст</h3>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>

</style>