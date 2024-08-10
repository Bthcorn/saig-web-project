import axios from "axios";
import { Config } from "../config";
import { BoardGameItem } from "../boardgame-table/columns";


export async function loadBoardGames(id: string): Promise<BoardGameItem> {
  const response = await axios(Config.apiPath + /boardgame/ + id);
  return response.data.result;
}

// save board game
export async function saveBoardGame(data: BoardGameItem): Promise<BoardGameItem> {
  const response = await axios.post(Config.apiPath + /boardgame/ + data.id, data);
  return response.data.result;
}

// update board game