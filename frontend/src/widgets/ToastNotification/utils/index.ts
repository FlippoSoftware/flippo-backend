import * as messageByKey from "@shared/i18n/messageByKey.utils";
import { attach, createEvent, sample } from "effector";

import { createErrorNotification, type TToastCreate } from "../models/ToastContainerStorage";

const errorMessageByKeyFx = attach({ effect: messageByKey.errorMessageByKeyFx });
export const errorToastDisplay = createEvent<{ key: string; namespace?: string }>();

sample({
  clock: errorToastDisplay,
  fn: ({ key, namespace }) => {
    return { key, namespace };
  },
  target: errorMessageByKeyFx
});

sample({
  clock: errorMessageByKeyFx.doneData,
  fn: (message): TToastCreate => {
    return { message };
  },
  target: createErrorNotification
});

sample({
  clock: errorMessageByKeyFx.fail,
  fn: (): TToastCreate => {
    return { message: "ERROR: It is unknown what happened" };
  },
  target: createErrorNotification
});
