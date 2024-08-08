import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface BoardGameProp {
  id: string;
  name: string;
  desciprtion: string;
  image: string;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  difficulty: number;
  price: number;
  status: string;
}

export const GameCard = (prop: BoardGameProp) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{prop.name}</CardTitle>
        <CardDescription>{prop.desciprtion}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
