const { defineComponent } = Vue;
import { siteConfig } from '../config/site-config.js';
import { NewsletterService } from '../services/NewsletterService.js';

export default defineComponent({
  name: 'Footer',
  data() {
    return {
      config: siteConfig,
      latestPosts: [],
      email: '',
      subscribeStatus: null,
      isSubscribing: false
    }
  },
  async created() {
    try {
      const response = await fetch('/content/blog/posts.json');
      const data = await response.json();
      this.latestPosts = data.posts.slice(0, 3); // Get latest 3 posts
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  },
  methods: {
    async handleSubscribe() {
      if (!this.email) {
        this.subscribeStatus = { error: true, message: 'Please enter an email address' };
        return;
      }

      this.isSubscribing = true;
      this.subscribeStatus = null;

      try {
        await NewsletterService.subscribe(this.email);
        this.subscribeStatus = { error: false, message: 'Successfully subscribed!' };
        this.email = '';
      } catch (error) {
        this.subscribeStatus = { error: true, message: error.message };
      } finally {
        this.isSubscribing = false;
      }
    }
  },
  template: `
    <footer>
      <div id="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-pb-sm">
              <h2>Let's Talk</h2>
              <p>Get in touch with us through any of these channels.</p>
              <p><a :href="'mailto:' + config.contact.email" class="email-link">{{ config.contact.email }}</a></p>
              <p class="colorlib-social-icons">
                <a v-if="config.social.facebook" :href="config.social.facebook" target="_blank"><i class="icon-facebook4"></i></a>
                <a v-if="config.social.twitter" :href="config.social.twitter" target="_blank"><i class="icon-twitter3"></i></a>
                <a v-if="config.social.linkedin" :href="config.social.linkedin" target="_blank"><i class="icon-linkedin"></i></a>
                <a v-if="config.social.github" :href="config.social.github" target="_blank"><i class="icon-github"></i></a>
              </p>
            </div>
            <div class="col-md-4 col-pb-sm">
              <h2>Latest Blog</h2>
              <div v-for="post in latestPosts" :key="post.id" class="f-entry">
                <a :href="'/blog/' + post.id" class="featured-img" :style="{ backgroundImage: 'url(' + post.image + ')' }"></a>
                <div class="desc">
                  <span>{{ post.date }}</span>
                  <h3><a :href="'/blog/' + post.id">{{ post.title }}</a></h3>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-pb-sm">
              <h2>Newsletter</h2>
              <p>{{ config.newsletter.description }}</p>
              <div class="subscribe text-center">
                <div class="form-group">
                  <input 
                    type="email" 
                    class="form-control text-center" 
                    placeholder="Enter Email address" 
                    v-model="email"
                    :disabled="isSubscribing"
                  >
                  <button 
                    class="btn btn-primary btn-custom" 
                    @click="handleSubscribe"
                    :disabled="isSubscribing"
                  >
                    {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
                  </button>
                  <div v-if="subscribeStatus" :class="['alert', subscribeStatus.error ? 'alert-danger' : 'alert-success', 'mt-2']">
                    {{ subscribeStatus.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <p>
                &copy; {{ new Date().getFullYear() }} All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
});
