import React from "react";
import { SideNav } from "../side-nav";
import { NavBar } from "../nav-bar";

export const AdminPage = (props: any) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <SideNav />
      </div>
      <div className="flex w-screen flex-col overflow-x-auto lg:w-auto">
        <NavBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {props.children}
        </main>
      </div>
    </div>
  );
};
