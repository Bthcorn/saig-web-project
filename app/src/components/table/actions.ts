import axios from "axios";
import { BoardGameItem } from "./columns";

export async function getBoardGames(): Promise<BoardGameItem[]> {
  try {
    const res = await axios.get("http://localhost:3001/game/list");
    console.log(res.data.result);
    return res.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}



