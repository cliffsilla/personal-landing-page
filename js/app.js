import Blog from './views/Blog.js';
import BlogPost from './views/BlogPost.js';

// Get Vue and Router from global scope since we're using CDN
const { createApp } = Vue;
const { createRouter, createWebHistory } = VueRouter;

// Define routes
const routes = [
  { path: '/', component: { template: '<div>Home content here</div>' } },
  { path: '/blog', component: Blog },
  { path: '/blog/:id', component: BlogPost, props: true },
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
  template: `
    <div id="app">
      <nav id="colorlib-main-nav" role="navigation">
        <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle active"><i></i></a>
        <div class="js-fullheight colorlib-table">
          <div class="colorlib-table-cell js-fullheight">
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
          </div>
        </div>
      </nav>
      
      <div id="colorlib-page">
        <router-view></router-view>
      </div>
    </div>
  `
});

// Use router
app.use(router);

// Mount app
app.mount('#app');
