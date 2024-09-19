import { z } from "zod";

const record = <Table extends string>(table?: Table) => {
  return z.custom<`${Table}:${string}`>(
    (val) => {
      typeof val === "string" && table ? val.startsWith(table + ":") : true;
    },
    {
      message: ["Must be a record", table && `Table must be: "${table}"`]
        .filter((a) => a)
        .join("; ")
    }
  );
};

export { record };
