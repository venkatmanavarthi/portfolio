// Import all markdown files
const blogPosts = import.meta.glob('../content/blog/*.md', { 
  eager: true,
  query: '?raw',
  import: 'default'
});

const parseFrontMatter = (content) => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }

  const [, frontMatter, markdownContent] = match;
  const data = {};
  
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        // Parse array values
        data[key.trim()] = JSON.parse(value);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        // Parse string values
        data[key.trim()] = value.slice(1, -1);
      } else {
        // Parse other values
        data[key.trim()] = value;
      }
    }
  });

  return { data, content: markdownContent };
};

export const getAllPosts = async () => {
  const posts = [];

  for (const path in blogPosts) {
    const content = blogPosts[path];
    const slug = path.split('/').pop().split('.')[0];
    const { data, content: markdownContent } = parseFrontMatter(content);
    
    posts.push({
      ...data,
      slug,
      content: markdownContent,
    });
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = async (slug) => {
  const path = `../content/blog/${slug}.md`;
  const content = blogPosts[path];
  
  if (!content) {
    return null;
  }

  const { data, content: markdownContent } = parseFrontMatter(content);
  return {
    ...data,
    slug,
    content: markdownContent,
  };
}; 