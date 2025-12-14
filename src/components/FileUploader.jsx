import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * FileUploader Component
 * Reusable drag-and-drop file upload component
 */
export default function FileUploader({
    onFilesSelected,
    accept = { 'application/pdf': ['.pdf'] },
    multiple = true,
    maxSize = 50 * 1024 * 1024, // 50MB default
    className = ''
}) {
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            const errors = rejectedFiles.map(({ file, errors }) => {
                const errorMessages = errors.map(e => {
                    if (e.code === 'file-too-large') return `${file.name}: 파일이 너무 큽니다 (최대 ${maxSize / 1024 / 1024}MB)`;
                    if (e.code === 'file-invalid-type') return `${file.name}: PDF 파일만 업로드 가능합니다`;
                    return `${file.name}: ${e.message}`;
                });
                return errorMessages.join(', ');
            });
            alert(errors.join('\n'));
        }

        if (acceptedFiles.length > 0) {
            onFilesSelected(acceptedFiles);
        }
    }, [onFilesSelected, maxSize]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple,
        maxSize,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200',
                isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50',
                className
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
                {isDragActive ? (
                    <>
                        <Upload className="w-16 h-16 text-primary-500 animate-bounce" />
                        <p className="text-lg font-semibold text-primary-600">
                            파일을 여기에 놓으세요
                        </p>
                    </>
                ) : (
                    <>
                        <FileText className="w-16 h-16 text-gray-400" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700 mb-2">
                                PDF 파일을 드래그하거나 클릭하여 업로드
                            </p>
                            <p className="text-sm text-gray-500">
                                {multiple ? '여러 파일 선택 가능' : '파일 하나만 선택 가능'} (최대 {maxSize / 1024 / 1024}MB)
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
