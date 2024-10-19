import { z } from "zod";
import { RecordId } from "surrealdb";

const record = <Table extends string = string>(table?: Table) => {
  return z.custom<`${Table}:${string}`>(
    (val: string | RecordId<`${Table}`>) => {
      if (val instanceof RecordId) {
        val = val.toString();
      }
      return typeof val === "string" && table ? val.startsWith(table + ":") : false;
    },
    {
      message: ["Must be a record", table && `Table must be: "${table}"`]
        .filter((a: string | undefined) => a)
        .join("; ")
    }
  );
};

export { record };
