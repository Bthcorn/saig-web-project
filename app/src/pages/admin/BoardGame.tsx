import { AdminPage } from "@/components/admin/home";
import { Config } from "@/components/config";
import { BoardGameProp, GameCard } from "@/components/game-card";
import { GameTable } from "@/components/boardgame-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { getBoardGames } from "@/components/boardgame-table/actions";
import { DataTable } from "@/components/boardgame-table/data-table";
import { BoardGameItem, columns } from "@/components/boardgame-table/columns";
import { useLocation } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export default function BoardGame() {
  const [products, setProducts] = useState([] as BoardGameProp[]);
  const [data, setData] = useState([] as BoardGameItem[]);

  let location = useLocation();
  const getBoardGames = async (): Promise<BoardGameItem[]> => {
    try {
      const res = await axios.get(Config.apiPath + "/game/list");
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

    loadProducts();
    console.log(location);
  }, []);

  const fetchProducts = async (): Promise<BoardGameProp[]> => {
    try {
      const res = await axios.get(Config.apiPath + "/game/list");
      return res.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const loadProducts = async () => {
    try {
      const games = await fetchProducts();
      setProducts(games);
      console.log(games);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminPage>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Board Games</h1>
        <Button className="mt-4 gap-3">
          <PlusCircle className="h-6 w-6" /> Add Board Game
        </Button>
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {/* <div className="flex flex-col items-center gap-1 text-center">
          {products.length > 0 ? (
            products.map((product: BoardGameProp, index) => (
              <GameCard key={index} {...product} />
              ))
              ) : (
                <h3 className="text-2xl font-bold tracking-tight">
                "You have no products"
                </h3>
                )}
                <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
                </p>
                </div> */}
        {/* <GameTable /> */}
        {/* <div className="overflow-x-scroll"> */}
        <DataTable columns={columns} data={data} />
        {/* </div> */}
      </div>
    </AdminPage>
  );
}
