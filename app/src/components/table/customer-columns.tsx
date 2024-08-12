import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTableColumnHeader } from "./headers";
import { Badge } from "../ui/badge";

export type Customer = {
  id: number;
  name: string;
  username: string;
  role: string;
  email: string;
  status: string;
};

export const customercolumns: ColumnDef<Customer>[] = [
  {
    header: "ID",
    accessorKey: "id",
    maxSize: 50,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Username" />;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const customer = row.original;

      return customer.status === "ACTIVE" ? (
        <Badge variant={"default"} className="rounded-sm px-1">
          {customer.status}
        </Badge>
      ) : (
        <Badge variant={"secondary"} className="rounded-sm px-1">
          {customer.status}
        </Badge>
      );
    },
  },
  {
    header: "Total Orders",
    accessorKey: "totalOrders",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <div className="flex flex-1">
          {/* <CustomerDrawerDialog
            id={customer.id}
            title="Edit"
            iconprop={<Edit className="h-4 w-4" />} 
          /> */}
        </div> //ban options // view orders option
      );
    },
  },
];
