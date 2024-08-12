import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../ui/badge";
import { DrawerDialogDemo } from "../boardgame-dialog";
import React from "react";
import { DataTableColumnHeader } from "./headers";
import GetCategory from "./category";
import { Edit } from "lucide-react";

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
  status: "ACTIVE" | "INACTIVE";
};

export async function fetchBoardGames(): Promise<BoardGameItem[]> {
  try {
    const response = await fetch("http://localhost:3001/game/boardgame/list");
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    accessorKey: "status",
    cell: ({ row }) => {
      const boardgame = row.original;

      return boardgame.status === "AVAILABLE" ? (
        <Badge variant={"default"} className="rounded-sm px-1">
          {boardgame.status}
        </Badge>
      ) : (
        <Badge variant={"secondary"} className="rounded-sm px-1">
          {boardgame.status}
        </Badge>
      );
    },
  },
  {
    header: "Category",
    accessorKey: "boardGame_CategoryId",
    cell: ({ row }) => {
      const boardgame = row.original;

      return <GetCategory id={boardgame.boardGame_CategoryId} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const boardgame = row.original;

      return (
        <div className="flex flex-1">
          <DrawerDialogDemo
            id={boardgame.id}
            title="Edit"
            iconprop={<Edit className="h-4 w-4" />}
          />
        </div>
      );
    },
  },
];
