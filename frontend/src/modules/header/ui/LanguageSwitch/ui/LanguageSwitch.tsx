import { EnIcon, RuIcon } from '@shared/icons';
import { useMemo } from 'react';

import { type TLanguageSwitchProps } from '../types/TLanguageSwitchProps';
import st from './LanguageSwitch.module.scss';

function LanguageSwitch(props: TLanguageSwitchProps) {
  const { language, onLanguageSwitch } = props;

  const isRu = useMemo(() => language === 'ru', [language]);

  return (
    <label className={st.toggleSwitch}>
      <input
        aria-labelledby={props['aria-labelledby'] || ''}
        checked={isRu}
        onChange={onLanguageSwitch}
        type={'checkbox'}
      />
      <div className={isRu ? st.checked : ''} role={'presentation'}>
        <RuIcon />
        <span>{'Рус'}</span>
      </div>
      <div className={!isRu ? st.checked : ''} role={'presentation'}>
        <EnIcon />
        <span>{'Eng'}</span>
      </div>
      <div className={st.switch} data-ru={isRu} />
    </label>
  );
}

export default LanguageSwitch;
