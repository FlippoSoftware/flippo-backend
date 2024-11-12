import {
  createEffect,
  createEvent,
  createStore,
  type EventCallable,
  sample,
  split,
  type StoreWritable
} from "effector";
import { and } from "patronum";
import { type ZodSchema } from "zod";

type TInputError = null | "empty" | string;

type TManipulationTools<T> = {
  $input: StoreWritable<T>;
  $inputRef: StoreWritable<null | HTMLInputElement>;
  inputRefChanged: EventCallable<HTMLInputElement>;
  inputBlur: EventCallable<void>;
  inputFocus: EventCallable<void>;
  inputChanged: EventCallable<Exclude<T, null>>;
};

type TManipulationToolsExtension = {
  $inputError: StoreWritable<TInputError>;
  inputErrorClear: EventCallable<void>;
  inputFocusedDueError: EventCallable<void>;
  inputValidate: EventCallable<void>;
};

type TAdvancedManipulationTools<T> = TManipulationTools<T> & TManipulationToolsExtension;

type TComputedNamedManipulationTools<
  T,
  Prefix extends string,
  Source extends TManipulationTools<T> | TAdvancedManipulationTools<T>
> = {
  [key in keyof Source as key extends `$${infer Name}`
    ? `$${Prefix}${Capitalize<Name>}`
    : `${Prefix}${Capitalize<string & key>}`]: Source[key];
};

export type TNamedManipulationTools<
  T,
  Prefix extends string,
  Source extends TManipulationTools<T> | TAdvancedManipulationTools<T>
> = TComputedNamedManipulationTools<T, Prefix, Source>;

/**
 * @typedef {Object} TFieldManipulationTools
 * @property {StoreWritable<T | null>} ${name}Input
 * @property {StoreWritable<null | HTMLInputElement>} ${name}InputRef
 * @property {EventCallable<HTMLInputElement>} ${name}InputRefChanged
 * @property {EventCallable<void>} ${name}InputBlur
 * @property {EventCallable<void>} ${name}InputFocused
 * @property {EventCallable<T>} ${name}Changed
 *
 * @property {StoreWritable<TInputError>} ${name}Error
 * @property {EventCallable<void>} ${name}ErrorClear
 * @property {EventCallable<void>} ${name}InputFocusedDueError
 * @property {EventCallable<void>} ${name}InputValidated
 */

/**
 * Функция для создания инструмента манипуляции с полем ввода.
 *
 * @template T - тип данных поля
 * @param {string} name - имя поля
 * @param {?StoreWritable<T | null>} [source] - внешний стор для поля
 * @param {?ZodSchema} [schema] - Zod схема для валидации
 * @returns {TFieldManipulationTools<T>} объект с инструментами манипуляции полем
 */
export function formInputFactory<T, Prefix extends string>({
  name,
  initValue
}: {
  name: string;
  initValue: T;
}): TNamedManipulationTools<T, Prefix, TManipulationTools<T>>;

export function formInputFactory<T, Prefix extends string>({
  name,
  source
}: {
  name: string;
  source: StoreWritable<T>;
}): TNamedManipulationTools<T, Prefix, TManipulationTools<T>>;

export function formInputFactory<T, Prefix extends string>({
  name,
  initValue,
  schema
}: {
  name: string;
  initValue: T;
  schema: ZodSchema;
}): TNamedManipulationTools<T, Prefix, TAdvancedManipulationTools<T>>;

export function formInputFactory<T, Prefix extends string>({
  name,
  source,
  schema
}: {
  name: string;
  source: StoreWritable<T>;
  schema: ZodSchema;
}): TNamedManipulationTools<T, Prefix, TAdvancedManipulationTools<T>>;

export function formInputFactory<T, Prefix extends string>({
  name,
  initValue,
  source,
  schema
}: {
  name: string;
  initValue?: T;
  source?: StoreWritable<T>;
  schema?: ZodSchema;
}):
  | TNamedManipulationTools<T, Prefix, TManipulationTools<T>>
  | TNamedManipulationTools<T, Prefix, TAdvancedManipulationTools<T>> {
  if (!source) {
    if (typeof initValue === "undefined")
      throw TypeError('"initValue" must not be undefined if source is undefined');
    source = createStore<T>(initValue);
  }
  // Start of model description $input
  const $input = source;

  const inputChanged = createEvent<T>();
  const inputBlur = createEvent();
  const inputFocus = createEvent();
  const inputFocusedFx = createEffect<HTMLInputElement, void>((input) => {
    input.focus();
  });
  // End of model description $input

  // Start of model description $inputRef
  const $inputRef = createStore<null | HTMLInputElement>(null);

  const inputRefChanged = createEvent<HTMLInputElement>();
  // End of model description $inputRef

  $input.on(inputChanged, (_, input) => input);
  $inputRef.on(inputRefChanged, (_, input) => input);

  const extensionsTools = schema
    ? (() => {
        // Start of model description $inputError
        const $inputError = createStore<TInputError>(null);

        const inputValidate = createEvent();
        const inputCompletedValidate = createEvent<TInputError>();
        const inputErrorClear = createEvent();
        const inputFocusedDueError = createEvent();
        // End of model description $inputError

        $inputError.reset(inputChanged, inputErrorClear);

        sample({
          clock: inputBlur,
          source: $inputError,
          filter: $inputError.map((error) => !!error && error === "empty"),
          target: inputErrorClear
        });

        sample({
          clock: inputFocusedDueError,
          source: $inputRef,
          filter: and($inputError, $inputRef),
          fn: (input) => input as HTMLInputElement,
          target: inputFocusedFx
        });

        sample({
          clock: inputValidate,
          source: $input,
          fn: (input) => {
            const result = schema.safeParse(input);
            if (result.success) return null;

            return result.error.issues[0].message as TInputError;
          },
          target: inputCompletedValidate
        });

        split({
          source: inputCompletedValidate,
          match: (error) => (error ? "setError" : "clearError"),
          cases: {
            setError: [$inputError, inputFocusedDueError],
            clearError: inputErrorClear
          }
        });

        return {
          [`$${name}InputError`]: $inputError,
          [`${name}InputErrorClear`]: inputErrorClear,
          [`${name}InputFocusedDueError`]: inputFocusedDueError,
          [`${name}InputValidate`]: inputValidate
        };
      })()
    : {};

  return {
    [`$${name}Input`]: $input,
    [`$${name}InputRef`]: $inputRef,
    [`${name}InputRefChanged`]: inputRefChanged,
    [`${name}InputBlur`]: inputBlur,
    [`${name}InputFocus`]: inputFocus,
    [`${name}InputChanged`]: inputChanged,
    ...extensionsTools
  } as
    | TNamedManipulationTools<T, Prefix, TManipulationTools<T>>
    | TNamedManipulationTools<T, Prefix, TAdvancedManipulationTools<T>>;
}
