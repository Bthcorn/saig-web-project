import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTableColumnHeader } from "@/components/table/headers";
import { Badge } from "@/components/ui/badge";
import SaveRoomDialog from "./saveroom-dialog";

export type Room = {
  id: string;
  name: string;
  description: string;
  table: number;
  image: string;
  capacity: number;
  price: number;
  status: "AVAILABLE" | "UNAVAILABLE" | "PENDING" | "CANCELLED" | "BOOKED";
};

export const roombookingcols: ColumnDef<Room>[] = [
  // {
  //   header: "Image",
  //   accessorKey: "image",
  //   cell: ({ row }) => (
  //     <img
  //       src={row.original.image}
  //       alt={row.original.name}
  //       className="h-16 w-16 rounded-md object-cover"
  //     />
  //   ),
  // },
  // {
  //   header: "ID",
  //   accessorKey: "id",
  //   maxSize: 50,
  // },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    accessorKey: "name",
  },
  // {
  //   header: "Description",
  //   accessorKey: "description",
  // },
  {
    header: "Table",
    accessorKey: "table",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Capacity" />;
    },
    accessorKey: "capacity",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Price" />;
    },
    accessorKey: "price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(amount);

      return formatted;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const room = row.original;

      return room.status === "AVAILABLE" ? (
        <Badge variant={"default"} className="rounded-sm px-1">
          {room.status}
        </Badge>
      ) : (
        <Badge variant={"secondary"} className="rounded-sm px-1">
          {room.status}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const room = row.original;

      return (
        <div className="flex flex-1">
          <SaveRoomDialog prop={room} />
        </div>
      );
    },
  },
];
