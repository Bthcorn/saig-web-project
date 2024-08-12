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
import { Config } from "../config";
import React from "react";
import { ZAxis } from "recharts";
import { toast } from "../ui/use-toast";
import { windowReload } from "../table/actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  description: z.string(),
  image: z.string(),
  minPlayers: z.number().int().nonnegative({
    message: "Minimum players must be a positive integer",
  }),
  maxPlayers: z.number().int().nonnegative({
    message: "Maximum players must be a positive number",
  }),
  duration: z.number(),
  difficulty: z.number(),
  price: z.number().nonnegative({
    message: "Price must be a positive number",
  }),
  status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
  boardGame_CategoryId: z.string().min(1, {
    message: "Category must be selected",
  }),
});

export default function BoardGameForm({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const form = useForm<BoardGameItem>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      status: "AVAILABLE",
      minPlayers: 0,
      maxPlayers: 0,
      duration: 0,
      difficulty: 0,
      price: 0,
      boardGame_CategoryId: "",
    },
    reValidateMode: "onChange",
  });

  const [boardGame, setBoardGame] = React.useState<BoardGameItem>();
  const [categories, setCategories] = React.useState<BoardGameCategory[]>();

  async function fetchBoardGame(): Promise<BoardGameItem> {
    try {
      if (id === undefined) {
        return form.getValues();
      } else {
        const response = await axios.get(
          "http://localhost:3001/game/boardgame/" + id,
        );
        console.log(response.data.result);
        setBoardGame(response.data.result);
        return response.data.result;
      }
    } catch (error) {
      console.error(error);
      return form.getValues();
    }
  }

  async function fetchCategories(): Promise<BoardGameCategory[]> {
    try {
      const response = await axios.get(
        "http://localhost:3001/game/category/list",
      );
      setCategories(response.data.result);
      console.log(response.data.result ?? "no data");
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  React.useEffect(() => {
    // console.log(boardGame);
    fetchCategories();
    fetchBoardGame().then((boardGame) => {
      setBoardGame(boardGame);
      form.reset(boardGame);
    });
  }, []);

  async function OnSubmit() {
    try {
      if (id === undefined) {
        const response = await axios.post(
          "http://localhost:3001/game/boardgame/create",
          form.getValues(),
        );
        await handleResponse(response);
        fetchBoardGame();
      } else {
        const response = await axios.put(
          "http://localhost:3001/game/boardgame/update/" + id,
          form.getValues(),
        );
        // console.log(response.data.result);
        await handleResponse(response);
        fetchBoardGame();
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
                <Input placeholder="board game name" {...field} />
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
                <Textarea placeholder="board game description" {...field} />
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
                <Input placeholder="board game image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minPlayers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Players</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
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
          name="maxPlayers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Players</FormLabel>
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
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
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
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
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
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="boardGame_CategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category, index) => (
                      <SelectItem key={index} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
