import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { DrawerDialogDemo } from "../boardgame-dialog";

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
  categoryId: string;
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
    header: "Name",
    accessorKey: "name",
  },
  // {
  //   header: "Description",
  //   accessorKey: "description",
  // },
  {
    header: "Price",
    accessorKey: "price",
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
    accessorKey: "categoryId",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const boardgame = row.original;

      return <DrawerDialogDemo {...boardgame} />;
    },
  },
];
