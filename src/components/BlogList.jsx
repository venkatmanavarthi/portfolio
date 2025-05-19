import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BlogList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog Posts</h1>
        <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <Link to={`/blog/${post.slug}`} className="block hover:opacity-75">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="text-sm md:text-base text-gray-600 mb-3">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </div>
              <p className="text-base md:text-lg text-gray-700 mb-4 line-clamp-2 md:line-clamp-none">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList; 