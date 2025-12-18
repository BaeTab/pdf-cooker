import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blogPosts';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';

const Blog = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0]; // 'en', 'ko', etc.

    // Helper to safely get localized content, fallback to english or first available
    const getLocalizedContent = (obj) => {
        return obj[currentLang] || obj['en'] || Object.values(obj)[0];
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {currentLang === 'ko' ? '블로그' : 'Blog'}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {currentLang === 'ko'
                        ? 'PDF 활용 팁과 최신 업데이트 소식을 확인하세요.'
                        : 'Discover tips, tutorials, and updates about PDF Cooker.'}
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                    const title = getLocalizedContent(post.title);
                    const excerpt = getLocalizedContent(post.excerpt);

                    return (
                        <Link
                            key={post.id}
                            to={`/blog/${post.id}`}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
                        >
                            <div className="h-48 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 group-hover:bg-primary-50 transition-colors">
                                {/* Fallback pattern or icon since we don't have real images yet */}
                                <BookOpen className="w-16 h-16 text-primary-200 group-hover:text-primary-400 transition-colors" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <span className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                    {title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                                    {excerpt}
                                </p>
                                <div className="flex items-center text-primary-600 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
                                    {currentLang === 'ko' ? '더 보기' : 'Read More'}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Blog;
