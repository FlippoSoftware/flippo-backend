export default <T extends object>(object: any): object is T => {
  const keys = Object.keys(object) as (keyof T)[];
  return keys.every((key) => key in object);
};
