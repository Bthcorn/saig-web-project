import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  Search,
  CircleUser,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <NavLink
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Board Game</span>
            </NavLink>
            <NavLink
              to="/admin/dashboard"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive, isPending }) =>
                `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </NavLink>
            <NavLink
              to="/admin/boardgame"
              className={({ isActive, isPending }) =>
                `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              <Package className="h-5 w-5" />
              Board Games
            </NavLink>
            <NavLink
              to="/admin/customers"
              className={({ isActive, isPending }) =>
                `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              <Users className="h-5 w-5" />
              Customers
            </NavLink>
            <NavLink
              to="#"
              className={({ isActive, isPending }) =>
                `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </NavLink>
          </nav>
          <div className="mt-auto">
            {/* <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
