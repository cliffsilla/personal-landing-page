const { defineComponent } = Vue;

export default defineComponent({
  name: 'Header',
  methods: {
    toggleNav() {
      // This will be handled by the existing jQuery code in main.js
    }
  },
  template: `
    <header>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="colorlib-navbar-brand">
              <router-link class="colorlib-logo" to="/">Noah</router-link>
            </div>
            <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle" @click="toggleNav"><i></i></a>
          </div>
        </div>
      </div>
    </header>
  `
});
