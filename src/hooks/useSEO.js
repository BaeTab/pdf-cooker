import { useEffect } from 'react';

/**
 * Custom hook to manage document head (Title, Meta tags)
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} canonicalPath - Canonical URL path (optional)
 */
export function useSEO(title, description, canonicalPath = '') {
    useEffect(() => {
        // Update Title
        const prevTitle = document.title;
        document.title = title;

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        const prevDescription = metaDescription?.getAttribute('content');
        if (metaDescription && description) {
            metaDescription.setAttribute('content', description);
        }

        // Update Canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        const prevCanonical = canonicalLink?.getAttribute('href');
        if (canonicalLink) {
            const baseUrl = 'https://pdf-cooker.web.app'; // Production URL
            canonicalLink.setAttribute('href', `${baseUrl}/${canonicalPath}`);
        }

        return () => {
            // Cleanup (optional: revert to previous state)
        };
    }, [title, description, canonicalPath]);
}
