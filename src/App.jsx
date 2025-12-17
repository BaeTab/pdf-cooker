import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Guide from './pages/Guide';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Lock } from 'lucide-react';
import { cn } from './utils/cn';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '사용 가이드', path: '/guide' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <ScrollToTop />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                {/* Simple Logo Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M12 18v-6"></path>
                  <path d="M9 15h6"></path>
                </svg>
              </div>
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-gray-900">PDF Cooker</h1>
                <p className="text-xs text-gray-500">안전한 무료 PDF 편집 도구</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "font-medium transition-colors hover:text-primary-600",
                    location.pathname === link.path ? "text-primary-600" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Privacy Badge (Mobile: hidden, Desktop: visible) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-green-800">100% 안전</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="font-bold text-gray-900 mb-4">PDF Cooker</h3>
              <p className="text-sm text-gray-600 mb-4">
                PDF Cooker는 사용자의 프라이버시를 최우선으로 생각합니다.<br />
                서버 업로드 없이 브라우저에서 안전하게 PDF를 편집하세요.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">기능</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-primary-600">PDF 합치기</Link></li>
                <li><Link to="/" className="hover:text-primary-600">PDF 나누기</Link></li>
                <li><Link to="/" className="hover:text-primary-600">PDF를 이미지로</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">정보</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/guide" className="hover:text-primary-600">사용 가이드</Link></li>
                <li><Link to="/faq" className="hover:text-primary-600">자주 묻는 질문</Link></li>
                <li><Link to="/privacy" className="hover:text-primary-600">개인정보처리방침</Link></li>
                <li><Link to="/terms" className="hover:text-primary-600">이용약관</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 PDF Cooker. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="mailto:contact@pdf-cooker.web.app" className="hover:text-gray-900">문의하기</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
