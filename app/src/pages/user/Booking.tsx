import { getUserInfo, User } from "@/components/login-form/action";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BookingDialog from "@/components/user/booking-dialog";
import BookingForm from "@/components/user/booking-form";
import { gamebookingcols } from "@/components/user/booking-table/boardgame-cols";
import {
  Room,
  roombookingcols,
} from "@/components/user/booking-table/room-cols";
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
import {
  CircleEllipsis,
  LucideBox,
  ShoppingBag,
  SquareArrowRight,
  Trash2,
} from "lucide-react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoardGameItem } from "@/components/table/columns";
import GetCategory from "@/components/table/category";
import { toast } from "@/components/ui/use-toast";
import { windowReload } from "@/components/table/actions";
import { create } from "domain";

export default function Booking() {
  // const [reservation, setReservation] = React.useState<ReservationItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [user, setUser] = React.useState<User>();
  const [room, setRoom] = React.useState([]);
  const [boardgame, setBoardGame] = React.useState([]);
  const [bookedboardgame, setBookedBoardGame] = React.useState<BoardGameItem[]>(
    [],
  );
  const [bookedroom, setBookedRoom] = React.useState<Room[]>([]);

  const fetchBoardGames = async () => {
    try {
      const response = await axios("http://localhost:3001/game/boardgame/list");
      setBoardGame(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromLocal = () => {
    const data = localStorage.getItem("boardgame");
    if (data) {
      setBookedBoardGame(JSON.parse(data));
    }

    const roomData = localStorage.getItem("room");
    if (roomData) {
      setBookedRoom(JSON.parse(roomData));
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

  // const fetchRoomsFromLocal = () => {
  //   const data = localStorage.getItem("room");
  //   if (data) {
  //     setBookedRoom(JSON.parse(data));
  //   }
  // };

  const handleBoardGameRemove = (id: string) => {
    try {
      const data = bookedboardgame.filter((item) => item.id !== id);
      setBookedBoardGame(data);
      localStorage.setItem("boardgame", JSON.stringify(data));
      toast({
        title: "Remove",
        description: "Removed successfully",
      });
      windowReload();
      return;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to remove: " + error,
        variant: "destructive",
      });
    }
  };

  const handleRoomRemove = (id: string) => {
    try {
      const data = bookedroom.filter((item) => item.id !== id);
      setBookedRoom(data);
      localStorage.setItem("room", JSON.stringify(data));
      toast({
        title: "Remove",
        description: "Removed successfully",
      });
      windowReload();
      return;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to remove: " + error,
        variant: "destructive",
      });
    }
  };

  // const handleSave = async () => {
  //   const payload = {
  //     user_id: user?.id,
  //     boardGame: bookedboardgame,
  //     room: bookedroom,
  //     createdAt:
  //   };
  // };

  React.useEffect(() => {
    getUserInfo().then((data) => {
      setUser(data);
      console.log(data);
    });
    fetchBoardGames();
    fetchRooms();
    fetchFromLocal();
    // fetchRoomsFromLocal();
  }, []);

  return (
    <HomePage>
      <section className="flex w-auto flex-col gap-2 rounded-md px-4 py-8 sm:items-start md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
          Book a Board Game & Room
        </h1>
        <p className="text-lg font-light text-foreground">
          Select a Board Game and Room.
        </p>
      </section>
      <section className="flex w-auto flex-col rounded-md px-4 py-4 md:pb-8 lg:pb-10">
        <div className="flex justify-end gap-2 pb-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="default" size={"default"}>
                <ShoppingBag className="mr-2 h-6 w-6" /> Booking List
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Booking List</DialogTitle>
              </DialogHeader>
              <Table>
                <TableCaption>Board Game Lists</TableCaption>
                <TableHeader>
                  {/* <TableHead>ID</TableHead> */}
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Action</TableHead>
                </TableHeader>
                <TableBody>
                  {bookedboardgame.map((item) => (
                    <TableRow key={item.id}>
                      {/* <TableCell>{item.id}</TableCell> */}
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        {<GetCategory id={item.boardGame_CategoryId} />}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size={"icon"}
                          onClick={() => handleBoardGameRemove(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="my-4" />
              <Table>
                <TableCaption>Room Lists</TableCaption>
                <TableHeader>
                  {/* <TableHead>ID</TableHead> */}
                  <TableHead>Name</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Action</TableHead>
                  {/* <TableHead>Category</TableHead> */}
                </TableHeader>
                <TableBody>
                  {bookedroom.map((item) => (
                    <TableRow key={item.id}>
                      {/* <TableCell>{item.id}</TableCell> */}
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.table}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      {/* <TableCell> */}
                      {/* {<GetCategory id={item.room_CategoryId} />} */}
                      {/* </TableCell> */}
                      <TableCell>
                        <Button
                          variant="outline"
                          size={"icon"}
                          onClick={() => handleRoomRemove(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size={"default"}>
                <SquareArrowRight className="mr-2 h-6 w-6" /> Proceed
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
        {/* <div className="flex justify-end"></div> */}
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
