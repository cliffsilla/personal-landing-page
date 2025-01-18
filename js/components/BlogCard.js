const { defineComponent } = Vue;

export default defineComponent({
  name: 'BlogCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  template: `
    <div class="article animate-box">
      <router-link :to="'/blog/' + post.id" class="blog-img">
        <img class="img-responsive" :src="post.image" :alt="post.title">
        <div class="overlay"></div>
        <div class="link">
          <span class="read">Read more</h2>
        </div>
      </router-link>
      <div class="desc">
        <span class="meta">{{ post.date }}</span>
        <h2><router-link :to="'/blog/' + post.id">{{ post.title }}</router-link></h2>
        <p>{{ post.excerpt }}</p>
      </div>
    </div>
  `
})
