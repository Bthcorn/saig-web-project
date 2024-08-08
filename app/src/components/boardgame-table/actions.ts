import { BoardGameItem } from "./columns";

export async function getBoardGames(): Promise<BoardGameItem[]> {
  return [{
    id: "1",
    name: "Catan",
    description: "A game of trading and strategy",
    image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1080&q=80&fit=max",
    minPlayers: 3,
    maxPlayers: 4,
    duration: 60,
    difficulty: 2,
    price: 49.99,
    status: "available",
    categoryId: "1",
  }]
}