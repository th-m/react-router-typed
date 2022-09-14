import { useRoutes, RouteObject, Outlet } from "react-router-dom";
import { Clean, Converter, Join, Path } from "../ts-utils";
import { Menu } from "./Menu";
import { TypedLink } from "./typed-utils";

const standAlone = {
  path: "/stand-alone",
  element: (
    <div>
      <TypedLink to="/">to root </TypedLink>
    </div>
  ),
  children: [
    {
      path: "bizz",
      element: <div>bizz</div>,
      children: [
        {
          path: "boop",
          element: <div>boop</div>
        },
        {
          path: "bop",
          element: <div>bop</div>
        }
      ]
    },
    {
      path: "bazz",
      element: <div>bazz</div>
    }
  ]
} as const;

const wrapped = {
  path: "/",
  element: (
    <div>
      <Menu />
      <Outlet />
    </div>
  ),
  children: [
    {
      path: "wrapped-path",
      element: <div>wrapped</div>
    },
    {
      path: "arg-path/:arg",
      element: <div>arged</div>,
      children: [
        {
          path: "foo",
          element: <div>foo</div>
        },
        {
          path: "bar",
          element: <div>bar</div>
        }
      ]
    }
  ]
} as const;

export const readonlyRoutes = [wrapped, standAlone] as const;

export const PageRouter = () => {
  // TODO get a type gaurd here.
  return useRoutes((readonlyRoutes as unknown) as RouteObject[]);
};

type C = Converter<typeof readonlyRoutes>;
type P = Path<C>;
export type AllTypePaths = Clean<Join<P>>;
