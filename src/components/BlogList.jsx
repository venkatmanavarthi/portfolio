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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Blog Posts</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 p-8 md:p-10 group relative overflow-hidden"
          >
            <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 group-hover:text-red-500 transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center text-sm md:text-base text-gray-500 mb-4 gap-2">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </div>
              <p className="text-lg md:text-xl text-gray-700 mb-6 line-clamp-2 md:line-clamp-3">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-red-100 shadow-sm hover:bg-red-100 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="inline-block mt-2 text-red-500 font-semibold text-sm group-hover:underline transition-all">Read more &rarr;</span>
            </Link>
            <div className="absolute inset-0 pointer-events-none group-hover:bg-red-50/30 transition-colors rounded-xl" />
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;