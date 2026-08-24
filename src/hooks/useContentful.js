import { useState, useEffect } from 'react';
import { fetchBlogPosts, fetchNewsArticles, fetchArticleBySlug, isContentfulConfigured } from '../services/contentful';

export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchBlogPosts();
        if (mounted) setPosts(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return { posts, loading, error, isContentfulConfigured };
}

export function useNewsArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchNewsArticles();
        if (mounted) setArticles(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return { articles, loading, error, isContentfulConfigured };
}

export function useArticleDetail(slugOrId) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!slugOrId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchArticleBySlug(slugOrId);
        if (mounted) setArticle(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [slugOrId]);

  return { article, loading, error, isContentfulConfigured };
}
