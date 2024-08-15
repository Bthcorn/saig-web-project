import BoardGameForm from "@/components/boardgame-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideBox, PlusSquare } from "lucide-react";
import React from "react";
import BookingForm from "../booking-form";
import { BoardGameItem } from "@/components/table/columns";
import { Room } from "./room-cols";
import { SpeakerModerateIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { windowReload } from "@/components/table/actions";

export default function SaveRoomDialog({ prop }: { prop: Room }) {
  const [open, setOpen] = React.useState(false);
  const [room, setRoom] = React.useState<Room[]>([]);

  const handleSave = (prop: Room) => {
    const currentRooms = room ?? [];

    // Check if the item already exists
    const found = currentRooms.find((item) => item.id === prop.id);

    if (!found) {
      const arr = [...currentRooms];
      arr.push(prop);
      setRoom(arr);
      toast({
        title: "Add",
        description: "Added successfully",
      });
      localStorage.setItem("room", JSON.stringify(arr));
      windowReload();
      return;
    } else {
      toast({
        title: "Error",
        description: "Already added",
        variant: "destructive",
      });
      return;
    }
  };

  const loadRoom = () => {
    const data = localStorage.getItem("room");
    if (data) {
      // console.log(data);
      // console.log(boardgame);
      setRoom(JSON.parse(data));
    }
  };

  React.useEffect(() => {
    loadRoom();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <PlusSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>
        <span className="text-center text-2xl font-bold">{prop.name}</span>
        <span className="text-center text-lg font-light">
          {prop.description}
        </span>
        <span className="text-center text-lg font-light">{prop.price} THB</span>
        <span className="text-center text-lg font-light">{prop.status}</span>
        <DialogFooter>
          <Button
            variant="default"
            size={"sm"}
            onClick={() => {
              handleSave(prop);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
