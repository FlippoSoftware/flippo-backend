"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import type z from "zod";

const useParsSearchParams = (schema: z.ZodType) => {
  type TResultType = z.infer<typeof schema>;
  const params = useSearchParams();
  const [result, setResult] = useState<{
    ok: boolean | null;
    data: { error: string } | TResultType;
  }>({ ok: null, data: { error: "" } });

  useEffect(() => {
    if (params.has("error")) {
      setResult({ ok: false, data: { error: params.get("error") } });
    } else {
      let data = {};
      for (const [key, value] of params.entries()) {
        data = { ...data, [key]: value };
      }
      const parseResult = schema.safeParse(data);
      console.log(parseResult);
      if (parseResult.success) {
        setResult({ ok: true, data: parseResult.data });
      } else {
        setResult({ ok: false, data: { error: "Invalid data" } });
      }
    }
  }, [params, schema]);

  return result;
};

export { useParsSearchParams };
