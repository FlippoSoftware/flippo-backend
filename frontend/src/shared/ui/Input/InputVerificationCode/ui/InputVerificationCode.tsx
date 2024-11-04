"use client";

import {
  createRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import clsx from "clsx";
import { unknown } from "zod";

import { UnstyledInput } from "@ui/Input";
import { Text } from "@ui/Text";
import { Loader } from "@ui/Loader";

import st from "./InputVerificationCode.module.scss";

import type {
  TInputVerificationCodeProps,
  TVerifyInputHandler
} from "../types/TInputVerificationCode";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent, Ref } from "react";

function InputVerificationCode(props: TInputVerificationCodeProps, ref: Ref<TVerifyInputHandler>) {
  const {
    autoFocus = true,
    length = 4,
    onChange = () => null,
    success = false,
    errorMessage = null,
    onCompleted = () => unknown,
    isBeingChecked = false,
    placeholder = ".",
    type = "number",
    value: defaultValue = "",
    inputSlotProps
  } = props;

  const fillValues = (value: string) =>
    new Array(length).fill("").map((_, index) => value[index] ?? "");

  const fillReadOnly = useCallback(() => new Array(length).fill(true), [length]);

  const [values, setValues] = useState<string[]>(fillValues(defaultValue));
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [readOnly, setReadOnly] = useState<boolean[]>(fillReadOnly());

  const inputRefs = useMemo(
    () => new Array(length).fill(null).map(() => createRef<HTMLInputElement>()),
    [length]
  );

  const findIndexLastEmptyInput = useCallback((): number => {
    for (let index = 0; index < length; index++) {
      const input = inputRefs[index].current;
      if (input && input.value === "") {
        return index;
      }
    }
    return length - 1;
  }, [length, inputRefs]);

  const validate = (input: string) => {
    if (type === "number") {
      return /\d/.test(input);
    }

    if (type === "alphanumeric") {
      return /^[a-zA-Z0-9]/.test(input);
    }

    return true;
  };

  const selectInputContent = (index: number) => {
    const input = inputRefs[index].current;

    if (input) {
      requestAnimationFrame(() => input.select());
    }
  };

  const setValue = async (value: string, index: number) => {
    const nextValues = [...values];
    nextValues[index] = value;

    setValues(nextValues);

    const stringifiedValues = nextValues.join("");
    const isCompleted = stringifiedValues.length === length;

    onChange(stringifiedValues);

    if (isCompleted) {
      codeCheck(stringifiedValues);
      return;
    }
  };

  const focusInput = useCallback(
    (index: number) => {
      if (index < 0 || index === length) return;

      const input = inputRefs[index].current;

      if (input) {
        requestAnimationFrame(() => input.focus());
        setReadOnly(() => {
          const newReadOnly = fillReadOnly();
          newReadOnly[index] = false;
          return newReadOnly;
        });
      }
    },
    [inputRefs, fillReadOnly, length]
  );

  const blurInput = (index: number) => {
    const input = inputRefs[index].current;

    if (input) {
      requestAnimationFrame(() => input.blur());
    }
  };

  const onInputFocus = (index: number) => {
    const input = inputRefs[index].current;

    if (input) {
      setFocusIndex(index);
      selectInputContent(index);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const eventValue = event.target.value;

    const value = eventValue.replace(values[index], "");

    if (!validate(value)) {
      selectInputContent(index);
      return;
    }

    setValue(value, index);

    if (index === length - 1) {
      blurInput(index);
      return;
    }

    focusInput(index + 1);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const eventKey = event.key;

    if (eventKey === "Backspace" || eventKey === "Delete") {
      event.preventDefault();

      if (inputRefs[focusIndex].current?.value === "") {
        setValue("", index - 1);
        focusInput(index - 1);
      } else {
        setValue("", focusIndex);
      }

      return;
    }
  };

  const onInputPaste = async (event: ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault();

    const clipboardValue = event.clipboardData.getData("text");
    const nextValue = clipboardValue.slice(0, length);

    if (!validate(nextValue)) {
      return;
    }

    setValues(fillValues(nextValue));

    onChange(nextValue);

    const isCompleted = nextValue.length === length;

    if (isCompleted) {
      blurInput(index);
      codeCheck(nextValue);

      return;
    }

    focusInput(nextValue.length);
  };

  const codeCheck = async (code: string) => {
    await onCompleted(code);
  };

  const onInputClick = (event: MouseEvent<HTMLDivElement | HTMLInputElement>) => {
    const target = event.target;
    if (target) {
      const index = findIndexLastEmptyInput();
      focusInput(index);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        const index = findIndexLastEmptyInput();
        focusInput(index);
      }
    };
  }, [findIndexLastEmptyInput, focusInput]);

  useEffect(() => {
    if (autoFocus) {
      const index = findIndexLastEmptyInput();

      focusInput(index);
    }
  }, [autoFocus, focusInput, findIndexLastEmptyInput]);

  return (
    <div className={st.containerVerifyCode}>
      <div className={st.verifyInput} onClick={(event) => onInputClick(event)}>
        {inputRefs.map((ref, index) => (
          <UnstyledInput
            as={"input"}
            autoComplete={"one-time-code"}
            className={clsx(st.verifyInputSlot, errorMessage && st.invalid, success && st.success)}
            key={`verifyInputSlot-${index}`}
            ref={ref}
            value={values[index]}
            readOnly={readOnly[index]}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onInputChange(event, index)}
            onFocus={() => onInputFocus(index)}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => onInputKeyDown(event, index)}
            onPaste={(event: ClipboardEvent<HTMLInputElement>) => onInputPaste(event, index)}
            placeholder={placeholder}
            {...inputSlotProps}
          />
        ))}
      </div>
      <div
        className={clsx(
          st.status,
          (errorMessage || isBeingChecked) && st.showStatus,
          errorMessage && st.error
        )}
      >
        {errorMessage ? (
          <Text<"p"> as={"p"} fontSize={13} fontWeight={"Semibold"}>
            {errorMessage}
          </Text>
        ) : isBeingChecked ? (
          <Loader loader={"spinner"} />
        ) : null}
      </div>
    </div>
  );
}

export default forwardRef<TVerifyInputHandler, TInputVerificationCodeProps>(InputVerificationCode);
