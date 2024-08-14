import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BoardGameCategory, BoardGameItem } from "../table/columns";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { Room } from "../table/room-columns";
import { windowReload } from "../table/actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  description: z.string(),
  table: z.number().int().nonnegative({
    message: "Table must be a positive integer",
  }),
  price: z.number().nonnegative({
    message: "Price must be a positive number",
  }),
  capacity: z.number().int().nonnegative({
    message: "Capacity must be a positive integer",
  }),
  status: z.enum([
    "AVAILABLE",
    "UNAVAILABLE",
    "PENDING",
    "CANCELLED",
    "BOOKED",
  ]),
});

export default function RoomForm({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const form = useForm<Room>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      status: "AVAILABLE",
      table: 0,
      capacity: 0,
      price: 0,
    },
    reValidateMode: "onChange",
  });

  const [room, setRoom] = React.useState<Room>();

  async function fetchRoom(): Promise<Room> {
    try {
      if (id === undefined) {
        return form.getValues();
      } else {
        const response = await axios.get("http://localhost:3001/room/" + id);
        console.log(response.data.result);
        setRoom(response.data.result);
        return response.data.result;
      }
    } catch (error) {
      console.error(error);
      return form.getValues();
    }
  }

  React.useEffect(() => {
    // console.log(boardGame);
    fetchRoom().then((room) => {
      form.reset(room);
    });
  }, []);

  async function OnSubmit() {
    try {
      if (id === undefined) {
        const response = await axios.post(
          "http://localhost:3001/room/create",
          form.getValues(),
        );
        // setRes(response.data);
        await handleResponse(response);
        fetchRoom();
      } else {
        const response = await axios.put(
          "http://localhost:3001/room/update/" + id,
          form.getValues(),
        );
        console.log(response.data.result);
        await handleResponse(response);
        fetchRoom();
      }
      windowReload();
    } catch (error) {
      console.error(error);
    }
  }

  function handleResponse(response: any) {
    // setRes(response.data);
    toast({
      title: response.data.message + "!",
      description: (
        <pre className="mt-2 rounded-md bg-secondary p-4">
          <code className="text-black">
            {JSON.stringify(response.data.result, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(OnSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="room name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="room description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="room image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="table"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Table</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="BOOKED">Booked</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
