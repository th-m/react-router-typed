import { TypedLink } from "./typed-utils";

export const Menu = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
      }}
    >
      <TypedLink to="/wrapped-path"> wrapped path </TypedLink>
      <TypedLink to="/arg-path/:arg" params={{ arg: "1" }}>
        {" "}
        arg bar{" "}
      </TypedLink>

      <TypedLink to="/stand-alone"> outside outlet</TypedLink>
    </div>
  );
};
