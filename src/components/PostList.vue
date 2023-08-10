<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <transition-group name="user-list">
      <post-item
        @remove="$emit('remove', post)"
        v-for="post in posts"
        :post="post"
        :key="post.id"
    /></transition-group>
  </div>
  <h3 v-else style="color: red">Список пуст</h3>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
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
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all .3s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.user-list-move{
  transition: transform 0.4s ease;
}
</style>