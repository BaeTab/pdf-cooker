import React from 'react';
import { useSEO } from '../hooks/useSEO';

export default function FAQ() {
    useSEO(
        '자주 묻는 질문 (FAQ) - PDF Cooker 보안 및 사용법',
        'PDF Cooker 사용 시 궁금한 점을 해결해 드립니다. 보안, 비용, 파일 크기 제한, 모바일 지원 여부 등을 확인하세요.'
    );

    const faqs = [
        {
            q: "정말 서버로 파일이 전송되지 않나요?",
            a: "네, 확실합니다. PDF Cooker는 '클라이언트 사이드' 기술을 사용하여 모든 작업을 사용자의 브라우저 내부에서만 처리합니다. 즉, 파일이 인터넷을 통해 다른 곳(서버)으로 업로드되지 않으므로 개인정보 유출 위험이 전혀 없습니다."
        },
        {
            q: "사용료는 얼마인가요?",
            a: "100% 무료입니다. 기능 제한이나 사용 횟수 제한 없이 모든 기능을 무료로 이용하실 수 있습니다. 회원가입이나 카드 정보 입력도 필요하지 않습니다."
        },
        {
            q: "파일 크기 제한이 있나요?",
            a: "서버가 아닌 사용자의 브라우저 메모리(RAM)를 사용하기 때문에, 사용 중인 기기(컴퓨터/스마트폰)의 성능에 따라 처리 가능한 크기가 달라집니다. 일반적으로 100MB 이하의 파일은 문제없이 처리되며, 최신 PC에서는 그 이상도 가능합니다."
        },
        {
            q: "인터넷 연결이 끊겨도 사용할 수 있나요?",
            a: "네, 가능합니다. PWA(Progressive Web App) 기술이 적용되어 있어, 사이트에 한 번 접속한 후에는 오프라인 상태에서도 대부분의 기능을 사용할 수 있습니다."
        },
        {
            q: "암호화된 PDF도 처리할 수 있나요?",
            a: "죄송합니다만, 암호가 걸려 있는 PDF 파일은 보안상의 이유로 현재 지원하지 않습니다. 암호를 해제한 후 업로드해 주시기 바랍니다."
        },
        {
            q: "모바일에서도 사용할 수 있나요?",
            a: "네, 반응형 디자인이 적용되어 있어 스마트폰, 태블릿 등 모바일 기기에서도 PC와 동일하게 모든 기능을 사용하실 수 있습니다."
        },
        {
            q: "여러 JPG 파일을 하나의 PDF로 묶을 수 있나요?",
            a: "현재는 PDF 파일 간의 병합만 지원합니다. 이미지 파일을 PDF로 변환하여 병합하는 기능은 추후 업데이트될 예정입니다."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
                <p className="text-xl text-gray-600">궁금한 점을 빠르게 확인해보세요</p>
            </div>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                            <span className="text-primary-600 text-xl font-extrabold">Q.</span>
                            {faq.q}
                        </h3>
                        <p className="text-gray-600 pl-8 leading-relaxed">
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
