import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MixIcon } from "@radix-ui/react-icons";
import {
  Bell,
  DoorOpen,
  Gamepad2,
  Home,
  LayoutList,
  LineChart,
  LucideTable,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export const SideNav = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Board Game</span>
        </NavLink>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive, isPending }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              }`
            }
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </NavLink>
          <NavLink
            to="/admin/boardgame"
            className={({ isActive, isPending }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Gamepad2 className="h-4 w-4" />
            Board Games{" "}
          </NavLink>
          <NavLink
            to="/admin/category"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LayoutList className="h-4 w-4" />
            Categories
          </NavLink>
          <NavLink
            to="/admin/rooms"
            className={({ isActive, isPending }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              }`
            }
          >
            <DoorOpen className="h-4 w-4" />
            Rooms{" "}
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive, isPending }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Users className="h-4 w-4" />
            Customers
          </NavLink>
        </nav>
      </div>
      {/* <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};
