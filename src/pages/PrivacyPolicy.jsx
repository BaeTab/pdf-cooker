import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>

            <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
                <p className="text-sm text-gray-500">최종 수정일: 2024년 12월 14일</p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">1. 총칙</h2>
                    <p>
                        PDF Cooker("서비스")는 사용자의 개인정보를 중요하게 생각하며, 사용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다.
                        본 개인정보처리방침은 서비스가 사용자의 정보를 어떻게 처리하는지 설명합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">2. 파일 처리 및 보안 (가장 중요)</h2>
                    <p className="font-semibold text-primary-700 bg-primary-50 p-4 rounded-lg">
                        PDF Cooker는 클라이언트 사이드 기술을 사용하여 모든 파일을 사용자의 브라우저 내에서 직접 처리합니다.
                        사용자가 선택한 PDF 파일은 어떠한 경우에도 서버로 전송되거나 저장되지 않습니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">3. 수집하는 정보</h2>
                    <p>서비스는 회원가입이 필요 없으며, 별도의 개인정보(이름, 이메일, 전화번호 등)를 수집하지 않습니다.</p>
                    <p>단, 서비스 개선과 광고 게재를 위해 다음과 같은 비개인 식별 정보가 자동으로 수집될 수 있습니다:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>쿠키(Cookie) 및 사용 데이터</li>
                        <li>접속 IP 주소, 브라우저 유형, 방문 시간</li>
                        <li>기능 사용 통계 (예: 병합 기능 사용 횟수) - *파일 내용은 포함되지 않음*</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">4. 쿠키 및 광고 (Google AdSense)</h2>
                    <p>
                        본 웹사이트는 무료 서비스를 유지하기 위해 Google AdSense를 통해 광고를 표시합니다.
                        Google을 포함한 제3자 벤더는 쿠키를 사용하여 사용자의 웹사이트 방문 기록에 기반한 광고를 게재할 수 있습니다.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Google은 광고 쿠키를 사용하여 사용자에게 적절한 광고를 표시합니다.</li>
                        <li>사용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google 광고 설정</a>에서 맞춤형 광고를 해제할 수 있습니다.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">5. Google Analytics</h2>
                    <p>
                        서비스 개선을 위해 Google Analytics를 사용하여 웹사이트 트래픽과 사용자 행동 정보를 수집합니다.
                        이 데이터는 익명으로 처리되며, 개인을 식별할 수 있는 정보는 포함되지 않습니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">6. 문의하기</h2>
                    <p>개인정보 처리와 관련된 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.</p>
                    <p className="mt-2">이메일: contact@pdf-cooker.web.app</p>
                </section>
            </div>
        </div>
    );
}
