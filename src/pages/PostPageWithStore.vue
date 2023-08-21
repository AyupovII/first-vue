<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пользователя</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOption"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <post-pagination
      :totalPage="totalPage"
      :page="page"
      @changePage="changePage"
    />
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
// import PostPagination from "./components/PostPagination.vue";
export default {
  components: {
    PostForm,
    PostList,
    // PostPagination,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "posts/setPage",
      setSearchQuery: "posts/setSearchQuery",
      setSelectedSort: "posts/setSelectedSort",
    }),

    ...mapActions({
      loadMorePosts: "posts/loadMorePosts",
      fetchPosts: "posts/fetchPosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {},
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      isPostLoading: (state) => state.posts.isPostLoading,
      selectedSort: (state) => state.posts.selectedSort,
      page: (state) => state.posts.page,
      limit: (state) => state.posts.limit,
      totalPage: (state) => state.posts.totalPage,
      sortOption: (state) => state.posts.sortOption,
      searchQuery: (state) => state.posts.searchQuery,
    }),
    ...mapGetters({
      sortedPosts: "posts/sortedPosts",
      sortedAndSearchPosts: "posts/sortedAndSearchPosts",
    }),
  },
};
</script>
<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.observer {
  height: 30px;
  background: green;
}
</style>
