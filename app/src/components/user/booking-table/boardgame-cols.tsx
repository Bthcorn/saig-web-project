import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import React from "react";
import { Edit } from "lucide-react";
import { BoardGameItem } from "@/components/table/columns";
import { DataTableColumnHeader } from "@/components/table/headers";
import GetCategory from "@/components/table/category";
import { DrawerDialogDemo } from "@/components/boardgame-dialog";

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

export const gamebookingcols: ColumnDef<BoardGameItem>[] = [
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
    header: "Actions",
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
