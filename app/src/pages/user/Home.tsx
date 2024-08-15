import { BoardGameItem } from "@/components/table/columns";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/components/user/home";
import axios from "axios";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CarouselPlugin } from "@/components/user/game-carousel";
import { checkAuth } from "@/components/login-form/action";

export default function Home() {
  const navigate = useNavigate();
  const [boardGame, setBoardGame] = React.useState<BoardGameItem[]>([]);
  async function getBoardGame(): Promise<BoardGameItem[]> {
    try {
      const respounse = await axios.get(
        "http://localhost:3001/game/boardgame/list10",
      );
      setBoardGame(respounse.data.result);
      return respounse.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  React.useEffect(() => {
    getBoardGame();
    checkAuth(navigate);
  }, []);

  return (
    <HomePage>
      <section className="flex w-auto flex-col items-start justify-start gap-2 rounded-md px-4 py-8 sm:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
          Welcome to the Board Game Booking Website
        </h1>
        <p className="text-lg font-light text-foreground">
          Let's find your favorite board game! 🎲.
        </p>
        <div className="flex w-full items-start gap-2 py-2 sm:items-center sm:justify-center">
          <Button variant={"default"} size="default">
            <NavLink to="/boardgame">Get Started</NavLink>
          </Button>
          <Button variant={"outline"} size="default">
            <NavLink to="/boardgame">View Board Game</NavLink>
          </Button>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tighter lg:text-3xl lg:leading-normal">
          Popular Board Game
        </h1>
        <CarouselPlugin props={boardGame} />
      </section>
    </HomePage>
  );
}
