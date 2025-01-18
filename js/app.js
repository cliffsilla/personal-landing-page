import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { siteConfig } from './config/site-config.js'

// Import components
import Navigation from './components/Navigation.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import BlogCard from './components/BlogCard.js'

// Import views
import Home from './views/Home.js'
import Blog from './views/Blog.js'
import BlogPost from './views/BlogPost.js'
import SearchResults from './views/SearchResults.js'

// Define routes
const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/blog/:id', component: BlogPost, props: true },
  { path: '/search', component: SearchResults },
  { path: '/about', component: { template: '<div>About content here</div>' } },
  { path: '/services', component: { template: '<div>Services content here</div>' } },
  { path: '/work', component: { template: '<div>Work content here</div>' } },
  { path: '/contact', component: { template: '<div>Contact content here</div>' } }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Create Vue app
const app = createApp({
  data() {
    return {
      config: siteConfig
    }
  }
});

// Register components globally
app.component('nav-component', Navigation);
app.component('header-component', Header);
app.component('footer-component', Footer);
app.component('blog-card', BlogCard);

// Use router
app.use(router);

// Mount app
app.mount('#app');
