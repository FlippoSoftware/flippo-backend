import {
  createEffect,
  createEvent,
  createStore,
  type EventCallable,
  is,
  sample,
  split,
  type StoreWritable
} from 'effector';
import { and } from 'patronum';
import { type ZodSchema } from 'zod';

type TInputError = null | string;

type TManipulationTools<T> = {
  $input: StoreWritable<T>;
  $inputRef: StoreWritable<HTMLInputElement | null>;
  inputBlur: EventCallable<void>;
  inputChanged: EventCallable<Exclude<T, null>>;
  inputFocus: EventCallable<void>;
  inputRefChanged: EventCallable<HTMLInputElement>;
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
  Source extends TAdvancedManipulationTools<T> | TManipulationTools<T>
> = {
  [key in keyof Source as key extends `$${infer Name}`
    ? `$${Prefix}${Capitalize<Name>}`
    : `${Prefix}${Capitalize<key & string>}`]: Source[key];
};

export type TNamedManipulationTools<
  T,
  Prefix extends string,
  Source extends TAdvancedManipulationTools<T> | TManipulationTools<T>
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
 * Функция для создания объекта с инструментами для манипуляции с полем ввода.
 *
 * @template T - тип данных поля
 * @template Prefix - литеральный тип для имени и префикс для полей возвращаемого объекта
 * @param {string} name - имя поля
 * @param {?StoreWritable<T> | T} [source] - внешний стор для поля или начально значение
 * @param {?ZodSchema} [schema] - Zod схема для валидации
 * @returns {TFieldManipulationTools<T>} объект с инструментами манипуляции полем
 */
export function createFormInput<T, Prefix extends string>(
  name: Prefix,
  source: StoreWritable<T> | T
): TNamedManipulationTools<T, typeof name, TManipulationTools<T>>;

export function createFormInput<T, Prefix extends string>(
  name: Prefix,
  source: StoreWritable<T> | T,
  schema: ZodSchema
): TNamedManipulationTools<T, typeof name, TAdvancedManipulationTools<T>>;

export function createFormInput<T, Prefix extends string>(
  name: Prefix,
  source: StoreWritable<T> | T,
  schema?: ZodSchema
):
  | TNamedManipulationTools<T, Prefix, TAdvancedManipulationTools<T>>
  | TNamedManipulationTools<T, Prefix, TManipulationTools<T>> {
  // #region $input
  let $input: StoreWritable<T>;
  if (is.store(source)) {
    $input = source;
  } else {
    $input = createStore<T>(source);
  }

  const inputChanged = createEvent<T>();
  const inputBlur = createEvent();
  const inputFocus = createEvent();
  const inputFocusedFx = createEffect<HTMLInputElement, void>((input) => {
    input.focus();
  });

  $input.on(inputChanged, (_, input) => input);
  // #endregion

  // #region $inputRef
  const $inputRef = createStore<HTMLInputElement | null>(null);

  const inputRefChanged = createEvent<HTMLInputElement>();

  $inputRef.on(inputRefChanged, (_, input) => input);
  // #endregion

  // #region $inputError
  const extensionsTools = schema
    ? (() => {
        const $inputError = createStore<TInputError>(null);

        const inputValidate = createEvent();
        const inputCompletedValidate = createEvent<TInputError>();
        const inputErrorClear = createEvent();
        const inputFocusedDueError = createEvent();

        $inputError.reset(inputChanged, inputErrorClear);

        sample({
          clock: inputBlur,
          source: $inputError,
          filter: $inputError.map((error) => !!error && error === 'empty'),
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
          cases: {
            clearError: inputErrorClear,
            setError: [$inputError, inputFocusedDueError]
          },
          match: (error) => (error ? 'setError' : 'clearError'),
          source: inputCompletedValidate
        });

        return {
          [`${name}InputErrorClear`]: inputErrorClear,
          [`${name}InputFocusedDueError`]: inputFocusedDueError,
          [`${name}InputValidate`]: inputValidate,
          [`$${name}InputError`]: $inputError
        };
      })()
    : {};
  // endregion

  return {
    [`${name}InputBlur`]: inputBlur,
    [`${name}InputChanged`]: inputChanged,
    [`${name}InputFocus`]: inputFocus,
    [`${name}InputRefChanged`]: inputRefChanged,
    [`$${name}Input`]: $input,
    [`$${name}InputRef`]: $inputRef,
    ...extensionsTools
  } as
    | TNamedManipulationTools<T, Prefix, TAdvancedManipulationTools<T>>
    | TNamedManipulationTools<T, Prefix, TManipulationTools<T>>;
}
