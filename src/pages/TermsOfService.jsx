import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('policies.terms.title')}</h1>

            <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
                <p className="text-sm text-gray-500">{t('policies.terms.last_updated')}</p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.terms.purpose.title')}</h2>
                    <p>{t('policies.terms.purpose.content')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.terms.service.title')}</h2>
                    <p>{t('policies.terms.service.content')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.terms.disclaimer.title')}</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        {(t('policies.terms.disclaimer.list', { returnObjects: true }) || []).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.terms.copyright.title')}</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        {(t('policies.terms.copyright.list', { returnObjects: true }) || []).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.terms.prohibited.title')}</h2>
                    <p>{t('policies.terms.prohibited.content')}</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        {(t('policies.terms.prohibited.list', { returnObjects: true }) || []).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.terms.law.title')}</h2>
                    <p>{t('policies.terms.law.content')}</p>
                </section>
            </div>
        </div>
    );
}
