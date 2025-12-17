import { useState, Suspense, lazy } from 'react';
import { FileStack, Scissors, Image, Lock } from 'lucide-react'; // Lock 추가
import { cn } from '../utils/cn';
import { PDFEvents } from '../utils/analytics';
import { useSEO } from '../hooks/useSEO';

// Lazy load feature components
const MergeFeature = lazy(() => import('../components/MergeFeature'));
const SplitFeature = lazy(() => import('../components/SplitFeature'));
const ConvertFeature = lazy(() => import('../components/ConvertFeature'));

// SEO Configuration for Home tabs
const SEO_CONFIG = {
    merge: {
        title: 'PDF 합치기 - 무료 온라인 PDF 병합 도구 | PDF Cooker',
        description: '여러 개의 PDF 파일을 하나로 합치세요. 설치 없이 브라우저에서 바로 병합할 수 있습니다. 100% 무료이며 안전합니다.',
    },
    split: {
        title: 'PDF 나누기 - 무료 온라인 PDF 분할 도구 | PDF Cooker',
        description: 'PDF 파일에서 특정 페이지만 추출하거나 모든 페이지를 분리하세요. 쉽고 빠르며 서버 업로드 없이 안전하게 처리됩니다.',
    },
    convert: {
        title: 'PDF를 이미지로 변환 - JPG, PNG 변환 | PDF Cooker',
        description: 'PDF 페이지를 고화질 이미지(JPG, PNG)로 변환하고 ZIP으로 다운로드하세요. 워터마크 없는 무료 변환 도구입니다.',
    },
};

export default function Home() {
    const [activeTab, setActiveTab] = useState('merge');

    // Apply Dynamic SEO based on active tab
    useSEO(
        SEO_CONFIG[activeTab].title,
        SEO_CONFIG[activeTab].description
    );

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        PDFEvents.tabChange(tabId);
    };

    const tabs = [
        { id: 'merge', label: 'PDF 합치기', icon: FileStack },
        { id: 'split', label: 'PDF 나누기', icon: Scissors },
        { id: 'convert', label: 'PDF를 이미지로', icon: Image },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Intro Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    모든 PDF 작업을 <span className="text-primary-600">한 곳에서</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    서버에 업로드하지 않아 안전합니다. 브라우저에서 바로 PDF를 합치고, 나누고, 변환하세요.
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
                    <section aria-label="기능 영역">
                        <h2 className="sr-only">
                            {activeTab === 'merge' && 'PDF 파일 합치기'}
                            {activeTab === 'split' && 'PDF 파일 나누기'}
                            {activeTab === 'convert' && 'PDF를 이미지로 변환'}
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">100% 안전한 보안</h3>
                    <p className="text-gray-600">
                        파일이 서버로 전송되지 않습니다. 모든 작업은 사용자의 브라우저 내에서 로컬로 처리되어 데이터 유출 걱정이 없습니다.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <FileStack className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">간편한 사용</h3>
                    <p className="text-gray-600">
                        복잡한 프로그램 설치 없이 웹 브라우저만 있으면 됩니다. 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Scissors className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">무제한 무료</h3>
                    <p className="text-gray-600">
                        회원가입이나 결제가 필요 없습니다. 파일 크기나 횟수 제한 없이 모든 기능을 무료로 이용하세요.
                    </p>
                </div>
            </div>
        </div>
    );
}
