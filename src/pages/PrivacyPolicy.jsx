import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('policies.privacy.title')}</h1>

            <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
                <p className="text-sm text-gray-500">{t('policies.privacy.last_updated')}</p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.privacy.intro.title')}</h2>
                    <p>{t('policies.privacy.intro.content')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.privacy.security.title')}</h2>
                    <p className="font-semibold text-primary-700 bg-primary-50 p-4 rounded-lg">
                        {t('policies.privacy.security.content')}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.privacy.collection.title')}</h2>
                    <p>{t('policies.privacy.collection.content1')}</p>
                    <p>{t('policies.privacy.collection.content2')}</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        {(t('policies.privacy.collection.list', { returnObjects: true }) || []).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.privacy.adsense.title')}</h2>
                    <p>{t('policies.privacy.adsense.content')}</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        {(t('policies.privacy.adsense.list', { returnObjects: true }) || []).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.privacy.analytics.title')}</h2>
                    <p>{t('policies.privacy.analytics.content')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{t('policies.privacy.contact.title')}</h2>
                    <p>{t('policies.privacy.contact.content')}</p>
                    <p className="mt-2">{t('policies.privacy.contact.email')}</p>
                </section>
            </div>
        </div>
    );
}
