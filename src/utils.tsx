export function fromEntries<
  A extends ReadonlyArray<readonly [PropertyKey, any]>
>(array: A): { [K in A[number][0]]: Extract<A[number], readonly [K, any]>[1] } {
  return Object.fromEntries(array) as any;
}
