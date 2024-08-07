import { AdminPage } from "@/components/admin/home";
import { Config } from "@/components/config";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

interface BoardGames {
  id: String;
  name: String;
  desciprtion: String;
  image: String;
  minPlayers: Number;
  maxPlayers: Number;
  duration: Number;
  difficulty: Number;
  price: Number;
  status: String;
}

export default function BoardGame() {
  const [products, setProducts] = useState({});

  const fetchProducts = async (): Promise<BoardGames[]> => {
    try {
      const res = await axios.get(Config.apiPath + "/game/list");
      return res.data;
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
      <Button className="mt-4">Add Product</Button>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        // x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
        </div>
      </div>
    </AdminPage>
  );
}
