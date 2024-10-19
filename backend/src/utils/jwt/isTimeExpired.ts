import epoch from "./epoch.ts";

export default (value: number): boolean => epoch(new Date()) > value;
