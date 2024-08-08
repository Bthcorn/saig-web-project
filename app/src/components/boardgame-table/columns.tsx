import { ColumnDef } from "@tanstack/react-table";

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
  status: "available" | "unavailable";
  categoryId: string;
};

export const columns: ColumnDef<BoardGameItem>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Image",
    accessorKey: "image",
  },
  {
    header: "Min Players",
    accessorKey: "minPlayers",
  },
  {
    header: "Max Players",
    accessorKey: "maxPlayers",
  },
  {
    header: "Duration",
    accessorKey: "duration",
  },
  {
    header: "Difficulty",
    accessorKey: "difficulty",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Category ID",
    accessorKey: "categoryId",
  },
];
