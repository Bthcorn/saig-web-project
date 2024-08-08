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

export default function BoardGame() {
  const [products, setProducts] = useState([] as BoardGameProp[]);
  const [data, setData] = useState([] as BoardGameItem[]);
  const getBoardGames = async (): Promise<BoardGameItem[]> => {
    return [
      {
        id: "1",
        name: "Catan",
        description: "A game of trading and strategy",
        image:
          "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1080&q=80&fit=max",
        minPlayers: 3,
        maxPlayers: 4,
        duration: 60,
        difficulty: 2,
        price: 49.99,
        status: "available",
        categoryId: "1",
      },
    ];
  };

  useEffect(() => {
    getBoardGames().then((data) => {
      setData(data);
    });
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

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <AdminPage>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Board Games</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
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
        <DataTable columns={columns} data={data} />
      </div>
      <div className="flex justify-end">
        <Button className="mt-4">Add Board Game</Button>
      </div>
    </AdminPage>
  );
}
