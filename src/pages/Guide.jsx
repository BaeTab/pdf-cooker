import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { FileText, Monitor, CheckCircle } from 'lucide-react';

export default function Guide() {
    useSEO({
        title: 'PDF Cooker 사용 가이드 - PDF 병합, 분할, 변환 방법',
        description: 'PDF Cooker의 각 기능별 상세 사용 방법을 확인하세요. PDF 합치기, 나누기, 이미지 변환을 누구나 쉽게 따라할 수 있습니다.',
        canonicalPath: 'guide'
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">사용 가이드</h1>
                <p className="text-xl text-gray-600">누구나 1분 만에 PDF 마스터가 될 수 있습니다</p>
            </div>

            <div className="space-y-12">
                {/* Merge Guide */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-blue-50 px-8 py-4 border-b border-blue-100 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">1</span>
                        <h2 className="text-2xl font-bold text-gray-900">PDF 합치기</h2>
                    </div>
                    <div className="p-8">
                        <p className="text-gray-600 mb-6">여러 개의 흩어진 PDF 파일들을 하나의 문서로 깔끔하게 정리하고 싶을 때 사용하세요.</p>
                        <ol className="space-y-4">
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><Monitor className="w-5 h-5 text-gray-400" /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900">파일 업로드</h3>
                                    <p className="text-gray-600 text-sm">"PDF 합치기" 탭에서 여러 개의 PDF 파일을 드래그 앤 드롭하거나 클릭하여 선택합니다.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><CheckCircle className="w-5 h-5 text-gray-400" /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900">순서 조정</h3>
                                    <p className="text-gray-600 text-sm">업로드된 파일 목록에서 화살표(↑, ↓) 버튼을 눌러 원하는 순서대로 정렬합니다.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><FileText className="w-5 h-5 text-gray-400" /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900">병합 및 다운로드</h3>
                                    <p className="text-gray-600 text-sm">하단의 "PDF 합치기" 버튼을 누르면 즉시 병합된 파일이 다운로드됩니다.</p>
                                </div>
                            </li>
                        </ol>
                        <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <p className="text-sm text-yellow-800">💡 <strong>팁:</strong> 파일 이름 옆의 'X' 버튼을 눌러 실수로 추가한 파일을 제거할 수 있습니다.</p>
                        </div>
                    </div>
                </section>

                {/* Split Guide */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-green-50 px-8 py-4 border-b border-green-100 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold">2</span>
                        <h2 className="text-2xl font-bold text-gray-900">PDF 나누기</h2>
                    </div>
                    <div className="p-8">
                        <p className="text-gray-600 mb-6">필요한 페이지만 쏙쏙 골라내거나, 모든 페이지를 낱장으로 분리할 수 있습니다.</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">A. 모든 페이지 분리</h3>
                                <p className="text-sm text-gray-600">
                                    10페이지짜리 문서를 10개의 파일로 나눕니다.<br />
                                    각각의 파일은 <code>page_1.pdf</code>, <code>page_2.pdf</code> 형식으로 저장됩니다.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">B. 특정 페이지 추출</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    원하는 페이지만 지정해서 추출합니다.
                                </p>
                                <code className="block bg-white p-2 rounded border border-gray-200 text-xs text-gray-800">
                                    예: 1, 3-5, 7<br />
                                    (1페이지, 3~5페이지, 7페이지만 포함)
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Convert Guide */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-purple-50 px-8 py-4 border-b border-purple-100 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">3</span>
                        <h2 className="text-2xl font-bold text-gray-900">PDF를 이미지로</h2>
                    </div>
                    <div className="p-8">
                        <p className="text-gray-600 mb-6">PDF 문서를 이미지 파일(JPG, PNG)로 변환하여 블로그, SNS 등에 쉽게 공유하세요.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold">•</span>
                                <p className="text-gray-700"><strong>고화질 변환:</strong> 1배(기본)부터 3배(초고화질)까지 품질 선택 가능</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 font-bold">•</span>
                                <p className="text-gray-700"><strong>일괄 다운로드:</strong> 모든 페이지가 변환되어 하나의 압축 파일(.zip)로 저장됩니다.</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
