const { defineComponent } = Vue;
import { SearchService } from '../services/SearchService.js';
import BlogCard from '../components/BlogCard.js';

export default defineComponent({
  name: 'SearchResults',
  components: {
    BlogCard
  },
  data() {
    return {
      results: null,
      isSearching: false,
      error: null,
      query: ''
    }
  },
  async created() {
    this.query = this.$route.query.q;
    if (this.query) {
      await this.performSearch();
    }
  },
  methods: {
    async performSearch() {
      this.isSearching = true;
      this.error = null;
      
      try {
        this.results = await SearchService.search(this.query);
      } catch (error) {
        this.error = 'Error performing search';
        console.error(error);
      } finally {
        this.isSearching = false;
      }
    }
  },
  watch: {
    '$route.query.q': {
      handler(newQuery) {
        if (newQuery !== this.query) {
          this.query = newQuery;
          this.performSearch();
        }
      }
    }
  },
  template: `
    <div id="colorlib-blog">
      <div class="container">
        <div class="row text-center">
          <h2 class="bold">Search Results</h2>
          <p v-if="query">for "{{ query }}"</p>
        </div>
        
        <div v-if="isSearching" class="row text-center">
          <p>Searching...</p>
        </div>
        
        <div v-else-if="error" class="row text-center">
          <div class="alert alert-danger">{{ error }}</div>
        </div>
        
        <template v-else-if="results">
          <!-- Blog Posts Results -->
          <div v-if="results.posts.length" class="row">
            <div class="col-md-12">
              <h3>Blog Posts</h3>
            </div>
            <div class="col-md-4" v-for="post in results.posts" :key="post.id">
              <blog-card :post="post" />
            </div>
          </div>
          
          <!-- No Results Message -->
          <div v-if="!results.posts.length" class="row text-center">
            <p>No results found for "{{ query }}"</p>
            <p>Try different keywords or check your spelling</p>
          </div>
        </template>
      </div>
    </div>
  `
});
