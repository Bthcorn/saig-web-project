import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../ui/badge";
import { DrawerDialogDemo } from "../boardgame-dialog";
import React from "react";
import { DataTableColumnHeader } from "./headers";

export type BoardGameItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  difficulty: number;
  price: number;
  status: "AVAILABLE" | "UNAVAILABLE";
  boardGame_CategoryId: string;
};

export type BoardGameCategory = {
  id: string;
  name: string;
};

export const columns: ColumnDef<BoardGameItem>[] = [
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => (
      <img
        src={row.original.image}
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
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
      const boardgame = row.original;

      return boardgame.status === "AVAILABLE" ? (
        <Badge variant={"default"}>{boardgame.status}</Badge>
      ) : (
        <Badge variant={"secondary"}>{boardgame.status}</Badge>
      );
    },
  },
  {
    header: "Category ID",
    accessorKey: "boardGame_CategoryId",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const boardgame = row.original;

      return (
        <div className="flex flex-1">
          <DrawerDialogDemo {...boardgame} />
        </div>
      );
    },
  },
];
