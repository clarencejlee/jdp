import React, { Fragment } from "react";
import { Grid, Orbitals } from "react-spinners-css";

export function PageLoader() {
  return (
    <Fragment>
      <div
        style={{
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: 'red'
        }}
      >
        <Grid size={100} />
      </div>
    </Fragment>
  );
}

export function Alternate() {
  return (
    <Fragment>
      <div
        style={{
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: 'red'
        }}
      >
        <Orbitals size={50} />
      </div>
    </Fragment>
  );
}
