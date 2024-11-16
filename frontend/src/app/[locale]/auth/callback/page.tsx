"use client";

import { ModalAuth } from "@modules/Auth";
import { NextModal } from "@ui/Modal";

function Callback() {
  return (
    <NextModal>
      <ModalAuth type={"oauthCallback"} />
    </NextModal>
  );
}

export default Callback;
