import { useUnit } from "effector-react";
import { useEffect, useRef } from "react";

import { $modalContent, modalAuthClear, modalAuthClose } from "../model/store/auth.store";

const useAuth = () => {
  const [modalContent, onModalAuthClear, onModalAuthClose] = useUnit([
    $modalContent,
    modalAuthClear,
    modalAuthClose
  ]);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();

    return () => {
      onModalAuthClear();
    };
  }, [onModalAuthClear]);

  return { modalRef, modalContent, onModalAuthClose };
};

export { useAuth };
