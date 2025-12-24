import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage document head (Title, Meta tags, Link tags)
 * @param {Object} seoData
 * @param {string} seoData.title - Page title
 * @param {string} seoData.description - Meta description
 * @param {string} [seoData.canonicalPath] - Canonical URL path (relative)
 * @param {string} [seoData.ogImage] - Open Graph Image URL (absolute or relative)
 * @param {string} [seoData.ogType] - Open Graph Type (website, article, etc.)
 */
export function useSEO({
    title,
    description,
    canonicalPath,
    ogImage = '/og-image.jpg',
    ogType = 'website'
}) {
    const location = useLocation();

    // If canonicalPath is not provided, use the current path
    const effectiveCanonicalPath = canonicalPath !== undefined ? canonicalPath : location.pathname.substring(1);
    const baseUrl = 'https://pdf-cooker.web.app';
    const fullUrl = `${baseUrl}/${effectiveCanonicalPath}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    useEffect(() => {
        // 1. Update Title
        if (title) {
            document.title = title;
        }

        // Helper to update or create meta tags
        const setMetaTag = (selector, attribute, value) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');

                // Set attributes based on the selector string manually for simplicity or match regex
                // Simpler: assume the selector is like 'meta[name="..."]' or 'meta[property="..."]'
                if (selector.includes('name="')) {
                    element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
                } else if (selector.includes('property="')) {
                    element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
                }

                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        // Helper to update or create link tags
        const setLinkTag = (rel, href) => {
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
        };

        // 2. Update Standard Meta Tags
        if (description) {
            setMetaTag('meta[name="description"]', 'content', description);
        }

        // 3. Update Canonical Link
        setLinkTag('canonical', fullUrl);

        // 4. Update Open Graph Tags
        if (title) setMetaTag('meta[property="og:title"]', 'content', title);
        if (description) setMetaTag('meta[property="og:description"]', 'content', description);
        setMetaTag('meta[property="og:url"]', 'content', fullUrl);
        setMetaTag('meta[property="og:type"]', 'content', ogType);
        setMetaTag('meta[property="og:image"]', 'content', fullOgImage);

        // 5. Update Twitter Tags
        if (title) setMetaTag('meta[property="twitter:title"]', 'content', title);
        if (description) setMetaTag('meta[property="twitter:description"]', 'content', description);
        setMetaTag('meta[property="twitter:url"]', 'content', fullUrl);
        setMetaTag('meta[property="twitter:image"]', 'content', fullOgImage);
        // Default card type
        setMetaTag('meta[property="twitter:card"]', 'content', 'summary_large_image');

    }, [title, description, effectiveCanonicalPath, fullUrl, fullOgImage, ogType]);
}
