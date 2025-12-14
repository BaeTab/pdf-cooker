import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Merge multiple PDF files into one
 * @param {File[]} files - Array of PDF files to merge
 * @returns {Promise<void>}
 */
export async function mergePDFs(files) {
    try {
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'merged.pdf');
    } catch (error) {
        console.error('Error merging PDFs:', error);
        throw new Error('PDF 병합 중 오류가 발생했습니다.');
    }
}

/**
 * Split PDF into individual pages or extract specific pages
 * @param {File} file - PDF file to split
 * @param {Object} options - Split options
 * @param {boolean} options.splitAll - Split all pages individually
 * @param {string} options.pageRange - Page range (e.g., "1,3-5")
 * @returns {Promise<void>}
 */
export async function splitPDF(file, options = {}) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const totalPages = pdfDoc.getPageCount();

        if (options.splitAll) {
            // Split all pages individually
            for (let i = 0; i < totalPages; i++) {
                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                newPdf.addPage(copiedPage);

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                saveAs(blob, `page_${i + 1}.pdf`);
            }
        } else if (options.pageRange) {
            // Extract specific pages
            const pageIndices = parsePageRange(options.pageRange, totalPages);
            const newPdf = await PDFDocument.create();

            for (const pageIndex of pageIndices) {
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
                newPdf.addPage(copiedPage);
            }

            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(blob, 'extracted_pages.pdf');
        }
    } catch (error) {
        console.error('Error splitting PDF:', error);
        throw new Error('PDF 분할 중 오류가 발생했습니다.');
    }
}

/**
 * Convert PDF pages to images and download as ZIP
 * @param {File} file - PDF file to convert
 * @param {Object} options - Conversion options
 * @param {string} options.format - Image format ('png' or 'jpeg')
 * @param {number} options.scale - Scale factor for rendering (default: 2)
 * @returns {Promise<void>}
 */
export async function convertPDFToImages(file, options = {}) {
    const { format = 'jpeg', scale = 2 } = options;

    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        const zip = new JSZip();

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });

            // Create canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page to canvas
            await page.render({
                canvasContext: context,
                viewport: viewport,
            }).promise;

            // Convert canvas to blob
            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, `image/${format}`, 0.95);
            });

            // Add to zip
            const extension = format === 'jpeg' ? 'jpg' : 'png';
            zip.file(`page_${pageNum}.${extension}`, blob);

            // Clean up
            canvas.remove();
        }

        // Generate and download zip
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'images.zip');
    } catch (error) {
        console.error('Error converting PDF to images:', error);
        throw new Error('PDF를 이미지로 변환하는 중 오류가 발생했습니다.');
    }
}

/**
 * Parse page range string into array of page indices
 * @param {string} rangeStr - Range string (e.g., "1,3-5,7")
 * @param {number} totalPages - Total number of pages
 * @returns {number[]} Array of page indices (0-based)
 */
function parsePageRange(rangeStr, totalPages) {
    const indices = new Set();
    const parts = rangeStr.split(',').map(s => s.trim());

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim()));
            if (isNaN(start) || isNaN(end)) continue;

            for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
                indices.add(i - 1); // Convert to 0-based index
            }
        } else {
            const pageNum = parseInt(part);
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
                indices.add(pageNum - 1); // Convert to 0-based index
            }
        }
    }

    return Array.from(indices).sort((a, b) => a - b);
}

/**
 * Get PDF metadata
 * @param {File} file - PDF file
 * @returns {Promise<Object>} PDF metadata
 */
export async function getPDFMetadata(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        return {
            numPages: pdf.numPages,
            fileName: file.name,
            fileSize: file.size,
        };
    } catch (error) {
        console.error('Error getting PDF metadata:', error);
        throw new Error('PDF 정보를 가져오는 중 오류가 발생했습니다.');
    }
}
