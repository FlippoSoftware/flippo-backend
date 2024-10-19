export default <T extends object>(obj: T) => {
  const newObj = Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as { [key: string]: any };

  return newObj;
};
