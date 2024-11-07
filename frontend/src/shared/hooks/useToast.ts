import { useUnit } from "effector-react";

import { ToastApi } from "@widgets/ToastContainer";

const useToast = () => {
  const toastApi = useUnit(ToastApi);

  return toastApi;
};

export { useToast };
