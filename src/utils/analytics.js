/**
 * Google Analytics 4 (GA4) Utility Functions
 * 
 * Usage:
 * 1. Replace 'G-XXXXXXXXXX' in index.html with your actual GA4 Measurement ID
 * 2. Import this file: import { trackEvent, trackPageView } from './utils/analytics'
 * 3. Call trackEvent() to track custom events
 */

/**
 * Track custom events in Google Analytics
 * @param {string} eventName - Name of the event (e.g., 'pdf_merge', 'pdf_split')
 * @param {Object} eventParams - Additional parameters for the event
 */
export function trackEvent(eventName, eventParams = {}) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventParams);
    }
}

/**
 * Track page views
 * @param {string} pageTitle - Title of the page
 * @param {string} pagePath - Path of the page
 */
export function trackPageView(pageTitle, pagePath) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
            page_title: pageTitle,
            page_path: pagePath,
        });
    }
}

/**
 * Track PDF operations
 */
export const PDFEvents = {
    // PDF Merge Events
    mergePDFStart: (fileCount) => {
        trackEvent('pdf_merge_start', {
            event_category: 'PDF Operations',
            event_label: 'Merge Start',
            value: fileCount,
        });
    },

    mergePDFSuccess: (fileCount, totalSize) => {
        trackEvent('pdf_merge_success', {
            event_category: 'PDF Operations',
            event_label: 'Merge Success',
            file_count: fileCount,
            total_size_mb: (totalSize / 1024 / 1024).toFixed(2),
        });
    },

    mergePDFError: (errorMessage) => {
        trackEvent('pdf_merge_error', {
            event_category: 'PDF Operations',
            event_label: 'Merge Error',
            error_message: errorMessage,
        });
    },

    // PDF Split Events
    splitPDFStart: (splitMode, pageCount) => {
        trackEvent('pdf_split_start', {
            event_category: 'PDF Operations',
            event_label: 'Split Start',
            split_mode: splitMode, // 'all' or 'range'
            page_count: pageCount,
        });
    },

    splitPDFSuccess: (splitMode, outputCount) => {
        trackEvent('pdf_split_success', {
            event_category: 'PDF Operations',
            event_label: 'Split Success',
            split_mode: splitMode,
            output_count: outputCount,
        });
    },

    splitPDFError: (errorMessage) => {
        trackEvent('pdf_split_error', {
            event_category: 'PDF Operations',
            event_label: 'Split Error',
            error_message: errorMessage,
        });
    },

    // PDF to Image Events
    convertPDFStart: (format, quality, pageCount) => {
        trackEvent('pdf_convert_start', {
            event_category: 'PDF Operations',
            event_label: 'Convert Start',
            format: format, // 'jpeg' or 'png'
            quality: quality,
            page_count: pageCount,
        });
    },

    convertPDFSuccess: (format, quality, pageCount) => {
        trackEvent('pdf_convert_success', {
            event_category: 'PDF Operations',
            event_label: 'Convert Success',
            format: format,
            quality: quality,
            page_count: pageCount,
        });
    },

    convertPDFError: (errorMessage) => {
        trackEvent('pdf_convert_error', {
            event_category: 'PDF Operations',
            event_label: 'Convert Error',
            error_message: errorMessage,
        });
    },

    // File Upload Events
    fileUpload: (fileCount, totalSize) => {
        trackEvent('file_upload', {
            event_category: 'User Interaction',
            event_label: 'File Upload',
            file_count: fileCount,
            total_size_mb: (totalSize / 1024 / 1024).toFixed(2),
        });
    },

    // Tab Navigation Events
    tabChange: (tabName) => {
        trackEvent('tab_change', {
            event_category: 'User Interaction',
            event_label: 'Tab Change',
            tab_name: tabName,
        });
    },
};
