import { z } from "zod";

const REG =
  /^(\+|-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;

const TimeFormatSchema =
  z.custom<`${"+" | "-" | ""}${string}${"seconds" | "secs" | "s" | "minutes" | "mins" | "m" | "hours" | "hrs" | "h" | "days" | "d" | "weeks" | "w" | "years" | "yrs" | "y"}`>(
    (val: string) => {
      return typeof val === "string" ? REG.test(val) : false;
    },
    {
      message: "Invalid time period format."
    }
  );

type TTimeFormat = z.infer<typeof TimeFormatSchema>;

export { TimeFormatSchema, type TTimeFormat };
