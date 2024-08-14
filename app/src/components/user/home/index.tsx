import React from "react";
import { NavBar } from "../nav-bar";

export const HomePage = (prop: any) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {prop.children}
      </main>
    </div>
  );
};
