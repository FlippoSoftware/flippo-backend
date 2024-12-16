import { EnIcon, RuIcon } from '@shared/icons';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { type TLanguageSwitchProps } from '../types/TLanguageSwitchProps';
import st from './LanguageSwitch.module.scss';

const SPRING = { damping: 15, type: 'spring' };

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
        {isRu ? <motion.div className={st.switch} layoutId={'switch'} transition={SPRING} /> : null}
      </div>
      <div className={!isRu ? st.checked : ''} role={'presentation'}>
        <EnIcon />
        <span>{'Eng'}</span>
        {!isRu ? <motion.div className={st.switch} layoutId={'switch'} transition={SPRING} /> : null}
      </div>
    </label>
  );
}

export default LanguageSwitch;
