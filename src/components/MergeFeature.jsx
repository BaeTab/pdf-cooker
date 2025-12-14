import { useState } from 'react';
import { ArrowUp, ArrowDown, X, FileText } from 'lucide-react';
import FileUploader from './FileUploader';
import { mergePDFs } from '../utils/pdfHandler';
import { cn } from '../utils/cn';
import { PDFEvents } from '../utils/analytics';

export default function MergeFeature() {
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFilesSelected = (newFiles) => {
        setFiles(prev => [...prev, ...newFiles]);

        // Track file upload
        const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
        PDFEvents.fileUpload(newFiles.length, totalSize);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const moveFile = (index, direction) => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === files.length - 1)
        ) {
            return;
        }

        const newFiles = [...files];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
        setFiles(newFiles);
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            alert('최소 2개 이상의 PDF 파일이 필요합니다.');
            return;
        }

        const totalSize = files.reduce((sum, file) => sum + file.size, 0);
        PDFEvents.mergePDFStart(files.length);

        setIsProcessing(true);
        try {
            await mergePDFs(files);
            PDFEvents.mergePDFSuccess(files.length, totalSize);
            alert('PDF 병합이 완료되었습니다!');
            setFiles([]);
        } catch (error) {
            PDFEvents.mergePDFError(error.message || 'Unknown error');
            alert(error.message || 'PDF 병합 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <FileUploader
                onFilesSelected={handleFilesSelected}
                multiple={true}
            />

            {files.length > 0 && (
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        업로드된 파일 ({files.length}개)
                    </h3>

                    <div className="space-y-2 mb-6">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 truncate">{file.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => moveFile(index, 'up')}
                                        disabled={index === 0}
                                        className={cn(
                                            'p-2 rounded hover:bg-gray-200 transition-colors',
                                            index === 0 && 'opacity-30 cursor-not-allowed'
                                        )}
                                        title="위로 이동"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => moveFile(index, 'down')}
                                        disabled={index === files.length - 1}
                                        className={cn(
                                            'p-2 rounded hover:bg-gray-200 transition-colors',
                                            index === files.length - 1 && 'opacity-30 cursor-not-allowed'
                                        )}
                                        title="아래로 이동"
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => removeFile(index)}
                                        className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
                                        title="제거"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleMerge}
                        disabled={isProcessing || files.length < 2}
                        className="btn-primary w-full relative"
                    >
                        {isProcessing ? (
                            <>
                                <span className="opacity-0">PDF 합치기</span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span className="ml-2">처리 중...</span>
                                </div>
                            </>
                        ) : (
                            'PDF 합치기'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
