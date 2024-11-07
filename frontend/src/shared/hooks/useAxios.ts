import { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import defaultAxios from "axios";
import { useEffect, useReducer, useCallback, type Reducer } from "react";

type TAxiosHookProps = {
  axios?: AxiosInstance;
  method: string;
  url: string;
  options?: AxiosRequestConfig;
  autoRequest?: boolean;
  customErrorMessage?: { [key in number | string]: string }; // Key - статус запроса, Value - сообщение ошибки.
};

type TRequestResult<T extends object | undefined> = {
  data?: T;
  error?: string;
  loading: boolean;
};

const initResult = { data: undefined, error: undefined, loading: false };

const ACTIONS = ["init", "success", "fail"] as const;
type TActions = (typeof ACTIONS)[number];

type TActionProp<T extends object | undefined> = {
  type: TActions;
  data?: T;
  error?: string;
};

const reducer = <T extends object | undefined>(
  _: TRequestResult<T>,
  action: TActionProp<T>
): TRequestResult<T> => {
  switch (action.type) {
    case "init":
      return { data: undefined, error: undefined, loading: true };
    case "success":
      return {
        data: action.data,
        error: undefined,
        loading: false
      };
    case "fail":
      return {
        data: undefined,
        error: action.error,
        loading: false
      };
    default:
      return initResult as TRequestResult<T>;
  }
};

const useAxios = <T extends object | undefined>(props: TAxiosHookProps) => {
  const {
    axios = defaultAxios,
    method,
    url,
    options,
    autoRequest = false,
    customErrorMessage
  } = props;
  const [result, dispatch] = useReducer<Reducer<TRequestResult<T>, TActionProp<T>>>(
    reducer,
    initResult as TRequestResult<T>
  );

  const request = useCallback(async () => {
    try {
      dispatch({ type: "init" });
      const controller = new AbortController();
      const result = await axios<T>({ method, url, ...options, signal: controller.signal });

      return dispatch({ type: "success", data: result.data });
    } catch (error: any) {
      let errorMessage = error.message;
      if (error instanceof AxiosError && customErrorMessage)
        if (error.status) errorMessage = customErrorMessage[error.status];

      dispatch({ type: "fail", error: errorMessage });
    }
  }, [axios, method, url, options, customErrorMessage]);

  useEffect(() => {
    if (autoRequest) request();
  }, [autoRequest, request]);

  return { ...result, request };
};

export { useAxios };
