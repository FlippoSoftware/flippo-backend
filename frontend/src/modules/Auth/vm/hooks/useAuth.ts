import { useUnit } from "effector-react";
import { useEffect, useRef } from "react";

import { $modalAuthContent, modalAuthClear } from "../models/auth.store";

const useAuth = () => {
  const [modalContent, onModalAuthClear] = useUnit([$modalAuthContent, modalAuthClear]);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();

    return () => {
      onModalAuthClear();
    };
  }, [onModalAuthClear]);

  return { modalRef, modalContent };
};

export { useAuth };
