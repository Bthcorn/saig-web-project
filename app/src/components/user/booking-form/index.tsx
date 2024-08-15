import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { format, setHours, setMinutes } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Room } from "../booking-table/room-cols";
import { BoardGameItem } from "@/components/table/columns";
import axios from "axios";
import { getUserInfo, User } from "@/components/login-form/action";
import { windowReload } from "@/components/table/actions";

export type ReservationItem = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
  dateStart: Date;
  dateEnd: Date;
  duration: number;
  status: "AVAILABLE" | "UNAVAILABLE" | "PENDING" | "CANCELLED" | "BOOKED";
};

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  customerEmail: z.string().email({
    message: "Invalid email address",
  }),
  customerPhone: z.string().regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, {
    message: "Invalid phone number",
  }),
  dateStart: z.date(),
  dateEnd: z.date(),
  duration: z.number().int().nonnegative({
    message: "Duration must be a positive integer",
  }),
  status: z.enum([
    "AVAILABLE",
    "UNAVAILABLE",
    "PENDING",
    "CANCELLED",
    "BOOKED",
  ]),
});

export default function BookingForm({ className }: { className?: string }) {
  const form = useForm<ReservationItem>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      createdAt: new Date(),
      dateStart: new Date(),
      dateEnd: new Date(),
      duration: 0,
      status: "PENDING",
    },
  });

  const [selected, setSelected] = React.useState<Date>();
  const [selectedEnd, setSelectedEnd] = React.useState<Date>();
  const [timeValue, setTimeValue] = React.useState<string>("00:00");
  const [timeEndValue, setTimeEndValue] = React.useState<string>("00:00");

  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [boardgames, setBoardgames] = React.useState<BoardGameItem[]>([]);
  const [userInfo, setUserInfo] = React.useState<User>();

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectDate);
    setTimeValue(time);
    form.setValue("dateStart", newSelectDate);
  };

  const handleTimeEndChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const time = e.target.value;
    if (!selectedEnd) {
      setTimeEndValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectDate = setHours(setMinutes(selectedEnd, minutes), hours);
    setSelectedEnd(newSelectDate);
    setTimeEndValue(time);
    form.setValue("dateEnd", newSelectDate);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      form.setValue("dateStart", date ?? new Date());
      return;
    }

    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelected(newDate);
    form.setValue("dateStart", newDate);
  };

  const handleDayEndSelect = (date: Date | undefined) => {
    if (!timeEndValue || !date) {
      setSelectedEnd(date);
      form.setValue("dateEnd", date ?? new Date());
      return;
    }

    const [hours, minutes] = timeEndValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedEnd(newDate);
    form.setValue("dateEnd", newDate);
  };

  const loadLacalStorage = () => {
    const boardgame = localStorage.getItem("boardgame");
    const room = localStorage.getItem("room");

    if (boardgame) {
      setBoardgames(JSON.parse(boardgame));
    }

    if (room) {
      setRooms(JSON.parse(room));
    }
  };

  const loadUser = async () => {
    const response = await axios.get("http://localhost:3001/user/info", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setUserInfo(response.data.user);
    // console.log(user);
  };

  React.useEffect(() => {
    loadLacalStorage();
    loadUser();
  }, []);

  async function onSubmit() {
    try {
      const payload = {
        customerName: form.getValues("customerName"),
        customerEmail: form.getValues("customerEmail"),
        customerPhone: form.getValues("customerPhone"),
        dateStart: form.getValues("dateStart"),
        dateEnd: form.getValues("dateEnd"),
        duration: form.getValues("duration"),
        status: form.getValues("status"),
        boardgames: boardgames,
        rooms: rooms,
        userId: userInfo?.id,
        date: new Date(),
      };

      console.log(payload);

      const response = await axios.post(
        "http://localhost:3001/booking/save",
        payload,
      );

      localStorage.removeItem("boardgame");
      localStorage.removeItem("room");
      windowReload();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateStart"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date and Time</FormLabel>
              <Input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={handleDaySelect}
                    disabled={(date) => date < new Date("1900-01-01")}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateEnd"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date and Time</FormLabel>
              <Input
                type="time"
                value={timeEndValue}
                onChange={handleTimeEndChange}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={handleDayEndSelect}
                    disabled={(date) => date < new Date("1900-01-01")}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
