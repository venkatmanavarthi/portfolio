import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const BlogPost = ({ onLoad }) => {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const loadedPost = await onLoad(slug);
        setPost(loadedPost);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug, onLoad]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm md:text-base text-gray-600 mb-4">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags && post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-red-500 prose-strong:text-gray-900 prose-code:text-gray-900 prose-pre:bg-gray-100 prose-img:rounded-lg prose-img:shadow-md">
        <ReactMarkdown
          components={{
            img: ({ node, ...props }) => (
              <div className="my-8">
                <img
                  {...props}
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
                {props.alt && (
                  <p className="text-sm text-gray-600 mt-2 text-center">{props.alt}</p>
                )}
              </div>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost; 