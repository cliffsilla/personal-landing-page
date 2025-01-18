const { defineComponent } = Vue;
import { BlogService } from '../services/BlogService.js';

export default defineComponent({
  name: 'BlogPost',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      post: null,
      loading: true,
      error: null
    }
  },
  computed: {
    htmlContent() {
      return this.post ? marked.parse(this.post.content) : '';
    }
  },
  async created() {
    try {
      this.post = await BlogService.getPost(this.id);
      if (!this.post) {
        this.error = 'Post not found';
      }
    } catch (error) {
      this.error = 'Failed to load blog post';
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  template: `
    <div id="colorlib-blog">
      <div class="container">
        <div v-if="!loading && post">
          <div class="row text-center">
            <h2 class="bold">{{ post.title }}</h2>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <div class="blog-post">
                <span class="meta">{{ post.date }} | {{ post.author }}</span>
                <img v-if="post.image" :src="post.image" class="img-responsive" :alt="post.title">
                <div class="blog-content" v-html="htmlContent"></div>
                <div class="blog-meta">
                  <span class="category">{{ post.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="loading" class="row text-center">
          <p>Loading post...</p>
        </div>
        <div v-else class="row text-center">
          <p class="text-danger">{{ error }}</p>
          <router-link to="/blog" class="btn btn-primary">Back to Blog</router-link>
        </div>
      </div>
    </div>
  `
})
