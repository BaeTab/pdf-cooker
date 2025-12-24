import { useState, Suspense, lazy } from 'react';
import { FileStack, Scissors, Image, Lock } from 'lucide-react'; // Lock 추가
import { cn } from '../utils/cn';
import { PDFEvents } from '../utils/analytics';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';

// Lazy load feature components
const MergeFeature = lazy(() => import('../components/MergeFeature'));
const SplitFeature = lazy(() => import('../components/SplitFeature'));
const ConvertFeature = lazy(() => import('../components/ConvertFeature'));

export default function Home() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('merge');

    // Apply Dynamic SEO based on active tab
    useSEO({
        title: t(`seo.${activeTab}.title`),
        description: t(`seo.${activeTab}.description`),
        canonicalPath: ''
    });

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        PDFEvents.tabChange(tabId);
    };

    const tabs = [
        { id: 'merge', label: t('tabs.merge'), icon: FileStack },
        { id: 'split', label: t('tabs.split'), icon: Scissors },
        { id: 'convert', label: t('tabs.convert'), icon: Image },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Intro Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    {t('hero.title_prefix')} <span className="text-primary-600">{t('hero.title_highlight')}</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('hero.subtitle')}
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-md p-2 mb-8">
                <div className="grid grid-cols-3 gap-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={cn(
                                    'flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-200',
                                    activeTab === tab.id
                                        ? 'bg-primary-600 text-white shadow-md transform scale-[1.02]'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn min-h-[400px]">
                <Suspense fallback={
                    <div className="flex items-center justify-center p-12">
                        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }>
                    <section aria-label={t('footer.features_title')}>
                        <h2 className="sr-only">
                            {activeTab === 'merge' && t('tabs.merge')}
                            {activeTab === 'split' && t('tabs.split')}
                            {activeTab === 'convert' && t('tabs.convert')}
                        </h2>
                        {activeTab === 'merge' && <MergeFeature />}
                        {activeTab === 'split' && <SplitFeature />}
                        {activeTab === 'convert' && <ConvertFeature />}
                    </section>
                </Suspense>
            </div>

            {/* Features Grid (Info Section) */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('features.secure.title')}</h3>
                    <p className="text-gray-600">
                        {t('features.secure.desc')}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <FileStack className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('features.easy.title')}</h3>
                    <p className="text-gray-600">
                        {t('features.easy.desc')}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Scissors className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('features.free.title')}</h3>
                    <p className="text-gray-600">
                        {t('features.free.desc')}
                    </p>
                </div>
            </div>
        </div>
    );
}
