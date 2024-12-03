import { Auth } from '@modules/auth';
import { useTranslation } from 'react-i18next';

function Page() {
  const { i18n, t } = useTranslation();

  return (
    <>
      <p style={{ color: 'white', fontSize: '40px' }}>{t('RootLayout.title')}</p>
      <Auth />
      <button
        onClick={() => {
          i18n.changeLanguage('en').catch(() => {
            'Fail change language';
          });
        }}
      >
        {'English'}
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage('ru').catch(() => {
            'Fail change language';
          });
        }}
      >
        {'Русский'}
      </button>
    </>
  );
}

export default Page;
