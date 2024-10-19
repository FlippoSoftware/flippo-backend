"use client";

import { Auth } from "@modules/Auth";
import { NextModal } from "@ui/Modal";

function Callback() {
  return (
    <NextModal>
      <Auth type={"callback"} />
    </NextModal>
  );
}

export default Callback;
