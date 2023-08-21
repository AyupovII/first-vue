import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
    isPostLoading: false,
    selectedSort: "",
    page: 1,
    limit: 10,
    totalPage: 0,
    sortOption: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По содержимому" },
    ],
    searchQuery: ""
  }),
  getters: {
    sortedPost(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchPosts(state, getters) {
      return getters.sortedPost.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isPostLoading = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPage) {
      state.totalPage = totalPage
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit(`setLoading`, true)
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: { _limit: state.limit, _page: state.page },
          }
        );
        commit('setTotalPages', Math.ceil(
          response.headers["x-total-count"] / state.limit
        ));
        commit('setPosts', response.data);
      } catch (error) {
        console.log(error);
        alert("Ошибка");
      } finally {
        commit('setLoading', false)

      }
    },
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1)
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: { _limit: state.limit, _page: state.page },
          }
        );
        commit('setTotalPages', Math.ceil(
          response.headers["x-total-count"] / state.limit
        ))
        commit('setPosts', [...state.posts, ...response.data])
      } catch (error) {
        console.log(error);

        alert("Ошибка");
      }
    }
  },
    namespaced: true
}