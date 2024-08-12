import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
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
import { set, z } from "zod";
import { BoardGameCategory } from "../table/columns";
import axios from "axios";
import { Config } from "../config";
import React from "react";
import { toast } from "../ui/use-toast";
import { windowReload } from "../table/actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
});

export default function CategoryForm({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const form = useForm<BoardGameCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    reValidateMode: "onChange",
  });

  const [categories, setCategories] = React.useState<BoardGameCategory>();

  async function fetchCategories(): Promise<BoardGameCategory> {
    try {
      const response = await axios.get(
        "http://localhost:3001/game/category/" + id,
      );
      setCategories(response.data.result);
      console.log(response.data.result ?? "no data");
      return response.data.result;
    } catch (error) {
      console.error(error);
      return form.getValues();
    }
  }

  React.useEffect(() => {
    // console.log(boardGame);
    fetchCategories().then((data) => {
      form.reset(data);
    });
  }, []);

  async function OnSubmit() {
    try {
      if (id === undefined) {
        const response = await axios.post(
          "http://localhost:3001/game/category/create",
          form.getValues(),
        );
        await handleResponse(response);
        fetchCategories();
      } else {
        const response = await axios.put(
          "http://localhost:3001/game/category/update/" + id,
          form.getValues(),
        );
        await handleResponse(response);
        fetchCategories();
      }
      windowReload();
    } catch (error) {
      console.error(error);
    }
  }

  function handleResponse(response: any) {
    // setRes(response.data);
    toast({
      title: response.data.message,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-secondary p-4">
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
                <Input placeholder="category name" {...field} />
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
