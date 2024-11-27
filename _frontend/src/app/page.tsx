import { useTranslation } from 'react-i18next';

function Page() {
  const { i18n, t } = useTranslation();

  return (
    <>
      <p style={{ color: 'white', fontSize: '40px' }}>{t('RootLayout.title')}</p>
      <button
        onClick={() => {
          i18n.changeLanguage('en').catch(() => {
            'Fail change language';
          });
        }}
      >
        {'English'}
      </button>
    </>
  );
}

export default Page;
