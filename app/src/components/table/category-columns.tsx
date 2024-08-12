import { ColumnDef } from "@tanstack/react-table";
import { BoardGameCategory } from "./columns";
import { DataTableColumnHeader } from "./headers";
import { CategoryDrawerDialog } from "../category-dialog";
import { Edit } from "lucide-react";

export const categorycolumns: ColumnDef<BoardGameCategory>[] = [
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
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex flex-1">
          <CategoryDrawerDialog
            id={category.id}
            title="Edit"
            iconprop={<Edit className="h-4 w-4" />}
          />
        </div>
      );
    },
  },
];
