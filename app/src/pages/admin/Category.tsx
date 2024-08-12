import { AdminPage } from "@/components/admin/home";
import { DrawerDialogDemo } from "@/components/boardgame-dialog";
import { CategoryDrawerDialog } from "@/components/category-dialog";
import { categorycolumns } from "@/components/table/category-columns";
import { BoardGameCategory } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import React from "react";

export default function Category() {
  const [data, setData] = React.useState<BoardGameCategory[]>([]);

  async function getBoardGameCategories(): Promise<BoardGameCategory[]> {
    try {
      const response = await axios.get(
        "http://localhost:3001/game/category/list",
      );
      console.log(response.data.result);
      setData(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  React.useEffect(() => {
    getBoardGameCategories();
  }, []);

  return (
    <AdminPage>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Board Game Categories
        </h1>
        {/* <Button className="mt-4 gap-3">
        <PlusCircle className="h-6 w-6" />
        Board Game
      </Button> */}
        <CategoryDrawerDialog
          title="Add Board Game"
          iconprop={<PlusCircle className="h-6 w-6" />}
        />
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="container mx-auto py-10">
          <DataTable columns={categorycolumns} data={data} />
        </div>
      </div>
    </AdminPage>
  );
}
