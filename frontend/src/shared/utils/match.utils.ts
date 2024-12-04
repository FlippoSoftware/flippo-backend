export function match<T extends number | string | symbol, V>(value: T, handlers: { [key in T]: () => V }) {
  const handler = handlers[value];
  return handler();
}
