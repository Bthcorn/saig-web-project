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

// timeout for window reload
export function windowReload() {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

// set timeout dalayfunction for 2000ms
export function delay() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}




