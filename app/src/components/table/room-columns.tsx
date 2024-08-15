import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import React from "react";
import { DataTableColumnHeader } from "./headers";
import { RoomDrawerDialog } from "../room-dialog";
import { Edit } from "lucide-react";

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

export const roomcolumns: ColumnDef<Room>[] = [
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => (
      <img
        src="https://via.placeholder.com/150"
        alt={row.original.name}
        className="h-16 w-16 rounded-md object-cover"
      />
    ),
  },
  {
    header: "ID",
    accessorKey: "id",
    maxSize: 50,
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
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
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const room = row.original;

      return (
        <Badge
          variant={
            room.status === "UNAVAILABLE"
              ? "secondary"
              : room.status === "AVAILABLE"
                ? "default"
                : "destructive"
          }
        >
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
          <RoomDrawerDialog
            id={room.id}
            title="Edit"
            iconprop={<Edit className="h-4 w-4" />}
          />
        </div>
      );
    },
  },
];
