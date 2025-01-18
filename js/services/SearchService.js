import { BlogService } from './BlogService.js';

export class SearchService {
  static async search(query) {
    // Get all searchable content
    const posts = await BlogService.getAllPosts();
    
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Search through blog posts
    const blogResults = posts.filter(post => {
      const searchableText = `
        ${post.title}
        ${post.content}
        ${post.excerpt}
        ${post.category}
      `.toLowerCase();
      
      return searchableText.includes(normalizedQuery);
    });

    // You can add more searchable content types here
    
    return {
      posts: blogResults,
      // Add more result types here
    };
  }

  static async getRecentSearches() {
    // Get from localStorage
    try {
      const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      return searches.slice(0, 5); // Return last 5 searches
    } catch {
      return [];
    }
  }

  static async saveSearch(query) {
    try {
      const searches = await this.getRecentSearches();
      searches.unshift(query);
      localStorage.setItem('recentSearches', JSON.stringify(searches.slice(0, 5)));
    } catch (error) {
      console.error('Error saving search:', error);
    }
  }
}
