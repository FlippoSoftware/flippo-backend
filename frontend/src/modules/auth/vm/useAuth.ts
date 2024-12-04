import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { $authContent } from '../models/auth.model';

const useAuth = () => {
  const authContent = useUnit($authContent);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();
  }, []);

  return { authContent, modalRef };
};

export { useAuth };
