import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Skills from './components/Skills';
import Education from './components/Education';
import Awards from './components/Awards';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import { getAllPosts, getPostBySlug } from './utils/blogUtils';
import { useState, useEffect } from 'react';
import Hackathons from './components/Hackathons';

function Home() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <AboutMe />
      <Experience />
      <Projects />
      <Skills />
      <Awards />
      <Education />
    </>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handlePostLoad = async (slug) => {
    try {
      const post = await getPostBySlug(slug);
      return post;
    } catch (error) {
      console.error('Error loading post:', error);
      return null;
    }
  };

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList posts={posts} />} />
        <Route path="/blog/:slug" element={<BlogPost onLoad={handlePostLoad} />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
