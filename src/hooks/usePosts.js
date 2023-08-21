import { ref } from "vue";

export function usePosts(){
  const post = ref([]);
  try {
    this.isPostLoading = true;
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: { _limit: this.limit, _page: this.page },
      }
    );
    this.totalPage = Math.ceil(
      response.headers["x-total-count"] / this.limit
    );
    this.posts = response.data;
  } catch (error) {
    alert("Ошибка");
  } finally {
    this.isPostLoading = false;
  }
}