import React from "react";
import { BoardGameCategory } from "./columns";
import axios from "axios";

export default function GetCategory({ id }: { id: string }) {
  const [category, setCategory] = React.useState<BoardGameCategory[]>();

  async function fetchCategory(): Promise<BoardGameCategory[]> {
    try {
      const response = await axios.get(
        "http://localhost:3001/game/category/list",
      );
      console.log(response.data.result);
      setCategory(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const findCategorybyId = (id: string) => {
    return category?.find((category) => category.id === id);
  };

  return <div>{findCategorybyId(id)?.name}</div>;
}
