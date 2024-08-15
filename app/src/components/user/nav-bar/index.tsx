import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { pathname } from "./pathname";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout, User } from "@/components/login-form/action";
import React from "react";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavLink
          to="/home"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </NavLink>
        {pathname.map((path, index) => {
          return (
            <NavLink
              id={index.toString() + "Nav"}
              to={path.path}
              className={({ isActive, isPending }) =>
                `transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {path.name}
            </NavLink>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavLink
              to="/home"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </NavLink>
            {pathname.map((path, index) => {
              return (
                <NavLink
                  id={index.toString() + "SideNav"}
                  to={path.path}
                  className={({ isActive, isPending }) =>
                    `transition-colors hover:text-foreground ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`
                  }
                >
                  {path.name}
                </NavLink>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {/* <DropdownMenuItem>{user.id ?? "None"}</DropdownMenuItem> */}
            {/* <DropdownMenuItem>{user.username ?? "None"}</DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                Logout(navigate);
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
