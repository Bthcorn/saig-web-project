import BoardGameForm from "@/components/boardgame-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideBox } from "lucide-react";
import React from "react";
import BookingForm from "../booking-form";
import { BoardGameItem } from "@/components/table/columns";
import { Room } from "../booking-table/room-cols";

export default function BookingDialog() {
  const [open, setOpen] = React.useState(false);

  return (
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
  );
}
