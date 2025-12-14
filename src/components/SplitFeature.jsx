import { useState } from 'react';
import { FileText } from 'lucide-react';
import FileUploader from './FileUploader';
import { splitPDF, getPDFMetadata } from '../utils/pdfHandler';

export default function SplitFeature() {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [splitMode, setSplitMode] = useState('all'); // 'all' or 'range'
    const [pageRange, setPageRange] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

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

    const handleSplit = async () => {
        if (!file) {
            alert('PDF 파일을 먼저 업로드해주세요.');
            return;
        }

        if (splitMode === 'range' && !pageRange.trim()) {
            alert('페이지 범위를 입력해주세요. (예: 1,3-5)');
            return;
        }

        setIsProcessing(true);
        try {
            await splitPDF(file, {
                splitAll: splitMode === 'all',
                pageRange: splitMode === 'range' ? pageRange : null,
            });
            alert('PDF 분할이 완료되었습니다!');
        } catch (error) {
            alert(error.message || 'PDF 분할 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setMetadata(null);
        setPageRange('');
        setSplitMode('all');
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

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                분할 방식 선택
                            </label>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="splitMode"
                                        value="all"
                                        checked={splitMode === 'all'}
                                        onChange={(e) => setSplitMode(e.target.value)}
                                        className="mt-1"
                                    />
                                    <div>
                                        <div className="font-medium text-gray-800">모든 페이지를 낱개로 분리</div>
                                        <div className="text-sm text-gray-500">
                                            각 페이지를 개별 PDF 파일로 저장합니다
                                        </div>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="splitMode"
                                        value="range"
                                        checked={splitMode === 'range'}
                                        onChange={(e) => setSplitMode(e.target.value)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-800 mb-2">특정 페이지만 추출</div>
                                        <input
                                            type="text"
                                            placeholder="예: 1,3-5,7 (1페이지, 3~5페이지, 7페이지)"
                                            value={pageRange}
                                            onChange={(e) => setPageRange(e.target.value)}
                                            disabled={splitMode !== 'range'}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                        <div className="text-sm text-gray-500 mt-1">
                                            전체 {metadata?.numPages}페이지 중 원하는 페이지를 선택하세요
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={handleSplit}
                            disabled={isProcessing}
                            className="btn-primary w-full relative"
                        >
                            {isProcessing ? (
                                <>
                                    <span className="opacity-0">PDF 나누기</span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span className="ml-2">처리 중...</span>
                                    </div>
                                </>
                            ) : (
                                'PDF 나누기'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
