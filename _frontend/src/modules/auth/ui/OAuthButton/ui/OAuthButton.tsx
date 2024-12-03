import { UnstyledButton } from '@shared/ui/Button';
import { clsx } from 'clsx';

import type { TOAuthButtonProps } from '../types/TOAuthButtonProps';

import { PROVIDER_ICONS } from '../../../constant';
import st from './OAuthButton.module.scss';

function OAuthButton(props: TOAuthButtonProps) {
  const { children, provider, ...otherProps } = props;

  return (
    <UnstyledButton as={'button'} className={clsx(st.button, st[provider])} {...otherProps}>
      <div className={st.content}>
        <div className={st.icon}>{PROVIDER_ICONS[provider]}</div>
        <span>{children}</span>
      </div>
    </UnstyledButton>
  );
}

export default OAuthButton;
