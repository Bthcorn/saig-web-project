import { AdminPage } from "@/components/admin/home";
import { Customer, customercolumns } from "@/components/table/customer-columns";
import { DataTable } from "@/components/table/data-table";
import axios from "axios";
import React from "react";

export default function Customers() {
  const [data, setData] = React.useState<Customer[]>([]);

  async function getBoardGameCategories(): Promise<Customer[]> {
    try {
      const response = await axios.get("http://localhost:3001/user/list");
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
        <h1 className="text-lg font-semibold md:text-2xl">Rooms</h1>
        {/* <Button className="mt-4 gap-3">
          <PlusCircle className="h-6 w-6" />
          Board Game
        </Button> */}
        {/* <RoomDrawerDialog
          title="Add Board Game"
          iconprop={<PlusCircle className="h-6 w-6" />}
        /> */}
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="container mx-auto py-10">
          <DataTable columns={customercolumns} data={data} />
        </div>
      </div>
    </AdminPage>
  );
}
