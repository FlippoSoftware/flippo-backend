export function match<T extends string | number | symbol, V>(
  value: T,
  handlers: { [key in T]: () => V }
) {
  const handler = handlers[value];
  return handler();
}
