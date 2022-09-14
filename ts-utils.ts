type IndecesOfArr<Arr extends ReadonlyArray<any>> = Exclude<Partial<Arr>['length'], Arr['length'] | undefined>;

type Extends<T1, T2> = T1 extends T2?T1:never;

type KeyBy<A extends ReadonlyArray<object>, S extends keyof A[number]> = {
  [I in IndecesOfArr<A> as Extends<A[I][S], PropertyKey>]: A[I]
}

type MapConverter<A extends Record<string,object>> = {
   [key in keyof A]: Omit<A[key],'path'>
}

type RecursiveHelper<T> = { [P in keyof T]: Recursive<T[P]> };

type Recursive<T> = T extends {readonly children: ReadonlyArray<{path:string}>  }
  ?  RecursiveHelper<MapConverter<KeyBy<T['children'],'path'>>>
  : RecursiveHelper<T>

export type Converter<T> = T extends ReadonlyArray<object & {path:string}> ? Recursive<MapConverter<KeyBy<T,'path'>>> :never

export type Path<T> = PathTree<T>[keyof PathTree<T>];

type PathTree<T> = {
  [P in keyof T]-?: P extends `index` | `element`
    ? never
    : P extends `children`
    ? T[P][] extends object
      ? [...Path<T[P]>]
      : never
    : T[P] extends object
    ? [P] | [P, ...Path<T[P]>]
    : [P];
};


export type Join<T extends (string | number)[], D extends string = '/'> = T extends { length: 1 }
  ? `${T[0]}`
  : T extends { length: 2 }
  ? `${T[0]}${D}${T[1]}`
  : T extends { length: 3 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}`
  : T extends { length: 4 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}`
  : T extends { length: 5 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}${D}${T[4]}`
  : T extends { length: 6 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}${D}${T[4]}${D}${T[5]}`
  : T extends { length: 7 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}${D}${T[4]}${D}${T[5]}${D}${T[6]}`
  : T extends { length: 8 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}${D}${T[4]}${D}${T[5]}${D}${T[6]}${D}${T[7]}`
  : T extends { length: 9 }
  ? `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}${D}${T[4]}${D}${T[5]}${D}${T[6]}${D}${T[7]}${D}${T[8]}`
  : `${T[0]}${D}${T[1]}${D}${T[2]}${D}${T[3]}${D}${T[4]}${D}${T[5]}${D}${T[6]}${D}${T[7]}${D}${T[8]}${D}${T[9]}`;

export type Clean <T extends string> = T extends `//${infer Rest}`?`/${Rest}`:T;

