export function combineStringValues(val: any, keys?:string[]): string {
  if (typeof val === "string") {
    return val;
  }
  return Object.entries<string>(val).reduce(
    (a, [key,value]) => {
      return (!keys || keys.includes(key) )
        ? a + combineStringValues(value, keys)
        : a
    }, 
    ""
  );
}

export function extractUniqueCharacters(
  ...objects: (Record<string, any> | string)[]
) {
  const fullString = objects
    .reduce<string>((a, c) => a + combineStringValues(c), "");
  return [ ...new Set([...fullString]) ]
    .filter(c => c !== '\n')
    .sort();
}
