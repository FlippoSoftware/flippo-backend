"use client";

import { useRouter } from "next/navigation";

import { Modal } from "@ui/Modal";

type NextModalProps = {
  children: React.ReactNode;
  className?: string;
};

function NextModal(props: NextModalProps) {
  const { children, className } = props;
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal className={className} onClose={onClose}>
      {children}
      {";\r"}
    </Modal>
  );
}

export default NextModal;
