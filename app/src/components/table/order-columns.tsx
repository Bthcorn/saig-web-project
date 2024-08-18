import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "./headers";
import { OrderDrawerDialog } from "../order-dialog";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

export type Reservations = {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
  dateStart: Date;
  dateEnd: Date;
  duration: number;

  status: "PENDING" | "APPROVED" | "CANCELLED";
};

export const ordercolumns: ColumnDef<Reservations>[] = [
  {
    header: "ID",
    accessorKey: "id",
    maxSize: 50,
  },
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "customerPhone",
    header: "Customer Phone",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      return <div>{format(row.original.createdAt, "PPP pp")}</div>;
    },
  },
  {
    accessorKey: "dateStart",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date Start" />;
    },
    cell: ({ row }) => {
      return <div>{format(row.original.dateStart, "PPP pp")}</div>;
    },
  },
  {
    accessorKey: "dateEnd",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date End" />;
    },
    cell: ({ row }) => {
      return <div>{format(row.original.dateEnd, "PPP pp")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <Badge
          variant={
            reservation.status === "PENDING"
              ? "secondary"
              : reservation.status === "APPROVED"
                ? "default"
                : "destructive"
          }
        >
          {reservation.status}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <div className="flex flex-1">
          <OrderDrawerDialog id={reservation.id} />
        </div>
      );
    },
  },
];
