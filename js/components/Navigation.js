const { defineComponent } = Vue;
import { SearchService } from '../services/SearchService.js';

export default defineComponent({
  name: 'Navigation',
  data() {
    return {
      searchQuery: '',
      searchResults: null,
      recentSearches: [],
      isSearching: false,
      searchError: null
    }
  },
  async created() {
    this.recentSearches = await SearchService.getRecentSearches();
  },
  methods: {
    async handleSearch() {
      if (!this.searchQuery.trim()) return;
      
      this.isSearching = true;
      this.searchError = null;
      
      try {
        const results = await SearchService.search(this.searchQuery);
        this.searchResults = results;
        await SearchService.saveSearch(this.searchQuery);
        this.recentSearches = await SearchService.getRecentSearches();
        
        // Navigate to search results if we have any
        if (results.posts.length > 0) {
          this.$router.push({
            path: '/search',
            query: { q: this.searchQuery }
          });
        }
      } catch (error) {
        this.searchError = 'Error performing search';
        console.error(error);
      } finally {
        this.isSearching = false;
      }
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = null;
    }
  },
  template: `
    <nav id="colorlib-main-nav" role="navigation">
      <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle active"><i></i></a>
      <div class="js-fullheight colorlib-table">
        <div class="colorlib-table-cell js-fullheight">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <input 
                  type="text" 
                  class="form-control" 
                  id="search" 
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  placeholder="Enter any key to search..."
                  :disabled="isSearching"
                >
                <button 
                  type="submit" 
                  @click="handleSearch" 
                  class="btn btn-primary"
                  :disabled="isSearching"
                >
                  <i :class="isSearching ? 'icon-spinner' : 'icon-search3'"></i>
                </button>
              </div>
              <div v-if="searchError" class="alert alert-danger">{{ searchError }}</div>
              <div v-if="recentSearches.length && !searchResults" class="recent-searches">
                <h4>Recent Searches</h4>
                <ul>
                  <li v-for="search in recentSearches" :key="search">
                    <a href="#" @click.prevent="searchQuery = search; handleSearch()">{{ search }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <ul>
                <li><router-link to="/" active-class="active">Home</router-link></li>
                <li><router-link to="/services" active-class="active">Services</router-link></li>
                <li><router-link to="/work" active-class="active">Work</router-link></li>
                <li><router-link to="/blog" active-class="active">Blog</router-link></li>
                <li><router-link to="/about" active-class="active">About</router-link></li>
                <li><router-link to="/contact" active-class="active">Contact</router-link></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h2 class="head-title">Works</h2>
              <a href="images/work-1.jpg" class="gallery image-popup-link text-center" style="background-image: url(images/work-1.jpg);">
                <span><i class="icon-search3"></i></span>
              </a>
              <a href="images/work-2.jpg" class="gallery image-popup-link text-center" style="background-image: url(images/work-2.jpg);">
                <span><i class="icon-search3"></i></span>
              </a>
              <a href="images/work-3.jpg" class="gallery image-popup-link text-center" style="background-image: url(images/work-3.jpg);">
                <span><i class="icon-search3"></i></span>
              </a>
              <a href="images/work-4.jpg" class="gallery image-popup-link text-center" style="background-image: url(images/work-4.jpg);">
                <span><i class="icon-search3"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
});
