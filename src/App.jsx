import { useState } from 'react';
import { Lock, FileStack, Scissors, Image } from 'lucide-react';
import MergeFeature from './components/MergeFeature';
import SplitFeature from './components/SplitFeature';
import ConvertFeature from './components/ConvertFeature';
import { cn } from './utils/cn';
import { PDFEvents } from './utils/analytics';

function App() {
  const [activeTab, setActiveTab] = useState('merge');

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                PDF Cooker
              </h1>
              <p className="text-gray-600">
                안전하고 빠른 PDF 편집 도구
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <Lock className="w-5 h-5 text-green-600" />
              <div className="text-sm">
                <div className="font-semibold text-green-800">100% 안전</div>
                <div className="text-green-600">서버 업로드 없음</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
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
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'merge' && <MergeFeature />}
          {activeTab === 'split' && <SplitFeature />}
          {activeTab === 'convert' && <ConvertFeature />}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            왜 PDF Cooker를 사용해야 하나요?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">완벽한 보안</h3>
              <p className="text-sm text-gray-600">
                모든 처리는 브라우저 내에서만 이루어지며, 파일이 서버로 전송되지 않습니다.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <FileStack className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">빠른 처리</h3>
              <p className="text-sm text-gray-600">
                서버 업로드 없이 즉시 처리되어 빠르고 효율적입니다.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Scissors className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">다양한 기능</h3>
              <p className="text-sm text-gray-600">
                PDF 병합, 분할, 이미지 변환 등 필요한 모든 기능을 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Guide Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PDF Cooker 사용 가이드</h2>

          <div className="space-y-8">
            {/* Merge Guide */}
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileStack className="w-5 h-5 text-primary-600" />
                PDF 합치기 완벽 가이드
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  여러 개의 PDF 파일을 하나의 문서로 병합하는 것은 업무 효율성을 크게 높일 수 있습니다.
                  PDF Cooker의 병합 기능을 사용하면 복잡한 소프트웨어 설치 없이 브라우저에서 바로 작업할 수 있습니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">단계별 사용법:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>파일 업로드:</strong> 'PDF 합치기' 탭에서 드래그 앤 드롭으로 여러 PDF 파일을 한 번에 업로드하세요.</li>
                    <li><strong>순서 조정:</strong> 업로드된 파일 목록에서 위/아래 화살표 버튼을 클릭하여 원하는 순서로 정렬하세요.</li>
                    <li><strong>병합 실행:</strong> '합치기' 버튼을 클릭하면 즉시 하나의 PDF로 병합되어 다운로드됩니다.</li>
                    <li><strong>결과 확인:</strong> 다운로드된 'merged.pdf' 파일을 열어 모든 페이지가 올바른 순서로 병합되었는지 확인하세요.</li>
                  </ol>
                </div>
                <p className="text-sm italic">
                  💡 <strong>팁:</strong> 계약서, 보고서, 프레젠테이션 자료 등 여러 문서를 하나로 합쳐 관리하면
                  파일 관리가 훨씬 편리해집니다. 최대 50MB까지의 파일을 지원합니다.
                </p>
              </div>
            </div>

            {/* Split Guide */}
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-primary-600" />
                PDF 나누기 상세 설명
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  대용량 PDF 문서에서 필요한 페이지만 추출하거나, 각 페이지를 개별 파일로 분리할 수 있습니다.
                  이 기능은 특히 긴 보고서나 교재에서 특정 섹션만 공유할 때 유용합니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">두 가지 분할 방식:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="font-semibold text-primary-700">1. 전체 페이지 분리</h5>
                      <p>모든 페이지를 개별 PDF 파일로 분리합니다. 예를 들어 10페이지 문서는 page_1.pdf부터 page_10.pdf까지 10개의 파일로 나뉩니다.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary-700">2. 특정 페이지 추출</h5>
                      <p>원하는 페이지만 선택하여 새로운 PDF로 만듭니다. 페이지 범위는 다음과 같이 입력할 수 있습니다:</p>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li><code className="bg-white px-2 py-1 rounded">1,3,5</code> - 1, 3, 5페이지만 추출</li>
                        <li><code className="bg-white px-2 py-1 rounded">1-5</code> - 1페이지부터 5페이지까지 추출</li>
                        <li><code className="bg-white px-2 py-1 rounded">1,3-5,7</code> - 1페이지, 3~5페이지, 7페이지 추출</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-sm italic">
                  💡 <strong>활용 예시:</strong> 100페이지 교재에서 시험 범위인 20~35페이지만 추출하여 학습 자료로 활용하거나,
                  계약서의 특정 조항만 추출하여 공유할 수 있습니다.
                </p>
              </div>
            </div>

            {/* Convert Guide */}
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary-600" />
                PDF를 이미지로 변환하기
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  PDF 문서의 각 페이지를 고품질 이미지 파일(JPG 또는 PNG)로 변환합니다.
                  웹사이트에 문서를 게시하거나, 소셜 미디어에 공유할 때 매우 유용합니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">이미지 포맷 선택 가이드:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h5 className="font-semibold text-primary-700 mb-1">JPG (JPEG)</h5>
                      <p className="mb-2">파일 크기가 작아 웹 게시에 적합합니다.</p>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>압축률이 높아 용량 절약</li>
                        <li>사진이나 복잡한 그래픽에 적합</li>
                        <li>이메일 첨부나 웹 업로드에 유리</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h5 className="font-semibold text-primary-700 mb-1">PNG</h5>
                      <p className="mb-2">무손실 압축으로 최고 품질을 유지합니다.</p>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>텍스트나 도표가 선명함</li>
                        <li>투명 배경 지원</li>
                        <li>인쇄용 자료에 적합</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-semibold mb-1">품질 설정:</h5>
                    <p className="text-sm">1x(낮음)부터 3x(최고)까지 선택 가능합니다. 숫자가 클수록 해상도가 높아지지만 파일 크기도 증가합니다.</p>
                  </div>
                </div>
                <p className="text-sm italic">
                  💡 <strong>추천 설정:</strong> 웹 게시용은 JPG + 2x, 인쇄용은 PNG + 3x를 권장합니다.
                  변환된 모든 이미지는 자동으로 ZIP 파일로 압축되어 다운로드됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문 (FAQ)</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 정말 파일이 서버로 전송되지 않나요?</h3>
              <p className="text-gray-700">
                네, 100% 확실합니다. PDF Cooker는 모든 처리를 브라우저 내에서 수행하는 클라이언트 사이드 애플리케이션입니다.
                업로드한 파일은 컴퓨터의 메모리에만 로드되며, 외부 서버로 전송되지 않습니다.
                네트워크 탭을 확인하시면 파일 업로드 요청이 전혀 없음을 확인하실 수 있습니다.
                이는 개인정보 보호와 기업 기밀 문서 처리에 있어 매우 중요한 장점입니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 처리할 수 있는 파일 크기에 제한이 있나요?</h3>
              <p className="text-gray-700">
                기본적으로 최대 50MB까지의 PDF 파일을 처리할 수 있습니다.
                다만 실제 처리 가능한 크기는 사용 중인 브라우저와 컴퓨터의 메모리에 따라 달라질 수 있습니다.
                매우 큰 파일(100MB 이상)의 경우 브라우저가 느려지거나 메모리 부족 오류가 발생할 수 있으니,
                가능하면 파일을 분할하여 처리하는 것을 권장합니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 어떤 브라우저에서 사용할 수 있나요?</h3>
              <p className="text-gray-700">
                PDF Cooker는 최신 웹 표준을 사용하므로 Chrome, Firefox, Safari, Edge 등
                모든 최신 브라우저에서 원활하게 작동합니다.
                최상의 성능을 위해서는 Chrome 또는 Edge 브라우저의 최신 버전 사용을 권장합니다.
                Internet Explorer는 지원하지 않습니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 인터넷 연결이 필요한가요?</h3>
              <p className="text-gray-700">
                최초 페이지 로드 시에만 인터넷 연결이 필요합니다.
                페이지가 완전히 로드된 후에는 오프라인 상태에서도 모든 기능을 사용할 수 있습니다.
                이는 PDF 처리가 완전히 브라우저 내에서 이루어지기 때문입니다.
                다만 PDF.js 라이브러리는 CDN에서 로드되므로, 최초 접속 시에는 인터넷이 필요합니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 암호화된 PDF도 처리할 수 있나요?</h3>
              <p className="text-gray-700">
                현재 버전에서는 암호로 보호된 PDF 파일은 지원하지 않습니다.
                암호화된 PDF를 처리하려면 먼저 다른 도구를 사용하여 암호를 해제한 후 사용해 주세요.
                향후 업데이트에서 암호 입력 기능을 추가할 예정입니다.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 모바일 기기에서도 사용할 수 있나요?</h3>
              <p className="text-gray-700">
                네, 가능합니다. PDF Cooker는 반응형 디자인으로 제작되어 스마트폰과 태블릿에서도 사용할 수 있습니다.
                다만 대용량 파일 처리나 많은 페이지를 변환하는 작업은 모바일 기기의 성능 제약으로 인해
                데스크톱 환경보다 느릴 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. 사용료가 있나요?</h3>
              <p className="text-gray-700">
                PDF Cooker는 완전히 무료로 제공됩니다.
                회원가입이나 로그인도 필요 없으며, 사용 횟수나 파일 개수에 제한이 없습니다.
                광고를 통해 서비스를 유지하고 있으니 양해 부탁드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PDF Cooker 활용 사례</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">📚 교육 분야</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• 여러 강의 자료를 하나의 PDF로 병합하여 학생들에게 배포</li>
                <li>• 교재의 특정 챕터만 추출하여 주간 학습 자료 제작</li>
                <li>• 시험 문제를 이미지로 변환하여 온라인 학습 플랫폼에 업로드</li>
                <li>• 학생 과제물을 페이지별로 분리하여 개별 피드백 제공</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-3">💼 비즈니스</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• 여러 부서의 보고서를 하나로 병합하여 경영진에게 제출</li>
                <li>• 계약서에서 필요한 조항만 추출하여 협력사와 공유</li>
                <li>• 제안서를 이미지로 변환하여 웹사이트 포트폴리오에 게시</li>
                <li>• 대용량 카탈로그를 제품별로 분할하여 영업팀에 배포</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">🏛️ 법률/행정</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• 여러 증빙 서류를 하나의 PDF로 병합하여 제출</li>
                <li>• 판례집에서 관련 판례만 추출하여 연구 자료로 활용</li>
                <li>• 법률 문서를 이미지로 변환하여 블로그에 게시</li>
                <li>• 대량의 공문서를 페이지별로 분리하여 분류 및 보관</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">🎨 크리에이티브</h3>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>• 여러 디자인 시안을 하나의 프레젠테이션 PDF로 병합</li>
                <li>• 포트폴리오에서 베스트 작품만 추출하여 새 PDF 제작</li>
                <li>• 디자인 가이드를 이미지로 변환하여 SNS에 공유</li>
                <li>• 대용량 작품집을 프로젝트별로 분할하여 클라이언트에게 전달</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security & Privacy Section */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md p-8 border border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">보안 및 개인정보 보호</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  PDF Cooker는 사용자의 개인정보 보호를 최우선으로 생각합니다.
                  우리는 단순히 "서버에 업로드하지 않는다"는 것을 넘어,
                  기술적으로 업로드가 불가능한 구조로 설계되었습니다.
                </p>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">🔒 보안 기술 상세</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong>클라이언트 사이드 처리:</strong> 모든 PDF 처리는 JavaScript를 사용하여
                      브라우저 내에서만 실행됩니다. 서버 측 코드가 전혀 없습니다.
                    </li>
                    <li>
                      <strong>메모리 내 처리:</strong> 업로드된 파일은 브라우저의 메모리(RAM)에만 로드되며,
                      디스크에 저장되지 않습니다. 페이지를 닫으면 즉시 삭제됩니다.
                    </li>
                    <li>
                      <strong>네트워크 전송 없음:</strong> 개발자 도구의 네트워크 탭을 확인하시면
                      파일 관련 HTTP 요청이 전혀 없음을 확인할 수 있습니다.
                    </li>
                    <li>
                      <strong>오픈소스 라이브러리:</strong> pdf-lib와 PDF.js 같은 검증된 오픈소스 라이브러리를 사용하여
                      투명성과 신뢰성을 보장합니다.
                    </li>
                  </ul>
                </div>

                <p className="text-sm italic">
                  💡 민감한 계약서, 의료 기록, 금융 문서 등 어떤 문서든 안심하고 처리하실 수 있습니다.
                  기업 환경에서도 보안 정책에 위배되지 않고 사용 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 PDF Cooker. 모든 처리는 클라이언트 사이드에서 안전하게 수행됩니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
