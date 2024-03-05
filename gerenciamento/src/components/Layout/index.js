import { Outlet } from "react-router-dom";
import Header from "../../components/Header/index"
import * as React from "react";


export default function Layout() {
    return (
        <div style={{ display: "flex", height: "100%" }}>
        <Header />
        <div style={{ flex: 1, overflowY: "auto",marginTop: "100px" }}>
          <Outlet />
        </div>
      </div>
    )
}