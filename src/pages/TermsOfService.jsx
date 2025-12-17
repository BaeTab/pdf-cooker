import React from 'react';

export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>

            <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
                <p className="text-sm text-gray-500">최종 수정일: 2024년 12월 14일</p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">1. 목적</h2>
                    <p>
                        본 약관은 PDF Cooker(이하 "서비스")가 제공하는 모든 서비스의 이용에 관한 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">2. 서비스의 제공 및 변경</h2>
                    <p>
                        서비스는 사용자에게 PDF 병합, 분할, 변환 등의 도구를 무료로 제공합니다.
                        서비스의 내용은 운영상의 필요에 따라 변경되거나 중단될 수 있습니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">3. 면책 조항 (책임의 한계)</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                            본 서비스는 "있는 그대로(AS IS)" 제공되며, 서비스의 사용으로 인해 발생하는 어떠한 결과에 대해서도 책임을 지지 않습니다.
                        </li>
                        <li>
                            사용자가 업로드한 파일은 사용자의 브라우저 내에서만 처리되며, 서비스 제공자는 원본 파일이나 처리된 결과물을 보관하지 않으므로 데이터 손실에 대한 복구 책임이 없습니다.
                        </li>
                        <li>
                            중요한 문서를 처리하기 전에는 반드시 원본 파일을 별도로 백업해 주시기 바랍니다.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">4. 저작권의 귀속</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>서비스가 제공하는 텍스트, 로고, 그래픽 등의 콘텐츠에 대한 저작권은 서비스 제공자에게 있습니다.</li>
                        <li>사용자가 서비스를 통해 생성한 결과물(처리된 PDF)에 대한 권리는 전적으로 사용자에게 있습니다.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">5. 금지 행위</h2>
                    <p>사용자는 서비스를 이용하여 다음과 같은 행위를 해서는 안 됩니다:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>악성 코드나 바이러스를 포함한 파일을 처리하는 행위</li>
                        <li>서비스의 정상적인 운영을 방해하는 행위 (디도스 공격 등)</li>
                        <li>타인의 저작권을 침해하는 문서를 무단으로 가공하는 행위</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">6. 준거법</h2>
                    <p>본 약관은 대한민국 법률에 따라 해석되고 규율됩니다.</p>
                </section>
            </div>
        </div>
    );
}
