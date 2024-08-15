import { AdminPage } from "@/components/admin/home";
import { Config } from "@/components/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { BoardGameItem, columns } from "@/components/table/columns";
// import { useLocation } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { DrawerDialogDemo } from "@/components/boardgame-dialog";
import { checkAdmin } from "@/components/login-form/action";
import { useNavigate } from "react-router-dom";

export default function BoardGame() {
  const navigate = useNavigate();
  const [data, setData] = useState<BoardGameItem[]>([]);

  const getBoardGames = async (): Promise<BoardGameItem[]> => {
    try {
      const res = await axios.get(Config.apiPath + "/game/boardgame/list");
      console.log(res.data.result);
      return res.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    getBoardGames().then((data) => {
      setData(data);
    });
    checkAdmin(navigate);
    // console.log(location);
  }, []);

  return (
    <AdminPage>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Board Games</h1>
        {/* <Button className="mt-4 gap-3">
          <PlusCircle className="h-6 w-6" />
          Board Game
        </Button> */}
        <DrawerDialogDemo
          title="Add Board Game"
          iconprop={<PlusCircle className="h-6 w-6" />}
        />
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </AdminPage>
  );
}
