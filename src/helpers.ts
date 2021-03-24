export function isObject(item:any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep<T>(target:Partial<T>, ...sources:(Partial<T>|undefined|null)[]):T {
  if (!sources.length) {
    throw new Error(`No sources for mergeDeep()`);
  }

  if (!isObject(target)) {
    throw new Error(`Target is not an object\n` + target);
  }

  return [target,...sources].reduce<T>(
    (a,c) => {
      if ( c !== undefined && c !== null ) {
        for (const key in c) {
          if ( c[key] !== undefined ) {
            if (isObject(c[key])) {
              a[key] = mergeDeep( isObject(a[key]) ? a[key] : {}, c[key]);
            } else {
              a[key] = c[key]!;
            }
          }
        }
      }
      return a;
    },
    {} as T
  )
}
