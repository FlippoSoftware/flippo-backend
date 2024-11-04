// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ru from "../../../messages/ru.json";

type Messages = typeof ru;

declare global {
  interface IntlMessages extends Messages {}
}
