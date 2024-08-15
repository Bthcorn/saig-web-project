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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Reservations } from "../table/order-columns";
import { format } from "date-fns";

const formSchema = z.object({
  id: z.string(),
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  status: z.enum(["APPROVED", "PENDING", "CANCELLED"]),
});

export default function OrderForm({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const form = useForm<Reservations>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      status: "PENDING",
    },
    reValidateMode: "onChange",
  });

  const [orders, setOrders] = React.useState<Reservations>();

  async function fetchOrders(): Promise<Reservations> {
    try {
      const response = await axios.get(
        "http://localhost:3001/booking/get/" + id,
      );
      setOrders(response.data.result);
      console.log(response.data.result ?? "no data");
      return response.data.result;
    } catch (error) {
      console.error(error);
      return form.getValues();
    }
  }

  React.useEffect(() => {
    fetchOrders().then((data) => {
      if (data) {
        form.reset(data);
      }
    });
  }, [id]);

  async function OnSubmit() {
    try {
      if (id !== undefined) {
        // console.log("Submitting form with data:", rooms);
        const response = await axios.post(
          `http://localhost:3001/booking/update/${id}`,
          form.getValues(),
        );
        console.log(response.data.result);
        await handleResponse(response);
        fetchOrders(); // Re-fetch to ensure state is up-to-date
        windowReload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleResponse(response: any) {
    toast({
      title: "Update Successful",
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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input {...field} value={field.value} placeholder="Order ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder="Customer Name"
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
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
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
