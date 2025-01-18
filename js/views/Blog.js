const { defineComponent } = Vue;
import { BlogService } from '../services/BlogService.js';
import BlogCard from '../components/BlogCard.js';

export default defineComponent({
  name: 'Blog',
  components: {
    BlogCard
  },
  data() {
    return {
      posts: [],
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      this.posts = await BlogService.getAllPosts();
    } catch (error) {
      this.error = 'Failed to load blog posts';
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  template: `
    <div id="colorlib-blog">
      <div class="container">
        <div class="row text-center">
          <h2 class="bold">Blog</h2>
        </div>
        <div class="row" v-if="!loading && !error">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <blog-card :post="post" />
          </div>
        </div>
        <div v-else-if="loading" class="row text-center">
          <p>Loading posts...</p>
        </div>
        <div v-else class="row text-center">
          <p class="text-danger">{{ error }}</p>
        </div>
      </div>
    </div>
  `
})
