const { defineComponent } = Vue;

export default defineComponent({
  name: 'Home',
  template: `
    <div>
      <div id="colorlib-about">
        <div class="container">
          <div class="row text-center">
            <h2 class="bold">About</h2>
          </div>
          <div class="row">
            <div class="col-md-5 animate-box">
              <div class="owl-carousel3">
                <div class="item">
                  <img class="img-responsive about-img" src="images/about.jpg" alt="Profile image">
                </div>
                <div class="item">
                  <img class="img-responsive about-img" src="images/about-2.jpg" alt="Profile image">
                </div>
              </div>
            </div>
            <div class="col-md-6 col-md-push-1 animate-box">
              <div class="about-desc">
                <div class="owl-carousel3">
                  <div class="item">
                    <h2><span>Clifford</span><span>Silla</span></h2>
                  </div>
                  <div class="item">
                    <h2><span>Software</span><span>Engineer</span></h2>
                  </div>
                </div>
                <div class="desc">
                  <div class="rotate">
                    <h2 class="heading">About</h2>
                  </div>
                  <p>Experienced and accomplished software engineer with over 10 years of expertise in full-stack web development. Proven track record in delivering scalable software solutions that meet client requirements and drive business growth. Skilled in multiple programming languages and strong understanding software design principles.</p>
                  <p class="colorlib-social-icons">
                    <a :href="config.social.facebook" target="_blank"><i class="icon-facebook4"></i></a>
                    <a :href="config.social.twitter" target="_blank"><i class="icon-twitter3"></i></a>
                    <a :href="config.social.linkedin" target="_blank"><i class="icon-linkedin"></i></a>
                    <a :href="config.social.github" target="_blank"><i class="icon-github"></i></a>
                  </p>
                  <p><a href="/contact" class="btn btn-primary btn-outline">Contact Me!</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div id="colorlib-services">
        <!-- ... Your existing skills section content ... -->
      </div>

      <!-- Works Section -->
      <div id="colorlib-work">
        <!-- ... Your existing works section content ... -->
      </div>

      <!-- Blog Section -->
      <div id="colorlib-blog">
        <div class="container">
          <div class="row text-center">
            <h2 class="bold">Latest Blog Posts</h2>
          </div>
          <div class="row">
            <div v-for="post in latestPosts" :key="post.id" class="col-md-4 col-sm-6">
              <blog-card :post="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      latestPosts: []
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
  }
});
