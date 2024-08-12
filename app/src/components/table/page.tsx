import React from "react";
import { getBoardGames } from "./actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const data = await getBoardGames();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
