import { ExternalLink } from 'lucide-react';

/**
 * Ad confirmation modal that requires user to click an ad link before proceeding.
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to close the modal
 * @param {function} onConfirm - Function to execute the actual action (download)
 */
export default function AdConfirmationModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    const handleAdClick = () => {
        // 1. Open Ad Link in new tab
        const adUrl = 'https://deg.kr/799c1ba';
        window.open(adUrl, '_blank');

        // 2. Execute the confirmed action (download) after a short delay
        // This delay ensures the new tab opens smoothly before the browser executes the download logic
        setTimeout(() => {
            onConfirm();
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center transform transition-all scale-100 border border-gray-100"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎁</span>
                </div>

                <h3 id="modal-title" className="text-xl font-bold text-gray-900 mb-2">
                    다운로드 준비 완료!
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    무료 서비스 유지를 위해 <span className="font-semibold text-primary-600">제휴 사이트</span>를 방문해주시면<br />
                    <span className="font-bold underline decoration-primary-300 decoration-2 underline-offset-2">즉시 다운로드가 시작됩니다.</span>
                </p>

                <div className="space-y-3">
                    <button
                        onClick={handleAdClick}
                        className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary-200 flex items-center justify-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="font-bold">🚀 제휴 사이트 방문 & 다운로드</span>
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={onClose}
                        className="text-sm text-gray-400 hover:text-gray-600 underline py-2"
                    >
                        다음에 할게요 (취소)
                    </button>
                </div>
            </div>
        </div>
    );
}
