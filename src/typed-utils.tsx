import { AllTypePaths } from './PageRouter';
import {
  Link,
  LinkProps,
  Navigate,
  NavigateOptions,
  NavigateProps,
} from 'react-router-dom';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export type ExtractPathParams<S extends string | number | symbol> = S extends ''
  ? []
  : S extends `${infer Left}:${infer Param}/${infer Right}`
  ? [Param, ...ExtractPathParams<Right>]
  : S extends `${infer Left}:${infer Param}`
  ? [Param]
  : [];

/**
 * Converts the string array of param names into keys of an object with string values
 */
export type RecordPathParams<Path extends string | number | symbol> =
  | Record<ExtractPathParams<Path>[number], string>
  | undefined;
/**
 * Utility Method for replacing the route param placeholders with their values in a url string
 */
export const replaceRouteParams = (
  path: string,
  params: Record<string | number, string> | undefined,
) => {
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value as string);
    }
  }
  return path;
};

// React Router Utils with Wrapped TS
type TypedNavigateProps<To extends AllTypePaths> = Omit<NavigateProps, 'to'> & {
  to: To;
  queryString?: string;
  params?: RecordPathParams<To>;
};

/**
 * TypedNavigate wraps React Routers Navigate.
 *
 * @param {TypedNavigateProps} props - extends `NavigateProps` and replaces `to` with enum of template literals and adds `params` for route
 */
export function TypedNavigate<To extends AllTypePaths>(props: TypedNavigateProps<To>) {
  const { to, params, queryString, ...rest } = props;

  let toPath = to as string;
  if (props.params) {
    toPath = replaceRouteParams(toPath, props.params);
  }
  if (queryString) {
    toPath += queryString;
  }
  return <Navigate to={toPath} {...rest} />;
}

type TypedLinkProps<To extends AllTypePaths> = Omit<LinkProps, 'to'> & {
  to: To;
  queryString?: string;
  params?: RecordPathParams<To>;
};

/**
 * TypedLink wraps React Routers Link.
 *
 * @param {TypedLinkProps} props - extends `LinkProps` and replaces `to` with enum of template literals and adds `params` for route
 */
export function TypedLink<To extends AllTypePaths>(props: TypedLinkProps<To>) {
  const { to, params, queryString, ...rest } = props;

  let toPath = to as string;
  if (props.params) {
    toPath = replaceRouteParams(toPath, props.params);
  }
  if (queryString) {
    toPath += queryString;
  }
  return <Link to={toPath} {...rest} />;
}

export function useTypedNavigation() {
  const _navigate = useNavigate();
  const navigate = useCallback(
    <T extends AllTypePaths>(
      to: T,
      params?: RecordPathParams<T>,
      queryString?: string,
      options?: NavigateOptions,
    ) => {
      let toPath = to as string;
      if (params) {
        toPath = replaceRouteParams(toPath, params);
      }
      if (queryString) {
        toPath += queryString;
      }
      _navigate(toPath, options);
    },
    [],
  );
  return navigate;
}