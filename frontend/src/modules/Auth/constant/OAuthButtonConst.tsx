import { GoogleIcon } from "@icons/GoogleIcon";
import { VKIcon } from "@icons/VKIcon";
import { YandexIcon } from "@icons/YandexIcon";

import type { ReactElement } from "react";
import type { TAuthProvider } from "@utils/query/getOAuthUrl.utils";

const SIZE = { width: 24, height: 24 };

const providerIcons: { [key in TAuthProvider]: ReactElement<any> } = {
  google: <GoogleIcon {...SIZE} />,
  vkontakte: <VKIcon {...SIZE} />,
  yandexID: <YandexIcon {...SIZE} />
};

const providerNames: { [key in TAuthProvider]: string } = {
  google: "Google",
  vkontakte: "VK",
  yandexID: "Яндекс ID"
};

export { providerIcons, providerNames };
