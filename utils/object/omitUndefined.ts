// utils/object.ts
export function omitNullable<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
  ) as {
    [K in keyof T as T[K] extends null | undefined ? never : K]: Exclude<
      T[K],
      null | undefined
    >;
  };
}
