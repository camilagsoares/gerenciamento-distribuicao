import { Outlet } from "react-router-dom";
import Header from "../../components/Header/index"
import React from "react";


export default function Layout() {
    return (
        // <div className=" h-screen w-screen overflow-hidden flex flex-row">
        //     <Header />
        //     <div className="flex-1 p-4 min-h-0 overflow-auto">
        //         <Outlet />
        //     </div>
        // </div>
        <div style={{ display: "flex", height: "100%" }}>
        <Header />
        <div style={{ flex: 1, overflowY: "auto",marginTop: "100px" }}>
          <Outlet />
        </div>
      </div>
    )
}