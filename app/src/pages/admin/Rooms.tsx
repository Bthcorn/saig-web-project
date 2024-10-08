import { AdminPage } from "@/components/admin/home";
import { DataTable } from "@/components/table/data-table";
import { PlusCircle } from "lucide-react";
import React from "react";

import { Room, roomcolumns } from "@/components/table/room-columns";
import axios from "axios";
import { RoomDrawerDialog } from "@/components/room-dialog";

export default function Rooms() {
  const [data, setData] = React.useState<Room[]>([]);

  async function getRoom(): Promise<Room[]> {
    try {
      const response = await axios.get("http://localhost:3001/room/list");
      console.log(response.data.result);
      setData(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  React.useEffect(() => {
    getRoom();
  }, []);
  return (
    <AdminPage>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Rooms</h1>
        {/* <Button className="mt-4 gap-3">
          <PlusCircle className="h-6 w-6" />
          Board Game
        </Button> */}
        <RoomDrawerDialog
          title="Add Board Game"
          iconprop={<PlusCircle className="h-6 w-6" />}
        />
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="container mx-auto py-10">
          <DataTable columns={roomcolumns} data={data} />
        </div>
      </div>
    </AdminPage>
  );
}
