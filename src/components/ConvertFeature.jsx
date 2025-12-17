import { useState } from 'react';
import { FileText, Image } from 'lucide-react';
import FileUploader from './FileUploader';
import { convertPDFToImages, getPDFMetadata } from '../utils/pdfHandler';

import AdConfirmationModal from './AdConfirmationModal';

export default function ConvertFeature() {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [format, setFormat] = useState('jpeg'); // 'jpeg' or 'png'
    const [quality, setQuality] = useState(2); // Scale factor
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAdModal, setShowAdModal] = useState(false);

    const handleFileSelected = async (files) => {
        const selectedFile = files[0];
        setFile(selectedFile);

        try {
            const meta = await getPDFMetadata(selectedFile);
            setMetadata(meta);
        } catch (error) {
            alert('PDF 정보를 가져올 수 없습니다.');
            setFile(null);
            setMetadata(null);
        }
    };

    const handleConvertClick = () => {
        if (!file) {
            alert('PDF 파일을 먼저 업로드해주세요.');
            return;
        }
        setShowAdModal(true);
    };

    const processConvert = async () => {
        setIsProcessing(true);
        try {
            await convertPDFToImages(file, {
                format,
                scale: quality,
            });
            alert('PDF를 이미지로 변환 완료! images.zip 파일이 다운로드됩니다.');
        } catch (error) {
            alert(error.message || 'PDF 변환 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setMetadata(null);
    };

    return (
        <div className="space-y-6">
            {!file ? (
                <FileUploader
                    onFilesSelected={handleFileSelected}
                    multiple={false}
                />
            ) : (
                <div className="card">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-primary-600" />
                            <div>
                                <h3 className="font-semibold text-gray-800">{metadata?.fileName}</h3>
                                <p className="text-sm text-gray-500">
                                    {metadata?.numPages}페이지 · {(metadata?.fileSize / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleReset}
                            className="btn-secondary text-sm"
                        >
                            다른 파일 선택
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Format Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                이미지 포맷
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="format"
                                        value="jpeg"
                                        checked={format === 'jpeg'}
                                        onChange={(e) => setFormat(e.target.value)}
                                    />
                                    <div>
                                        <div className="font-medium text-gray-800">JPG</div>
                                        <div className="text-sm text-gray-500">작은 파일 크기</div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="format"
                                        value="png"
                                        checked={format === 'png'}
                                        onChange={(e) => setFormat(e.target.value)}
                                    />
                                    <div>
                                        <div className="font-medium text-gray-800">PNG</div>
                                        <div className="text-sm text-gray-500">높은 품질</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Quality Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                이미지 품질
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.5"
                                    value={quality}
                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>낮음 (1x)</span>
                                    <span className="font-semibold text-primary-600">
                                        {quality === 1 ? '낮음' : quality === 1.5 ? '보통' : quality === 2 ? '높음' : quality === 2.5 ? '매우 높음' : '최고'}
                                    </span>
                                    <span>최고 (3x)</span>
                                </div>
                            </div>
                        </div>

                        {/* Preview Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Image className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">변환 정보</p>
                                    <p>
                                        총 <strong>{metadata?.numPages}개</strong>의 이미지가 생성되며,
                                        <strong> images.zip</strong> 파일로 다운로드됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConvertClick}
                            disabled={isProcessing}
                            className="btn-primary w-full relative"
                        >
                            {isProcessing ? (
                                <>
                                    <span className="opacity-0">이미지로 변환</span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span className="ml-2">변환 중...</span>
                                    </div>
                                </>
                            ) : (
                                '이미지로 변환'
                            )}
                        </button>
                    </div>
                </div>
            )}

            <AdConfirmationModal
                isOpen={showAdModal}
                onClose={() => setShowAdModal(false)}
                onConfirm={processConvert}
            />
        </div>
    );
}
