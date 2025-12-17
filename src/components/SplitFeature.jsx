import { useState } from 'react';
import { FileText, Download, RotateCcw } from 'lucide-react';
import FileUploader from './FileUploader';
import { splitPDF, getPDFMetadata } from '../utils/pdfHandler';
import AdConfirmationModal from './AdConfirmationModal';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export default function SplitFeature() {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [splitMode, setSplitMode] = useState('all'); // 'all' or 'range'
    const [pageRange, setPageRange] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAdModal, setShowAdModal] = useState(false);
    const [results, setResults] = useState(null); // Array of { blob, name }

    const handleFileSelected = async (files) => {
        const selectedFile = files[0];
        setFile(selectedFile);
        setResults(null);

        try {
            const meta = await getPDFMetadata(selectedFile);
            setMetadata(meta);
        } catch (error) {
            console.error('Error loading PDF metadata:', error);
            alert('PDF 정보를 가져올 수 없습니다. 파일이 손상되었거나 암호화되어 있을 수 있습니다.');
            setFile(null);
            setMetadata(null);
        }
    };

    const handleSplitClick = async () => {
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
            const splitResults = await splitPDF(file, {
                splitAll: splitMode === 'all',
                pageRange: splitMode === 'range' ? pageRange : null,
            });
            setResults(splitResults);
        } catch (error) {
            alert(error.message || 'PDF 분할 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownloadClick = () => {
        setShowAdModal(true);
    };

    const processDownload = async () => {
        if (!results || results.length === 0) return;

        if (results.length === 1) {
            // Single file download
            saveAs(results[0].blob, results[0].name);
        } else {
            // Multiple files - zip them
            const zip = new JSZip();
            results.forEach(item => {
                zip.file(item.name, item.blob);
            });
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'split_pages.zip');
        }
    };

    const handleReset = () => {
        setFile(null);
        setMetadata(null);
        setPageRange('');
        setSplitMode('all');
        setResults(null);
    };

    return (
        <div className="space-y-6">
            {!file ? (
                <FileUploader
                    onFilesSelected={handleFileSelected}
                    multiple={false}
                />
            ) : !results ? (
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
                            onClick={handleSplitClick}
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
            ) : (
                <div className="card text-center py-10 fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        PDF 분할 완료!
                    </h3>
                    <p className="text-gray-600 mb-8">
                        총 {results.length}개의 파일이 준비되었습니다.<br />
                        {results.length > 1 ? 'ZIP 파일로 한 번에 다운로드됩니다.' : '아래 버튼을 눌러 다운로드하세요.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDownloadClick}
                            className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            다운로드
                        </button>

                        <button
                            onClick={handleReset}
                            className="btn-secondary text-lg px-8 py-3 flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            처음으로
                        </button>
                    </div>
                </div>
            )}

            <AdConfirmationModal
                isOpen={showAdModal}
                onClose={() => setShowAdModal(false)}
                onConfirm={processDownload}
            />
        </div>
    );
}
