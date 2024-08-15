import { getUserInfo, User } from "@/components/login-form/action";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BookingDialog from "@/components/user/booking-dialog";
import BookingForm from "@/components/user/booking-form";
import { gamebookingcols } from "@/components/user/booking-table/boardgame-cols";
import { roombookingcols } from "@/components/user/booking-table/room-cols";
import { HomePage } from "@/components/user/home";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideBox } from "lucide-react";
import axios from "axios";

export default function Booking() {
  // const [reservation, setReservation] = React.useState<ReservationItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<User>();
  const [room, setRoom] = React.useState([]);
  const [boardgame, setBoardGame] = React.useState([]);

  const fetchBoardGames = async () => {
    try {
      const response = await axios("http://localhost:3001/game/boardgame/list");
      setBoardGame(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios("http://localhost:3001/room/list");
      setRoom(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getUserInfo().then((data) => {
      setUser(data);
      console.log(data);
    });
    fetchBoardGames();
    fetchRooms();
  }, []);

  return (
    <HomePage>
      <section className="flex w-auto flex-col gap-2 rounded-md px-4 py-8 sm:items-start md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        {/* <div className="flex justify-start"> */}
        <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
          Book a Board Game & Room
        </h1>
        <p className="text-lg font-light text-foreground">
          Select a Board Game and Room.
        </p>
      </section>
      <section className="flex w-auto flex-col rounded-md px-4 py-4 md:pb-8 lg:pb-10">
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size={"lg"}>
                <LucideBox className="mr-2 h-6 w-6" /> Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Booking Form</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-80">
                <BookingForm className="p-2" />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size={"lg"}>
                <LucideBox className="mr-2 h-6 w-6" /> Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Booking Form</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-80">
                <BookingForm className="p-2" />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-4 overflow-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
              Board Games
            </h1>
            <DataTable columns={gamebookingcols} data={boardgame} />
          </div>
          <div className="flex flex-col gap-4 overflow-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
              Rooms
            </h1>
            <DataTable columns={roombookingcols} data={room} />
          </div>
        </div>
      </section>
    </HomePage>
  );
}
