import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { time } from "console";
import React from "react";
import { useForm } from "react-hook-form";
import { fromTheme } from "tailwind-merge";
import { z } from "zod";

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
  customerPhone: z.string().min(10, {
    message: "Phone number must be at least 10 characters",
  }),
  dateStart: z.date(),
  dateEnd: z.date(),
  duration: z.number().int().nonnegative({
    message: "Duration must be a positive integer",
  }),
  timeStart: z.string(),
  timeEnd: z.string(),
  status: z.enum([
    "AVAILABLE",
    "UNAVAILABLE",
    "PENDING",
    "CANCELLED",
    "BOOKED",
  ]),
});

export default function BookingForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      dateStart: new Date(),
      dateEnd: new Date(),
      duration: 0,
      timeStart: "00:00",
      timeEnd: "00:00",
      status: "PENDING",
    },
  });

  async function onSubmit() {}

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
            <FormItem>
              <FormLabel>Date Start</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
