import {paths} from './pluggy-fetch';


export type TPaths = keyof paths;
export type TMethods = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'trace';

// Get all extracted keys from paths that are not never
export type MethodOf<T extends TPaths> = Extract<NonNeverKeys<T>, TMethods>;

type NonNeverKeys<T extends TPaths> = {
  [K in keyof paths[T]]: paths[T][K] extends object ? K : never
}[keyof paths[T]];

export type TRoutes<R extends TPaths, M extends MethodOf<R>> = NonNullable<paths[R][M]>;

type allResponsesOf<R extends TPaths, M extends MethodOf<R>, CT extends string = 'application/json'> =
  TRoutes<R, M> extends { responses: Record<PropertyKey, unknown> }
    ? {
        [K in keyof TRoutes<R, M>['responses']]: 
          TRoutes<R, M>['responses'][K] extends { content?: infer C }
            ? CT extends keyof C
              ? C[CT] extends { schema?: infer S2 } ? S2 : C[CT]
              : never
            : TRoutes<R, M>['responses'][K]
      }
    : never;

// REQUEST BODY TYPE HELPERS

type RequestBodyOf<R extends TPaths, M extends MethodOf<R>> = TRoutes<R, M> extends { requestBody?: { content: { 'application/json': infer B } } } ? B : undefined;

type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K
}[keyof T];

// If RequestBodyOf has no required keys, body is optional
export type PluggyRequestBody<R extends TPaths, M extends MethodOf<R>> =
  [RequiredKeys<RequestBodyOf<R, M>>] extends [never]
    ? { body?: RequestBodyOf<R, M> } // all fields optional
    : { body: RequestBodyOf<R, M> }; // at least one field required

// UTIL TYPES

// Utilitário para extrair as chaves que começam com prefixo específico (ex: '2', '4', '5')
type KeysStartingWith<T, P extends string> =
  T extends number
    ? `${T}` extends `${P}${string}` ? T : never
    : never;

export type TPluggyResponse<R extends TPaths, M extends MethodOf<R>> = {
  data?: allResponsesOf<R, M>[KeysStartingWith<keyof allResponsesOf<R, M>, '2'>];
  error?: allResponsesOf<R, M>[KeysStartingWith<keyof allResponsesOf<R, M>, '4'> | KeysStartingWith<keyof allResponsesOf<R, M>, '5'>];
  status: keyof allResponsesOf<R, M>;
};
