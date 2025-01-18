// BlogService.js
export class BlogService {
  static async getAllPosts() {
    try {
      const response = await fetch('/content/blog/posts.json');
      const posts = await response.json();
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }

  static async getPost(id) {
    try {
      const response = await fetch(`/content/blog/${id}.md`);
      const content = await response.text();
      return this.parseMarkdown(content);
    } catch (error) {
      console.error('Error loading blog post:', error);
      return null;
    }
  }

  static parseMarkdown(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const matches = content.match(frontMatterRegex);
    
    if (!matches) return null;
    
    const [, frontMatter, markdown] = matches;
    const metadata = {};
    
    // Parse front matter
    frontMatter.split('\n').forEach(line => {
      const [key, ...values] = line.split(':');
      if (key && values.length) {
        metadata[key.trim()] = values.join(':').trim();
      }
    });

    return {
      ...metadata,
      content: markdown.trim()
    };
  }
}
