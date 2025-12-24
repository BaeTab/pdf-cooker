import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0];

    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        if (!post) {
            navigate('/blog');
        }
        window.scrollTo(0, 0);
    }, [post, navigate]);

    // Calculate localized content unconditionally (or safe default) for hooks
    // However, if !post, we return null, so hook might run with undefined if we are not careful.
    // But hooks must run unconditionally.
    // The previous code had "if (!post) return null;" early return.
    // We must call hooks before that.

    // Safety check for hooks execution
    const safePost = post || { title: {}, excerpt: {}, content: {} };

    const getLocalizedContent = (obj) => {
        return obj[currentLang] || obj['en'] || (obj && Object.values(obj)[0]) || '';
    };

    const title = getLocalizedContent(safePost.title);
    const excerpt = getLocalizedContent(safePost.excerpt);
    const content = getLocalizedContent(safePost.content);

    useSEO({
        title: title,
        description: excerpt,
        canonicalPath: `blog/${id}`,
        ogType: 'article'
    });

    if (!post) return null; // Keep the early return for rendering, but hooks ran above.


    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <Link
                to="/blog"
                className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {currentLang === 'ko' ? '블로그로 돌아가기' : 'Back to Blog'}
            </Link>

            <header className="mb-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {post.category}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-4">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                    </div>
                </div>
            </header>

            <div
                className="prose prose-lg prose-primary max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 hover:prose-a:text-primary-700"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-12 pt-8 border-t border-gray-100">
                <Link
                    to="/blog"
                    className="block w-full text-center py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 font-medium transition-colors"
                >
                    {currentLang === 'ko' ? '다른 글 보기' : 'Read more articles'}
                </Link>
            </div>
        </article>
    );
};

export default BlogPost;
